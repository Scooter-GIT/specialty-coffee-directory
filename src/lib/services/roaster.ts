import { prisma } from '@/lib/prisma';
import { roasterSchema, searchQuerySchema, type RoasterInput } from '@/lib/validations/roaster';
import { ValidationError, DatabaseError, NotFoundError } from '@/lib/exceptions';
import { slugify } from '@/lib/utils';

export async function createRoaster(data: RoasterInput) {
  try {
    const validated = roasterSchema.parse({
      ...data,
      slug: slugify(data.name)
    });

    return await prisma.roaster.create({
      data: validated
    });
  } catch (error) {
    if (error instanceof Error) {
      throw new ValidationError(error.message);
    }
    throw new DatabaseError('Failed to create roaster');
  }
}

export async function updateRoaster(id: string, data: Partial<RoasterInput>) {
  try {
    const existing = await prisma.roaster.findUnique({ where: { id } });
    if (!existing) throw new NotFoundError('Roaster not found');

    const validated = roasterSchema.partial().parse(data);

    return await prisma.roaster.update({
      where: { id },
      data: validated
    });
  } catch (error) {
    if (error instanceof NotFoundError) throw error;
    if (error instanceof Error) {
      throw new ValidationError(error.message);
    }
    throw new DatabaseError('Failed to update roaster');
  }
}

export async function searchRoasters(params: Record<string, unknown>) {
  try {
    const { query, city, state, roastingStyle, page, limit } = searchQuerySchema.parse(params);
    
    const where = {
      AND: [
        query ? {
          OR: [
            { name: { contains: query, mode: 'insensitive' } },
            { description: { contains: query, mode: 'insensitive' } }
          ]
        } : {},
        city ? { city: { equals: city, mode: 'insensitive' } } : {},
        state ? { state: { equals: state.toUpperCase() } } : {},
        roastingStyle ? { roastingStyles: { has: roastingStyle } } : {}
      ]
    };

    const [roasters, total] = await Promise.all([
      prisma.roaster.findMany({
        where,
        skip: (page - 1) * limit,
        take: limit,
        orderBy: { name: 'asc' }
      }),
      prisma.roaster.count({ where })
    ]);

    return {
      roasters,
      total,
      pages: Math.ceil(total / limit)
    };
  } catch (error) {
    if (error instanceof Error) {
      throw new ValidationError(error.message);
    }
    throw new DatabaseError('Failed to search roasters');
  }
}
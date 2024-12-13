import { prisma } from '@/lib/prisma';
import { roasterSchema, searchQuerySchema, type RoasterInput } from '@/lib/validations/roaster';
import { ValidationError } from '@/lib/exceptions';
import { slugify } from '@/lib/utils';

// MVP: Basic roaster operations
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
    throw error;
  }
}

// MVP: Simple search implementation
export async function searchRoasters(params: Record<string, unknown>) {
  try {
    const { query, page = 1 } = searchQuerySchema.parse(params);
    const limit = 20; // MVP: Fixed limit
    
    const where = query
      ? {
          OR: [
            { name: { contains: query, mode: 'insensitive' } },
            { description: { contains: query, mode: 'insensitive' } }
          ]
        }
      : {};

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
    throw error;
  }
}

// Week 2+: Advanced features to be implemented
// export async function getRoastersByLocation() {}
// export async function getRoastersByStyle() {}
// export async function updateRoaster() {}
// export async function trackRoasterView() {}
import { z } from 'zod';

export const roasterSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  slug: z.string(),
  website: z.string().url('Invalid website URL'),
  description: z.string().optional(),
  address: z.string(),
  city: z.string(),
  state: z.string().length(2, 'State must be a 2-letter code'),
  zipCode: z.string().regex(/^\d{5}(-\d{4})?$/, 'Invalid ZIP code'),
  latitude: z.number().optional(),
  longitude: z.number().optional(),
  phone: z.string().regex(/^\+?[1-9]\d{1,14}$/, 'Invalid phone number').optional(),
  email: z.string().email('Invalid email address').optional(),
  roastingStyles: z.array(z.string()),
  beanOrigins: z.array(z.string()),
  featured: z.boolean().default(false)
});

export const searchQuerySchema = z.object({
  query: z.string().optional(),
  city: z.string().optional(),
  state: z.string().length(2).optional(),
  roastingStyle: z.string().optional(),
  page: z.number().int().positive().default(1),
  limit: z.number().int().positive().default(20)
});

export type RoasterInput = z.input<typeof roasterSchema>;
export type RoasterOutput = z.output<typeof roasterSchema>;
export type SearchQuery = z.input<typeof searchQuerySchema>;
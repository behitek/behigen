import { defineCollection, z } from 'astro:content';

const productSchema = z.object({
  slug: z.string(),
  category: z.enum(['google', 'chatgpt']),
  name: z.string(),
  variant: z.string(),
  tagline: z.string(),
  price: z.number().int().positive(),
  billingTerm: z.string(),
  warranty: z.string(),
  deliveryType: z.string(),
  featured: z.boolean().default(false),
  highlights: z.array(z.string()).min(2),
  details: z.array(z.string()).min(1),
  suitableFor: z.array(z.string()).min(1),
  notSuitableFor: z.array(z.string()).min(1),
  purchaseNotes: z.array(z.string()).min(1),
  faqs: z.array(
    z.object({
      question: z.string(),
      answer: z.string()
    })
  ),
  seoTitle: z.string(),
  seoDescription: z.string()
});

const blog = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    description: z.string(),
    pubDate: z.coerce.date(),
    updatedDate: z.coerce.date().optional(),
    tags: z.array(z.string()).default([]),
    category: z.string(),
    featured: z.boolean().default(false),
    relatedProducts: z.array(z.string()).default([]),
    sourceLabel: z.string().optional(),
    sourceUrl: z.string().url().optional(),
    thumbnail: z.string().optional()
  })
});

const faq = defineCollection({
  type: 'data',
  schema: z.object({
    group: z.string(),
    description: z.string(),
    groupSlug: z.string(),
    order: z.number(),
    items: z.array(
      z.object({
        question: z.string(),
        answer: z.string()
      })
    )
  })
});

const toolSchema = z.object({
  slug: z.string(),
  title: z.string(),
  description: z.string(),
  toolType: z.enum(['practical', 'lab']),
  featured: z.boolean().default(false),
  estimatedMinutes: z.number().int().positive(),
  level: z.enum(['beginner', 'intermediate']),
  stepCount: z.number().int().positive(),
  learningOutcomes: z.array(z.string()).min(2),
  relatedProducts: z.array(z.string()).default([]),
  relatedPosts: z.array(z.string()).default([])
});

export const collections = {
  blog,
  faq,
  products: defineCollection({ type: 'data', schema: productSchema }),
  tools: defineCollection({ type: 'data', schema: toolSchema })
};

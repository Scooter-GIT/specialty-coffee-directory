import { PrismaClient } from '@prisma/client'
import { slugify } from '../src/lib/utils'

const prisma = new PrismaClient()

const seedData = [
  {
    name: "Stumptown Coffee Roasters",
    description: "Pioneering direct trade coffee roasting since 1999.",
    address: "100 SE Salmon St",
    city: "Portland",
    state: "OR",
    zipCode: "97214",
    website: "https://www.stumptowncoffee.com",
    roastingStyles: ["Light", "Medium", "Single Origin"],
    beanOrigins: ["Ethiopia", "Guatemala", "Colombia"],
    featured: true
  },
  {
    name: "Blue Bottle Coffee",
    description: "Artisanal coffee roaster focused on single-origin beans.",
    address: "300 Webster St",
    city: "Oakland",
    state: "CA",
    zipCode: "94607",
    website: "https://www.bluebottlecoffee.com",
    roastingStyles: ["Light", "Medium"],
    beanOrigins: ["Kenya", "Yemen", "Brazil"],
    featured: true
  },
  {
    name: "Counter Culture Coffee",
    description: "Sustainable coffee roasting with a focus on education.",
    address: "812 Mallard Ave",
    city: "Durham",
    state: "NC",
    zipCode: "27701",
    website: "https://www.counterculturecoffee.com",
    roastingStyles: ["Light", "Medium", "Dark"],
    beanOrigins: ["Ethiopia", "Peru", "Honduras"],
    featured: true
  }
]

async function main() {
  console.log('Start seeding...')
  
  for (const roaster of seedData) {
    const slug = slugify(roaster.name)
    await prisma.roaster.create({
      data: {
        ...roaster,
        slug
      }
    })
  }
  
  console.log('Seeding finished.')
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
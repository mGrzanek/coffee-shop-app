import { PrismaClient } from '@prisma/client';
const db = new PrismaClient();

function getProducts() {
  return [
    {
      id: 'fd105551-0f0d-4a9f-bc41-c559c8a17256',
      name: 'Colombia Supremo',
      price: 25,
      description:
        'A classic coffee with a mild body and caramel sweetness, with notes of nut and delicate acidity. 100% arabica.',
      image: 'photo_1.jpg',
      variety: 'arabica',
      origin: 'Colombia',
      flavor: false,
      available: true,
    },
    {
      id: '5f3e3b94-7e75-4b3b-8e4c-babcf1e1e643',
      name: 'Bogota Blend',
      price: 20,
      description:
        'A perfect blend for espresso with full body, deep flavour and a slightly chocolate aftertaste. Arabica 80% / Robusta 20%.',
      image: 'photo_1.jpg',
      variety: 'blend',
      origin: 'Colombia',
      flavor: false,
      available: true,
    },
    {
      id: 'a20d5d88-bc45-41e0-bba6-3ac70a70c15c',
      name: 'Uganda Morning Roast',
      price: 30,
      description:
        'Deep, intense Robusta from Central Africa. Characterized by low acidity and heavy. 100% Robusta.',
      image: 'photo_1.jpg',
      variety: 'robusta',
      origin: 'Uganda',
      flavor: false,
      available: true,
    },
    {
      id: '13c54ef4-c3c2-45d1-a679-72bcf9e03b1a',
      name: 'Brazil Santos',
      price: 25,
      description:
        'A delicate coffee with notes of cocoa and nut, a classic from the Brazilian lowlands. 100% arabica.',
      image: 'photo_1.jpg',
      variety: 'arabica',
      origin: 'Brasil',
      flavor: false,
      available: true,
    },
    {
      id: '9f3d57e1-8e36-4296-9305-4baf7e684af8',
      name: 'Guatemala Antigua',
      price: 20,
      description:
        'A dark roasted blend with an intense, earthy profile and a hint of smoke. Arabica 60% / Robusta 40%.',
      image: 'photo_1.jpg',
      variety: 'blend',
      origin: 'Gwatemalia',
      flavor: false,
      available: true,
    },
    {
      id: 'f1ad6e88-b7cf-48e0-b54e-3d7f8aa91c93',
      name: 'Coco Lush Coffee',
      price: 20,
      description:
        'A delicate coffee with a natural coconut flavor and a creamy texture. 100% Arabica.',
      image: 'photo_1.jpg',
      variety: 'arabica',
      origin: 'Brasil',
      flavor: true,
      available: true,
    },
    {
      id: 'e5f7db2a-40d2-4df8-9887-e61f4bfb5e10',
      name: 'Cherry Bloom Coffee',
      price: 20,
      description:
        'Velvety coffee with a distinctive fruity-cherry accent. 100% Arabica. ',
      image: 'photo_1.jpg',
      variety: 'arabica',
      origin: 'Colombia',
      flavor: true,
      available: true,
    },
    {
      id: '01c7599d-318b-4b9f-baf7-51f3a956a2d3',
      name: 'Ethiopia Orange Twist',
      price: 25,
      description:
        'Coffee with a natural aroma of sweet orange and a floral finish. Arabica 60% / Robusta 40%. ',
      image: 'photo_1.jpg',
      variety: 'blend',
      origin: 'Ethiopia',
      flavor: true,
      available: true,
    },
    {
      id: 'b3fcd59e-cc49-4e8a-89f7-3e6f53040476',
      name: 'Coffee Choco Dream',
      price: 30,
      description:
        'Chocolatey robusta with an earthy note. Perfect for milky coffees. 100% Robusta.',
      image: 'photo_1.jpg',
      variety: 'robusta',
      origin: 'Uganda',
      flavor: true,
      available: true,
    },
    {
      id: '4bcfa48c-61f1-4d52-92fc-f193601fc5c7',
      name: 'Nut Harmony',
      price: 20,
      description:
        'Creamy coffee with a subtle aroma of almonds and honey. Arabica 60% / Robusta 40%.',
      image: 'photo_1.jpg',
      variety: 'blend',
      origin: 'Brasil',
      flavor: true,
      available: true,
    },
  ];
}

async function seed() {
  await Promise.all(
    getProducts().map((product) => {
      return db.product.create({ data: product });
    }),
  );
}

seed();

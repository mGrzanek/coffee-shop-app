import { PrismaClient } from '@prisma/client';
import { connect } from 'http2';
const db = new PrismaClient();

function getWeights() {
  return [
    {
      id: 'f3e2c5c0-7be4-4c26-9872-c0ed73c67198',
      label: 'standard',
      value: 100,
      multiplier: 1.0,
    },
    {
      id: 'd0b5d9af-9d17-4e1a-a7aa-f4ebf5030d4f',
      label: 'medium',
      value: 200,
      multiplier: 1.9,
    },
    {
      id: 'b3982b68-cd4a-49e5-aecf-f3f73f206ad1',
      label: 'large',
      value: 300,
      multiplier: 2.8,
    },
    {
      id: '8c19b64d-e902-4b96-b8d2-1d26d17c6dcb',
      label: 'very-large',
      value: 500,
      multiplier: 4.7,
    },
    {
      id: '7fd2cc67-2ec1-4c6e-b50a-64592ae4fba0',
      label: 'max',
      value: 1000,
      multiplier: 9.5,
    },
  ];
}

function getDeliveries() {
  return [
    {
      id: '2f1a9d06-0b63-46e1-9f27-22c93f0ab19b',
      method: 'Courier Standard',
      price: 10,
      leadTime: '[1, 3]',
      icon: 'faTruck',
    },
    {
      id: 'ecbd792c-7890-4ae5-a3b4-d48b0b86d7df',
      method: 'Courier Express',
      price: 15,
      leadTime: '[1]',
      icon: 'faTruckFast',
    },
    {
      id: '7d99421b-ef59-4d37-bba9-cf7d067d9e7f',
      method: 'Postal Courier',
      price: 8,
      leadTime: '[1, 5]',
      icon: 'faEnvelopesBulk',
    },
  ];
}

function getPhotos() {
  return [
    {
      id: 'f03a4e50-dc5b-4cb7-9f4b-7288e34b7b8b',
      image: '/coffee/classic/coffee_classic.png',
    },
    {
      id: '1a9e3fcb-7a8f-44a3-b0bc-2b5d0b3847c1',
      image: '/coffee/flavor/coffee_cherry.png',
    },
    {
      id: '9f11f299-684f-4d8d-9562-449d8fbe871b',
      image: '/coffee/flavor/coffee_orange.png',
    },
    {
      id: '94c03dd8-2d56-4b86-8df2-04645ea9abdf',
      image: '/coffee/flavor/coffee_chocolate.png',
    },
    {
      id: 'c16011f7-4d7c-4e4f-9d59-1dbefbd7e057',
      image: '/coffee/flavor/coffee_coconut.png',
    },
    {
      id: 'a15f342b-bfd0-49c2-b6d2-80e6c8863731',
      image: '/coffee/flavor/coffee_almonds.png',
    },
    {
      id: '10d4c25e-ec38-4260-b3c3-9f520f4db504',
      image: '/coffee/other/coffee_other_1.png',
    },
    {
      id: '26b3157a-fd3f-4a1f-a97e-62e68d58941b',
      image: '/coffee/other/coffee_other_2.png',
    },
    {
      id: '5d9d9d0b-6e0a-4a8b-9ebc-c01d45777ae7',
      image: '/coffee/other/coffee_other_3.jpg',
    },
    {
      id: '7e9c0d93-fbcb-4591-850d-b76b8a4090a6',
      image: '/coffee/other/coffee_other_4.jpg',
    },
  ];
}

function getProducts() {
  return [
    {
      id: 'fd105551-0f0d-4a9f-bc41-c559c8a17256',
      name: 'Colombia Espresso',
      price: 15,
      description:
        'A classic coffee with a mild body and caramel sweetness, with notes of nut and delicate acidity. 100% arabica.',
      images: [
        { id: 'f03a4e50-dc5b-4cb7-9f4b-7288e34b7b8b' },
        { id: '10d4c25e-ec38-4260-b3c3-9f520f4db504' },
        { id: '26b3157a-fd3f-4a1f-a97e-62e68d58941b' },
        { id: '5d9d9d0b-6e0a-4a8b-9ebc-c01d45777ae7' },
        { id: '7e9c0d93-fbcb-4591-850d-b76b8a4090a6' },
      ],
      variety: 'arabica',
      origin: 'Colombia',
      weights: [
        { id: 'f3e2c5c0-7be4-4c26-9872-c0ed73c67198' },
        { id: '8c19b64d-e902-4b96-b8d2-1d26d17c6dcb' },
        { id: '7fd2cc67-2ec1-4c6e-b50a-64592ae4fba0' },
      ],
      flavor: false,
      available: true,
    },
    {
      id: '5f3e3b94-7e75-4b3b-8e4c-babcf1e1e643',
      name: 'Bogota Coffee Blend',
      price: 10,
      description:
        'A perfect blend for espresso with full body, deep flavour and a slightly chocolate aftertaste. Arabica 80% / Robusta 20%.',
      images: [
        { id: 'f03a4e50-dc5b-4cb7-9f4b-7288e34b7b8b' },
        { id: '10d4c25e-ec38-4260-b3c3-9f520f4db504' },
        { id: '26b3157a-fd3f-4a1f-a97e-62e68d58941b' },
        { id: '5d9d9d0b-6e0a-4a8b-9ebc-c01d45777ae7' },
        { id: '7e9c0d93-fbcb-4591-850d-b76b8a4090a6' },
      ],
      variety: 'blend',
      origin: 'Colombia',
      weights: [
        { id: 'f3e2c5c0-7be4-4c26-9872-c0ed73c67198' },
        { id: '8c19b64d-e902-4b96-b8d2-1d26d17c6dcb' },
        { id: '7fd2cc67-2ec1-4c6e-b50a-64592ae4fba0' },
      ],
      flavor: false,
      available: true,
    },
    {
      id: 'a20d5d88-bc45-41e0-bba6-3ac70a70c15c',
      name: 'Uganda Morning Roast',
      price: 20,
      description:
        'Deep, intense Robusta from Central Africa. Characterized by low acidity and heavy. 100% Robusta.',
      images: [
        { id: 'f03a4e50-dc5b-4cb7-9f4b-7288e34b7b8b' },
        { id: '10d4c25e-ec38-4260-b3c3-9f520f4db504' },
        { id: '26b3157a-fd3f-4a1f-a97e-62e68d58941b' },
        { id: '5d9d9d0b-6e0a-4a8b-9ebc-c01d45777ae7' },
        { id: '7e9c0d93-fbcb-4591-850d-b76b8a4090a6' },
      ],
      variety: 'robusta',
      origin: 'Uganda',
      weights: [
        { id: 'f3e2c5c0-7be4-4c26-9872-c0ed73c67198' },
        { id: '8c19b64d-e902-4b96-b8d2-1d26d17c6dcb' },
        { id: '7fd2cc67-2ec1-4c6e-b50a-64592ae4fba0' },
      ],
      flavor: false,
      available: true,
    },
    {
      id: '13c54ef4-c3c2-45d1-a679-72bcf9e03b1a',
      name: 'Brazil Santos Coffee',
      price: 12,
      description:
        'A delicate coffee with notes of cocoa and nut, a classic from the Brazilian lowlands. 100% arabica.',
      images: [
        { id: 'f03a4e50-dc5b-4cb7-9f4b-7288e34b7b8b' },
        { id: '10d4c25e-ec38-4260-b3c3-9f520f4db504' },
        { id: '26b3157a-fd3f-4a1f-a97e-62e68d58941b' },
        { id: '5d9d9d0b-6e0a-4a8b-9ebc-c01d45777ae7' },
        { id: '7e9c0d93-fbcb-4591-850d-b76b8a4090a6' },
      ],
      variety: 'arabica',
      origin: 'Brasil',
      weights: [
        { id: 'f3e2c5c0-7be4-4c26-9872-c0ed73c67198' },
        { id: '8c19b64d-e902-4b96-b8d2-1d26d17c6dcb' },
        { id: '7fd2cc67-2ec1-4c6e-b50a-64592ae4fba0' },
      ],
      flavor: false,
      available: true,
    },
    {
      id: '9f3d57e1-8e36-4296-9305-4baf7e684af8',
      name: 'Antigua Coffee',
      price: 10,
      description:
        'A dark roasted blend with an intense, earthy profile and a hint of smoke. Arabica 60% / Robusta 40%.',
      images: [
        { id: 'f03a4e50-dc5b-4cb7-9f4b-7288e34b7b8b' },
        { id: '10d4c25e-ec38-4260-b3c3-9f520f4db504' },
        { id: '26b3157a-fd3f-4a1f-a97e-62e68d58941b' },
        { id: '5d9d9d0b-6e0a-4a8b-9ebc-c01d45777ae7' },
        { id: '7e9c0d93-fbcb-4591-850d-b76b8a4090a6' },
      ],
      variety: 'blend',
      origin: 'Gwatemalia',
      weights: [
        { id: 'f3e2c5c0-7be4-4c26-9872-c0ed73c67198' },
        { id: '8c19b64d-e902-4b96-b8d2-1d26d17c6dcb' },
        { id: '7fd2cc67-2ec1-4c6e-b50a-64592ae4fba0' },
      ],
      flavor: false,
      available: true,
    },
    {
      id: 'f1ad6e88-b7cf-48e0-b54e-3d7f8aa91c93',
      name: 'Coco Lush Coffee',
      price: 12,
      description:
        'A delicate coffee with a natural coconut flavor and a creamy texture. 100% Arabica.',
      images: [
        { id: 'c16011f7-4d7c-4e4f-9d59-1dbefbd7e057' },
        { id: '10d4c25e-ec38-4260-b3c3-9f520f4db504' },
        { id: '26b3157a-fd3f-4a1f-a97e-62e68d58941b' },
        { id: '5d9d9d0b-6e0a-4a8b-9ebc-c01d45777ae7' },
        { id: '7e9c0d93-fbcb-4591-850d-b76b8a4090a6' },
      ],
      variety: 'arabica',
      origin: 'Brasil',
      weights: [
        { id: 'f3e2c5c0-7be4-4c26-9872-c0ed73c67198' },
        { id: 'd0b5d9af-9d17-4e1a-a7aa-f4ebf5030d4f' },
        { id: 'b3982b68-cd4a-49e5-aecf-f3f73f206ad1' },
      ],
      flavor: true,
      available: true,
    },
    {
      id: 'e5f7db2a-40d2-4df8-9887-e61f4bfb5e10',
      name: 'Cherry Bloom Coffee',
      price: 12,
      description:
        'Velvety coffee with a distinctive fruity-cherry accent. 100% Arabica. ',
      images: [
        { id: '1a9e3fcb-7a8f-44a3-b0bc-2b5d0b3847c1' },
        { id: '10d4c25e-ec38-4260-b3c3-9f520f4db504' },
        { id: '26b3157a-fd3f-4a1f-a97e-62e68d58941b' },
        { id: '5d9d9d0b-6e0a-4a8b-9ebc-c01d45777ae7' },
        { id: '7e9c0d93-fbcb-4591-850d-b76b8a4090a6' },
      ],
      variety: 'arabica',
      origin: 'Colombia',
      flavor: true,
      weights: [
        { id: 'f3e2c5c0-7be4-4c26-9872-c0ed73c67198' },
        { id: 'd0b5d9af-9d17-4e1a-a7aa-f4ebf5030d4f' },
        { id: 'b3982b68-cd4a-49e5-aecf-f3f73f206ad1' },
      ],
      available: true,
    },
    {
      id: '01c7599d-318b-4b9f-baf7-51f3a956a2d3',
      name: 'Orange Coffee Twist',
      price: 12,
      description:
        'Coffee with a natural aroma of sweet orange and a floral finish. Arabica 60% / Robusta 40%. ',
      images: [
        { id: '9f11f299-684f-4d8d-9562-449d8fbe871b' },
        { id: '10d4c25e-ec38-4260-b3c3-9f520f4db504' },
        { id: '26b3157a-fd3f-4a1f-a97e-62e68d58941b' },
        { id: '5d9d9d0b-6e0a-4a8b-9ebc-c01d45777ae7' },
        { id: '7e9c0d93-fbcb-4591-850d-b76b8a4090a6' },
      ],
      variety: 'blend',
      origin: 'Ethiopia',
      weights: [
        { id: 'f3e2c5c0-7be4-4c26-9872-c0ed73c67198' },
        { id: 'd0b5d9af-9d17-4e1a-a7aa-f4ebf5030d4f' },
        { id: 'b3982b68-cd4a-49e5-aecf-f3f73f206ad1' },
      ],
      flavor: true,
      available: true,
    },
    {
      id: 'b3fcd59e-cc49-4e8a-89f7-3e6f53040476',
      name: 'Coffee Choco Dream',
      price: 10,
      description:
        'Chocolate robusta with an earthy note. Perfect for milky coffees. 100% Robusta.',
      images: [
        { id: '94c03dd8-2d56-4b86-8df2-04645ea9abdf' },
        { id: '10d4c25e-ec38-4260-b3c3-9f520f4db504' },
        { id: '26b3157a-fd3f-4a1f-a97e-62e68d58941b' },
        { id: '5d9d9d0b-6e0a-4a8b-9ebc-c01d45777ae7' },
        { id: '7e9c0d93-fbcb-4591-850d-b76b8a4090a6' },
      ],
      variety: 'robusta',
      origin: 'Uganda',
      weights: [
        { id: 'f3e2c5c0-7be4-4c26-9872-c0ed73c67198' },
        { id: 'd0b5d9af-9d17-4e1a-a7aa-f4ebf5030d4f' },
        { id: 'b3982b68-cd4a-49e5-aecf-f3f73f206ad1' },
      ],
      flavor: true,
      available: true,
    },
    {
      id: '4bcfa48c-61f1-4d52-92fc-f193601fc5c7',
      name: 'Nut Coffee Harmony',
      price: 15,
      description:
        'Creamy coffee with a subtle aroma of almonds and honey. Arabica 60% / Robusta 40%.',
      images: [
        { id: 'a15f342b-bfd0-49c2-b6d2-80e6c8863731' },
        { id: '10d4c25e-ec38-4260-b3c3-9f520f4db504' },
        { id: '26b3157a-fd3f-4a1f-a97e-62e68d58941b' },
        { id: '5d9d9d0b-6e0a-4a8b-9ebc-c01d45777ae7' },
        { id: '7e9c0d93-fbcb-4591-850d-b76b8a4090a6' },
      ],
      variety: 'blend',
      origin: 'Brasil',
      weights: [
        { id: 'f3e2c5c0-7be4-4c26-9872-c0ed73c67198' },
        { id: 'd0b5d9af-9d17-4e1a-a7aa-f4ebf5030d4f' },
        { id: 'b3982b68-cd4a-49e5-aecf-f3f73f206ad1' },
      ],
      flavor: true,
      available: true,
    },
  ];
}

async function seed() {
  await Promise.all([
    ...getWeights().map((weight) => {
      return db.weight.create({ data: weight });
    }),
    ...getDeliveries().map((delivery) => {
      return db.delivery.create({ data: delivery });
    }),
    ...getPhotos().map((photo) => {
      return db.photo.create({ data: photo });
    }),
  ]);

  await Promise.all(
    getProducts().map((product) => {
      const { weights, images, ...otherData } = product;
      return db.product.create({
        data: {
          ...otherData,
          weights: {
            connect: weights.map((weight) => ({ id: weight.id })),
          },
          images: {
            connect: images.map((image) => ({ id: image.id })),
          },
        },
      });
    }),
  );
}

seed();

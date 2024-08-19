import request from 'supertest'
import {} from '@src/App' // Substitua pelo caminho correto do seu arquivo principal do Express
import { mongoClient } from '../db'; // Substitua pelo caminho correto do seu cliente MongoDB

describe('GET /search', () => {
  beforeAll(async () => {
    await mongoClient.connect()
  })

  afterAll(async () => {
    await mongoClient.close()
  })

  it('should return 200 and an array of products for valid product IDs', async () => {
    const validProductIds = ['60a7c0f7a3a6a3e034f6d999', '60a7c0f7a3a6a3e034f6d888'];

    const response = await request(app)
      .get('/search')
      .query({ productId: validProductIds })
      .expect(200);

    expect(Array.isArray(response.body)).toBeTruthy();
    expect(response.body.length).toBeGreaterThan(0);
    response.body.forEach((product: any) => {
      expect(product).toHaveProperty('_id');
      expect(product).toHaveProperty('name');
      // Adicione mais verificações conforme necessário
    });
  });

  it('should return 400 if no product IDs are provided', async () => {
    const response = await request(app)
      .get('/search')
      .expect(400);

    expect(response.body).toHaveProperty('error');
    expect(response.body.error).toBe('Product IDs are required');
  });

  it('should return 500 if an invalid product ID is provided', async () => {
    const invalidProductIds = ['invalid-id'];

    const response = await request(app)
      .get('/search')
      .query({ productId: invalidProductIds })
      .expect(500);

    expect(response.body).toHaveProperty('error');
    expect(response.body.error).toContain('Invalid ID format');
  });

  it('should return 500 if no products are found for valid IDs', async () => {
    const nonExistentProductIds = ['60a7c0f7a3a6a3e034f6d999']; // IDs que não existem no banco

    const response = await request(app)
      .get('/search')
      .query({ productId: nonExistentProductIds })
      .expect(500);

    expect(response.body).toHaveProperty('error');
    expect(response.body.error).toBe('No products found for the provided IDs.');
  });
});

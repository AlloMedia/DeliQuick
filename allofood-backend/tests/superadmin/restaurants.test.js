const request = require('supertest');
const app = require('../../app'); // Ensure the correct path to your app file
const Restaurant = require('../../models/Restaurant'); // Path to your Restaurant model
const mongoose = require('mongoose');

// Mock restaurant data
const sampleRestaurantId = new mongoose.Types.ObjectId().toString();

describe('DELETE /api/superadmin/restaurants/:restaurantId', () => {
  let token;

  // Assuming you have a helper function or method to get a valid superadmin token
  beforeAll(async () => {
    token = await getSuperAdminToken(); // Replace with actual implementation
  });

  beforeEach(async () => {
    // Create a sample restaurant in the database if needed
    await Restaurant.create({
      _id: sampleRestaurantId,
      name: 'Sample Restaurant',
      address: '123 Test St',
      phoneNumber: '123-456-7890',
    });
  });

  afterEach(async () => {
    await Restaurant.findByIdAndDelete(sampleRestaurantId);
  });

  it('should delete a restaurant and return a success message', async () => {
    const response = await request(app)
      .delete(`/api/superadmin/restaurants/${sampleRestaurantId}`)
      .set('Authorization', `Bearer ${token}`) // Add authorization header
      .expect(200);

    expect(response.body.message).toBe('Restaurant deleted successfully');

    // Verify the restaurant has been deleted from the database
    const deletedRestaurant = await Restaurant.findById(sampleRestaurantId);
    expect(deletedRestaurant).toBeNull();
  });

  it('should return 404 if the restaurant does not exist', async () => {
    const nonExistentId = new mongoose.Types.ObjectId();

    const response = await request(app)
      .delete(`/api/superadmin/restaurants/${nonExistentId}`)
      .set('Authorization', `Bearer ${token}`) // Add authorization header
      .expect(404);

    expect(response.body.message).toBe('Restaurant not found');
  });

  it('should return 403 if the user is not authorized', async () => {
    const response = await request(app)
      .delete(`/api/superadmin/restaurants/${sampleRestaurantId}`)
      .expect(403);

    expect(response.body.message).toBe('Unauthorized access');
  });
});

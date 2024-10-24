const Order = require('../../models/orderModel');
const { getAllOrders, getAllRequests, updateOrderStatus } = require('../../controllers/delivery/OrderController');

// Mock the Order model
jest.mock('../../models/orderModel');

describe('OrderController', () => {
  let mockRequest;
  let mockResponse;

  beforeEach(() => {
    // Reset all mocks before each test
    jest.clearAllMocks();

    // Setup mock request and response
    mockRequest = {
      query: {},
      params: {},
      body: {}
    };

    mockResponse = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn()
    };
  });

  describe('getAllRequests', () => {
    test('should return 400 if deliveryId is missing', async () => {
      await getAllRequests(mockRequest, mockResponse);

      expect(mockResponse.status).toHaveBeenCalledWith(400);
      expect(mockResponse.json).toHaveBeenCalledWith({
        message: 'Delivery ID is required'
      });
    });

    test('should return orders successfully', async () => {
      const mockOrders = [
        { id: 1, status: 'Ready' },
        { id: 2, status: 'Ready' }
      ];

      mockRequest.query.deliveryId = 'delivery123';

      const mockFind = jest.fn().mockReturnThis();
      const mockPopulate = jest.fn().mockReturnThis();
      const mockSort = jest.fn().mockResolvedValue(mockOrders);

      Order.find = mockFind;
      Order.find().populate = mockPopulate;
      Order.find().populate().populate = mockPopulate;
      Order.find().populate().populate().sort = mockSort;

      await getAllRequests(mockRequest, mockResponse);

      expect(mockFind).toHaveBeenCalledWith({
        status: 'Ready',
        notifiedDeliveryPeople: { $in: ['delivery123'] }
      });
      expect(mockResponse.status).toHaveBeenCalledWith(200);
      expect(mockResponse.json).toHaveBeenCalledWith(mockOrders);
    });

    test('should handle errors', async () => {
      mockRequest.query.deliveryId = 'delivery123';
      Order.find.mockImplementation(() => {
        throw new Error('Database error');
      });

      await getAllRequests(mockRequest, mockResponse);

      expect(mockResponse.status).toHaveBeenCalledWith(500);
      expect(mockResponse.json).toHaveBeenCalledWith({
        message: 'Error fetching orders',
        error: expect.any(Error)
      });
    });
  });

  describe('getAllOrders', () => {
    test('should return 400 if deliveryId is missing', async () => {
      await getAllOrders(mockRequest, mockResponse);

      expect(mockResponse.status).toHaveBeenCalledWith(400);
      expect(mockResponse.json).toHaveBeenCalledWith({
        message: 'Delivery ID is required'
      });
    });

    test('should return orders successfully', async () => {
      const mockOrders = [
        { id: 1, deliveryPerson: 'delivery123' },
        { id: 2, deliveryPerson: 'delivery123' }
      ];

      mockRequest.query.deliveryId = 'delivery123';

      const mockFind = jest.fn().mockReturnThis();
      const mockPopulate = jest.fn().mockReturnThis();
      const mockSort = jest.fn().mockResolvedValue(mockOrders);

      Order.find = mockFind;
      Order.find().populate = mockPopulate;
      Order.find().populate().populate = mockPopulate;
      Order.find().populate().populate().sort = mockSort;

      await getAllOrders(mockRequest, mockResponse);

      expect(mockFind).toHaveBeenCalledWith({
        deliveryPerson: 'delivery123'
      });
      expect(mockResponse.status).toHaveBeenCalledWith(200);
      expect(mockResponse.json).toHaveBeenCalledWith(mockOrders);
    });

    test('should handle errors', async () => {
      mockRequest.query.deliveryId = 'delivery123';
      Order.find.mockImplementation(() => {
        throw new Error('Database error');
      });

      await getAllOrders(mockRequest, mockResponse);

      expect(mockResponse.status).toHaveBeenCalledWith(500);
      expect(mockResponse.json).toHaveBeenCalledWith({
        message: 'Error fetching orders',
        error: 'Database error'
      });
    });
  });

  describe('updateOrderStatus', () => {
    test('should return 404 if order not found', async () => {
      mockRequest.params.id = 'order123';
      mockRequest.body.status = 'Delivered';
      
      Order.findById.mockResolvedValue(null);

      await updateOrderStatus(mockRequest, mockResponse);

      expect(mockResponse.status).toHaveBeenCalledWith(404);
      expect(mockResponse.json).toHaveBeenCalledWith({
        message: 'Order not found'
      });
    });

    test('should update order status successfully', async () => {
      const mockOrder = {
        id: 'order123',
        status: 'Ready',
        save: jest.fn().mockResolvedValue(true)
      };

      mockRequest.params.id = 'order123';
      mockRequest.body.status = 'Delivered';

      Order.findById.mockResolvedValue(mockOrder);

      await updateOrderStatus(mockRequest, mockResponse);

      expect(mockOrder.status).toBe('Delivered');
      expect(mockOrder.save).toHaveBeenCalled();
      expect(mockResponse.status).toHaveBeenCalledWith(200);
      expect(mockResponse.json).toHaveBeenCalledWith({
        message: 'Order status updated successfully',
        order: mockOrder
      });
    });

    test('should handle errors', async () => {
      mockRequest.params.id = 'order123';
      mockRequest.body.status = 'Delivered';

      Order.findById.mockImplementation(() => {
        throw new Error('Database error');
      });

      await updateOrderStatus(mockRequest, mockResponse);

      expect(mockResponse.status).toHaveBeenCalledWith(500);
      expect(mockResponse.json).toHaveBeenCalledWith({
        message: 'Error updating order status',
        error: expect.any(Error)
      });
    });
  });
});
const mongoose = require('mongoose');
const Order = require("../../models/orderModel");
const User = require("../../models/userModel");
const Role = require("../../models/roleModel");
const { mailDelivery } = require("../../helpers/mailDelivery");
const { notifyDelivery, acceptDelivery } = require("../../controllers/delivery/DeliveryController");

// Mock the dependencies
jest.mock("../../models/orderModel");
jest.mock("../../models/userModel");
jest.mock("../../models/roleModel");
jest.mock("../../helpers/mailDelivery");

describe('Delivery Controller', () => {
  let mockOrder;
  let mockDeliveryRole;
  let mockDeliveryPeople;
  
  beforeEach(() => {
    // Reset all mocks before each test
    jest.clearAllMocks();
    
    // Setup common mock data
    mockOrder = {
      _id: new mongoose.Types.ObjectId(),
      status: 'Ready',
      notifiedDeliveryPeople: [],
      save: jest.fn().mockResolvedValue(true)
    };

    mockDeliveryRole = {
      _id: new mongoose.Types.ObjectId(),
      name: 'delivery'
    };

    mockDeliveryPeople = [
      {
        _id: new mongoose.Types.ObjectId(),
        email: 'delivery1@test.com',
        isAvailable: true
      },
      {
        _id: new mongoose.Types.ObjectId(),
        email: 'delivery2@test.com',
        isAvailable: true
      }
    ];

    // Mock console.error to suppress error output in tests
    jest.spyOn(console, 'error').mockImplementation(() => {});
  });

  afterEach(() => {
    // Restore console.error after each test
    console.error.mockRestore();
  });

  describe('notifyDelivery', () => {
    it('should successfully notify available delivery people', async () => {
      // Setup mocks
      Order.findById = jest.fn().mockResolvedValue(mockOrder);
      Role.findOne = jest.fn().mockResolvedValue(mockDeliveryRole);
      User.find = jest.fn().mockReturnValue({
        limit: jest.fn().mockResolvedValue(mockDeliveryPeople)
      });
      mailDelivery.mockResolvedValue(true);

      // Execute
      const result = await notifyDelivery(mockOrder._id);

      // Assert
      expect(Order.findById).toHaveBeenCalledWith(mockOrder._id);
      expect(Role.findOne).toHaveBeenCalledWith({ name: 'delivery' });
      expect(User.find).toHaveBeenCalledWith({
        role: mockDeliveryRole._id,
        isAvailable: true
      });
      expect(mailDelivery).toHaveBeenCalledTimes(mockDeliveryPeople.length);
      expect(mockOrder.save).toHaveBeenCalled();
      expect(result).toEqual(mockDeliveryPeople);
    });

    it('should throw error if order is not found', async () => {
      Order.findById = jest.fn().mockResolvedValue(null);

      await expect(notifyDelivery(mockOrder._id))
        .rejects
        .toThrow('Order not found or not ready for delivery');
    });

    it('should throw error if order status is not Ready', async () => {
      mockOrder.status = 'Pending';
      Order.findById = jest.fn().mockResolvedValue(mockOrder);

      await expect(notifyDelivery(mockOrder._id))
        .rejects
        .toThrow('Order not found or not ready for delivery');
    });

    it('should throw error if delivery role is not found', async () => {
      Order.findById = jest.fn().mockResolvedValue(mockOrder);
      Role.findOne = jest.fn().mockResolvedValue(null);

      await expect(notifyDelivery(mockOrder._id))
        .rejects
        .toThrow('Delivery role not found');
    });
  });

  describe('acceptDelivery', () => {
    let mockReq;
    let mockRes;
    
    beforeEach(() => {
      mockReq = {
        body: {
          orderId: mockOrder._id,
          deliveryId: mockDeliveryPeople[0]._id
        }
      };
      
      mockRes = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn()
      };
      
      mockOrder.notifiedDeliveryPeople = [mockDeliveryPeople[0]._id];
    });

    it('should successfully accept delivery', async () => {
      // Setup
      Order.findById = jest.fn().mockResolvedValue(mockOrder);
      User.findByIdAndUpdate = jest.fn().mockResolvedValue(true);

      // Execute
      await acceptDelivery(mockReq, mockRes);

      // Assert
      expect(Order.findById).toHaveBeenCalledWith(mockReq.body.orderId);
      expect(mockOrder.save).toHaveBeenCalled();
      expect(User.findByIdAndUpdate).toHaveBeenCalledWith(
        mockReq.body.deliveryId,
        { isAvailable: false }
      );
      expect(mockRes.status).toHaveBeenCalledWith(200);
      expect(mockRes.json).toHaveBeenCalledWith({
        message: 'Delivery accepted successfully',
        order: mockOrder
      });
      expect(mockOrder.status).toBe('Assigned');
      expect(mockOrder.deliveryPerson).toBe(mockReq.body.deliveryId);
      expect(mockOrder.notifiedDeliveryPeople).toEqual([]);
    });

    it('should return 400 if order is not found', async () => {
      Order.findById = jest.fn().mockResolvedValue(null);

      await acceptDelivery(mockReq, mockRes);

      expect(mockRes.status).toHaveBeenCalledWith(400);
      expect(mockRes.json).toHaveBeenCalledWith({
        error: 'Order not available for acceptance'
      });
    });

    it('should return 400 if order status is not Ready', async () => {
      mockOrder.status = 'Pending';
      Order.findById = jest.fn().mockResolvedValue(mockOrder);

      await acceptDelivery(mockReq, mockRes);

      expect(mockRes.status).toHaveBeenCalledWith(400);
      expect(mockRes.json).toHaveBeenCalledWith({
        error: 'Order not available for acceptance'
      });
    });

    it('should return 403 if delivery person was not notified', async () => {
      mockOrder.notifiedDeliveryPeople = [new mongoose.Types.ObjectId()];
      Order.findById = jest.fn().mockResolvedValue(mockOrder);

      await acceptDelivery(mockReq, mockRes);

      expect(mockRes.status).toHaveBeenCalledWith(403);
      expect(mockRes.json).toHaveBeenCalledWith({
        error: 'You were not notified about this order'
      });
    });

    it('should return 500 if an error occurs', async () => {
      Order.findById = jest.fn().mockRejectedValue(new Error('Database error'));

      await acceptDelivery(mockReq, mockRes);

      expect(mockRes.status).toHaveBeenCalledWith(500);
      expect(mockRes.json).toHaveBeenCalledWith({
        error: 'Something went wrong'
      });
    });
  });
});
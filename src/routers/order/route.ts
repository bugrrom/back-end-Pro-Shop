import { Response, Request } from 'express';
import { Orders } from '../../controllers';

export const addOrderItems = async (req: Request, res: Response) => {
  const {
    orderItems,
    shippingAddress,
    paymentMethod,
    itemsPrice,
    taxPrice,
    shippingPrice,
    totalPrice,
  } = req.body;
  if (orderItems && orderItems.length === 0) {
    res.status(401).json({ message: 'No order items' });
  } else {
    const newOrder = new Orders({
      orderItems,
      // @ts-ignore
      user: req.user._id,
      shippingAddress,
      paymentMethod,
      itemsPrice,
      taxPrice,
      shippingPrice,
      totalPrice,
    });
    try {
      const createOrder = await newOrder.addNewOrder();
      if (createOrder.message) {
        res.status(createOrder.status).json({ message: createOrder.message });
      }
      res.status(201).json(createOrder);
    } catch (e) {
      res.status(401).json({ message: e.message });
    }
  }
};

export const getOrder = async (req: Request, res: Response) => {
  try {
    const order = await new Orders(req.params.id).getOrderById();
    if (order.message) {
      res.status(404).json({ message: 'Order not found' });
    } else {
      res.status(200).json(order);
    }
  } catch (e) {
    res.status(404).json({ message: e.message });
  }
};

export const getAllOrder = async (req: Request, res: Response) => {
  try {
    // @ts-ignore
    const orderAll = await new Orders(req.user._id).getAllOrder();
    if (orderAll.message) {
      res.status(404).json({ message: 'Order not found' });
    } else {
      res.status(200).json(orderAll);
    }
  } catch (e) {
    res.status(404).json({ message: e.message });
  }
};

export const getAdminAllOrder = async (req: Request, res: Response) => {
  try {
    const orderAll = await new Orders().getAdminAllOrder();
    if (orderAll.message) {
      res.status(404).json({ message: 'Order ' });
    }
    res.status(200).json(orderAll);
  } catch (e) {
    res.status(404).json({ message: e.message });
  }
};

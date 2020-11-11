import dg from 'debug';
import { Request, Response } from 'express';
import { Products } from '../../controllers';

const debug = dg('router:product');

export const getProducts = async (req: Request, res: Response) => {
  debug(`${req.method} - ${req.originalUrl}`);

  try {
    const products = new Products();
    const data = await products.getAllProducts();
    if (data.status) {
      res.status(data.status).json({ message: data.message });
    }
    res.status(200).json(data);
  } catch (e) {
    res.status(400);
  }
};

export const getProduct = async (req: Request, res: Response) => {
  debug(`${req.method} - ${req.originalUrl}`);

  try {
    const products = new Products(req.params.id);
    const data = await products.getProductsById();
    if (data.status) {
      res.status(data.status).json({ message: data.message });
    }
    res.status(200).json(data);
  } catch (e) {
    res.status(400);
  }
};

export const updateProduct = (req: Request, res: Response) => {
  debug(`${req.method} - ${req.originalUrl}`);

  try {
    const product = new Products(req.body).updateProduct();
    // @ts-ignore
    if (product.message) {
      // @ts-ignore
      res.status(product.status).json({ message: product.message });
    }
    res.status(200).json({ message: 'Update product', product });
  } catch (e) {
    res.status(400).json({ message: e.message });
  }
};

export const removeProduct = (req: Request, res: Response) => {
  debug(`${req.method} - ${req.originalUrl}`);

  try {
    const product = new Products(req.body.id).removeProduct();
    // @ts-ignore
    if (product.message) {
      // @ts-ignore
      res.status(product.status).json({ message: 'Not users' });
    }
    res.status(200).json({ message: 'Product remove' });
  } catch (e) {
    res.status(400).json({ message: e.message });
  }
};

export const createProduct = async (req: Request, res: Response) => {
  debug(`${req.method} - ${req.originalUrl}`);

  try {
    const newProduct = {
      ...req.body,
      // @ts-ignore
      user: req.user._id,
    };
    const product = await new Products(newProduct).createProduct();
    if (product.message) {
      res.status(product.status).json({ message: 'Not users' });
    }
    res.status(200).json({ message: product });
  } catch (e) {
    res.status(400).json({ message: e.message });
  }
};

import express from 'express';
import asyncHandler from 'express-async-handler';
import { ProductModel } from '../models/productModel';

export const productRouter = express.Router();

productRouter.get(
  '/',
  asyncHandler(async (req, res) => {
    const products = await ProductModel.find();
    res.json(products);
  })
);

productRouter.get(
  '/slug/:slug',
  asyncHandler(async (req, res) => {
    const product = await ProductModel.find({ slug: req.params.slug });
    if (product) {
      res.json(product);
    } else {
      res.status(400).json({ message: 'Product not found' });
    }
  })
);

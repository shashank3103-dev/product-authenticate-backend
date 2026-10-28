import { Request, Response } from 'express';

// Admin product controller scaffolds — implement business logic in services/repositories
export const createProduct = async (req: Request, res: Response) => {
  // TODO: validate body with Zod, generate token, store hashed token, etc.
  res.status(501).json({ error: 'Not implemented: create product' });
};

export const listProducts = async (_req: Request, res: Response) => {
  res.status(501).json({ error: 'Not implemented: list products' });
};

export const getProduct = async (_req: Request, res: Response) => {
  res.status(501).json({ error: 'Not implemented: get product' });
};

export const updateProduct = async (_req: Request, res: Response) => {
  res.status(501).json({ error: 'Not implemented: update product' });
};

export const deleteProduct = async (_req: Request, res: Response) => {
  res.status(501).json({ error: 'Not implemented: delete product' });
};

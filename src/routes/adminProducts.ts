import { Router } from 'express';
import {
  createProduct,
  listProducts,
  getProduct,
  updateProduct,
  deleteProduct,
} from '../controllers/adminProductController';
import { adminAuth } from '../middlewares';

const router = Router();

// All admin product routes require adminAuth middleware
router.use(adminAuth);

router.post('/', async (req, res, next) => {
  try {
    await createProduct(req, res);
  } catch (err) {
    next(err);
  }
});

router.get('/', async (req, res, next) => {
  try {
    await listProducts(req, res);
  } catch (err) {
    next(err);
  }
});

router.get('/:id', async (req, res, next) => {
  try {
    await getProduct(req, res);
  } catch (err) {
    next(err);
  }
});

router.put('/:id', async (req, res, next) => {
  try {
    await updateProduct(req, res);
  } catch (err) {
    next(err);
  }
});

router.delete('/:id', async (req, res, next) => {
  try {
    await deleteProduct(req, res);
  } catch (err) {
    next(err);
  }
});

export default router;

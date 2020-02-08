import express from 'express';
import fruitsController from './controller';

const router = express.Router();
const {
  findAllFruits,
  findFruit,
  addNewFruit,
  updateFruit,
  removeFruit,
} = fruitsController;

router.get('/', findAllFruits)
router.post('/', addNewFruit);
router.get('/:id', findFruit);
router.put('/:id', updateFruit);
router.delete('/:id', removeFruit);

export default router;

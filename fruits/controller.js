import Fruit from './model';


const notFound = res => res.status(404).json({ error: 'Fruit not found. Please check the id and try again.' });

const findAllFruits = async (req, res, next) => {
  try {
    const fruits = await Fruit.findAll();
    return res.status(200).json(fruits);
  } catch (err) {
    console.log(err.message);
    return next("Internal server error.");
  }
};

const findFruit = async (req, res, next) => {
  try {
    const fruit = await Fruit.findById(req.params.id);
    if (fruit) {
      return res.status(200).json({ fruit });
    } else {
      return notFound(res);
    }
  } catch (err) {
    console.log(err.message);
    next("Failed to get. Internal server error");
  }

};

const addNewFruit = async (req, res, next) => {
  try {
    const ids = await Fruit.add(req.body);
    const createdFruit = await Fruit.findById(ids[0]);
    res.status(200).json({ newFruit: createdFruit });
  } catch (err) {
    if (err.code && err.code === 'SQLITE_CONSTRAINT') {
      return res.status(400).json({
        error: `${req.body.name} has already been added. Duplicate fruit is not allowoed.`
      })
    }
    console(err.message);
    next("Failed to create new fruit.");
  }
};

const updateFruit = async (req, res, next) => {
  const { id } = req.params;
  const changes = req.body;
  try {
    const result = await Fruit.update(id, changes);
    if (result > 0) {
      res.status(200).json({
        message: 'update successful'
      });
    } else {
      return notFound(res);
    }
  } catch (error) {
    console.log(error.message);
    next("Internal server error. Failed to update fruit.")
  }
};

const removeFruit = async (req, res, next) => {
  let count = 0;
  try {
    count = await Fruit.remove(req.params.id);
  } catch (err) {
    console.log(err.message);
    return next("Failed to delete. Internall server error.");
  }
  if (count > 0) {
    res.status(200).json({ message: 'Record successfully deleted' });
  } else {
    notFound(res);
  }
};

const FruitsController = {
  findAllFruits,
  findFruit,
  addNewFruit,
  updateFruit,
  removeFruit,
};

export default FruitsController;

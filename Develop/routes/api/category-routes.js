const router = require('express').Router();
const { Category, Product } = require('../../models');

// The `/api/categories` endpoint

router.get('/', async (req, res) => {
  // find all categories. Is CategoryData correct?
  // be sure to include its associated Products
 try {
  const categoryData = await  Category.findAll({
    include: [{ model: Product }]
  });
  res.status(200).json(categoryData);
} catch (err) {
  res.status(500).json(err);
}
});

router.get('/:id', async (req, res) => {
  try {
    const CategoryData = await Category.findByPk(req.params.id, {
      include: [{ model: Product}],
  // find one category by its `id` value
  // be sure to include its associated Products
  });
  if (!CategoryData) {
    res.status(404).json({ message: 'No Category found with that id!' });
    return;
  }

  res.status(200).json(CategoryData);
} catch (err) {
  res.status(500).json(err);
}
});

router.post('/', (req, res) => {
  // create a new category
  Category.create(req.body)
  .then((newCategory) => {
    res.json(newCategory);
  })
  .catch((err) => {
    res.json(err);
  });
});

router.put('/:id', (req, res) => {
  // update a category by its `id` value
  Category.update(
    {
      category_name:req.body.category_name,
    },
    {
      where: {
    id: req.params.id,
    },
  }
)
  .then((updatedCategory) => {
    res.json(updatedCategory);
  })
  .catch((err) => {
    console.log(err);
    res.json(err);
  });
});  


router.delete('/:id', (req, res) => {
  // delete a category by its `id` value
  Category.destroy({
    where: {
      id: req.params.id,
    },
  })
    .then((deletedCategory) => {
      console.log(deletedCategory)
      if(!deletedCategory){
        res.json({message: "No category with that ID, failed to delete!"})
      }
      res.json(deletedCategory);
    })
    .catch((err) => res.json(err));
});

module.exports = router;

// import models
const Product = require('./Product');
const Category = require('./Category');
const Tag = require('./Tag');
const ProductTag = require('./ProductTag');

// Products belongsTo Category
Product.belongsTo(Category, {
  foreignKey: 'Category_id',
  onDelete: 'CASCADE',
});
// Categories have many Products
Category.hasMany(Product, {
  foreignKey: 'Category_id',
  onDelete: 'CASCADE',
});

// Products belongToMany Tags (through ProductTag)
Product.belongsToMany(Tag, {
  through: {
    model: ProductTag,
    unique: true //do I even need this line?
  },
  // Define an alias for when data is retrieved. Do I need this Line?
  as: 'Product_Tag'
});
// Tags belongToMany Products (through ProductTag)
Tag.belongsToMany(Product, {
  through: {
    model: ProductTag,
    unique: true //do I even need this line?
  },
  // Define an alias for when data is retrieved. Do I need this Line?
  as: 'Product_Tag'
});

module.exports = {
  Product,
  Category,
  Tag,
  ProductTag,
};

module.exports = (sequelize, DataTypes) => {
  const Product = sequelize.define('Product', {
    name: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    description: {
        type: DataTypes.TEXT,
    },
    techPrice: {
        type: DataTypes.DECIMAL,
        allowNull: false,
    },
    retailPrice: {
        type: DataTypes.DECIMAL,
        allowNull: false
    },
    ourCost: {
        type: DataTypes.DECIMAL,
        allowNull: false
    },
    supplier: {
        type: DataTypes.STRING,
        allowNull: false
    },
    sku: {
        type: DataTypes.STRING,
        allowNull: false
    },
  });
  return Product;
}
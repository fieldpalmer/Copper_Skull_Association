// module.exports = function(sequelize, DataTypes) {
//   const Vehicle = sequelize.define('Vehicle', {
//     make: {
//       type: DataTypes.STRING,
//       allowNull: false
//     },
//     model: {
//       type: DataTypes.STRING,
//       allowNull: false
//     },
//     year: {
//       type: DataTypes.INTEGER,
//       allowNull: false,
//       validate: {
//         len: [4, 4]
//       }
//     }
//   });

//   Vehicle.associate = function(models) {
//     Vehicle.belongsTo(models.User, {
//       foreignKey: {
//         allowNull: false
//       }
//     });
//   };

//   return Vehicle;
// };
// module.exports = function(sequelize, DataTypes) {
//   const Review = sequelize.define('Review', {
//     rating: {
//       type: DataTypes.INTEGER,
//       allowNull: false,
//       validate: {
//         isNumeric: true,
//         min: 1,
//         max: 5
//       }
//     },
//     reviewText: {
//       type: DataTypes.TEXT
//     }
//   });

//   Review.associate = function(models) {
//     Review.belongsTo(models.User, {
//       as: 'userId',
//       foreignKey: 'userIdFk'
//     });

//     Review.belongsTo(models.User, {
//       as: 'techId',
//       foreignKey: 'techIdFk'
//     });
//   };

//   return Review;
// };
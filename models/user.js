module.exports = function(sequelize, DataTypes) {
  const User = sequelize.define('User', {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [1]
      }
    },
    location: {
      type: DataTypes.STRING,
      validate: {
        len: [1]
      }
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [1],
        isEmail: true
      }
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false
    },
    phone: {
      type: DataTypes.STRING,
      validate: {
        isNumeric: true
      }
    },
    correspondence: {
      type: DataTypes.TEXT
    },
    role: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: 'User'
    }
  });

  User.associate = function(models) {
    User.hasOne(models.Technician, {
      onDelete: 'cascade'
    });

    User.hasMany(models.Order, {
      onDelete: 'cascade'
    });

  //   User.hasMany(models.Review, {
  //     onDelete: 'cascade'
  //   });

  //   User.hasMany(models.Certification, {
  //     onDelete: 'cascade'
  //   });

    // User.hasMany(models.Vehicle, {
    //   onDelete: 'cascade'
    // });
  };

  return User;
};
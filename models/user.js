var bcrypt = require("bcrypt-nodejs");

module.exports = function(sequelize, DataTypes) {
  const User = sequelize.define('User', {
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        isEmail: true
      }
    },
    // The password cannot be null
    password: {
      type: DataTypes.STRING,
      allowNull: false
    },
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
      as: 'technician',
      foreignKey: 'technician_id'
    });
    User.hasMany(models.Order, {
      as: 'customer',
      foreignKey: 'customer_id'
    });

    User.hasMany(models.Review, {
      as: 'customerAuthor',
      foreignKey: 'customer_id',
      onDelete: 'cascade'
    });
    User.hasMany(models.Review, {
      as: 'technicianReviewed',
      foreignKey: 'technician_id',
      onDelete: 'cascade'
    });

    // User.hasMany(models.Certification, {
    //   onDelete: 'cascade'
    // });

    User.hasMany(models.Vehicle, {
      onDelete: 'cascade'
    });
  };

  User.prototype.validPassword = function(password) {
    return bcrypt.compareSync(password, this.password);
  };
  // Hooks are automatic methods that run during various phases of the User Model lifecycle
  // In this case, before a User is created, we will automatically hash their password
  User.hook("beforeCreate", function(user) {
    user.password = bcrypt.hashSync(user.password, bcrypt.genSaltSync(10), null);
  });

  //Re adding the information to be returned with user authentication without password showing
  User.prototype.toJSON = function() {
    return {
      id: this.id,
      email: this.email,
      name: this.name,
      location: this.location,
      phone: this.phone,
      correspondence: this.correspondence,
      role: this.role
    }
  }

  return User;
};
import { DataTypes, Model } from 'sequelize';
import { sequelize } from '../config/database';
import { LoanApplication } from './LoanApplication';
import { UserRole } from '../constants/enums';

interface UserAttributes {
  id?: number;
  email: string;
  password: string;
  username: string;
  role: UserRole;
  createdAt?: Date;
  updatedAt?: Date;
}


class userModel extends Model<UserAttributes> implements UserAttributes {
  public id!: number;
  public email!: string;
  public password!: string;
  public role!: UserRole;
  public username!: string;
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

userModel.init({
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  email: {
    type: DataTypes.STRING(255),
    allowNull: false,
    unique: true,
    validate: {
      isEmail: true
    }
  },
  password: {
    type: DataTypes.STRING(255),
    allowNull: false
  },
  username: {
    type: DataTypes.STRING(255),
    allowNull: false
    },
  role: {
    type: DataTypes.ENUM(...Object.values(UserRole)),
    allowNull: false,
    defaultValue: UserRole.USER
  }
}, {
  sequelize,
  tableName: 'users',
  timestamps: true
});

userModel.hasMany(LoanApplication, {
  foreignKey: 'userId',
  as: 'applications'
});

LoanApplication.belongsTo(userModel, {
  foreignKey: 'userId',
  as: 'user'
});

export { userModel, UserAttributes };

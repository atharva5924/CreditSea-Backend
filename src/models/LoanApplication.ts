import { DataTypes, Model } from 'sequelize';
import { sequelize } from '../config/database';
import { ApplicationStatus } from '../constants/enums';

class LoanApplication extends Model {
  public id!: number;
  public userId!: number;
  public name!: string;
  public amount!: number;
  public loanTenure!: string;
  public employmentStatus!: string;
  public reason!: string;
  public employmentAddress!: string;
  public homeAddress!: string;
  public status?: ApplicationStatus;
  public verifiedBy?: number;
  public approvedBy?: number;
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

LoanApplication.init({
  id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
  userId: { type: DataTypes.INTEGER, allowNull: false },
  name: { type: DataTypes.STRING, allowNull: false },
  amount: { type: DataTypes.FLOAT, allowNull: false },
  loanTenure: { type: DataTypes.STRING, allowNull: false },
  employmentStatus: { type: DataTypes.STRING, allowNull: false },
  reason: { type: DataTypes.TEXT, allowNull: false },
  employmentAddress: { type: DataTypes.TEXT, allowNull: false },
  homeAddress: { type: DataTypes.TEXT, allowNull: false },
  status: {
    type: DataTypes.ENUM(...Object.values(ApplicationStatus)),
    allowNull: false,
    defaultValue: ApplicationStatus.PENDING
  },
  verifiedBy: { type: DataTypes.INTEGER },
  approvedBy: { type: DataTypes.INTEGER }
}, {
  sequelize,
  tableName: 'loan_applications',
  timestamps: true
});

export { LoanApplication };

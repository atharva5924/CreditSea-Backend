import { sequelize } from '../config/database';
import { userModel } from '../models/userModel';
import { LoanApplication } from '../models/LoanApplication'; // if created

async function syncDatabase() {
  try {
    await sequelize.sync({ alter: true }); // or force: true for full reset
    console.log('Database synced successfully.');
  } catch (error) {
    console.error('Error syncing database:', error);
  } finally {
    await sequelize.close();
  }
}

syncDatabase();

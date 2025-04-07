import { sequelize } from '../config/database';
import { userModel } from '../models/userModel';
import { LoanApplication } from '../models/LoanApplication';
import { UserRole, ApplicationStatus } from '../constants/enums';
import bcrypt from 'bcrypt';

// Seed data
async function seed() {
  try {
    await sequelize.sync({ force: true }); // reset DB

    console.log('📡 Database synced. Seeding users...');

    const hashedPassword = await bcrypt.hash('password123', 10);

    const admin = await userModel.create({
      email: 'admin@example.com',
      password: hashedPassword,
      role: UserRole.ADMIN
    });

    const verifier = await userModel.create({
      email: 'verifier@example.com',
      password: hashedPassword,
      role: UserRole.VERIFIER
    });

    const user = await userModel.create({
      email: 'user@example.com',
      password: hashedPassword,
      role: UserRole.USER
    });

    console.log('Users created. Seeding loan application...');

    await LoanApplication.create({
      userId: user.id,
      name: 'John Doe',
      amount: 5000,
      loanTenure: '12 months',
      employmentStatus: 'Full-time',
      reason: 'Starting a small business',
      employmentAddress: '123 Main St, City',
      status: ApplicationStatus.PENDING
    });

    console.log('Seeding complete!');
  } catch (error) {
    console.error('Seeding error:', error);
  } finally {
    await sequelize.close();
  }
}

seed();

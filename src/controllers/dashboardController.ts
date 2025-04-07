// src/controllers/dashboardController.ts
import { Request, Response } from 'express';
import { LoanApplication } from '../models/LoanApplication';
import { userModel } from '../models/userModel';
import { log } from 'console';
import { v4 as uuidv4 } from 'uuid';

// 👤 User dashboard
export const getUserDashboard = async (req: Request, res: Response): Promise<void> => {
  try {
    const applications = await LoanApplication.findAll({ where: { userId: req.user!.id } });
    res.json({ applications });
  } catch (error) {
    console.error('User Dashboard Error:', error);
    res.status(500).json({ error: 'Failed to fetch user dashboard' });
  }
};

// ✅ Verifier dashboard
export const getVerifierDashboard = async (req: Request, res: Response): Promise<void> => {
  try {
    const applications = await LoanApplication.findAll({ where: { status: 'pending' } });
    res.json({ pendingApplications: applications });
  } catch (error) {
    console.error('Verifier Dashboard Error:', error);
    res.status(500).json({ error: 'Failed to fetch verifier dashboard' });
  }
};

// 🛠 Admin dashboard
export const getAdminDashboard = async (req: Request, res: Response): Promise<void> => {
  try {
    const applications = await LoanApplication.findAll();
    const users = await userModel.findAll();
    res.json({ applications, users });
  } catch (error) {
    console.error('Admin Dashboard Error:', error);
    res.status(500).json({ error: 'Failed to fetch admin dashboard' });
  }
};

// export const getFormData = async ( req : Request, res : Response): Promise<void> =>{
//   try{
//     const { name,amount, loanTenure, employmentStatus, employmentAddress, reason} = req.body;
//     const newFormData = await LoanApplication.create({
//       name,
//       amount,
//       loanTenure,
//       employmentStatus,
//       employmentAddress,
//       reason
//     });
//     res.json({newFormData});
//   }
//   catch (error) {
//     console.error('Form submission failed :', error);
//     res.status(500).json({ error: 'Form submission failed' });
//   }
// }


export const getFormData = async (req: Request, res: Response): Promise<void> => {
  try {
    const { fullName, loanTenure, reason, requiredAmount, employmentStatus, address1, address2, dateApplied, loanStatus } = req.body;
    console.log(req.user);

    const user_id = req.user.id;

    const newLoanApplication = await LoanApplication.create({
      userId: user_id,
      name: fullName,
      loanTenure,
      reason,
      amount: requiredAmount,
      employmentStatus,
      employmentAddress: address1,
      homeAddress: address2,
      dateApplied,
      loanStatus
    });

    res.status(200).json({ newLoanApplication });
  } catch (error) {
    console.error('Error creating loan application:', error); // Log the error
    res.status(500).json({ error: 'Unable to create loan application' });
  }
};

export const getUsers = async (req: Request, res: Response): Promise<void> => {
  try {
    const users = await userModel.findAll();
    res.json(users);
  }
  catch (err) {
    console.error('Error fetching users:', err);
  }
}


export const updateUserRole = async (req: Request, res: Response): Promise<void> => {
  const { email, role } = req.body;

  if (!email || !role) {
   res.status(400).json({ message: "Email and role are required." });
  }

  try {
    const user = await userModel.findOne({ where: { email } });

    if (!user) {
       res.status(404).json({ message: "User not found." });
    }

    user.role = role;
    await user.save();

     res.status(200).json({ message: "Role updated successfully." });
  } catch (error) {
    console.error("Role update error:", error);
    res.status(500).json({ message: "Internal server error." });
  }
}

export const updateStatus = async (req: Request, res: Response): Promise<void> => {
  const { loanId, status } = req.body;

  if (!loanId || !status) {
   res.status(400).json({ message: "loanId and status are required." });
  }

  try {
    const loan = await LoanApplication.findOne({ where: { id:loanId } });

    if (!loan) {
       res.status(404).json({ message: "Loan application not found." });
    }

    loan.status = status;
    await loan.save();

     res.status(200).json({ message: "Status updated successfully." });
  } catch (error) {
    console.error("Status update error:", error);
    res.status(500).json({ message: "Internal server error." });
  }
}
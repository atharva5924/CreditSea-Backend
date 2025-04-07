// types/express.d.ts or global.d.ts
import { UserRole } from '../constants/enums';

declare global {
  namespace Express {
    interface UserPayload {
      id: number;
      email: string;
      role: UserRole;
    }

    interface Request {
      user?: UserPayload;
    }
  }
}

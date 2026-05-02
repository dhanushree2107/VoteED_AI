import { Router } from 'express';
import { register, login } from '../controllers/authController.js';
import { auditLogger } from '../middleware/auditLogger.js';
const router = Router();
router.post('/register', auditLogger('ACCOUNT_CREATION'), register);
router.post('/login', auditLogger('USER_LOGIN'), login);
export default router;
//# sourceMappingURL=authRoutes.js.map
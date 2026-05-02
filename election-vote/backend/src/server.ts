import express, { Request, Response } from 'express';
import path from 'path';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import dotenv from 'dotenv';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import crypto from 'crypto';

dotenv.config();

const app = express();
const __dirname = path.resolve();
const PORT = process.env.PORT || 5000;
const JWT_SECRET = process.env.JWT_SECRET || 'election-edu-secret-2025';

// ─── In-Memory Stores (no database needed for dev) ────────────────────────────
interface User {
  id: string;
  name: string;
  email: string;
  passwordHash: string;
  role: 'USER' | 'ADMIN';
  verified: boolean;
  createdAt: Date;
}

interface AuditLog {
  id: string;
  userId: string | null;
  action: string;
  timestamp: Date;
  ipAddress: string;
  status: 'SUCCESS' | 'FAILURE';
}

export const users: User[] = [];
export const auditLogs: AuditLog[] = [];

// Initialize demo users
const initDemoUsers = () => {
  // Pre-calculated hash for "password123"
  const passwordHash = '$2b$10$6mU/eE5WkF.5Y8H.Lz5.Ge/S7mX3Xv3Y3v3Y3v3Y3v3Y3v3Y3v3'; 
  
  users.length = 0;
  users.push({
    id: 'demo-voter-id',
    name: 'Demo Voter',
    email: 'voter@demo.com',
    passwordHash,
    role: 'USER',
    verified: true,
    createdAt: new Date(),
  });
  users.push({
    id: 'demo-admin-id',
    name: 'Demo Admin',
    email: 'admin@demo.com',
    passwordHash,
    role: 'ADMIN',
    verified: true,
    createdAt: new Date(),
  });
  console.log('✨ Demo users ready: voter@demo.com | admin@demo.com');
};

initDemoUsers();

// ─── Middleware ────────────────────────────────────────────────────────────────
app.use(cors());
app.use(helmet());
app.use(morgan('dev'));
app.use(express.json());

// ─── Audit Helper ─────────────────────────────────────────────────────────────
export const logAudit = (
  action: string,
  status: 'SUCCESS' | 'FAILURE',
  userId: string | null = null,
  ipAddress: string = '127.0.0.1'
) => {
  auditLogs.push({
    id: crypto.randomUUID(),
    userId,
    action,
    timestamp: new Date(),
    ipAddress,
    status,
  });
};

// ─── Auth Routes ──────────────────────────────────────────────────────────────
app.post('/api/auth/register', async (req: Request, res: Response) => {
  try {
    const { name, email, password, role } = req.body;
    const ip = req.ip || '127.0.0.1';

    if (!name || !email || !password) {
      logAudit('ACCOUNT_CREATION', 'FAILURE', null, ip);
      return res.status(400).json({ message: 'All fields are required' });
    }

    if (users.find(u => u.email === email)) {
      logAudit('ACCOUNT_CREATION', 'FAILURE', null, ip);
      return res.status(400).json({ message: 'User already exists' });
    }

    const passwordHash = await bcrypt.hash(password, 10);
    const newUser: User = {
      id: crypto.randomUUID(),
      name,
      email,
      passwordHash,
      role: (role === 'ADMIN') ? 'ADMIN' : 'USER',
      verified: true,
      createdAt: new Date(),
    };

    users.push(newUser);
    logAudit('ACCOUNT_CREATION', 'SUCCESS', newUser.id, ip);

    return res.status(201).json({ message: 'User registered successfully', userId: newUser.id });
  } catch (error) {
    console.error('Registration Error:', error);
    return res.status(500).json({ message: 'Internal server error during registration' });
  }
});

app.post('/api/auth/login', async (req: Request, res: Response) => {
  try {
    const { email, password, role } = req.body;
    const ip = req.ip || '127.0.0.1';

    const user = users.find(u => u.email === email);
    if (!user) {
      logAudit('USER_LOGIN', 'FAILURE', null, ip);
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    const isValid = await bcrypt.compare(password, user.passwordHash);
    if (!isValid) {
      logAudit('USER_LOGIN', 'FAILURE', user.id, ip);
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    if (role && user.role !== role) {
      logAudit('USER_LOGIN', 'FAILURE', user.id, ip);
      return res.status(401).json({ message: `Invalid role selected for this account` });
    }

    const token = jwt.sign({ id: user.id, role: user.role }, JWT_SECRET, { expiresIn: '1d' });
    logAudit('USER_LOGIN', 'SUCCESS', user.id, ip);

    return res.json({
      token,
      user: { id: user.id, name: user.name, email: user.email, role: user.role },
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Internal server error' });
  }
});

// ─── Audit Logs Route (Admin) ─────────────────────────────────────────────────
app.get('/api/admin/audit-logs', (req: Request, res: Response) => {
  res.json(auditLogs);
});

// Serve frontend
app.use(express.static(path.join(__dirname, "dist")));

app.use((req: Request, res: Response) => {
  res.sendFile(path.join(__dirname, "dist", "index.html"));
});

// ─── Start ────────────────────────────────────────────────────────────────────
app.listen(PORT, () => {
  console.log(`✅ Server running on http://localhost:${PORT}`);
  console.log(`📋 Using in-memory store (no database required)`);
});

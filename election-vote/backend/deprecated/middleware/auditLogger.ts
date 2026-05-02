import type { Request, Response, NextFunction } from 'express';
import { prisma } from '../server.js';

export const auditLogger = (action: string) => {
  return async (req: any, res: Response, next: NextFunction) => {
    const originalSend = res.send;
    
    res.send = function (body: any) {
      const status = res.statusCode >= 200 && res.statusCode < 300 ? 'SUCCESS' : 'FAILURE';
      const userId = req.user?.id || null;
      const ipAddress = req.ip || req.headers['x-forwarded-for'] || req.socket.remoteAddress;

      prisma.auditLog.create({
        data: {
          userId,
          action,
          status,
          ipAddress: String(ipAddress),
          details: typeof body === 'string' ? body : JSON.stringify(body),
        }
      }).catch((err: any) => console.error('Failed to log audit:', err));

      return originalSend.call(this, body);
    };

    next();
  };
};

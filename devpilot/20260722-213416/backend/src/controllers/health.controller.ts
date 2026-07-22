import { Request, Response } from 'express';
import { SystemService } from '../services/system.service';

export const getHealthStatus = (req: Request, res: Response) => {
  try {
    const healthData = SystemService.getSystemStatus();
    res.status(200).json(healthData);
  } catch (error) {
    res.status(503).json({
      status: 'DOWN',
      error: error instanceof Error ? error.message : 'Unknown error'
    });
  }
};
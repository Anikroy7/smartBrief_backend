import { Types } from 'mongoose';

export interface ISummary {
  user: Types.ObjectId;
  prompt: string;
  originalText: string;
  summaryText?: string;
  status?: 'pending' | 'processing' | 'completed' | 'failed';
  fileName?: string;
  createdAt?: Date;
  updatedAt?: Date;
}

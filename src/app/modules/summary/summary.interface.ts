import { Types } from 'mongoose';

export interface ISummary {
  _id: Types.ObjectId;
  user: Types.ObjectId;
  prompt: string;
  originalText: string;
  summaryText?: string;
  status?: 'pending' | 'processing' | 'completed' | 'failed';
  fileName?: string;
  createdAt?: Date;
  updatedAt?: Date;
}

import { Schema, model } from "mongoose";
import { ISummary } from "./summary.interface";

const summarySchema = new Schema<ISummary>({

  user: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  prompt: {
    type: String,
    required: true
  },
  originalText: {
    type: String,
    required: true
  },
  summaryText: {
    type: String,
    default: ''
  },
  status: {
    type: String,
    enum: ['pending', 'processing', 'completed', 'failed'],
    default: 'pending'
  },
  fileName: {
    type: String
  },

  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
});

summarySchema.pre('save', function (next) {
  this.updatedAt = new Date();
  next();
});

const Summary = model<ISummary>('Summary', summarySchema);

export default Summary;

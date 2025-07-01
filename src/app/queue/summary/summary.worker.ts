import mongoose from 'mongoose';
import { Job } from 'bull';
import { Types } from 'mongoose';
import Summary from '../../modules/summary/summary.model';
import { callOpenAI } from '../../modules/summary/summary.utils';
import { summaryQueue } from './summary.queue';
import config from '../../config';

let isConnected = false;

const connectToDatabase = async () => {
  if (!isConnected) {
    await mongoose.connect(config.database_url as string);
    isConnected = true;
    console.log('MongoDB connected (worker)');
  }
};

export const processSummaryJob = async (job: Job) => {
  const { summaryId, content, prompt } = job.data;
  console.log(' Processing summary job:', summaryId);

  try {
    await connectToDatabase();

    const aiResponse = await callOpenAI(content, prompt);
    console.log('AI response:', aiResponse);

    const result = await Summary.findByIdAndUpdate(
      new Types.ObjectId(summaryId),
      {
        summaryText: aiResponse,
        status: 'completed',
        updatedAt: new Date()
      },
      { new: true }
    );

  } catch (err: any) {
    console.error('Error processing summary job:', err.message);
    await Summary.findByIdAndUpdate(summaryId, { status: 'failed' });
  }
};

summaryQueue.process(processSummaryJob);

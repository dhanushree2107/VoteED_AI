import mongoose, { Schema, Document } from 'mongoose';

export interface IChatLog extends Document {
  userId: string;
  message: string;
  response: string;
  timestamp: Date;
  language: 'en' | 'ta';
}

const ChatLogSchema: Schema = new Schema({
  userId: { type: String, required: true },
  message: { type: String, required: true },
  response: { type: String, required: true },
  timestamp: { type: Date, default: Date.now },
  language: { type: String, enum: ['en', 'ta'], default: 'en' },
});

export default mongoose.model<IChatLog>('ChatLog', ChatLogSchema);

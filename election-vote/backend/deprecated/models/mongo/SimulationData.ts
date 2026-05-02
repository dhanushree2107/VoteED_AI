import mongoose, { Schema, Document } from 'mongoose';

export interface ISimulationData extends Document {
  userId: string;
  mode: 'VOTER' | 'CANDIDATE' | 'OFFICER';
  decisions: any[];
  status: 'IN_PROGRESS' | 'COMPLETED';
  timestamp: Date;
}

const SimulationDataSchema: Schema = new Schema({
  userId: { type: String, required: true },
  mode: { type: String, enum: ['VOTER', 'CANDIDATE', 'OFFICER'], required: true },
  decisions: { type: [Schema.Types.Mixed], default: [] },
  status: { type: String, enum: ['IN_PROGRESS', 'COMPLETED'], default: 'IN_PROGRESS' },
  timestamp: { type: Date, default: Date.now },
});

export default mongoose.model<ISimulationData>('SimulationData', SimulationDataSchema);

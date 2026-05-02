import mongoose, { Schema } from 'mongoose';
const SimulationDataSchema = new Schema({
    userId: { type: String, required: true },
    mode: { type: String, enum: ['VOTER', 'CANDIDATE', 'OFFICER'], required: true },
    decisions: { type: [Schema.Types.Mixed], default: [] },
    status: { type: String, enum: ['IN_PROGRESS', 'COMPLETED'], default: 'IN_PROGRESS' },
    timestamp: { type: Date, default: Date.now },
});
export default mongoose.model('SimulationData', SimulationDataSchema);
//# sourceMappingURL=SimulationData.js.map
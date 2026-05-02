import mongoose, { Document } from 'mongoose';
export interface ISimulationData extends Document {
    userId: string;
    mode: 'VOTER' | 'CANDIDATE' | 'OFFICER';
    decisions: any[];
    status: 'IN_PROGRESS' | 'COMPLETED';
    timestamp: Date;
}
declare const _default: mongoose.Model<ISimulationData, {}, {}, {}, mongoose.Document<unknown, {}, ISimulationData, {}, mongoose.DefaultSchemaOptions> & ISimulationData & Required<{
    _id: mongoose.Types.ObjectId;
}> & {
    __v: number;
} & {
    id: string;
}, any, ISimulationData>;
export default _default;
//# sourceMappingURL=SimulationData.d.ts.map
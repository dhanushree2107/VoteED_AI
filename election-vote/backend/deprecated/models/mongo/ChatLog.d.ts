import mongoose, { Document } from 'mongoose';
export interface IChatLog extends Document {
    userId: string;
    message: string;
    response: string;
    timestamp: Date;
    language: 'en' | 'ta';
}
declare const _default: mongoose.Model<IChatLog, {}, {}, {}, mongoose.Document<unknown, {}, IChatLog, {}, mongoose.DefaultSchemaOptions> & IChatLog & Required<{
    _id: mongoose.Types.ObjectId;
}> & {
    __v: number;
} & {
    id: string;
}, any, IChatLog>;
export default _default;
//# sourceMappingURL=ChatLog.d.ts.map
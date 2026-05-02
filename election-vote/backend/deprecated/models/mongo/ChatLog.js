import mongoose, { Schema } from 'mongoose';
const ChatLogSchema = new Schema({
    userId: { type: String, required: true },
    message: { type: String, required: true },
    response: { type: String, required: true },
    timestamp: { type: Date, default: Date.now },
    language: { type: String, enum: ['en', 'ta'], default: 'en' },
});
export default mongoose.model('ChatLog', ChatLogSchema);
//# sourceMappingURL=ChatLog.js.map
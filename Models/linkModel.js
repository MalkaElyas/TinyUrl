import mongoose from "mongoose";

const linkSchema = mongoose.Schema({
    originalUrl: {
        type: String,
        required: true,
    },
    clicks: [{
        insertedAt: { type: Date, default: Date.now },
        ipAddress: { type: String },
        targetParamValue: { type: String }
    }],
    targetParamName: { type: String, default: "t" },
    targetValues: [
        {
            name: String,
            value: String
        }
    ]
});

export default mongoose.model("links", linkSchema);

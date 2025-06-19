import mongoose from "mongoose";

const userSchema = mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
    links: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "links"
        }
    ]
});

userSchema.pre('findOneAndDelete', async function(next) {
    try {
        const doc = await this.model.findOne(this.getFilter());

        if (doc) {
            await Link.deleteMany({ _id: { $in: doc.links } });
        }

        next();
    } catch (err) {
        next(err);
    }
});

export default mongoose.model("users", userSchema);
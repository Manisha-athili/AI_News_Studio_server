import mongoose from "mongoose";

const ArticleSchema = new mongoose.Schema({
    id: { type: Number, required: true },
    title: { type: String, required: true },
    source: { type: String, default: "Unknown" },
    description: { type: String, default: "" },
    url: { type: String, required: true },
    imageUrl: { type: String, default: null }
})

const OutputSchema = new mongoose.Schema({
    hooks: [String],
    caption: String,
    image_prompt: String,
})

const HistorySchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    fetchedArticles: {
        type: [ArticleSchema],
        default: []
    },
    genaratedOutput: {
        type: OutputSchema,
        default: null
    },
}, {
    timestamps: true
})

const History = mongoose.model("History", HistorySchema)

export default History
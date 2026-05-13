import History from "../models/History.js"
import groqgeneratedArticle from "../services/aiService.js"



const generateArticleController = async (req, res) => {
    const { selectedArticles, title } = req.body

    if (!Array.isArray(selectedArticles) || selectedArticles.length < 1) {
        return res.status(400).json({
            success: false,
            message: "At least 1 article is required."
        })
    }

    // validate before sending to API
    for (art of selectedArticles) {
        if (
            typeof art?.id === "undefined" || art?.title !== "string" || art?.description !== "string"
        ) {
            return res.status(400).json({ 
                success: false,
                error: "Invaild article format: Each article must have valid 'id', 'title', and 'description'" })
        }
    }

    try {
        const generatedResult = await groqgeneratedArticle(selectedArticles);
        const findArticle = await History.findById({ id }).sort({ createdAt: -1 });

        if (findArticle) {
            findArticle.generatedOutput = generatedResult;
            await findArticle.save();
        } else {
            await History.create({
                title,
                fetchedArticles: [],
                generatedOutput: output,
            });
        }

        res.status(200).json({
            success: true,
            message: "Content generated successfully",
            data: generatedResult,
            historyId: historyEntry._id
        });
    }
    catch (error) {
        res.status(500).json({
            success: false,
            message: "Failed to generate content",
            error: error.message
        });
    }
};

export default generateArticleController;


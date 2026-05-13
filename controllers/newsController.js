import { fetchNews, saveArticles } from "../services/newsService.js";

const getNews = async (req, res) => {
    const {title} = req.query;

    if(!title|| title.trim() === ""){
        res.status(400).json({
            success : false,
            message : "title is required"
        });
    }

    try{
        const formattedArticles = await fetchNews(title);
        const savedHistory = await saveArticles(title, formattedArticles);

        res.status(200).json({
            message : "Articles fetched and saved successfully",
            data : formattedArticles,
            historyId: savedHistory._id
        })

    }catch(error){
        res.status(500).json({
            success: false,
            message : "Error fetching news articles",
            error : error.message
        })

    }
    
}

export default getNews;
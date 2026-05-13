import { de, id } from "zod/locales";
import History from "../models/History.js";

export const fetchNews = async (title)=>{
    const NEWS_API_KEY = process.env.NEWS_API_KEY;
    if (!NEWS_API_KEY) throw new Error("News API key not configured");

    const apiURL = `https://newsdata.io/api/1/latest?apikey=${NEWS_API_KEY}&q=${encodeURIComponent(title)}`;

    const response = await fetch(apiURL);
    const articles = await response.json();

    if (!articles.results || articles.results.length === 0) {
    throw new Error("No articles found for this title");
  }

    const formattedArticles = articles.results.slice(0, 5).map((article, index) => ({ 
        id: index + 1,
        title: article.title || "Untitled",
        description: article.description || "",
        source: article.source_name || "Unknown Source",
        imageUrl: article.image_url || null,
        url: article.link || "#",
    }));  
};

  export const saveArticles = async (title, formattedArticles) => {
   return await History.create({
        title:title.trim(),
        fetchedArticles : formattedArticles,
        generatedOutput : null

    });

}
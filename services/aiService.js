import Groq from "groq-sdk";
const API_KEY = process.env.GROQ_API_KEY;
const groq = new Groq({
        apiKey:`${API_KEY}`
    });
    

export default async function groqgeneratedArticle(selectedArticles) {
    if (!selectedArticles || selectedArticles.length === 0) {
    throw new Error("No articles provided");
  }
   
    const prompt = `
    You are a professional social media content creator .

    Generate hooks, caption, and image_prompt from these articles:
                    ${JSON.stringify(selectedArticles, null, 2)}

                    Return JSON:
                    {
                    "hooks": ["hook 1", "hook 2", "hook 3"],
                    "caption": "an instagram-ready caption",
                    "image_prompt": "a detailed AI image prompt"
                    }`;

    const getGroqChatCompletion = async () => {
        return groq.chat.completions.create({
            model:  "llama-3.1-405b-reasoning" || "llama-3.3-70b-versatile",
            messages: [
                {
                    role: "user",
                    content: prompt,
                }
            ],
            "response_format": { "type": "json_object" },
        });
    }

    const completion = await getGroqChatCompletion(); // json formate
    console.log(completion.choices[0]?.message?.content || "");  

    const content = completion?.choices?.[0]?.message?.content?.trim() || "{}";// checkout api res
    const result = JSON.parse(content);

    return result;


}
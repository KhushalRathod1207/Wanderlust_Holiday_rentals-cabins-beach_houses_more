const fetch = (...args) => import('node-fetch').then(({ default: fetch }) => fetch(...args));
require("dotenv").config();

exports.get_API_data = async (req, res) => {
    const { message } = req.body;

    if (!message) {
        return res.status(400).json({ error: "Message is required" });
    }

    try {
        const response = await fetch("https://api.openai.com/v1/chat/completions", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${process.env.OPENAI_API_KEY}`,
            },
            body: JSON.stringify({
                model: "gpt-3.5-turbo",
                messages: [{ role: "user", content: message }],
            }),
        });

        const data = await response.json();

        // Check if response has choices
        if (!data.choices || !data.choices[0] || !data.choices[0].message) {
            console.error("OpenAI API response invalid:", data);
            return res.status(500).json({ error: "Invalid response from OpenAI API" });
        }

        const botReply = data.choices[0].message.content;
        res.json({ reply: botReply });
    } catch (err) {
        console.error("OpenAI API Error:", err);
        res.status(500).json({ error: "Something went wrong" });
    }
};

const OpenAI = require("openai");

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY
});

exports.handler = async function (event) {
  try {
    const { userText } = JSON.parse(event.body);

    const chat = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [{ role: "user", content: userText }]
    });

    return {
      statusCode: 200,
      body: JSON.stringify({ reply: chat.choices[0].message.content })
    };
  } catch (err) {
    console.error("❌ 錯誤發生：", err);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: err.message || "Unknown error" })
    };
  }
};

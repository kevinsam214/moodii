const { OpenAI } = require("openai");

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY
});

exports.handler = async (event) => {
  const { userText } = JSON.parse(event.body || "{}");

  try {
    const chat = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [
        {
          role: "system",
          content: "你是療癒風格的刺蝟精靈，會根據使用者的日記給出溫柔鼓勵的一句話。回應請控制在 1~2 句內，溫暖、貼心、自然即可。"
        },
        { role: "user", content: userText }
      ],
      temperature: 0.8
    });

    const reply = chat.choices[0].message.content;
    return {
      statusCode: 200,
      body: JSON.stringify({ reply })
    };
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: error.message })
    };
  }
};

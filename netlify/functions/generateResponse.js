const { Configuration, OpenAIApi } = require("openai");

exports.handler = async function (event) {
  try {
    const { userText } = JSON.parse(event.body);

    const configuration = new Configuration({
      apiKey: process.env.OPENAI_API_KEY
    });
    const openai = new OpenAIApi(configuration);

    const completion = await openai.createChatCompletion({
      model: "gpt-3.5-turbo",
      messages: [{ role: "user", content: userText }]
    });

    return {
      statusCode: 200,
      body: JSON.stringify({ reply: completion.data.choices[0].message.content })
    };
  } catch (err) {
    console.error("🔥 發生錯誤：", err); // ✅ 輸出錯誤訊息到 Function Log
    return {
      statusCode: 500,
      body: JSON.stringify({ error: err.message })
    };
  }
};

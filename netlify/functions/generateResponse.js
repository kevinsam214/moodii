const fetch = require("node-fetch");

exports.handler = async function (event) {
  const { userText } = JSON.parse(event.body);

  try {
    const response = await fetch("https://api.chatanywhere.cn/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${process.env.OPENAI_API_KEY}`
      },
      body: JSON.stringify({
        model: "gpt-3.5-turbo",
        messages: [
          {
            role: "system",
            content: "你是一位溫柔、善解人意的心靈陪伴者，說話溫暖療癒。根據使用者的日記，回一句可愛又鼓舞的話。不要太長，要讓人微笑。"
          },
          {
            role: "user",
            content: userText
          }
        ],
        temperature: 0.8
      })
      
    });

    const data = await response.json();

    // 如果 API 回傳錯誤
    if (!response.ok) {
      return {
        statusCode: response.status,
        body: JSON.stringify({ error: data.error?.message || "API 回傳失敗" })
      };
    }

    return {
      statusCode: 200,
      body: JSON.stringify({ reply: data.choices[0].message.content })
    };
  } catch (err) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: err.message })
    };
  }
};

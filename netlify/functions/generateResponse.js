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
        model: "gpt-3.5-turbo", // 他們應該支援此模型
        messages: [{ role: "user", content: userText }],
        temperature: 0.7
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

const fetch = require("node-fetch");

exports.handler = async function (event) {
  const { userText, mood } = JSON.parse(event.body);

  const moodStylePrompt = {
    happy: "你是開朗的小刺蝟精靈，看到使用者開心就會忍不住一起蹦蹦跳，語氣開心活潑，說一句貼心鼓勵的話，控制在 15～20 字，搭配 emoji（✨🦔🎉）",
    neutral: "你是溫柔的小刺蝟，像靜靜陪伴在身邊的朋友，用溫暖語氣說一句支持的話，15～20 字，搭配 emoji（🌸🦔🍃）",
    sad: "你是懂得安慰人的小刺蝟，看到有人難過會輕輕抱住他，用柔柔的語氣說句不超過 20 字的安慰話，搭配 emoji（☁️🦔💞）",
    tired: "你是軟綿綿的小刺蝟，會讓人躺在肚肚上休息，用放鬆的語氣說一句鼓勵休息的話，搭配 emoji（🛌🌙🦔）",
    angry: "你是勇敢的小刺蝟，會保護好主人，用勇敢可愛的語氣說一句幫忙出氣或理解的話，搭配 emoji（💢🦔🔥）"
  };

  const systemPrompt = moodStylePrompt[mood] || moodStylePrompt["neutral"];

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
            content: systemPrompt
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

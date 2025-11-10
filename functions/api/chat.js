// Cloudflare Pages Function - OpenAI API 代理
// API Key 存储在 Cloudflare Pages 的环境变量中，不会暴露给前端

export async function onRequestPost(context) {
  const { request, env } = context;
  
  // 从环境变量获取 API Key
  const OPENAI_API_KEY = env.OPENAI_API_KEY;
  
  if (!OPENAI_API_KEY) {
    return new Response(
      JSON.stringify({ error: 'OpenAI API Key not configured' }),
      { 
        status: 500,
        headers: { 'Content-Type': 'application/json' }
      }
    );
  }

  try {
    // 获取请求体
    const body = await request.json();
    
    // 验证请求
    if (!body.model || !body.messages) {
      return new Response(
        JSON.stringify({ error: 'Invalid request: model and messages are required' }),
        { 
          status: 400,
          headers: { 'Content-Type': 'application/json' }
        }
      );
    }

    // 转发请求到 OpenAI API
    const openaiResponse = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${OPENAI_API_KEY}`
      },
      body: JSON.stringify({
        model: body.model || 'gpt-4',
        messages: body.messages,
        stream: body.stream || false
      })
    });

    // 如果是流式响应，直接转发流
    if (body.stream) {
      return new Response(openaiResponse.body, {
        headers: {
          'Content-Type': 'text/event-stream',
          'Cache-Control': 'no-cache',
          'Connection': 'keep-alive'
        }
      });
    }

    // 非流式响应，返回 JSON
    const data = await openaiResponse.json();
    return new Response(JSON.stringify(data), {
      headers: { 'Content-Type': 'application/json' }
    });

  } catch (error) {
    console.error('Error proxying to OpenAI:', error);
    return new Response(
      JSON.stringify({ error: 'Internal server error', message: error.message }),
      { 
        status: 500,
        headers: { 'Content-Type': 'application/json' }
      }
    );
  }
}


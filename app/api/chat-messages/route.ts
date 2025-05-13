import { type NextRequest } from 'next/server'
import { client, getInfo } from '@/app/api/utils/common'
import { checkAndIncrementUsage } from '@/service/limit/usageLimit'

// 安全的 JSON 序列化，处理循环引用
function safeStringify(obj: any) {
  const seen = new WeakSet();
  return JSON.stringify(obj, (key, value) => {
    // 跳过 null 和非对象值
    if (value === null || typeof value !== 'object') {
      return value;
    }

    // 检测循环引用
    if (seen.has(value)) {
      return '[Circular Reference]';
    }

    seen.add(value);
    return value;
  });
}

export async function POST(request: NextRequest) {
  const body = await request.json()
  const {
    inputs,
    query,
    files,
    conversation_id: conversationId,
    response_mode: responseMode,
  } = body

  const { user, sessionId } = getInfo(request)

  // 检查用户使用次数限制
  const { allowed, remaining } = checkAndIncrementUsage(sessionId)

  if (!allowed) {
    return new Response(
      JSON.stringify({
        error: '您已达到使用次数上限，请稍后再试',
        status: 'error',
        remaining: 0
      }),
      {
        status: 429,
        headers: {
          'Content-Type': 'application/json'
        }
      }
    )
  }

  try {
    // 继续处理请求
    const res = await client.createChatMessage(inputs, query, user, responseMode, conversationId, files)

    // 直接将原始响应返回，并添加剩余使用次数头信息
    return new Response(res.data, {
      headers: {
        'Content-Type': 'application/json',
        'X-Remaining-Usage': remaining.toString()
      }
    })
  } catch (error) {
    console.error('Error in chat messages API:', error);
    return new Response(
      JSON.stringify({
        error: '处理请求时发生错误',
        status: 'error'
      }),
      {
        status: 500,
        headers: {
          'Content-Type': 'application/json'
        }
      }
    )
  }
}

import fs from 'fs'
import path from 'path'

const USAGE_FILE = path.join(process.cwd(), 'data', 'usage.json')
const MAX_USAGE = 20 // 最大使用次数限制

// 确保数据目录存在
if (!fs.existsSync(path.dirname(USAGE_FILE))) {
    fs.mkdirSync(path.dirname(USAGE_FILE), { recursive: true })
}

// 读取使用记录
function readUsageData() {
    if (!fs.existsSync(USAGE_FILE)) {
        return {}
    }
    try {
        return JSON.parse(fs.readFileSync(USAGE_FILE, 'utf-8'))
    } catch (error) {
        console.error('读取使用记录文件失败:', error)
        return {}
    }
}

// 保存使用记录
function saveUsageData(data: any) {
    try {
        fs.writeFileSync(USAGE_FILE, JSON.stringify(data, null, 2))
    } catch (error) {
        console.error('保存使用记录文件失败:', error)
    }
}

// 检查用户使用次数并增加计数
export function checkAndIncrementUsage(sessionId: string): { allowed: boolean; remaining: number } {
    const usageData = readUsageData()

    if (!usageData[sessionId]) {
        usageData[sessionId] = {
            count: 0,
            lastReset: Date.now()
        }
    }

    // 检查是否需要重置（例如每周重置）
    const now = Date.now()
    const lastReset = usageData[sessionId].lastReset
    const oneWeek = 7 * 24 * 60 * 60 * 1000

    if (now - lastReset > oneWeek) {
        usageData[sessionId].count = 0
        usageData[sessionId].lastReset = now
    }

    // 检查是否超过限制
    const currentCount = usageData[sessionId].count
    const remaining = Math.max(0, MAX_USAGE - currentCount)

    if (currentCount >= MAX_USAGE) {
        return { allowed: false, remaining: 0 }
    }

    // 增加使用次数
    usageData[sessionId].count++
    saveUsageData(usageData)

    return { allowed: true, remaining: remaining - 1 }
}

// 获取用户剩余使用次数
export function getRemainingUsage(sessionId: string): number {
    const usageData = readUsageData()

    if (!usageData[sessionId]) {
        return MAX_USAGE
    }

    const now = Date.now()
    const lastReset = usageData[sessionId].lastReset
    const oneWeek = 7 * 24 * 60 * 60 * 1000

    if (now - lastReset > oneWeek) {
        return MAX_USAGE
    }

    return Math.max(0, MAX_USAGE - usageData[sessionId].count)
} 
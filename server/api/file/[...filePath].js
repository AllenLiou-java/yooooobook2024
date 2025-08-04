// import { sendRedirect } from 'h3'
import mime from 'mime-types'
import { adminStorage } from '~/server/utils/firebase'

export default defineEventHandler(async (event) => {
    const query = getQuery(event)

    // 檔案預覽 or 下載(預設)
    const mode = query.mode === 'preview' ? 'inline' : 'attachment'

    const params = event.context.params.filePath.split('/')
    const filename = decodeURIComponent(params[params.length - 1])
    const filePath = decodeURIComponent(params.join('/')) // 支援中文路徑
    if (!filePath) throw createError({ statusCode: 400, message: '缺少參數' })

    // /** 允許的資料夾白名單，避免路徑穿越攻擊 [只允許 Document / Product] */
    // const ALLOWED_FOLDERS = ['Document', 'Product']
    // const topFolder = decodeURIComponent(params[0])
    // if (!ALLOWED_FOLDERS.includes(topFolder))
    //   throw createError({ statusCode: 400, message: `不允許的資料夾：${topFolder}` })

    try {
        const fileRef = adminStorage.bucket().file(filePath)

        // 檢查檔案是否存在
        const [exist] = await fileRef.exists()
        if (!exist) throw createError({ statusCode: 404, message: '檔案不存在於' })

        const stream = fileRef.createReadStream()

        // 針對檔名為中文字串做UTF-8編碼
        const desiredFilename = encodeURIComponent(filename)

        // 嘗試取得 MIME 類型，若無則 fallback
        const mimeType = mime.lookup(filename) || 'application/octet-stream'

        // 設定正確回應標頭
        setResponseHeaders(event, {
            'Content-Type': mimeType,
            'Content-Disposition': `${mode}; filename*=UTF-8''${desiredFilename}`,
            'Cache-Control': 'no-cache'
        })

        return stream
    } catch (err) {
        throw createError({ statusCode: 500, message: err.message })
    }
})

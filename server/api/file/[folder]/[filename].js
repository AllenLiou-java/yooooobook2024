// import { sendRedirect } from 'h3'
import mime from 'mime-types'
import { encodeRFC5987 } from '~/server/utils/encodeRFC5987'
import { adminStorage } from '~/server/utils/firebase'

/** 允許的資料夾白名單，避免路徑穿越攻擊 */
const ALLOWED_FOLDERS = ['Document', 'Product']

export default defineEventHandler(async (event) => {
  const { folder, filename } = getRouterParams(event)
  const query = getQuery(event)
  const mode = query.mode === 'preview' ? 'inline' : 'attachment' // 預設下載

  if (!folder || !filename) throw createError({ statusCode: 400, statusMessage: '缺少參數' })

  // 只允許 Document / Product
  if (!ALLOWED_FOLDERS.includes(folder))
    throw createError({ statusCode: 400, statusMessage: `不允許的資料夾：${folder}` })

  try {
    const fileRef = adminStorage.bucket().file(`${folder}/${decodeURIComponent(filename)}`)

    const [exist] = await fileRef.exists()

    if (!exist)
      throw createError({ statusCode: 404, statusMessage: `檔案 ${filename} 不存在於 ${folder}/` })

    const stream = fileRef.createReadStream()

    // 自訂顯示檔名（可轉英文或去除特殊字元）
    const desiredFilename = filename // 或例如 slugify(filename)

    // 嘗試取得 MIME 類型，若無則 fallback
    const mimeType = mime.lookup(filename) || 'application/octet-stream'

    // 設定正確回應標頭
    setResponseHeaders(event, {
      'Content-Type': mimeType,
      'Content-Disposition': `${mode}; filename*=UTF-8''${encodeRFC5987(desiredFilename)}`,
      'Cache-Control': 'no-cache'
    })

    return stream
  } catch (err) {
    throw createError({ statusCode: 500, statusMessage: err.message })
  }
})

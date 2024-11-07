export default defineEventHandler(async (event) => {
  const { msg } = await readBody(event)
  return { msg }
})

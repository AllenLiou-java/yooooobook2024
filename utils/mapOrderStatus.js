export default function (statusId) {
    if (statusId === '1') {
        return '待匯款'
    } else if (statusId === '2') {
        return '匯款完成，訂單準備中'
    } else if (statusId === '3') {
        return '已發貨'
    } else if (statusId === '4') {
        return '未匯款，訂單取消'
    } else if (statusId === '5') {
        return '訂單取消，退款完成'
    } else {
        return ''
    }
}

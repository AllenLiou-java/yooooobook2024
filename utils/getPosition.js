export default function (element) {
    let x = 0
    let y = 0
    // 搭配上面的示意圖可比較輕鬆理解為何要這麼計算
    while (element) {
        x += element.offsetLeft - element.scrollLeft + element.clientLeft
        y += element.offsetTop - element.scrollLeft + element.clientTop
        element = element.offsetParent
    }

    return { x, y }
}

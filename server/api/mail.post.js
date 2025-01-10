import nodemailer from 'nodemailer'
export default defineEventHandler(async (event) => {
  const body = await readBody(event)
  const { orderInfo } = body
  const { gmailAppPassword } = useRuntimeConfig()

  function createOrderTable(orderList) {
    let tableTd = ''
    orderList.forEach((item) => {
      tableTd += `
        <tr>
          <td>${thousandthsFormat(item.productName)}</td>
          <td>${thousandthsFormat(item.qty)}</td>
          <td>${thousandthsFormat(item.totalPrice)}</td>
        </tr>`
    })

    return `
    <ul style="font-size: 16px; list-style: none; padding-left: 0px; margin-top: 0">
      <li>訂單日期：${orderInfo.oderDate}</li>
      <li>訂單編號：${orderInfo.orderId}</li>   
      <li>訂單總金額：${thousandthsFormat(orderInfo.totalPrice)}</li>
    </ul>
    <table class="gmail-table">
      <thead>
        <tr>
          <th>商品名稱</th>
          <th>商品數量</th>
          <th>商品金額</th>
        </tr>
      </thead>
      <tbody>
        ${tableTd}
      </tbody>
    </table>`
  }

  function thousandthsFormat(value) {
    const regex = /\B(?=(\d{3})+(?!\d))/g
    value = value.toString()
    return value.replace(regex, ',')
  }

  function contentHtml(orderInfo) {
    return `
    <html>
      <head>
        <style>
          * {
            font-size: 16px;
            color: black;
          }
          
          .gmail-table {
            border: solid 2px #DDEEEE;
            border-collapse: collapse;
            border-spacing: 0;
            font: normal 16px Roboto, sans-serif;
          }

          .gmail-table thead th {
            background-color: #DDEFEF;
            border: solid 1px #DDEEEE;
            color: #336B6B;
            padding: 10px;
            text-align: left;
            text-shadow: 1px 1px 1px #fff;
          }

          .gmail-table tbody td {
            border: solid 1px #DDEEEE;
            color: #333;
            padding: 10px;
            text-shadow: 1px 1px 1px #fff;
          }

          .fs-5 {
            font-size: 20px;
          }

          .fw-bold {
            font-weight: bold;
          }

          p {
            margin: 0;
            margin-bottom: 8px;
          }

          h2 {
            font-size: 18px; font-weight: bold; margin-bottom: 12px
          }

          ul {
            list-style: none;
            padding-left: 0px; 
            margin-top: 0;
            margin-bottom: 20px;
          }

          a{
            color: red; 
            text-underline-offset: 4px;
          }

          .text-highlight {
            color: #F75000;
          }
          
        </style>
      </head>
      <body>
        <p class="fs-5 fw-bold">親愛的顧客您好，</p>
        <p>感謝您的訂購，敬請於 <u>3日內</u> 將款項匯款至以下： </p>
        <ul>
          <li>匯款銀行：<span class="text-highlight">玉山銀行 - 台中分行</span></li>
          <li>銀行代碼：<span class="text-highlight">808</span></li>
          <li>銀行帳戶：<span class="text-highlight">1366940052966</span></li>
          <li>戶名：<span class="text-highlight">有良冊股份有限公司</span></li>
        </ul>
        <p>並於匯款後至有良冊LINE官方帳號( 
        <a
          href="https://lin.ee/f8oZLym"
          target="_blank">
          @yooooobook</a> )告知您的<span class="text-highlight">「訂單編號」</span>、<span class="text-highlight">「匯款金額」</span>及<span class="text-highlight">「帳號末5碼」</span>等資料，</p>
        <p>我們將每天進行統一對帳，如無問題將不另行通知，或可至訂單查詢處查詢訂單進度。</p>

        <h2>【訂單資訊】</h2>
        ${createOrderTable(orderInfo.orderList)}

        <h2>【發票及商品收件資料】</h2>
        <ul>
          <li>收件人：${orderInfo.receiver.name}</li>
          <li>電話：${orderInfo.phone}</li>
          <li>寄送地址：${orderInfo.receiver.address}</li>
          <li>發票買受人：${orderInfo.buyer}</li>
          <li>發票統編：${orderInfo.taxId}</li>
        </ul>
        <h2>【其他注意事項】</h2>
        <ul>
          <li>1、本訂單尚未完成訂購，若未於三日內完成匯款，視同訂單取消。</li>
          <li>2、其他訂單問題，請洽LINE官方帳號：<a
          href="https://lin.ee/f8oZLym"
          target="_blank">
          @yooooobook</a>。</li>
        </ul>
        <p>(此信件由系統送出，請勿直接回覆)</p>
      </body>
    </html>`
  }

  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: 'yooooobook@gmail.com',
      pass: gmailAppPassword
    }
  })

  const mailOptions = {
    from: '"有良冊股份有限公司" <yooooobook@gmail.com>',
    to: orderInfo.email,
    subject: '公司登記實務及案例解析【訂單成立通知】',
    html: contentHtml(orderInfo),
    bcc: 'info@yooooobook.com'
  }

  const sendMail = await transporter.sendMail(mailOptions)

  return {
    status: sendMail
  }
})

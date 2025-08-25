import transporter from '../../utils/mailTransporter'

export default defineEventHandler(async (event) => {
    const body = await readBody(event)
    const { email, subscribe, subscribeKey } = body

    function contentHtml(email, subscribe, subscribeKey) {
        return `
    <html>
        <head>
            <style>
            .fs-5 {
                font-size: 20px;
            }

            .fw-bold {
                font-weight: bold;
            }
            </style>
        </head>
        <body>
            <p class="fs-5 fw-bold">Key name：${subscribeKey}</p>
            <p class="fs-5 fw-bold">客戶Email：${email}</p>
            <p class="fs-5 fw-bold">變更訂閱狀態：${subscribe ? '已訂閱' : '取消訂閱'}</p>

        </body>
        </html>`
    }

    const mailOptions = {
        from: '"有良冊股份有限公司" <yooooobook@gmail.com>',
        to: 'info@yooooobook.com',
        subject: '訂閱通知',
        html: contentHtml(email, subscribe, subscribeKey)
    }

    const sendMail = await transporter().sendMail(mailOptions)

    return {
        status: sendMail
    }
})

import nodemailer from 'nodemailer'
const { gmailAppPassword } = useRuntimeConfig()

export default function transporter() {
    return nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: 'yooooobook@gmail.com',
            pass: gmailAppPassword
        }
    })
}

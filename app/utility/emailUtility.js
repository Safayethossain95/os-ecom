
import nodemailer from "nodemailer";
import { EMAIL_HOST, EMAIL_PORT, EMAIL_SECURITY,EMAIL_USER,EMAIL_PASS } from "../config/config.js";
const SendEmail=async(EmailTo,EmailText,EmailSubject)=>{


  let  transport= nodemailer.createTransport({
    host: "smtp.gmail.com", // Correct SMTP host for Gmail
    port: 587, // Secure port for TLS
    secure: false, // Use `true` for port 465
    auth: {
      user: "safayet.hossain95@gmail.com", // Your email address
      pass: "fznx ovvf jbww pqfn", // Your email password (App Password for Gmail)
    },
  });


let mailOption={
 from:'MERN Ecommerce Solution <info@teamrabbil.com>',
 to:EmailTo,
 subject:EmailSubject,
 text:EmailText
}

return await transport.sendMail(mailOption)

}

export default SendEmail
//  let transporter = nodemailer.createTransport({
//     host:EMAIL_HOST,
//     port:EMAIL_PORT,
//     secure:EMAIL_SECURITY,
//     auth:{
//         user:EMAIL_USER,
//         pass:EMAIL_PASS
//     },
//     tls:{
//         rejectUnauthorized:false
//     }
//  })

//  let mailOptions = {
//     from:"Task manager MERN <info@teamrabbil.com>",
//     to:EmailTo,
//     subject:EmailSubject,
//     text:EmailText
//  }

//  return await transporter.sendMail(mailOptions)



// }

// export default SendEmail
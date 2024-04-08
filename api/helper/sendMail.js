import User from "../models/user.model.js";
import nodemailer from "nodemailer";
import bcryptjs from "bcryptjs";
import ApiError from "./apiError.js";

export const sendEmail = async ({email,emailType,userId}) =>{

    try {

      
           
            const userIdString = String(userId); 
            const hashToken = await bcryptjs.hash(userIdString, 10); 
            
            if(emailType === "forgotPassword"){
                await User.findByIdAndUpdate(userId, {
                  $set:{
                    forgotPasswordToken: hashToken,
                    forgotPasswordExpire: Date.now() + (20 * 60 * 1000), // 20min
            }
          });
            } else if (emailType === "verifyEmail") {
                await User.findByIdAndUpdate(userId,{
                  $set:{
                    verifyToken: hashToken,
                    verifyTokenExpire: Date.now() + (20 * 60 * 1000), // 20min
                }});
            }
            
        
        

    //creating transporter
    const transporter = nodemailer.createTransport({
        host: "sandbox.smtp.mailtrap.io",
            port: 2525,
            auth: {
              user: process.env.MAIL_USER,
              pass: process.env.MAIL_PASS
            }
      });

        
        const mailOptions = {
            from: "nova-nosh@gmail.com",
            to: email,
            subject: emailType === "forgotPassword" ? "Reset Password" : "Verify Email",
            html:`
            <html lang="en">
  <head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Email Template</title>
    <style>
      body {
        font-family: Arial, sans-serif;
        background-color: #f4f4f4;
        margin: 0;
        padding: 0;
        color: #333; /* Default text color */
      }

      .container {
        max-width: 600px;
        margin: 0 auto;
        padding: 20px;
        background-color: #fff;
        border-radius: 5px;
        box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
      }

      .header {
        background-color: #000; /* Black header background */
        color: #fff; /* White header text color */
        text-align: center;
        padding: 10px 0;
        border-radius: 5px 5px 0 0;
      }

      .header h1 {
        margin: 0;
      }

      .content {
        padding: 20px 0;
        text-align: center;
      }

      .signature {
        margin-top: 20px;
        border-top: 1px solid #ccc;
        padding-top: 20px;
        text-align: center;
      }

      .signature p {
        margin: 0;
      }

      a {
        color: #ff0000; /* Nova red color for links */
        text-decoration: none;
      }

      a:hover {
        text-decoration: underline;
      }
    </style>
  </head>
  <body>
    <div class="container">
      <div class="header">
        <h1>${emailType === "forgotPassword" ? 'Reset Password' : 'Verify Email'}</h1>
        <p>Sent by <a href="mailto:${process.env.SENDER_EMAIL}" style="color: #fff;">${process.env.COMPANY_NAME}</a></p>
      </div>
      <div class="content">
        <p>Click <a href="${emailType === "forgotPassword" ? `${process.env.DOMAIN}/resetPassword?token=${hashToken}` : `${process.env.DOMAIN}/verifyEmail?token=${hashToken}`}">here</a> to ${emailType === "forgotPassword" ? 'reset your password' : 'verify your email'}.</p>
        <span >Link is valid for 20 minutes.</span>
      </div>
      <div class="signature">
        <p>Best Regards,<br>${process.env.COMPANY_NAME}</p>
      </div>
    </div>
  </body>
</html>
`
            
          };
          
    //sending email
    const mailResponse = await transporter.sendMail(mailOptions);
    return mailResponse;
    console.log('====================================');
    console.log("Message sent: %s", mailResponse.messageId);
    console.log('====================================');
        
    } catch (error) {
        console.log(error)
    }

}
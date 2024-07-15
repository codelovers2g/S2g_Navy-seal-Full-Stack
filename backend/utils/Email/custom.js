import dotenv from "dotenv";
import nodemailer from "nodemailer";
import { USER_EMAIL, nodeMailerkey } from "../dev.env.js";
dotenv.config();
export const transporter = nodemailer.createTransport({
  service: "gmail",
  port: 465,
  secure: true,
  auth: {
    user: USER_EMAIL,
    pass: nodeMailerkey,
  },
});
export const sendNotification = async (email, html, subject) => {
  const mailOptions = {
    from: `Trend-Stock ${USER_EMAIL}`,
    to: email,
    subject,
    html: html,
  };
  const info = await transporter.sendMail(mailOptions);
  return info;
};
export const addHtml = (user, stockname, symbol, futurePrice,currentStockPrice) => {
  const html = `
    <!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Price Notification</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            background-color: #f4f4f9;
            margin: 0;
            padding: 0;
        }
        .container {
            width: 100%;
            max-width: 600px;
            margin: 0 auto;
            background-color: #ffffff;
            box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
        }
        .header {
            background-color: #182237;
            padding: 20px;
            text-align: center;
            color: #ffffff;
        }
        .header h1 {
            margin: 0;
            font-size: 24px;
        }
        .content {
            padding: 20px;
        }
        .content h2 {
            color: #182237;
        }
        .content p {
            font-size: 16px;
            line-height: 1.5;
        }
        .footer {
            background-color: #182237;
            padding: 10px;
            text-align: center;
            color: #ffffff;
            font-size: 14px;
        }
        .button {
            display: inline-block;
            padding: 10px 20px;
            margin-top: 20px;
            background-color: #28a745;
            color: #ffffff;
            text-decoration: none;
            border-radius: 5px;
        }
    </style>
</head>
<body>
    <div class="container">
        <div class="header">
            <h1>Trend-Stock</h1>
        </div>
        <div class="content">
            <h2>Set Price Notification</h2>
            <p>Dear ${user},</p>
            <p>You have Successfully set stock price notification</p>
            <p><strong>Stock Name:</strong> ${stockname}</p>
            <p><strong>Symbol:</strong> ${symbol}</p>
            <p><strong>Current Price:</strong> ${currentStockPrice}</p>
            <p><strong>We will send you notification once future  Price hit the stock price:</strong> ${futurePrice}</p>
            <p>Thank you for using Trend-Stock. We hope this information helps you in making informed investment decisions.</p>
            <a href="https://localhost" class="button">View More Details</a>
        </div>
        <div class="footer">
            <p>© 2024 Trend-Stock. All rights reserved.</p>
            <p>1234 Market Street, Suite 100, India, PN-110041</p>
        </div>
    </div>
</body>
</html>

    `;
  return html;
};
export const PriceReachHtml = (user, stockName, symbol, futurePrice, currentStockPrice) => {
    const html = `
      <!DOCTYPE html>
      <html>
      <head>
          <meta charset="UTF-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>Price Notification</title>
          <style>
              body {
                  font-family: Arial, sans-serif;
                  background-color: #f4f4f9;
                  margin: 0;
                  padding: 0;
              }
              .container {
                  width: 100%;
                  max-width: 600px;
                  margin: 0 auto;
                  background-color: #ffffff;
                  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
              }
              .header {
                  background-color: #182237;
                  padding: 20px;
                  text-align: center;
                  color: #ffffff;
              }
              .header h1 {
                  margin: 0;
                  font-size: 24px;
              }
              .content {
                  padding: 20px;
              }
              .content h2 {
                  color: #182237;
              }
              .content p {
                  font-size: 16px;
                  line-height: 1.5;
              }
              .footer {
                  background-color: #182237;
                  padding: 10px;
                  text-align: center;
                  color: #ffffff;
                  font-size: 14px;
              }
              .button {
                  display: inline-block;
                  padding: 10px 20px;
                  margin-top: 20px;
                  background-color: #28a745;
                  color: #ffffff;
                  text-decoration: none;
                  border-radius: 5px;
              }
          </style>
      </head>
      <body>
          <div class="container">
              <div class="header">
                  <h1>Trend-Stock</h1>
              </div>
              <div class="content">
                  <h2>Price Notification</h2>
                  <p>Dear ${user},</p>
                  <p>We are excited to inform you that the stock you are watching has reached your set price target.</p>
                  <p><strong>Stock Name:</strong> ${stockName}</p>
                  <p><strong>Symbol:</strong> ${symbol}</p>
                  <p><strong>Current Price:</strong> ${currentStockPrice}</p>
                  <p><strong>Target Price:</strong> ${futurePrice}</p>
                  <p>We will notify you once the stock price reaches your target price.</p>
                  <p>Thank you for using Trend-Stock. We hope this information helps you in making informed investment decisions.</p>
                  <a href="https://localhost" class="button">View More Details</a>
              </div>
              <div class="footer">
                  <p>© 2024 Trend-Stock. All rights reserved.</p>
                  <p>1234 Market Street, Suite 100, India, PN-110041</p>
              </div>
          </div>
      </body>
      </html>
    `;
    return html;
};

  
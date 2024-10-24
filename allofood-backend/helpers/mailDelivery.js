const jwt = require("jsonwebtoken");
const { sendEmail } = require("./sendEmailHelper");

const mailDelivery = async (to, subject, orderId, deliveryPersonId) => {
  const token = jwt.sign({ orderId, deliveryPersonId }, process.env.TOKEN_SECRET, {
    expiresIn: '1h'
  });

  const queryParam = encodeURIComponent(token);
  const acceptUrl = `${process.env.FRONTEND_URL}/delivery/requests?token=${queryParam}`;

  const mailOptions = {
    from: process.env.EMAIL_USER,
    to,
    subject,
    html: `
      <div style="font-family: Arial, sans-serif; text-align: center; padding: 20px;">
        <h3>🚚 New Delivery Order Available! 🚚</h3>
        <p>A new delivery order is ready for pickup. Click the button below to accept the order:</p>
        <a href="${acceptUrl}"
           style="display: inline-block; padding: 10px 20px; margin: 20px 0; font-size: 16px; color: white; background-color: #4CAF50; text-decoration: none; border-radius: 5px;">
          ✅ Accept Order
        </a>
        <p>If you did not expect this email, please ignore it.</p>
        <p>Thank you,</p>
        <p>The Delivery Team</p>
      </div>
    `,
  };

  await sendEmail(mailOptions);
};

module.exports = {
  mailDelivery
};
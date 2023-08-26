const express = require("express");
const app = express();
const nodemailer = require("nodemailer");

app.use(express.json());

require("dotenv").config();

const port = process.env.PORT || 80;
const emailId = process.env.USER;
const emailPass = process.env.PASS;

app.post("/add-contact-details", async (req, res) => {
  try {
    const {
      email,
      creator,
      work,
      channel,
      AutosAndVehicles,
      speakers,
      mainCharacters,
      originalENGLISH,
      dubbedHINDI,
      Wecontactedyou,
    } = req.body;

    let config = {
      service: "gmail",
      auth: {
        user: emailId,
        pass: emailPass,
      },
    };

    let transporter = nodemailer.createTransport(config);
    let message = {
      from: emailId,
      to: "contact@bemultilingual.ca",
      subject: "HEllo",
      html: `
      <body style="margin: 0; padding: 0; font-family: Arial, sans-serif; background-color: #f4f4f4;">
  <div style="width: 80%; max-width: 600px; margin: 0 auto; background-color: #5e438e; color: #ffffff;">
    <div style="text-align: center; padding: 30px 0;">
      <h2 style="margin: 0; padding: 0; color: #ffffff;">Pricing Inquiry Email - BeMultilingual</h2>
    </div>
    <div style="padding: 20px; background-color: #ffffff; color: #333333; border-radius: 5px; margin-bottom: 20px; box-shadow: 0 2px 6px rgba(0, 0, 0, 0.1);">
      <p style="margin: 10px 0;"><strong>Email:</strong> ${email}</p>
      <p style="margin: 10px 0;"><strong>Creator:</strong>${creator}</p>
      <p style="margin: 10px 0;"><strong>Work:</strong> ${work}</p>
      <p style="margin: 10px 0;"><strong>Channel:</strong> ${channel}</p>
      <p style="margin: 10px 0;"><strong>Autos And Vehicles:</strong> ${AutosAndVehicles}</p>
      <p style="margin: 10px 0;"><strong>Speakers:</strong> ${speakers}</p>
      <p style="margin: 10px 0;"><strong>Main Characters:</strong> ${mainCharacters}</p>
      <p style="margin: 10px 0;"><strong>Original English:</strong> ${originalENGLISH}</p>
      <p style="margin: 10px 0;"><strong>Dubbed Hindi:</strong> ${dubbedHINDI}</p>
      <p style="margin: 10px 0;"><strong>We Contacted You:</strong> ${Wecontactedyou}</p>
    </div>
    <div style="text-align: center; background-color: #5e438e; padding: 10px;">
      <p style="margin: 0; padding: 0; color: #ffffff;">Thank you for your attention!</p>
    </div>
  </div>
</body>`,
    };

    transporter
      .sendMail(message)
      .then(() => {
        return res
          .status(200)
          .json({ success: "true", msg: "your response has been recorded" });
      })
      .catch((err) => {
        return res.status(400).json({
          success: "false",
          msg: "Oops! something bad has happened",
          error: err.msg,
        });
      });
  } catch (error) {
    res.status(400).json({
      success: "false",
      msg: "Oops! something bad has happened",
      error: err.msg,
    });
  }
});

app.listen(port, () => {
  console.log("server is running at port " + port);
});

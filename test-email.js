const nodemailer = require('nodemailer');

async function testMail() {
  const config = {
    host: "mail.skycart.xyz",
    port: 465,
    secure: true,
    auth: {
      user: "portfolio@skycart.xyz",
      pass: "Akash@98890"
    }
  };

  console.log(`Testing config: host=${config.host}, user=${config.auth.user}`);
  const transporter = nodemailer.createTransport(config);
  try {
    await transporter.verify();
    console.log(`SUCCESS with config: host=${config.host}, user=${config.auth.user}`);
    
    const info = await transporter.sendMail({
      from: config.auth.user,
      to: "samratakash0000@gmail.com",
      subject: "Test email from Portfolio (mail.skycart.xyz)",
      text: "This is a test email to verify SMTP configuration.",
    });
    console.log("Message sent: %s", info.messageId);
    return; 
  } catch (err) {
    console.error(`FAILED with config: host=${config.host}, user=${config.auth.user} ->`, err.message);
  }
}

testMail();

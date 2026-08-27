import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.MAIL_USER,
    pass: process.env.MAIL_APP_PASSWORD,
  },
});

interface SendOtpEmailParams {
  email: string;
  otp: string;
}

export async function sendOtpEmail({ email, otp }: SendOtpEmailParams) {
  await transporter.sendMail({
    from: `"CaseDesk" <${process.env.MAIL_USER}>`,
    to: email,
    subject: `${otp} is your CaseDesk verification code`,
    html: buildOtpEmailTemplate(otp),
  });
}

function buildOtpEmailTemplate(otp: string): string {
  const brandNavy = "#1e3a5f";
  const brandBlue = "#3b82c4";

  return `
<!DOCTYPE html>
<html>
  <body style="margin:0; padding:0; background-color:#eef1f5; font-family:-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;">
    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background-color:#eef1f5; padding:40px 0;">
      <tr>
        <td align="center">
          <table role="presentation" width="420" cellpadding="0" cellspacing="0" style="background-color:#ffffff; border-radius:12px; overflow:hidden;">

            <!-- Top accent bar -->
            <tr>
              <td style="height:3px; background-color:${brandNavy}; background-image:linear-gradient(90deg, ${brandNavy}, ${brandBlue});"></td>
            </tr>

            <!-- Wordmark -->
            <tr>
              <td style="padding:32px 36px 0 36px;">
                <!--[if mso]>
                <span style="font-family:Georgia,'Times New Roman',serif; font-size:22px; font-weight:700; color:${brandNavy};">CaseDesk</span>
                <![endif]-->
                <!--[if !mso]><!-->
                <span style="font-family:Georgia,'Times New Roman',serif; font-size:22px; font-weight:700; letter-spacing:-0.01em; background:linear-gradient(135deg, ${brandNavy}, ${brandBlue}); -webkit-background-clip:text; background-clip:text; color:transparent;">CaseDesk</span>
                <!--<![endif]-->
                <div style="width:28px; height:2px; background-color:${brandNavy}; background-image:linear-gradient(90deg, ${brandNavy}, ${brandBlue}); margin-top:8px;"></div>
              </td>
            </tr>

            <!-- Body -->
            <tr>
              <td style="padding:28px 36px 32px 36px; text-align:center;">

                <!-- Icon circle -->
                <table role="presentation" cellpadding="0" cellspacing="0" style="margin:0 auto 20px auto;">
                  <tr>
                    <td width="48" height="48" style="width:48px; height:48px; border-radius:50%; background-color:#eef2f7; text-align:center; vertical-align:middle;">
                      <span style="font-size:20px; color:${brandNavy}; line-height:48px;">&#10003;</span>
                    </td>
                  </tr>
                </table>

                <p style="margin:0 0 8px 0; font-size:18px; font-weight:500; color:#0f172a; letter-spacing:-0.01em;">
                  Verify your email
                </p>
                <p style="margin:0 0 28px 0; font-size:13px; line-height:1.6; color:#64748b;">
                  Enter the code below in CaseDesk to confirm it's really you.
                </p>

                <!-- OTP code -->
                <table role="presentation" cellpadding="0" cellspacing="0" style="margin:0 auto 20px auto; background-color:#f8fafc; border:1px solid #e2e8f0; border-radius:10px;">
                  <tr>
                    <td style="padding:18px 24px;">
                      <span style="font-family:'Courier New', monospace; font-size:30px; font-weight:600; color:${brandNavy}; letter-spacing:8px;">
                        ${otp}
                      </span>
                    </td>
                  </tr>
                </table>

                <p style="margin:0; font-size:12px; color:#94a3b8;">
                  Expires in 5 minutes
                </p>
              </td>
            </tr>

            <!-- Footer -->
            <tr>
              <td style="background-color:#f8fafc; border-top:1px solid #f1f5f9; padding:24px 36px;">
                <p style="margin:0 0 12px 0; font-size:12px; line-height:1.6; color:#64748b; text-align:center;">
                  Didn't request this code? You can safely ignore this email — your account is still secure.
                </p>
                <div style="height:1px; background-color:#e2e8f0; margin:0 0 12px 0;"></div>
                <p style="margin:0; font-size:11px; color:#94a3b8; text-align:center;">
                  &copy; ${new Date().getFullYear()} CaseDesk. All rights reserved.
                </p>
              </td>
            </tr>

          </table>
        </td>
      </tr>
    </table>
  </body>
</html>
  `.trim();
}
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
    from: `"Case Desk" <${process.env.MAIL_USER}>`,
    to: email,
    subject: `${otp} is your Case Desk verification code`,
    html: buildOtpEmailTemplate(otp),
  });
}

function buildOtpEmailTemplate(otp: string): string {
  const digits = otp.split("");

  return `
<!DOCTYPE html>
<html>
  <body style="margin:0; padding:0; background-color:#f4f4f7; font-family:-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;">
    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background-color:#f4f4f7; padding:40px 0;">
      <tr>
        <td align="center">
          <table role="presentation" width="480" cellpadding="0" cellspacing="0" style="background-color:#ffffff; border-radius:12px; overflow:hidden; box-shadow:0 2px 8px rgba(0,0,0,0.06);">

            <!-- Header -->
            <tr>
              <td style="background-color:#111827; padding:28px 32px;">
                <span style="color:#ffffff; font-size:18px; font-weight:600; letter-spacing:-0.02em;">
                  Case Desk
                </span>
              </td>
            </tr>

            <!-- Body -->
            <tr>
              <td style="padding:40px 32px 24px 32px; text-align:center;">
                <h1 style="margin:0 0 12px 0; font-size:20px; font-weight:600; color:#111827;">
                  Verify your email
                </h1>
                <p style="margin:0 0 32px 0; font-size:14px; line-height:1.6; color:#6b7280;">
                  Enter this code to confirm it's really you.<br />
                  It expires in 5 minutes.
                </p>

                <!-- OTP boxes -->
                <table role="presentation" cellpadding="0" cellspacing="0" style="margin:0 auto;">
                  <tr>
                    ${digits
                      .map(
                        (digit) => `
                    <td style="width:44px; height:52px; background-color:#f9fafb; border:1px solid #e5e7eb; border-radius:8px; text-align:center; vertical-align:middle; font-size:22px; font-weight:700; color:#111827; padding:0 4px;">
                      ${digit}
                    </td>
                    <td style="width:8px;"></td>
                    `,
                      )
                      .join("")}
                  </tr>
                </table>

                <p style="margin:32px 0 0 0; font-size:13px; line-height:1.6; color:#9ca3af;">
                  Didn't request this code? You can safely ignore this email.
                </p>
              </td>
            </tr>

            <!-- Footer -->
            <tr>
              <td style="padding:20px 32px; background-color:#f9fafb; text-align:center;">
                <p style="margin:0; font-size:12px; color:#9ca3af;">
                  &copy; ${new Date().getFullYear()} Case Desk. All rights reserved.
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

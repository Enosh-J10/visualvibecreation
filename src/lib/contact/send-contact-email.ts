import 'server-only';
import { Resend } from 'resend';
import { renderContactEmailHtml } from '../../components/email/ContactEmail';
import { logger } from '../logger';

export type EmailDeliveryResult =
  | { success: true; id?: string }
  | {
      success: false;
      reason: 'provider-error' | 'invalid-response';
    };

export interface SendEmailParams {
  resendApiKey: string;
  fromEmail: string;
  toEmail: string;
  replyToEmail: string;
  name: string;
  message: string;
}

export async function sendContactEmail({
  resendApiKey,
  fromEmail,
  toEmail,
  replyToEmail,
  name,
  message,
}: SendEmailParams): Promise<EmailDeliveryResult> {
  const sanitizedName = name.replace(/[\r\n]/g, '').trim();
  const subject = `Portfolio enquiry from ${sanitizedName}`;
  const timestamp = new Date().toUTCString();

  try {
    const htmlContent = renderContactEmailHtml({
      name: sanitizedName,
      email: replyToEmail,
      message,
      timestamp,
    });

    const resend = new Resend(resendApiKey);
    const result = await resend.emails.send({
      from: fromEmail,
      to: [toEmail],
      replyTo: replyToEmail,
      subject,
      html: htmlContent,
    });

    if (result.error) {
      logger.error('Resend provider reported sending error:', {
        message: result.error.message,
      });
      return { success: false, reason: 'provider-error' };
    }

    if (result.data) {
      logger.info('Resend email sent successfully.', { id: result.data.id });
      return { success: true, id: result.data.id };
    }

    logger.error('Resend returned empty response payload.');
    return { success: false, reason: 'invalid-response' };
  } catch (error: unknown) {
    logger.error('Resend API request caught failure:', error);
    return { success: false, reason: 'provider-error' };
  }
}

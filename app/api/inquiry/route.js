import { createClient } from '@sanity/client';

// This route needs environment variables set in your hosting (Vercel)
// project settings — see .env.example in the project root for details:
//   SANITY_API_WRITE_TOKEN  — a token with write access, from sanity.io/manage
//   RESEND_API_KEY          — from resend.com, for sending the email notification
//   NOTIFY_EMAIL            — the email address that should receive inquiries

const writeClient = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || 'a3wpvljs',
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || 'production',
  apiVersion: '2024-01-01',
  token: process.env.SANITY_API_WRITE_TOKEN,
  useCdn: false,
});

export async function POST(request) {
  const body = await request.json();
  const { name, email, phone, message, product } = body;

  if (!name || !email || !message) {
    return Response.json({ error: 'Missing required fields' }, { status: 400 });
  }

  // 1. Save the inquiry into Sanity so it shows up in the Studio.
  try {
    if (process.env.SANITY_API_WRITE_TOKEN) {
      await writeClient.create({
        _type: 'inquiry',
        name,
        email,
        phone: phone || '',
        message: `${product ? `[${product}] ` : ''}${message}`,
        submittedAt: new Date().toISOString(),
      });
    }
  } catch (err) {
    console.error('Failed to save inquiry to Sanity:', err);
    // Don't fail the whole request just because the CMS write failed —
    // the email notification below is the primary path.
  }

  // 2. Send an instant email notification.
  try {
    if (process.env.RESEND_API_KEY && process.env.NOTIFY_EMAIL) {
      await fetch('https://api.resend.com/emails', {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${process.env.RESEND_API_KEY}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          from: 'Nik Exports Website <inquiries@nikexports.com>',
          to: process.env.NOTIFY_EMAIL,
          subject: `New inquiry${product ? `: ${product}` : ''}`,
          text: `Name: ${name}\nEmail: ${email}\nPhone: ${phone || '-'}\nProduct: ${product || '-'}\n\nMessage:\n${message}`,
        }),
      });
    }
  } catch (err) {
    console.error('Failed to send email notification:', err);
  }

  return Response.json({ ok: true });
}

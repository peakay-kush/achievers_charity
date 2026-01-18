import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

export async function POST(req: Request) {
    try {
        const { name, email, phone, subject, message } = await req.json();

        // Validate basic fields
        if (!name || !email || !subject || !message) {
            return NextResponse.json({ message: 'Missing required fields' }, { status: 400 });
        }

        // Check for required environment variables
        const smtpHost = process.env.SMTP_HOST || 'smtp.gmail.com';
        const smtpPort = Number(process.env.SMTP_PORT) || 465;
        const smtpUser = process.env.SMTP_USER;
        const smtpPass = process.env.SMTP_PASSWORD;

        if (!smtpUser || !smtpPass) {
            console.error('SMTP Error: Missing SMTP_USER or SMTP_PASSWORD environment variables');
            return NextResponse.json({ message: 'Mail server configuration missing' }, { status: 500 });
        }

        // Create a transporter using SMTP
        const transporter = nodemailer.createTransport({
            host: smtpHost,
            port: smtpPort,
            secure: smtpPort === 465, // true for 465, false for other ports (like 587)
            auth: {
                user: smtpUser,
                pass: smtpPass,
            },
            // Add connection timeout
            connectTimeout: 10000,
        } as any);

        const fromName = process.env.SMTP_FROM_NAME || "Achievers Charity Group Contact Form";
        const mailOptions = {
            from: `"${fromName}" <${smtpUser}>`,
            to: 'achieverscharitygroup@gmail.com',
            replyTo: email,
            subject: `Contact Form: ${subject}`,
            text: `
Name: ${name}
Email: ${email}
Phone: ${phone || 'Not provided'}
Subject: ${subject}

Message:
${message}
            `,
            html: `
<div style="font-family: Arial, sans-serif; line-height: 1.6; color: #333;">
    <h2 style="color: #FF5A1F;">New Contact Form Submission</h2>
    <p><strong>Name:</strong> ${name}</p>
    <p><strong>Email:</strong> ${email}</p>
    <p><strong>Phone:</strong> ${phone || 'Not provided'}</p>
    <p><strong>Subject:</strong> ${subject}</p>
    <hr style="border: 0; border-top: 1px solid #eee; margin: 20px 0;">
    <p><strong>Message:</strong></p>
    <p style="white-space: pre-wrap;">${message}</p>
</div>
            `,
        };

        // Send email
        await transporter.sendMail(mailOptions);

        return NextResponse.json({ message: 'Email sent successfully' }, { status: 200 });
    } catch (error: any) {
        console.error('SMTP Error:', error);
        return NextResponse.json({ message: 'Error sending email', error: error.message }, { status: 500 });
    }
}

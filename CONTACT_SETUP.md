# 📧 Contact Form Setup Guide

## 🚀 How to Make Your Contact Form Send Real Messages

I've updated your contact form to send real emails using EmailJS. Here's how to set it up:

### Option 1: EmailJS (Recommended - Free & Easy)

#### Step 1: Create EmailJS Account
1. Go to [https://www.emailjs.com](https://www.emailjs.com)
2. Sign up for a free account
3. You get 200 emails/month free

#### Step 2: Create Email Service
1. In EmailJS dashboard, go to "Email Services"
2. Click "Add New Service"
3. Choose Gmail, Outlook, or any email provider
4. Follow the setup instructions
5. **Copy your Service ID**

#### Step 3: Create Email Template
1. Go to "Email Templates"
2. Click "Create New Template"
3. Use this template content:

```
Subject: New Contact Form Message: {{subject}}

From: {{from_name}} ({{from_email}})
Subject: {{subject}}

Message:
{{message}}

---
Sent from your portfolio contact form
```

4. **Copy your Template ID**

#### Step 4: Get Public Key
1. Go to "Account" in EmailJS dashboard
2. Copy your **Public Key**

#### Step 5: Update Environment Variables
1. Open your `.env.local` file
2. Replace the placeholder values:

```env
NEXT_PUBLIC_EMAILJS_SERVICE_ID=service_xxxxxxxxx
NEXT_PUBLIC_EMAILJS_TEMPLATE_ID=template_xxxxxxxxx  
NEXT_PUBLIC_EMAILJS_PUBLIC_KEY=your_public_key_here
NEXT_PUBLIC_CONTACT_EMAIL=vedrakholia525@gmail.com
```

#### Step 6: Test Your Form
1. Restart your development server: `npm run dev`
2. Fill out and submit the contact form
3. Check your email inbox!

---

### Option 2: Nodemailer + API Route (Advanced)

If you prefer a backend solution, I can help you set up:
1. API route in Next.js
2. Nodemailer with Gmail SMTP
3. Server-side email sending

### Option 3: Third-party Services

#### Formspree
- Simple form endpoint
- 50 submissions/month free
- Just change form action to their URL

#### Netlify Forms (if deploying to Netlify)
- Built-in form handling
- Automatic spam protection

---

## 🛠️ Current Features

✅ **Real email sending** via EmailJS
✅ **Form validation** - all fields required
✅ **Loading states** - shows spinner while sending
✅ **Success/error messages** - user feedback
✅ **Form reset** - clears after successful send
✅ **Environment variables** - secure configuration
✅ **Beautiful animations** - GSAP powered
✅ **Mobile responsive** - works on all devices

## 🎨 Customization

You can customize:
- Email template design
- Success/error messages
- Form fields
- Styling and animations

## 🔒 Security Notes

- Public key is safe to expose (it's meant to be public)
- EmailJS handles rate limiting
- Built-in spam protection
- No sensitive data in frontend

## 📱 Need Help?

If you need help setting up EmailJS or want to implement a different solution, let me know!
# 📧 EmailJS Setup Guide for Contact Form

## 🚀 **What's New:**
Your contact form is now **fully functional** and will actually send emails to your inbox when users submit messages!

## 📋 **Setup Steps:**

### **Step 1: Create EmailJS Account**
1. Go to [EmailJS.com](https://www.emailjs.com/)
2. Sign up for a free account
3. Verify your email address

### **Step 2: Create Email Service**
1. In EmailJS dashboard, go to **"Email Services"**
2. Click **"Add New Service"**
3. Choose **"Gmail"** (or your preferred email provider)
4. Connect your email account
5. Note down your **Service ID** (e.g., `service_abc123`)

### **Step 3: Create Email Template**
1. Go to **"Email Templates"**
2. Click **"Create New Template"**
3. Use this template:

```html
Subject: New Message from Portfolio Contact Form

Hello,

You have received a new message from your portfolio website:

Name: {{from_name}}
Email: {{from_email}}
Message: {{message}}

Best regards,
Your Portfolio Website
```

4. Note down your **Template ID** (e.g., `template_xyz789`)

### **Step 4: Get Your Public Key**
1. Go to **"Account"** → **"API Keys"**
2. Copy your **Public Key** (e.g., `user_abc123def456`)

### **Step 5: Update Your Code**
Replace these placeholders in `script.js`:

```javascript
// Line 147: Replace with your EmailJS Public Key
emailjs.init("YOUR_PUBLIC_KEY");

// Line 175: Replace with your email address
to_email: 'your-email@gmail.com',

// Line 182: Replace with your Service ID and Template ID
emailjs.send('YOUR_SERVICE_ID', 'YOUR_TEMPLATE_ID', templateParams)
```

### **Example with Real Values:**
```javascript
emailjs.init("user_abc123def456");
// ...
to_email: 'hemalatha.donapati@gmail.com',
// ...
emailjs.send('service_abc123', 'template_xyz789', templateParams)
```

## ✨ **Features Added:**

### **✅ Form Validation:**
- Required field validation
- Email format validation
- Real-time error messages

### **✅ Loading States:**
- Button shows "Sending..." with spinner
- Disabled state during submission
- Smooth animations

### **✅ Success/Error Handling:**
- Success notification on successful send
- Error notification if something goes wrong
- Form resets after successful submission

### **✅ Professional UX:**
- Beautiful loading animations
- Clear feedback messages
- Responsive design

## 🔧 **How It Works:**
1. User fills out contact form
2. JavaScript validates the data
3. EmailJS sends email to your inbox
4. User gets success/error notification
5. Form resets if successful

## 📧 **Email Destination:**
All contact form messages will be sent to the email address you specify in the `to_email` field.

## 🛡️ **Security:**
- EmailJS handles all email sending securely
- No sensitive data stored on your website
- Free tier allows 200 emails/month

## 🎯 **Next Steps:**
1. Follow the setup steps above
2. Test the form with your own email
3. Deploy your portfolio
4. Start receiving real messages!

---

**Need Help?** Check out [EmailJS Documentation](https://www.emailjs.com/docs/) for more details. 
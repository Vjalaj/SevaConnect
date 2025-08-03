# 🤝 SevaConnect - Donate with Purpose

<div align="center">

![SevaConnect Logo](https://img.shields.io/badge/SevaConnect-Charitable%20Platform-008080?style=for-the-badge&logo=heart&logoColor=FFD700)

**A beautiful web platform connecting generous hearts with meaningful causes**

[![Next.js](https://img.shields.io/badge/Next.js-15.3.2-black?style=flat-square&logo=next.js)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue?style=flat-square&logo=typescript)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-3.4.1-38B2AC?style=flat-square&logo=tailwind-css)](https://tailwindcss.com/)
[![Firebase](https://img.shields.io/badge/Firebase-11.7.0-orange?style=flat-square&logo=firebase)](https://firebase.google.com/)

[🚀 Live Demo](#) • [📖 Documentation](#setup-guide) • [🤝 Contributing](#) • [💬 Support](#)

</div>

---

## ✨ What is SevaConnect?

**SevaConnect** is a modern, secure donation platform that makes giving back to society simple and meaningful. Built with love using cutting-edge technology, it connects donors with various charitable causes while providing a seamless, trustworthy experience.

### 🎯 Our Mission
To bridge the gap between generous hearts and those in need, making charitable giving accessible, transparent, and impactful for everyone.

---

## 🌟 Features

### 🎁 **For Donors**
- **Multiple Donation Categories**: Support orphanages, cow shelters, old age homes, health initiatives, and more
- **SevaChampion Membership**: Join our exclusive community with a ₹1111 contribution
- **Triple Payment Options**: Choose from Form submission, Razorpay, or Instamojo
- **Instant Certificates**: Get beautiful appreciation certificates automatically
- **Secure Transactions**: Google OAuth protection and encrypted payments

### 👨‍💼 **For Administrators**
- **Google-Protected Admin Panel**: Secure login with Google authentication
- **Gallery Management**: Upload and manage inspiring images with descriptions
- **Payment Configuration**: Easy setup for multiple payment gateways
- **Real-time Dashboard**: Monitor donations and manage content effortlessly

### 🎨 **Design & Experience**
- **Beautiful UI**: Teal, gold, and beige color scheme representing trust and warmth
- **Mobile Responsive**: Perfect experience on all devices
- **Fast Loading**: Optimized with Next.js and modern web technologies
- **Accessible**: Built following web accessibility standards

---

## 🛠️ Technology Stack

<div align="center">

| Frontend | Backend | Database | Authentication | Payments |
|----------|---------|----------|----------------|----------|
| Next.js 15 | Node.js | Firebase | NextAuth.js | Razorpay |
| TypeScript | API Routes | Firestore | Google OAuth | Instamojo |
| Tailwind CSS | Server Actions | - | JWT Tokens | FormSubmit |
| Radix UI | - | - | - | - |

</div>

---

## 🚀 Quick Start

### Prerequisites
- Node.js 18+ installed on your computer
- A Google account for admin access
- Basic understanding of web development (optional)

### Installation

1. **Download the Project**
   ```bash
   git clone https://github.com/your-username/sevaconnect.git
   cd sevaconnect
   ```

2. **Install Dependencies**
   ```bash
   npm install
   ```

3. **Setup Environment** (See detailed guide below)
   ```bash
   cp .env.example .env.local
   # Edit .env.local with your credentials
   ```

4. **Start Development Server**
   ```bash
   npm run dev
   ```

5. **Open in Browser**
   ```
   http://localhost:9002
   ```

---

## 🔧 Environment Setup Guide

### 📧 **Step 1: Email Configuration**

**What you need:** Your email addresses for receiving donations and admin access.

```env
ADMIN_EMAIL=your_admin_email@gmail.com
NEXT_PUBLIC_ADMIN_EMAIL=your_admin_email@gmail.com
RECIPIENT_EMAIL=your_recipient_email@gmail.com
```

**How to get:**
1. Use your Gmail address for `ADMIN_EMAIL` (this person can access admin panel)
2. Use the same email for `NEXT_PUBLIC_ADMIN_EMAIL`
3. Use your organization's email for `RECIPIENT_EMAIL` (receives donation notifications)

---

### 🔐 **Step 2: Google OAuth Setup**

**What you need:** Google login for secure admin access.

```env
GOOGLE_CLIENT_ID=your_google_client_id
GOOGLE_CLIENT_SECRET=your_google_client_secret
```

**How to get (Step by Step):**

1. **Go to Google Cloud Console**
   - Visit: https://console.cloud.google.com/
   - Sign in with your Google account

2. **Create a New Project**
   - Click "Select a project" → "New Project"
   - Name: "SevaConnect" 
   - Click "Create"

3. **Enable Google+ API**
   - Go to "APIs & Services" → "Library"
   - Search "Google+ API"
   - Click on it → Click "Enable"

4. **Create OAuth Credentials**
   - Go to "APIs & Services" → "Credentials"
   - Click "Create Credentials" → "OAuth 2.0 Client IDs"
   - Choose "Web application"
   - Name: "SevaConnect Auth"

5. **Add Authorized URLs**
   - Authorized JavaScript origins: `http://localhost:9002`
   - Authorized redirect URIs: `http://localhost:9002/api/auth/callback/google`
   - Click "Create"

6. **Copy Your Credentials**
   - Copy "Client ID" → paste as `GOOGLE_CLIENT_ID`
   - Copy "Client Secret" → paste as `GOOGLE_CLIENT_SECRET`

---

### 🔒 **Step 3: NextAuth Configuration**

**What you need:** Secret key for session security.

```env
NEXTAUTH_SECRET=your_nextauth_secret_key
NEXTAUTH_URL=http://localhost:9002
```

**How to get:**
1. **Generate Secret Key:**
   - Visit: https://generate-secret.vercel.app/32
   - Copy the generated key
   - Paste as `NEXTAUTH_SECRET`

2. **Set URL:**
   - Use `http://localhost:9002` for development
   - Change to your domain for production

---

### 💳 **Step 4: Razorpay Payment Setup**

**What you need:** Razorpay account for accepting payments.

```env
RAZORPAY_KEY_ID=your_razorpay_key_id
RAZORPAY_KEY_SECRET=your_razorpay_key_secret
NEXT_PUBLIC_RAZORPAY_KEY_ID=your_razorpay_key_id
```

**How to get (Step by Step):**

1. **Create Razorpay Account**
   - Visit: https://razorpay.com/
   - Click "Sign Up" → Fill details → Verify email

2. **Complete KYC**
   - Upload required documents
   - Wait for approval (usually 24-48 hours)

3. **Get API Keys**
   - Go to Dashboard → Settings → API Keys
   - Click "Generate Test Key" (for testing)
   - Copy "Key Id" → paste as `RAZORPAY_KEY_ID` and `NEXT_PUBLIC_RAZORPAY_KEY_ID`
   - Copy "Key Secret" → paste as `RAZORPAY_KEY_SECRET`

4. **For Production:**
   - Click "Generate Live Key" after KYC approval
   - Replace test keys with live keys

---

### 💰 **Step 5: Instamojo Payment Setup**

**What you need:** Instamojo account for additional payment options.

```env
INSTAMOJO_API_KEY=your_instamojo_api_key
INSTAMOJO_AUTH_TOKEN=your_instamojo_auth_token
INSTAMOJO_ENDPOINT=https://test.instamojo.com/api/1.1/
```

**How to get (Step by Step):**

1. **Create Instamojo Account**
   - Visit: https://www.instamojo.com/
   - Click "Sign Up" → Fill details → Verify email

2. **Complete Profile**
   - Add business details
   - Upload required documents
   - Wait for approval

3. **Get API Credentials**
   - Go to Dashboard → Settings → API & Plugins
   - Find "API Details" section
   - Copy "API Key" → paste as `INSTAMOJO_API_KEY`
   - Copy "Auth Token" → paste as `INSTAMOJO_AUTH_TOKEN`

4. **Set Endpoint**
   - Use `https://test.instamojo.com/api/1.1/` for testing
   - Use `https://www.instamojo.com/api/1.1/` for production

---

## 📁 Project Structure

```
SevaConnect/
├── 📂 src/
│   ├── 📂 app/                    # Next.js App Router
│   │   ├── 📂 admin/              # Admin panel pages
│   │   ├── 📂 api/                # API routes
│   │   ├── 📂 gallery/            # Public gallery
│   │   └── 📂 payment/            # Payment pages
│   ├── 📂 components/             # Reusable components
│   │   ├── 📂 donation/           # Donation forms
│   │   ├── 📂 membership/         # Membership components
│   │   ├── 📂 layout/             # Layout components
│   │   └── 📂 ui/                 # UI components
│   └── 📂 lib/                    # Utilities & configs
├── 📂 public/                     # Static assets
├── 📄 .env.example               # Environment template
├── 📄 .env.local                 # Your environment variables
└── 📄 README.md                  # This file
```

---

## 🎨 Design System

### 🎨 **Color Palette**
- **Primary (Teal)**: `#008080` - Trust, stability, charitable spirit
- **Secondary (Beige)**: `#F5F5DC` - Warmth, comfort, approachability  
- **Accent (Gold)**: `#FFD700` - Premium, appreciation, value

### 🖼️ **Typography**
- **Headings**: Geist Sans - Modern, clean, professional
- **Body**: Geist Sans - Readable, accessible
- **Certificates**: Caveat - Elegant, handwritten feel

---

## 🔐 Security Features

- **🛡️ Google OAuth**: Secure admin authentication
- **🔒 Session Management**: JWT-based secure sessions
- **🚫 Email Restriction**: Admin access limited to specific email
- **🔐 Environment Variables**: Sensitive data protected
- **✅ Input Validation**: All forms validated with Zod
- **🌐 HTTPS Ready**: Production-ready security headers

---

## 📱 Usage Guide

### 👥 **For Donors**

1. **Choose a Cause**
   - Browse donation categories on homepage
   - Click on category that resonates with you

2. **Make a Donation**
   - Fill in your name, email, and amount
   - Choose payment method:
     - 📝 Form submission (email notification)
     - 💳 Razorpay (instant payment)
     - 💰 Instamojo (alternative payment)

3. **Get Certificate**
   - Receive instant appreciation certificate
   - Certificate automatically generated with your name

4. **Join SevaChampion**
   - Become a member with ₹1111 contribution
   - Get exclusive SevaChampion certificate

### 👨‍💼 **For Administrators**

1. **Access Admin Panel**
   - Visit `/admin`
   - Sign in with Google (must be authorized email)

2. **Manage Gallery**
   - Upload images using any public URL
   - Add descriptions for each image
   - Delete unwanted items

3. **Configure Settings**
   - Update payment gateway credentials
   - Modify recipient email addresses

---

## 🚀 Deployment

### **Vercel (Recommended)**

1. **Connect Repository**
   - Push code to GitHub
   - Connect Vercel to your repository

2. **Add Environment Variables**
   - Copy all variables from `.env.local`
   - Add them in Vercel dashboard

3. **Deploy**
   - Vercel automatically deploys on push
   - Update Google OAuth URLs to production domain

### **Other Platforms**
- **Netlify**: Similar process to Vercel
- **Railway**: Great for full-stack apps
- **DigitalOcean**: For custom server setup

---

## 🤝 Contributing

We welcome contributions! Here's how you can help:

1. **🍴 Fork the repository**
2. **🌿 Create a feature branch**: `git checkout -b feature/amazing-feature`
3. **💾 Commit changes**: `git commit -m 'Add amazing feature'`
4. **📤 Push to branch**: `git push origin feature/amazing-feature`
5. **🔄 Open a Pull Request**

### **Development Guidelines**
- Follow TypeScript best practices
- Use Tailwind CSS for styling
- Write meaningful commit messages
- Test your changes thoroughly

---

## 📞 Support

Need help? We're here for you!

- **📧 Email**: support@sevaconnect.com
- **💬 Discord**: [Join our community](#)
- **📖 Documentation**: [Full docs](#)
- **🐛 Issues**: [GitHub Issues](https://github.com/your-username/sevaconnect/issues)

---

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

## 🙏 Acknowledgments

- **Next.js Team** - For the amazing framework
- **Vercel** - For hosting and deployment
- **Radix UI** - For accessible components
- **Tailwind CSS** - For beautiful styling
- **All Contributors** - For making this project better

---

<div align="center">

**Made with ❤️ for a better world**

*SevaConnect - Where generosity meets technology*

[![⭐ Star this repo](https://img.shields.io/github/stars/your-username/sevaconnect?style=social)](https://github.com/your-username/sevaconnect)

</div>
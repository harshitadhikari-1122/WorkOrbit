# Freelancer CRM Platform

A comprehensive CRM platform designed specifically for independent freelancers to efficiently manage clients, projects, communications, and business operations in one intuitive application.

## 🚀 Features

### Core Functionality
- **Client Management**: Complete client database with contact details, project history, notes, and customizable fields
- **Project Tracking**: Visual Kanban boards and list views with deadline tracking and milestones
- **Communication Hub**: Log emails, calls, meetings with automated follow-up reminders
- **Invoice Management**: Create, send, and track invoices with payment status updates
- **Lead Management**: Capture and nurture leads with sales pipeline automation
- **Task Management**: Organize tasks with priorities, deadlines, and progress tracking

### Advanced Features
- **AI-Powered Automation**: Smart suggestions for communication timing and follow-ups
- **Analytics Dashboard**: Real-time insights into revenue, client activity, and project performance
- **Mobile Responsive**: Work seamlessly across all devices with offline capabilities
- **Secure Authentication**: Enterprise-grade security with data encryption
- **Integrations**: Connect with popular email, calendar, accounting, and storage platforms

### Business Intelligence
- **Revenue Analytics**: Track income trends, client profitability, and payment statuses
- **Project Analytics**: Monitor project progress, time tracking, and resource allocation
- **Client Insights**: Understand client behavior, communication patterns, and satisfaction
- **Performance Metrics**: Measure productivity, response times, and business growth

## 🛠️ Tech Stack

- **Frontend**: Next.js 14, React 18, TypeScript
- **Styling**: Tailwind CSS, Lucide React Icons
- **Database**: PostgreSQL with Prisma ORM
- **Authentication**: NextAuth.js
- **Charts**: Recharts
- **Forms**: React Hook Form with Zod validation
- **Drag & Drop**: React Beautiful DnD
- **State Management**: React Query
- **Notifications**: React Hot Toast
- **File Upload**: Cloudinary
- **Payments**: Stripe integration

## 📋 Prerequisites

Before you begin, ensure you have the following installed:
- Node.js 18+ 
- npm or yarn
- PostgreSQL database
- Git

## 🚀 Quick Start

### 1. Clone the Repository
```bash
git clone <repository-url>
cd freelancer-crm
```

### 2. Install Dependencies
```bash
npm install
# or
yarn install
```

### 3. Environment Setup
Copy the example environment file and configure your variables:
```bash
cp env.example .env.local
```

Update the `.env.local` file with your configuration:
```env
# Database
DATABASE_URL="postgresql://username:password@localhost:5432/freelancer_crm"

# NextAuth.js
NEXTAUTH_URL="http://localhost:3000"
NEXTAUTH_SECRET="your-secret-key-here"

# Email (for notifications and communications)
EMAIL_SERVER_HOST="smtp.gmail.com"
EMAIL_SERVER_PORT=587
EMAIL_SERVER_USER="your-email@gmail.com"
EMAIL_SERVER_PASSWORD="your-app-password"

# Stripe (for payments)
STRIPE_PUBLISHABLE_KEY="pk_test_your-stripe-publishable-key"
STRIPE_SECRET_KEY="sk_test_your-stripe-secret-key"
STRIPE_WEBHOOK_SECRET="whsec_your-webhook-secret"

# Cloudinary (for file uploads)
CLOUDINARY_CLOUD_NAME="your-cloud-name"
CLOUDINARY_API_KEY="your-api-key"
CLOUDINARY_API_SECRET="your-api-secret"

# AI Services (for automation features)
OPENAI_API_KEY="your-openai-api-key"

# External Integrations
GOOGLE_CLIENT_ID="your-google-client-id"
GOOGLE_CLIENT_SECRET="your-google-client-secret"

# App Configuration
NODE_ENV="development"
NEXT_PUBLIC_APP_URL="http://localhost:3000"
```

### 4. Database Setup
```bash
# Generate Prisma client
npm run db:generate

# Push schema to database
npm run db:push

# (Optional) Seed database with sample data
npm run db:seed
```

### 5. Start Development Server
```bash
npm run dev
# or
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) to view the application.

## 📁 Project Structure

```
src/
├── app/                    # Next.js App Router
│   ├── auth/              # Authentication pages
│   ├── dashboard/         # Dashboard and main app pages
│   ├── globals.css        # Global styles
│   ├── layout.tsx         # Root layout
│   └── page.tsx           # Landing page
├── components/            # Reusable components
│   ├── providers/         # Context providers
│   ├── ui/               # UI components
│   └── forms/            # Form components
├── lib/                  # Utility libraries
├── types/                # TypeScript type definitions
└── utils/                # Helper functions
```

## 🔧 Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint
- `npm run db:generate` - Generate Prisma client
- `npm run db:push` - Push schema to database
- `npm run db:studio` - Open Prisma Studio
- `npm run db:seed` - Seed database with sample data

## 🎨 Customization

### Styling
The application uses Tailwind CSS for styling. You can customize the design system in `tailwind.config.js`:

```javascript
module.exports = {
  theme: {
    extend: {
      colors: {
        primary: {
          // Customize primary colors
        },
        // Add more custom colors
      },
    },
  },
}
```

### Database Schema
Modify the database schema in `prisma/schema.prisma` and run:
```bash
npm run db:generate
npm run db:push
```

## 🔒 Security Features

- **Authentication**: Secure user authentication with NextAuth.js
- **Data Encryption**: All sensitive data is encrypted at rest
- **Input Validation**: Comprehensive form validation with Zod
- **CSRF Protection**: Built-in CSRF protection
- **Rate Limiting**: API rate limiting for security
- **Secure Headers**: Security headers configured

## 📱 Mobile Responsiveness

The application is fully responsive and optimized for:
- Desktop computers
- Tablets
- Mobile phones
- Offline functionality

## 🔌 Integrations

### Available Integrations
- **Email**: Gmail, Outlook, SMTP
- **Calendar**: Google Calendar, Outlook Calendar
- **Storage**: Google Drive, Dropbox, OneDrive
- **Accounting**: QuickBooks, Xero, FreshBooks
- **Payments**: Stripe, PayPal, Square
- **Communication**: Slack, Microsoft Teams

### Adding New Integrations
1. Create integration configuration in `src/lib/integrations/`
2. Add integration types to the database schema
3. Implement integration logic in API routes
4. Add UI components for integration management

## 🚀 Deployment

### Vercel (Recommended)
1. Connect your GitHub repository to Vercel
2. Configure environment variables in Vercel dashboard
3. Deploy automatically on push to main branch

### Other Platforms
The application can be deployed to any platform that supports Next.js:
- Netlify
- Railway
- DigitalOcean App Platform
- AWS Amplify

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🆘 Support

For support and questions:
- Create an issue in the GitHub repository
- Check the documentation in the `/docs` folder
- Contact the development team

## 🗺️ Roadmap

### Upcoming Features
- [ ] Advanced reporting and analytics
- [ ] Team collaboration features
- [ ] Advanced automation workflows
- [ ] Mobile app (React Native)
- [ ] API for third-party integrations
- [ ] Multi-language support
- [ ] Advanced project templates
- [ ] Time tracking integration
- [ ] Expense management
- [ ] Tax reporting features

### Version History
- **v1.0.0** - Initial release with core CRM features
- **v1.1.0** - Added advanced analytics and reporting
- **v1.2.0** - Enhanced automation and AI features
- **v1.3.0** - Mobile app and offline capabilities

---

Built with ❤️ for freelancers worldwide




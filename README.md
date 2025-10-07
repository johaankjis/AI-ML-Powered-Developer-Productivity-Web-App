# DevBoost AI - Developer Productivity Platform

## 🚀 Overview

DevBoost AI is an AI-powered developer productivity platform designed to accelerate development workflows through intelligent automation. The platform provides automated test generation, smart documentation, code review, and real-time team analytics to help modern development teams work more efficiently.

### Key Benefits
- **24%** Faster Code Reviews
- **35%** Fewer Security Issues  
- **31%** Faster Deployments
- **40%** Higher Adoption Rate

## ✨ Features

### 1. AI-Powered Code Analysis
- **Test Generation**: Automatically generate comprehensive test cases with edge cases, error handling, and boundary conditions using Jest/Vitest syntax
- **Documentation Generator**: Create JSDoc/TSDoc style documentation with parameter descriptions, return values, usage examples, and warnings
- **Code Review**: Automated code review identifying security vulnerabilities, performance issues, code quality problems, and maintainability concerns

### 2. Authentication & Security
- JWT-based authentication with secure httpOnly cookies
- Role-Based Access Control (RBAC) with three roles: Admin, Developer, and Viewer
- Session management with 7-day token expiration
- Secure cookie configuration for production environments

### 3. Real-Time Notifications
- WebSocket-powered notification system
- Real-time updates for team activities
- Notification bell component with unread indicators

### 4. Team Management
- User role management (Admin, Developer, Viewer)
- Team activity tracking
- Performance metrics and analytics

### 5. Analytics Dashboard
- Real-time telemetry and metrics
- Deployment performance tracking
- Team activity visualization
- Performance charts and graphs

## 🛠️ Tech Stack

### Frontend
- **Framework**: Next.js 15.2.4 (React 19)
- **Language**: TypeScript 5
- **Styling**: Tailwind CSS 4.1.9
- **UI Components**: Radix UI primitives
- **Icons**: Lucide React
- **Charts**: Recharts
- **Fonts**: Geist Sans & Geist Mono

### Backend
- **Runtime**: Next.js API Routes
- **AI Integration**: Vercel AI SDK
- **Authentication**: JWT (jose library)
- **Validation**: Zod schemas

### Development Tools
- **Package Manager**: pnpm
- **Code Quality**: ESLint (Next.js config)
- **PostCSS**: Autoprefixer
- **Analytics**: Vercel Analytics

## 📁 Project Structure

```
AI-ML-Powered-Developer-Productivity-Web-App/
├── app/                          # Next.js App Router
│   ├── api/                      # API routes
│   │   ├── ai/                   # AI-powered features
│   │   │   ├── generate-tests/   # Test generation endpoint
│   │   │   ├── generate-docs/    # Documentation generation endpoint
│   │   │   └── review-code/      # Code review endpoint
│   │   └── auth/                 # Authentication endpoints
│   │       ├── login/
│   │       ├── signup/
│   │       ├── logout/
│   │       └── me/
│   ├── dashboard/                # Dashboard pages
│   │   ├── analytics/            # Analytics page
│   │   ├── code-analysis/        # Code analysis page
│   │   ├── team/                 # Team management page
│   │   └── page.tsx              # Main dashboard
│   ├── login/                    # Login page
│   ├── signup/                   # Signup page
│   ├── layout.tsx                # Root layout
│   ├── page.tsx                  # Landing page
│   └── globals.css               # Global styles
├── components/                   # React components
│   ├── analytics/                # Analytics components
│   │   ├── deployment-metrics.tsx
│   │   ├── metrics-overview.tsx
│   │   ├── performance-chart.tsx
│   │   ├── team-activity.tsx
│   │   └── telemetry-dashboard.tsx
│   ├── auth/                     # Authentication components
│   │   ├── login-form.tsx
│   │   └── signup-form.tsx
│   ├── code-analysis/            # Code analysis components
│   │   ├── code-analysis-interface.tsx
│   │   ├── code-reviewer.tsx
│   │   ├── doc-generator.tsx
│   │   └── test-generator.tsx
│   ├── dashboard/                # Dashboard components
│   │   ├── dashboard-header.tsx
│   │   └── stats-overview.tsx
│   ├── notifications/            # Notification system
│   │   ├── notification-bell.tsx
│   │   └── notification-provider.tsx
│   ├── team/                     # Team management
│   │   └── team-management.tsx
│   ├── ui/                       # Reusable UI components (60+ components)
│   └── theme-provider.tsx        # Theme context provider
├── lib/                          # Utility libraries
│   ├── auth.ts                   # Authentication utilities
│   └── utils.ts                  # General utilities
├── hooks/                        # Custom React hooks
│   ├── use-mobile.ts
│   └── use-toast.ts
├── public/                       # Static assets
├── styles/                       # Additional styles
├── components.json               # shadcn/ui configuration
├── next.config.mjs               # Next.js configuration
├── tailwind.config.ts            # Tailwind CSS configuration
├── tsconfig.json                 # TypeScript configuration
└── package.json                  # Dependencies and scripts
```

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ or 20+
- pnpm (recommended) or npm

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/johaankjis/AI-ML-Powered-Developer-Productivity-Web-App.git
   cd AI-ML-Powered-Developer-Productivity-Web-App
   ```

2. **Install dependencies**
   ```bash
   pnpm install
   # or
   npm install
   ```

3. **Set up environment variables**
   Create a `.env.local` file in the root directory:
   ```env
   # JWT Secret (change in production)
   JWT_SECRET=your-secret-key-change-in-production
   
   # OpenAI API Key (for AI features)
   OPENAI_API_KEY=your-openai-api-key
   
   # Node Environment
   NODE_ENV=development
   ```

4. **Run the development server**
   ```bash
   pnpm dev
   # or
   npm run dev
   ```

5. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

### Build for Production

```bash
pnpm build
pnpm start
# or
npm run build
npm start
```

## 🔐 Authentication

### Default Test Accounts

The application includes mock users for testing:

| Email | Password | Role |
|-------|----------|------|
| admin@devboost.ai | admin123 | Admin |
| dev@devboost.ai | dev123 | Developer |

**⚠️ Important**: Replace the mock authentication system with a real database in production.

### User Roles

- **Admin**: Full access to all features, user management, and system settings
- **Developer**: Access to code analysis tools, documentation, and team features
- **Viewer**: Read-only access to dashboards and reports

## 📖 API Documentation

### AI Endpoints

#### Generate Tests
```
POST /api/ai/generate-tests
Content-Type: application/json

{
  "code": "function calculateTotal(items) { return items.reduce((sum, item) => sum + item.price, 0); }"
}

Response:
{
  "tests": "describe('calculateTotal', () => { ... })"
}
```

#### Generate Documentation
```
POST /api/ai/generate-docs
Content-Type: application/json

{
  "code": "function calculateTotal(items) { return items.reduce((sum, item) => sum + item.price, 0); }"
}

Response:
{
  "documentation": "/**\n * Calculates the total price...\n */"
}
```

#### Review Code
```
POST /api/ai/review-code
Content-Type: application/json

{
  "code": "async function fetchData(url) { const response = await fetch(url); return response.json(); }"
}

Response:
{
  "issues": [
    {
      "severity": "warning",
      "category": "Error Handling",
      "message": "Missing error handling for failed requests",
      "suggestion": "Add try-catch block and check response.ok"
    }
  ]
}
```

### Authentication Endpoints

#### Login
```
POST /api/auth/login
Content-Type: application/json

{
  "email": "dev@devboost.ai",
  "password": "dev123"
}

Response:
{
  "success": true,
  "user": {
    "id": "2",
    "email": "dev@devboost.ai",
    "name": "Developer User",
    "role": "developer"
  }
}
```

#### Signup
```
POST /api/auth/signup
Content-Type: application/json

{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "securepassword"
}
```

#### Logout
```
POST /api/auth/logout

Response:
{
  "success": true
}
```

#### Get Current User
```
GET /api/auth/me

Response:
{
  "id": "2",
  "email": "dev@devboost.ai",
  "name": "Developer User",
  "role": "developer"
}
```

## 🎨 Component Library

The application uses a comprehensive UI component library built on Radix UI primitives, including:

- **Layout**: Card, Separator, Tabs, Accordion, Collapsible
- **Forms**: Input, Textarea, Select, Checkbox, Radio Group, Switch, Slider
- **Navigation**: Button, Navigation Menu, Breadcrumb, Pagination
- **Feedback**: Alert, Toast, Dialog, Alert Dialog, Drawer, Sheet
- **Data Display**: Table, Badge, Avatar, Tooltip, Hover Card
- **Overlays**: Popover, Dropdown Menu, Context Menu, Command Menu
- **Charts**: Recharts integration for data visualization

## 🔧 Configuration

### Next.js Configuration
The `next.config.mjs` file contains Next.js-specific settings. Customize it for your deployment environment.

### Tailwind CSS
Tailwind configuration is managed in `postcss.config.mjs` using the latest Tailwind v4 with PostCSS integration.

### TypeScript
TypeScript configuration in `tsconfig.json` includes:
- Strict mode enabled
- Path aliases configured (`@/*` points to root)
- ES6 target with ESNext modules

## 🏗️ Development Workflow

### Code Style
- Follow TypeScript best practices
- Use functional components with hooks
- Leverage Next.js App Router conventions
- Implement proper error handling

### Component Development
1. Create components in the appropriate directory
2. Use TypeScript for type safety
3. Follow the existing component patterns
4. Import UI components from `@/components/ui`

### Adding New Features
1. Create API routes in `app/api/`
2. Add corresponding components in `components/`
3. Update pages in `app/`
4. Test authentication flows
5. Ensure responsive design

## 🧪 Testing

### Running Linter
```bash
pnpm lint
# or
npm run lint
```

### Code Quality
- ESLint is configured with Next.js recommended rules
- Type checking via TypeScript compiler
- Ensure all components pass TypeScript checks

## 🚢 Deployment

### Vercel (Recommended)
1. Push your code to GitHub
2. Import the project in Vercel
3. Configure environment variables
4. Deploy automatically

### Other Platforms
The application is a standard Next.js app and can be deployed to:
- AWS (Amplify, ECS, EC2)
- Google Cloud Platform
- Azure
- DigitalOcean
- Railway
- Render

### Environment Variables for Production
- Set `NODE_ENV=production`
- Use a strong `JWT_SECRET`
- Configure proper `OPENAI_API_KEY`
- Enable secure cookies (automatic in production)

## 📝 Key Files

| File | Purpose |
|------|---------|
| `lib/auth.ts` | JWT authentication, token creation/verification, cookie management |
| `app/layout.tsx` | Root layout with fonts and analytics |
| `app/page.tsx` | Landing page with features showcase |
| `components/code-analysis/code-analysis-interface.tsx` | Main interface for code analysis features |
| `components/dashboard/stats-overview.tsx` | Dashboard statistics display |
| `lib/utils.ts` | Utility functions (className merging, etc.) |

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🙏 Acknowledgments

- Built with [Next.js](https://nextjs.org/)
- UI components from [Radix UI](https://www.radix-ui.com/)
- Icons from [Lucide](https://lucide.dev/)
- AI powered by [Vercel AI SDK](https://sdk.vercel.ai/)
- Styled with [Tailwind CSS](https://tailwindcss.com/)

## 📞 Support

For questions and support, please open an issue in the GitHub repository.

---

**DevBoost AI** - Accelerating development with AI-powered productivity tools

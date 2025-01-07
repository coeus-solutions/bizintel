# Business Intelligence System

A modern web application for analyzing businesses, generating insights, and creating targeted sales pitches using AI.

## Features

- Business Analysis & Insights
- Competitor Analysis
- Market Research
- Customer & Employee Feedback Analysis
- AI-Powered Pitch Generation
- Secure User Authentication

## Tech Stack

- Frontend: React + TypeScript + Vite
- Styling: Tailwind CSS
- Icons: Lucide React
- Environment: Node.js

## Getting Started

### Prerequisites

- Node.js (v16 or higher)
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone [repository-url]
cd bizintel
```

2. Install dependencies:
```bash
npm install
# or
yarn install
```

3. Set up environment variables:
   - Copy `.env.example` to create `.env.development` for development
   - Update the environment variables as needed
```bash
cp .env.example .env.development
```

### Environment Variables

- `VITE_API_BASE_URL`: Base URL for the backend API
  - Development: `http://localhost:8000/api/v1`
  - Production: Your production API URL

### Development

Start the development server:
```bash
npm run dev
# or
yarn dev
```

The application will be available at `http://localhost:5173`

### Building for Production

1. Create `.env.production` with your production environment variables
2. Build the application:
```bash
npm run build
# or
yarn build
```

3. Preview the production build:
```bash
npm run preview
# or
yarn preview
```

## Project Structure

```
bizintel/
├── src/
│   ├── components/     # Reusable UI components
│   ├── context/       # React context providers
│   ├── hooks/         # Custom React hooks
│   ├── pages/         # Page components
│   ├── types/         # TypeScript type definitions
│   └── utils/         # Utility functions
├── public/           # Static assets
└── ...config files
```

## Development Guidelines

1. Use TypeScript for type safety
2. Follow the existing project structure
3. Use Tailwind CSS for styling
4. Implement responsive design
5. Add proper error handling
6. Include loading states
7. Write meaningful commit messages

## API Integration

The application uses a REST API with the following features:
- JWT-based authentication
- JSON request/response format
- Proper error handling
- Environment-based configuration

## Contributing

1. Create a feature branch
2. Make your changes
3. Submit a pull request

## License

[Your License] - See LICENSE file for details 
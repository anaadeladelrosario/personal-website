# Technical Stack Documentation

## Frontend Stack
- **Framework**: React with Vite
- **Language**: TypeScript
- **Key Libraries**:
  - React Router for navigation
  - React Query for data fetching
  - Tailwind CSS for styling
  - React Hook Form for form handling
  - Zod for schema validation

## Backend Stack
- **Framework**: ASP.NET Core
- **Language**: C#
- **Key Components**:
  - Entity Framework Core for database access
  - Identity for authentication
  - REST APIs for frontend communication
  - Azure Blob Storage for image storage

## Database
- **SQL Server** for structured data
  - Recipe information
  - User data
  - Measurement conversions
  - Categories and tags

## Infrastructure
- **Development Environment**:
  - Visual Studio Code for frontend
  - Visual Studio for backend
  - Docker for containerization
  - Git for version control

- **Deployment Options**:
  - Azure App Service for hosting
  - Azure SQL Database
  - Azure Blob Storage for images
  - Azure Key Vault for secrets

## Project Structure

### Frontend (`/src/frontend`)
```
frontend/
├── src/
│   ├── components/
│   │   ├── recipe/
│   │   ├── conversion/
│   │   └── shared/
│   ├── hooks/
│   ├── pages/
│   ├── services/
│   ├── types/
│   └── utils/
├── public/
├── tests/
└── package.json
```

### Backend (`/src/backend`)
```
backend/
├── RecipeManager.API/
│   ├── Controllers/
│   ├── Models/
│   ├── Services/
│   └── Program.cs
├── RecipeManager.Core/
│   ├── Entities/
│   ├── Interfaces/
│   └── Services/
├── RecipeManager.Infrastructure/
│   ├── Data/
│   ├── Repositories/
│   └── Services/
└── RecipeManager.Tests/
```

## Key Features Implementation

### Measurement Conversion
- Implement conversion service in backend
- Create reusable frontend components
- Support for common cooking measurements
- Persist user preferences

### Recipe Management
- CRUD operations via REST API
- Image upload with Azure Blob Storage
- Rich text editor for recipe instructions
- Tags and categories system

### Authentication & Authorization
- ASP.NET Core Identity
- JWT tokens for API authentication
- Role-based access control
- Secure password handling

### User Experience
- Responsive design
- Offline capability
- Real-time collaboration
- Image optimization

## Development Workflow
1. Local development using Docker
2. Git workflow with feature branches
3. CI/CD pipeline with Azure DevOps
4. Automated testing at both ends

## Security Considerations
- HTTPS enforcement
- JWT token authentication
- CORS policy
- Input validation
- XSS protection
- SQL injection prevention
- Secure file upload handling

This technical stack leverages both team members' strengths:
- Isabella's frontend expertise with TypeScript and React
- James's backend proficiency with ASP.NET Core
- Shared knowledge of C# for better collaboration

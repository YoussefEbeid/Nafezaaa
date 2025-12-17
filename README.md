# Nafeza - National Single Window for Foreign Trade

[![TypeScript](https://img.shields.io/badge/TypeScript-71.3%25-blue)](https://www.typescriptlang.org/)
[![C#](https://img.shields.io/badge/C%23-28.4%25-purple)](https://dotnet.microsoft.com/)
[![Next.js](https://img.shields.io/badge/Next.js-14-black)](https://nextjs.org/)
[![.NET](https://img.shields.io/badge/.NET-8.0-purple)](https://dotnet.microsoft.com/)

A comprehensive blockchain-powered platform connecting importers, exporters, and customs in Egypt's National Single Window system. This project implements the Advance Cargo Information (ACI) system for streamlined trade declarations and customs clearance.

## 📋 Table of Contents

- [Overview](#overview)
- [Features](#features)
- [Tech Stack](#tech-stack)
- [Architecture](#architecture)
- [Project Structure](#project-structure)
- [Getting Started](#getting-started)
- [API Documentation](#api-documentation)
- [Database Schema](#database-schema)
- [Development](#development)
- [Contributing](#contributing)

## 🎯 Overview

Nafeza is Egypt's National Single Window platform that digitizes and streamlines the foreign trade process. The system allows:

- **Importers** to submit Advance Cargo Information (ACI) requests 48 hours before shipping
- **Exporters** to upload shipping documents via CargoX blockchain integration
- **Customs** to process declarations efficiently with risk assessment
- **All parties** to track shipment status in real-time

The platform ensures compliance with Egyptian customs regulations while providing a modern, user-friendly interface for all stakeholders.

## ✨ Features

### 🔐 Authentication & Authorization
- Multi-factor authentication (Email/Password, Tax ID, CargoX ID)
- JWT-based secure authentication
- e-Token USB support for digital signatures
- Role-based access control (Importer, Exporter, Customs Broker)

### 📦 ACI Request Management
- Create and manage ACI requests
- Multi-step form workflow (Parties → Invoice Data → Review)
- Real-time status tracking (Draft → Submitted → Approved)
- ACID number generation (19-digit format: `2025-EG-12345678901234`)
- 6-month validity period for approved ACIDs

### 📊 Dashboard & Analytics
- Real-time dashboard with key metrics
- Active shipments tracking
- Pending approvals monitoring
- Wallet balance display
- Recent declarations history

### 🔍 Tariff Search
- HS Code lookup by item number
- Text-based search with chapter filtering
- Duty rate information
- Comprehensive tariff database

### 💱 Currency Rates
- Real-time exchange rates
- Multiple currency support (USD, EUR, GBP, CNY)
- Daily change tracking

### 📱 Responsive Design
- Fully responsive mobile-first design
- Modern UI with Tailwind CSS
- Bilingual support (English/Arabic)
- Accessible and user-friendly interface

### 🔒 Security Features
- Blockchain integration via CargoX
- Secure document upload
- Audit trail for all transactions
- Data encryption and secure storage

## 🛠 Tech Stack

### Frontend
- **Framework**: Next.js 14 (React 18)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **State Management**: Zustand
- **Data Fetching**: TanStack Query (React Query)
- **Forms**: React Hook Form + Zod validation
- **Icons**: Lucide React
- **Charts**: Recharts

### Backend
- **Framework**: ASP.NET Core 8.0
- **Language**: C#
- **Architecture**: Clean Architecture (DDD)
- **ORM**: Entity Framework Core
- **Authentication**: JWT Bearer Tokens
- **API**: RESTful API
- **Database**: SQL Server (configurable)

### Development Tools
- **Package Manager**: npm (Frontend), NuGet (Backend)
- **Build Tool**: Next.js, .NET CLI
- **Code Quality**: ESLint, TypeScript

## 🏗 Architecture

The project follows **Clean Architecture** principles with clear separation of concerns:

```
┌─────────────────────────────────────────────────────────┐
│                    Presentation Layer                    │
│  ┌──────────────┐              ┌──────────────┐        │
│  │  Next.js UI  │              │  API Controllers │     │
│  │  (React)     │◄─────────────►│  (ASP.NET)    │     │
│  └──────────────┘              └──────────────┘        │
└─────────────────────────────────────────────────────────┘
                          │
                          ▼
┌─────────────────────────────────────────────────────────┐
│                  Application Layer                       │
│  ┌──────────────┐              ┌──────────────┐        │
│  │  Commands    │              │  Queries     │        │
│  │  (CQRS)      │              │  (MediatR)   │        │
│  └──────────────┘              └──────────────┘        │
└─────────────────────────────────────────────────────────┘
                          │
                          ▼
┌─────────────────────────────────────────────────────────┐
│                  Domain Layer                            │
│  ┌──────────────┐              ┌──────────────┐        │
│  │  Entities    │              │  Business    │        │
│  │  (DDD)       │              │  Logic      │        │
│  └──────────────┘              └──────────────┘        │
└─────────────────────────────────────────────────────────┘
                          │
                          ▼
┌─────────────────────────────────────────────────────────┐
│              Infrastructure Layer                        │
│  ┌──────────────┐              ┌──────────────┐        │
│  │  EF Core     │              │  External    │        │
│  │  Database    │              │  Services     │        │
│  └──────────────┘              └──────────────┘        │
└─────────────────────────────────────────────────────────┘
```

### Key Architectural Patterns
- **CQRS** (Command Query Responsibility Segregation)
- **MediatR** for request/response handling
- **Repository Pattern** (via EF Core)
- **Domain-Driven Design** (DDD)
- **Dependency Injection**

## 📁 Project Structure

```
Nafeza/
├── client/                          # Frontend (Next.js)
│   ├── src/
│   │   ├── app/                    # Next.js App Router
│   │   │   ├── dashboard/          # Dashboard pages
│   │   │   │   ├── aci/            # ACI management
│   │   │   │   ├── declarations/   # Customs declarations
│   │   │   │   ├── profile/        # Company profile
│   │   │   │   └── tariff/         # Tariff search
│   │   │   ├── auth/               # Authentication pages
│   │   │   └── page.tsx            # Homepage
│   │   ├── components/             # React components
│   │   │   ├── ui/                 # UI components
│   │   │   └── shared/             # Shared components
│   │   ├── features/                # Feature modules
│   │   │   └── aci/                 # ACI feature
│   │   ├── lib/                     # Utilities & config
│   │   │   ├── axios.tsx           # API client
│   │   │   ├── store.tsx            # Zustand stores
│   │   │   └── translations/        # i18n files
│   │   └── hooks/                   # Custom hooks
│   ├── package.json
│   └── tailwind.config.ts
│
└── Server/                          # Backend (ASP.NET Core)
    ├── Nafeza.API/                  # API Layer
    │   ├── Controllers/             # API Controllers
    │   ├── Middleware/              # Custom middleware
    │   └── Program.cs                # Startup configuration
    ├── Nafeza.Application/           # Application Layer
    │   ├── Features/                 # Feature handlers
    │   │   ├── ACI/                  # ACI commands/queries
    │   │   └── Auth/                 # Auth commands
    │   ├── DTOs/                     # Data Transfer Objects
    │   └── Common/                   # Shared interfaces
    ├── Nafeza.Domain/                # Domain Layer
    │   ├── Entities/                 # Domain entities
    │   │   ├── AcidRequest.cs
    │   │   ├── Party.cs
    │   │   └── InvoiceItem.cs
    │   ├── Enums/                    # Domain enums
    │   └── Common/                   # Base classes
    └── Nafeza.Infrastructure/        # Infrastructure Layer
        ├── Persistence/              # Database context
        │   ├── AppDbContext.cs
        │   └── Configurations/      # EF configurations
        └── Services/                 # External services
```

## 🚀 Getting Started

### Prerequisites

- **Node.js** 18+ and npm
- **.NET SDK** 8.0 or later
- **SQL Server** (or SQL Server Express)
- **Git**

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/YoussefEbeid/Nafeza.git
   cd Nafeza
   ```

2. **Setup Backend**
   ```bash
   cd Server/Nafeza.API
   dotnet restore
   dotnet build
   ```

3. **Setup Frontend**
   ```bash
   cd client
   npm install
   ```

4. **Configure Database**
   - Update connection string in `Server/Nafeza.API/appsettings.json`
   - The database will be created automatically on first run

5. **Run the Application**

   **Backend:**
   ```bash
   cd Server/Nafeza.API
   dotnet run
   ```
   API will be available at `http://localhost:5000` or `https://localhost:5001`
   Swagger UI: `http://localhost:5000/swagger`

   **Frontend:**
   ```bash
   cd client
   npm run dev
   ```
   Frontend will be available at `http://localhost:3000`

### Environment Variables

Create a `.env.local` file in the `client` directory (if needed):
```env
NEXT_PUBLIC_API_URL=http://localhost:5000/api
```

Backend configuration is in `appsettings.json`:
```json
{
  "JwtSettings": {
    "Secret": "YourSecretKeyHere"
  },
  "ConnectionStrings": {
    "DefaultConnection": "Server=localhost;Database=NafezaDB;Trusted_Connection=True;"
  }
}
```

## 📚 API Documentation

### Authentication Endpoints

#### Register
```http
POST /api/auth/register
Content-Type: application/json

{
  "name": "Company Name",
  "email": "company@example.com",
  "type": "Importer",
  "identifier": "123456789",
  "password": "password123"
}
```

#### Login
```http
POST /api/auth/login
Content-Type: application/json

{
  "identifier": "email@example.com",
  "password": "password123"
}
```

#### Get Profile
```http
GET /api/auth/profile
Authorization: Bearer {token}
```

### ACI Endpoints

#### Create Draft
```http
POST /api/aci/draft
Authorization: Bearer {token}
Content-Type: application/json

{
  "exporterName": "Exporter Company",
  "exporterEmail": "exporter@example.com",
  "exporterCargoXId": "CX123456"
}
```

#### Submit ACI
```http
POST /api/aci/{id}/submit
Authorization: Bearer {token}
```

#### Get ACI List
```http
GET /api/aci
Authorization: Bearer {token}
```

#### Get ACI Details
```http
GET /api/aci/{id}
Authorization: Bearer {token}
```

### Tariff Endpoints

#### Get Chapters
```http
GET /api/tariff/chapters
```

#### Search Tariff
```http
GET /api/tariff/search?type=code&query=851713
GET /api/tariff/search?type=text&query=smartphone&chapterId=1
```

### Currency Endpoints

#### Get Exchange Rates
```http
GET /api/currency/rates
```

## 🗄 Database Schema

### Entities

#### Party
- Represents companies/entities (Importers, Exporters, Customs Brokers)
- **Key Fields**: `Id`, `Name`, `Email`, `TaxId` (unique), `CargoXId`, `Type`, `Password`
- **Relationships**: One-to-Many with `AcidRequest` (as Importer and Exporter)

#### AcidRequest
- Represents an ACI request
- **Key Fields**: `Id`, `AcidNumber` (19-digit, unique), `ImporterId`, `ExporterId`, `Status`, `ExpiryDate`
- **Status Flow**: Draft → Submitted → DocsUploaded → RiskAssessment → Approved/Rejected
- **Relationships**: 
  - Many-to-One with `Party` (Importer)
  - Many-to-One with `Party` (Exporter)
  - One-to-Many with `InvoiceItem`

#### InvoiceItem
- Represents items in an ACI request
- **Key Fields**: `Id`, `AcidRequestId`, `HSCode`, `Description`, `Quantity`, `UnitPrice`, `TotalValue`, `NetWeight`, `GrossWeight`
- **Relationships**: Many-to-One with `AcidRequest`

### ERD Diagram

```mermaid
erDiagram
    Party ||--o{ AcidRequest : "importer"
    Party ||--o{ AcidRequest : "exporter"
    AcidRequest ||--o{ InvoiceItem : "contains"

    Party {
        int Id PK
        string Name
        string TaxId UK
        string CargoXId
        string Email
        enum PartyType Type
        string Password
    }

    AcidRequest {
        int Id PK
        string AcidNumber UK
        int ImporterId FK
        int ExporterId FK
        enum ShipmentStatus Status
        datetime ExpiryDate
    }

    InvoiceItem {
        int Id PK
        int AcidRequestId FK
        string HSCode
        string Description
        decimal Quantity
        decimal UnitPrice
        decimal TotalValue
    }
```

## 💻 Development

### Running in Development Mode

1. **Start Backend**
   ```bash
   cd Server/Nafeza.API
   dotnet watch run
   ```

2. **Start Frontend**
   ```bash
   cd client
   npm run dev
   ```

### Building for Production

**Backend:**
```bash
cd Server/Nafeza.API
dotnet publish -c Release
```

**Frontend:**
```bash
cd client
npm run build
npm start
```

### Code Style

- **Frontend**: Follow Next.js and React best practices
- **Backend**: Follow C# coding conventions and Clean Architecture principles
- Use TypeScript strict mode
- Follow RESTful API conventions

## 🧪 Testing

### Frontend Testing
```bash
cd client
npm run test
```

### Backend Testing
```bash
cd Server
dotnet test
```

## 📝 Key Features Implementation

### Responsive Design
- All dashboard pages are fully responsive
- Mobile-first approach with Tailwind CSS
- Tables convert to card layouts on mobile devices
- Sidebar collapses to hamburger menu on mobile

### Authentication Flow
- Smart redirect: "Dashboard Access" button checks authentication status
- If authenticated → redirects to dashboard
- If not authenticated → redirects to login page
- Login page automatically redirects authenticated users

### ACI Workflow
1. **Step 1**: Enter party information (Importer/Exporter)
2. **Step 2**: Add invoice items (HS Codes, quantities, prices)
3. **Step 3**: Review and submit with e-Token signature
4. **Status Tracking**: Real-time status updates throughout the process

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

### Commit Message Format
- Use clear, descriptive commit messages
- Follow conventional commit format when possible

## 📄 License

This project is not a part of Egypt's National Single Window initiative.

## 👥 Authors

- **Youssef Ebeid** - [GitHub](https://github.com/YoussefEbeid)

## 🙏 Acknowledgments

- Egyptian Customs Authority
- CargoX for blockchain integration
- All contributors and stakeholders

## 📞 Support

For issues, questions, or contributions, please open an issue on the [GitHub repository](https://github.com/YoussefEbeid/Nafeza/issues).

---

**Last Updated**: December 2025


# SevaConnect

SevaConnect is a web application designed to facilitate charitable donations for various causes. The platform allows users to contribute to different social initiatives and become recognized members of the SevaChampion program.

## Features

- **Donation Categories**: Support various causes including:
  - Orphanage Support
  - Gowshala (Cow Shelter)
  - Vridha Ashram (Old Age Home)
  - Health Group Initiatives
  - Pooja Path & Rituals
  - Eye Camp Organization
  - Environmental Protection

- **SevaChampion Membership**: Join the SevaChampion program with a fixed contribution of ₹1111 and receive a personalized certificate of appreciation.

- **Certificate Generation**: Automatic generation of appreciation certificates for qualifying donors.

## Technology Stack

- **Frontend**: Next.js with TypeScript
- **UI Components**: Radix UI with Tailwind CSS
- **Backend Integration**: Firebase
- **AI Integration**: GenKit AI

## Getting Started

### Prerequisites

- Node.js (latest LTS version recommended)
- npm or yarn

### Installation

1. Clone the repository
2. Install dependencies:
   ```
   npm install
   ```

### Running the Application

#### Option 1: Using the Batch File
Simply double-click the `run-seva-connect.bat` file in the root directory to install dependencies and start the development server.

#### Option 2: Using npm Commands
```
npm run dev
```

The application will be available at http://localhost:9002

### Building for Production

```
npm run build
npm start
```

## Project Structure

- `/src/app`: Main application pages and layouts
- `/src/components`: Reusable UI components
  - `/donation`: Components related to donation functionality
  - `/membership`: Components for membership and certificate features
  - `/ui`: Shared UI components
- `/src/lib`: Utility functions and type definitions
- `/docs`: Project documentation and blueprints

## Style Guidelines

- **Primary color**: Teal (#008080)
- **Secondary color**: Beige (#F5F5DC)
- **Accent**: Gold (#FFD700)

## License

[Add appropriate license information]

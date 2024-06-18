# ![Tatvic Logo](./public/images/tatvicLogo.png) <br /> Concierge Services

## Installation
To install frontend, follow these steps:
1. Clone the repository 
```bash
git clone https://github.com/Tatvic-Zoho-Client-portal/frontend
```
2. Install dependencies
```bash
npm install
```

## Configuration
Create a `.env` file in the project root and add the following configurations:
```env
NEXT_PUBLIC_API_DOMAIN=http://localhost:8080
NEXT_PUBLIC_API_URL=$NEXT_PUBLIC_API_DOMAIN/v1
NEXT_PUBLIC_ENV=development
```

## Usage
To start the application, run the following command:
```bash
npm run dev
```

Navigate to http://localhost:3000 in your browser to access the application.

## Linting
To ensure that your code adheres to the project's coding standards, you can use linting tools. Linting helps in identifying and fixing code quality issues.

### Check Linting
To check for linting errors, run the following command:
```bash
npm run lint
```
This command will list out any linting issues found in your code.

### Auto-fix Linting Issues
For auto-fixable linting issues, you can use the following command:
```bash
npm run lint:fix
```
This will automatically fix any issues that the linter can handle, making it easier to maintain coding standards.

Make sure to fix any linting errors before committing your code.
# Game Browser

A modern web application for browsing and managing your favorite games using the RAWG API.

## Features

- Browse games with advanced filtering options
- Search games by title
- View detailed game information
- Save games to your personal library
- Responsive design for all devices
- User authentication with Clerk

## Technologies Used

- React
- Redux Toolkit
- React Router
- React Bootstrap
- Clerk Auth
- RAWG API
- Axios
- Font Awesome

## Prerequisites

Before running the application, make sure you have:

1. Node.js (v14 or higher)
2. npm or yarn
3. RAWG API Key (get it from [https://rawg.io/apidocs](https://rawg.io/apidocs))
4. Clerk Account and API Keys (get them from [https://clerk.dev](https://clerk.dev))

## Setup

1. Clone the repository:
```bash
git clone <repository-url>
cd game-browser
```

2. Install dependencies:
```bash
npm install
```

3. Create a `.env` file in the root directory with your API keys:
```env
VITE_RAWG_API_KEY=your_rawg_api_key
VITE_CLERK_PUBLISHABLE_KEY=your_clerk_publishable_key
```

4. Start the development server:
```bash
npm run dev
```

The application will be available at `http://localhost:5173`.

## Building for Production

To create a production build:

```bash
npm run build
```

The built files will be in the `dist` directory.

## Project Structure

```
src/
  ├── components/      # React components
  ├── features/        # Redux slices and store
  ├── services/        # API services
  ├── styles/         # CSS styles
  ├── utils/          # Utility functions
  ├── App.jsx         # Main App component
  └── main.jsx        # Application entry point
```

## Contributing

1. Fork the repository
2. Create a feature branch
3. Commit your changes
4. Push to the branch
5. Create a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.

# Trend-Stock Backend

Backend services for Trend-Stock, an online stock website providing real-time stock details and prices. This backend integrates with Firebase for user authentication and Firestore for database management.

## Introduction

Trend-Stock backend provides REST APIs for managing users, notifications, and stock data. It integrates with Firebase for authentication and Firestore for database operations.

## Features

- **User Management:**
  - Create, read, update, delete users.
  - Authenticate users using Firebase Authentication (Email/Password, Google Sign-In).

- **Price Notifications:**
  - Set and manage price notifications for specific stock prices.
  - Cron job to check stock prices and send notifications.

- **Stock Data API:**
  - Fetch real-time stock details using WallStreetOdds API.
  - Get stock price history and individual stock details.

## Technologies Used

- **Node.js:** Backend server environment.
- **Express:** Web framework for Node.js.
- **Firebase:** Authentication and Firestore for database.
- **Axios:** HTTP client for making API requests.
- **Cron:** Scheduler for running background tasks.
- **WallStreetOdds API:** Provides real-time stock market data.

## Installation
1. **Node version Required:**
   ```bash
   v20.12.2
   ```
2. **Clone the repository:**
   ```bash
   git clone https://github.com/your-username/trend-stock-backend.git
   cd trend-stock-backend
3. Run the development server:
    ```bash
    npm run dev
    or 
    npm start
    ```
    The app should now be running on [http://localhost:3005](http://localhost:3005).
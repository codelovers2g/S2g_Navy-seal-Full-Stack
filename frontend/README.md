# Trend-Stock

Trend-Stock is an online stock website that provides real-time stock details and prices. Users can set price notifications, add stocks to their watchlist, and track stock details. The platform allows users to log in using email and password or with Google. Users can view dashboards, statistics, and charts of stocks, and filter and search live stocks. Additionally, users can check individual stock details and the price history for one year from the current date.

## Table of Contents

1. [Introduction](#introduction)
2. [Features](#features)
   - [User Features](#user-features)
   - [Admin Features](#admin-features)
3. [Technology Stack](#technology-stack)
4. [Installation](#installation)
   - [Prerequisites](#prerequisites)
   - [Steps](#steps)
5. [Usage](#usage)
   - [User Flow](#user-flow)
   - [Admin Flow](#admin-flow)
6. [Admin Credentials](#admin-credentials)
7. [Environment Variables](#environment-variables)
8. [About](#about)
## Features

### User Features
- **Real-time Stock Details and Prices:** View live stock prices and details.
- **Price Notification:** Set notifications for specific stock prices.
- **Watchlist:** Add and remove stocks from your watchlist.
- **Dashboard:** Access a personal dashboard with stock statistics and charts.
- **Live Stock List and Search:** View and search a list of live stocks.
- **Filter Stocks:** Filter stocks based on ascending or descending order of any field.
- **Stock Details:** Check individual stock details and one-year price history.
- **Profile Management:** Update personal profile information.
- **Logout:** Securely log out of the platform.

### Admin Features
- **Manage Users:** Edit user details and manage user accounts.
- **Set Price Notifications:** Set and manage price notifications for any user.
- **Full Access:** Perform all user actions and have additional administrative privileges.

## Technology Stack
- **Frontend:** Next.js
- **Backend:** Express and Node.js
- **Authentication:** Firebase Authentication (Email/Password and Google Sign-In)
- **Database:** Firebase Firestore
- **Real-time Stock Data:** WallStreetOdds API

## Installation

### Prerequisites
- Node.js
- npm or yarn

### Steps
1. **Node version Required:**
   ```bash
   v20.12.2
   ```

2. Clone the repository:
    ```bash
    git clone https://github.com/your-username/trend-stock.git
    cd trend-stock
    ```

3. Install dependencies:
    ```bash
    npm install
    ```

4. Set up Firebase:
    - Create a Firebase project.
    - Enable Firebase Authentication for email/password and Google sign-in.
    - Create a Firestore database.
    - Obtain your Firebase configuration and update the .env file with your Firebase project's credentials.

5. Set up WallStreetOdds API:
    - Obtain an API key from WallStreetOdds.
    - Update the .env file with your WallStreetOdds API key.

6. Run the development server:
    ```bash
    npm run dev
    ```
    The app should now be running on [http://localhost:3000](http://localhost:3000).

## Usage

### User Flow
- **Sign Up/Login:** Users can sign up or log in using email/password or Google sign-in.
- **Dashboard:** Once logged in, users can view their dashboard with stock statistics and charts.
- **Search and Filter:** Users can search for live stocks and filter the list based on various criteria.
- **Watchlist:** Users can add stocks to their watchlist and set price notifications.
- **Stock Details:** Users can view detailed information about individual stocks and their one-year price history.
- **Profile Management:** Users can update their profile information.
- **Logout:** Users can securely log out of the platform.

### Admin Flow
- **Manage Users:** Admins can view and edit user details and manage user accounts.
- **Set Notifications:** Admins can set and manage price notifications for any user.
- **Full Access:** Admins can perform all user actions and have additional administrative privileges.

## Admin Credentials
- **Email:** admin@gmail.com
- **Password:** 123456

## Environment Variables

Add the following environment variables to your `.env` file:

```env
NEXT_PUBLIC_BASE_URL=http://localhost:3005/api
NEXT_PUBLIC_STOCK_API_KEY=lst8bcmvwdvq
NEXT_PUBLIC_WALLSTREET_API_FOR_LIVESTOCKPRICE=https://www.wallstreetoddsapi.com/api/livestockprices
NEXT_PUBLIC_WALLSTREET_STOCK_HISTORY=https://www.wallstreetoddsapi.com/api/historicstockprices
NEXT_PUBLIC_WALLSTREET_STOCK_DETAILS=https://www.wallstreetoddsapi.com/api/stockprofile

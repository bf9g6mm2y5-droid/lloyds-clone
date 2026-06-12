# Lloyds Clone

A clone of the Lloyds banking app built with Expo — runs on iOS, Android, and **web**.

## Quick Start (Web)

### Deploy to Netlify (recommended)

1. Push this repo to GitHub
2. Go to [app.netlify.com](https://app.netlify.com) → **Add new site** → **Import an existing project**
3. Pick your GitHub repo
4. Build settings are auto-detected from `netlify.toml` — no changes needed
5. Go to **Site configuration → Environment variables** and add:
   ```
   EXPO_PUBLIC_API_URL = https://your-api-url.com
   ```
6. Click **Deploy site** — done, live URL provided instantly

### Run locally

```sh
# 1. Copy the env file and set your API URL
cp .env.example .env

# 2. Install deps + launch in browser (one command)
./launch.sh
```

Or manually:
```sh
pnpm install
pnpm web          # dev server → http://localhost:8081
pnpm build:web    # production build → dist/
```

> **Requires the API server** → [Lloyds API Clone](https://github.com/amilmohd155/lloyds-clone-api)  
> Set `EXPO_PUBLIC_API_URL` to point at it (default: `http://localhost:1205`)

---

This project is a clone of the Lloyds banking application, built using React Native and TypeScript. It includes various features such as authentication, creating a new payee, viewing account details, and making payments.

## Screenshots

|                                                                  |                                                               |                                                                           |
| :--------------------------------------------------------------: | :-----------------------------------------------------------: | :-----------------------------------------------------------------------: |
| ![Home-Everyday](./screenshots/home-everyday.png) Home(Everyday) | ![Home-summary](./screenshots/home-summary.png) Home(Summary) | ![Settings-Profile](./screenshots/settings-profile.png) Settings(Profile) |
|         ![Settings](./screenshots/settings.png) Settings         | ![Card Details](./screenshots/card-details.png) Card details  |             ![View Pin](./screenshots/view-pin.png) View pin              |
|   ![Revealed Pin](./screenshots/revealed-pin.png) Revealed pin   |         ![Payment](./screenshots/payment.png) Payment         |    ![Select Payee](./screenshots/selecting-payee.png) Selecting payee     |

More in the screenshot folder. [Screenshot](./screenshots/)

## Features

- Authentiication
- Create a new payee
- View account details
- Make payments
- Card management

## Technologies Used

- Expo
- Expo Router
- React Native
- TypeScript
- Nativewind
- React Hook Form
- Zod
- Tanstack Query
- Axios
- TabView

## Getting started

### Prerequisites

- Node.js
- pnpm
- Expo CLI
- [Lloyds API Clone](https://github.com/amilmohd155/lloyds-clone-api)

#### API Express Project

Check out this repo to run the express server. ([Express API](https://github.com/amilmohd155/lloyds-clone-api))

#### Environment Variables

To run this project, you will need to add the following environment variables to your .env file

`EXPO_PUBLIC_API_URL` - http://localhost:1205 / http://IP:1205 where the express app mentioned above is running, if port was changed, make appropriate changes.

### Installation

1. Clone the repository:
   ```sh
   git clone https://github.com/your-username/lloyds-clone.git
   ```
2. Navigate to the project directory:
   ```sh
   cd lloyds-clone
   ```
3. Install dependencies:
   ```sh
   pnpm install
   ```

### Running the App

1. Start the Expo development server:

   ```sh
   pnpm start
   ```

2. Use the Expo app on your mobile device or an emulator to scan the QR code and run the application.

## Project Structure

- `src/`: Contains the source code of the application
  - `api/`: API calls and services
  - `components/`: Reusable UI components
  - `libs/`: Utility functions and libraries
  - `schema/`: Form validation schemas
  - `screens/`: Application screens
  - `app/`: Main application logic and routing

## License

This project is licensed under the MIT License.

[MIT](https://choosealicense.com/licenses/mit/)

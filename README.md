# **Daily Reflection Journal - Monorepo**

## **Purpose of the Application**

The **Daily Reflection Journal** application is designed to help users track and reflect on their daily thoughts, feelings, and experiences. It allows users to create, read, update, and delete journal entries, with additional features to manage settings such as font size and reminder time for daily reflections. The app is designed to enhance personal growth and mindfulness by encouraging users to reflect on their day and organize their thoughts.

## **How to Contribute to the Development of the Application**

We welcome contributions to the **Daily Reflection Journal**! Whether you're improving the app's user interface, adding new features, or fixing bugs, your contributions are appreciated. Here’s how you can contribute:

1. **Fork the Repository**: Start by forking the repository to your GitHub account.
2. **Create a Branch**: Create a new branch for your feature or bug fix.
3. **Make Changes**: Implement the feature or fix the bug.
4. **Test Your Changes**: Make sure your changes work as expected.
5. **Submit a Pull Request**: Open a pull request with a description of what you have done.

Before contributing, please ensure that your code is clean, well-commented, and that it adheres to best practices.

## **Features**

- **User Authentication**: Secure login and signup functionality using JWT authentication.
- **Journal Entries**: Users can add, edit, and delete journal entries with a prompt for reflection questions.
- **Settings Management**: Users can customize their app experience by adjusting settings like font size and reminder time.
- **Splash Screen**: A splash screen to improve the user experience while the app loads.
- **Dark Mode**: Support for both light and dark modes based on user preferences.
- **Responsive UI**: Cross-platform mobile app using React Native and Expo, with a smooth and responsive user interface.

## **Dependencies and Installation Instructions**

This monorepo contains both the frontend and backend for the **Daily Reflection Journal** app. To get started, follow these instructions:

### **Backend Setup**

1. Navigate to the `server` directory:

   ```bash
   cd server
   ```

2. Install the backend dependencies:

   ```bash
   npm install
   ```

3. Configure the `.env` file by creating a new file named `.env` in the `server` folder and adding the following:

   ```
   DB_URI=sqlite://db.sqlite
   JWT_SECRET=<your-secret-key>
   PORT=3007
   ```

4. Start the backend server:

   ```bash
   npm run start
   ```

This will start the backend API server at `http://localhost:3007`.

### **Frontend Setup**

1. Navigate to the `frontend` directory:

   ```bash
   cd daily-reflection-client
   ```

2. Install the frontend dependencies:

   ```bash
   npm install
   ```

3. Start the frontend app:

   ```bash
   npm run start
   ```

   This will start the Expo development server. You can scan the QR code with the Expo Go app or run it on a simulator/emulator:

   ```bash
   npm run ios   # For iOS simulators
   npm run android  # For Android emulators
   ```

## **Application Architecture**

The **Daily Reflection Journal** app is divided into two main sections: the backend and the frontend.

### **Backend Architecture**

- **Express.js** is used to handle API requests.
- **SQLite** is used as the database for storing user data, journal entries, and settings.
- **JWT (JSON Web Tokens)** is used for user authentication and secure access to the app.
- **Middleware**: Custom middleware is used for logging requests, validating input, and handling token authentication.
- **Controllers and Routes**: Each major feature of the app (e.g., users, entries, settings) has its own set of routes and controllers.

### **Frontend Architecture**

- **React Native** is used to build a cross-platform mobile app for iOS and Android.
- **Expo** is used for rapid development and testing.
- **React Navigation** handles the navigation between app screens.
- **Context API** is used for global state management (authentication, font size, and theme).
- **Axios** is used to make API calls from the frontend to the backend.

## **How to Report Issues**

If you encounter any issues or bugs, please follow these steps to report them:

1. **Check for Existing Issues**: Before opening a new issue, please check the [existing issues](https://github.com/phfa26/IFQ666-Assignment-2/issues) to see if the problem has already been reported.
2. **Create a New Issue**: If you don't see your issue, create a new issue with a clear and concise title.
3. **Provide Detailed Information**: In your issue description, include:
   - Steps to reproduce the issue.
   - What you expected to happen.
   - What actually happened.
   - Any error messages or logs.
4. **Labeling**: If possible, label the issue as a bug, enhancement, or feature request.
   
By following these steps, we can make sure that your issue is addressed as quickly as possible.

---

Feel free to use this template for your **Daily Reflection Journal** repository.

Sure! Here's how you can include the MIT License in your README:

---

## **License**

This project is licensed under the MIT License - see the [LICENSE](https://opensource.org/license/mit) file for details.

---

MIT License

Copyright (c) 2024 Paulo Amaral

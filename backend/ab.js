// This code demonstrates user authentication for a Node.js API using Firebase Authentication and integrates it with a Next.js frontend.

// Note: Replace placeholders like your-firebase-project-id with your actual Firebase project details.

// 1. Server-Side (Node.js API):

// a. Dependencies:

// Bash
// npm install firebase-admin express cors body-parser
// Use code with caution.

// b. Firebase Admin Setup:

// JavaScript
// // api/firebase.js
// const admin = require('firebase-admin');

// const serviceAccount = require('./path/to/serviceAccountKey.json');

// admin.initializeApp({
//   credential: admin.credential.cert(serviceAccount),
//   databaseURL: 'https://your-firebase-project-id.firebaseio.com'
// });

// module.exports = admin;
// Use code with caution.

// c. API Routes:

// api/auth/signup.js:
// JavaScript
// const express = require('express');
// const router = express.Router();
// const admin = require('./firebase');

// router.post('/signup', async (req, res) => {
//   const { email, password } = req.body;

//   try {
//     const userRecord = await admin.auth().createUser({
//       email,
//       password
//     });

//     res.status(201).json({ message: 'User created successfully', uid: userRecord.uid });
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ error: 'Error creating user' });
//   }
// });

// module.exports = router;
// Use code with caution.

// api/auth/signin.js:
// JavaScript
// const express = require('express');
// const router = express.Router();
// const admin = require('./firebase');

// router.post('/signin', async (req, res) => {
//   const { email, password } = req.body;

//   try {
//     const user = await admin.auth().signInWithEmailAndPassword(email, password);
//     const idToken = await admin.auth().createCustomToken(user.uid);

//     res.status(200).json({ message: 'User signed in successfully', token: idToken });
//   } catch (error) {
//     console.error(error);
//     res.status(401).json({ error: 'Invalid credentials' });
//   }
// });

// module.exports = router;
// Use code with caution.

// api/auth/protected.js: (Example protected route)
// JavaScript
// const express = require('express');
// const router = express.Router();
// const admin = require('./firebase');

// router.get('/protected', async (req, res) => {
//   const idToken = req.headers.authorization?.split('Bearer ')[1];

//   try {
//     const decodedToken = await admin.auth().verifyIdToken(idToken);
//     const uid = decodedToken.uid;

//     // Access user data or perform actions based on the uid
//     // ...

//     res.status(200).json({ message: 'Protected data accessed successfully' });
//   } catch (error) {
//     console.error(error);
//     res.status(401).json({ error: 'Unauthorized' });
//   }
// });

// module.exports = router;
// Use code with caution.

// 2. Next.js Frontend:

// a. Dependencies:

// Bash
// npm install axios
// Use code with caution.

// b. Authentication Context: (Optional for managing user state)

// JavaScript
// // context/AuthContext.js
// import React, { createContext, useState, useEffect } from 'react';

// const AuthContext = createContext({
//   currentUser: null,
//   setCurrentUser: () => {},
//   signIn: () => {},
//   signOut: () => {}
// });

// const AuthProvider = ({ children }) => {
//   const [currentUser, setCurrentUser] = useState(null);

//   useEffect(() => {
//     // Check for existing session on component mount
//     const checkLogin = async () => {
//       const token = localStorage.getItem('token');
//       if (token) {
//         try {
//           const decodedToken = await admin.auth().verifyIdToken(token);
//           setCurrentUser(decodedToken);
//         } catch (error) {
//           console.error(error);
//           localStorage.removeItem('token');
//         }
//       }
//     };

//     checkLogin();
//   }, []);

//   const signIn = async (email, password) => {
//     // ... Sign in logic using axios and api/auth/signin route
//     const response = await axios.post
// Use code with caution.
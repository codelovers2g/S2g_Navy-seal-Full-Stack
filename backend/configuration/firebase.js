// import admin from "firebase-admin";
// import dotenv from "dotenv";

// // Load environment variables
// dotenv.config();

// const firebaseConfig = {
//   apiKey: process.env.firebase_api_key,
//   authDomain: process.env.firebase_auth_domain,
//   projectId: process.env.FIREBASE_PROJECT_ID,
//   storageBucket: process.env.firebase_storage_bucket,
//   messagingSenderId: process.env.firebase_messaging_sender_id,
//   appId: process.env.firebase_app_id,
// };

// if (!admin.apps.length) {
//   admin.initializeApp({
//     credential: admin.credential.cert(firebaseConfig),
//     databaseURL:`https://${process.env.firebase_project_id}.firebaseio.com`
//   });
// }
// const auth = admin.auth();
// const db = admin.firestore();

// export { auth, db };
import admin from "firebase-admin";
import dotenv from "dotenv";
import path from "path";
import { readFileSync } from "fs";

// Load environment variables
dotenv.config();

// Path to your service account key JSON file
const serviceAccountPath = path.resolve("configuration/fir-67459-firebase-adminsdk-4h33z-791a7c1e22.json");
const serviceAccount = JSON.parse(readFileSync(serviceAccountPath, 'utf8'));
// Path to your service account key JSON file
// const serviceAccountPath = path.resolve("./fir-67459-firebase-adminsdk-4h33z-791a7c1e22.json");

// Initialize Firebase Admin SDK
if (!admin.apps.length) {
  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: `https://${process.env.FIREBASE_PROJECT_ID}.firebaseio.com`
  });
}

const auth = admin.auth();
const db = admin.firestore();

export { auth, db };

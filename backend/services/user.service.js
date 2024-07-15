import {db} from "../configuration/firebase.js"
import { v4 as uuidv4 } from "uuid"; // For generating unique IDs
class UserSErvice{
    
    // Create a new user
    static createUser = async (req, res) => {
      try {
        const {
            username,
        email,
        isAdmin,
        isActive,
        userId,
        }=req.body;
        const userData = {username,email,isAdmin,isActive};
        await db.collection("users").doc(userId).set(userData);
        res.status(201).json({ message: "User created successfully", userId });
      } catch (error) {
        res.status(500).json({ message: "Failed to create user", error: error.message });
      }
    };
    
    // Get a user by ID
    static getUserById = async (req, res) => {
        try {
          const id = req.
          params.id;
    
          // Ensure the ID is a string
          if (typeof id !== 'string' || !id.trim()) {
            return res.status(400).json({ message: "Invalid user ID" });
          }
    
          // Fetch the user document from Firestore
          const userDoc = await db.collection("users").doc(id).get();
    
          // Check if the document exists
          if (!userDoc.exists) {
            return res.status(404).json({ message: "User not found" });
          }
    
          // Respond with the user data
          res.status(200).json({ id: userDoc.id, ...userDoc.data() });
        } catch (error) {
          console.error("Error fetching user:", error);
          res.status(500).json({ message: "Failed to get user", error: error.message });
        }
      };
    
    // Update a user by ID
    static updateUserById = async (req, res) => {
      try {
        const userId = req.params.id;
        const userData = req.body;
        await db.collection("users").doc(userId).update(userData);
        res.status(200).json({ message: "User updated successfully" });
      } catch (error) {
        res.status(500).json({ message: "Failed to update user", error: error.message });
      }
    };
    
    // Get all users
    static getAllUsers = async (req, res) => {
      try {
        const usersSnapshot = await db.collection("users").get();
        const users = usersSnapshot.docs.map(doc => ({
            id:doc.id,
            ...doc.data()
        }));
        res.status(200).json(users);
      } catch (error) {
        res.status(500).json({ message: "Failed to get users", error: error.message });
      }
    };
    static checkUser=async(req,res)=>{
        try {
        const uid = req.params.id;

            const userDoc = await db.collection("users").doc(uid).get();
        if (!userDoc.exists) {
          return res.status(404).json({ message: "User not found" });
        }
        res.status(200).json(userDoc.data());
        } catch (error) {
        res.status(500).json({ message: "Failed to get users", error: error.message });
            
        }
    }
    static deleteUser=async(req,res)=>{
        try {
        const uid = req.params.id;
         await db.collection("users").doc(uid).delete();
        res.status(200).json({ message: "User deleted successfully" });
    }catch (error) {
        res.status(500).json({ message: "Failed to get users", error: error.message });

    }
}


}
export default UserSErvice;
"use client";

import { useContext, createContext, useState, useEffect } from "react";
import {
  signInWithPopup,
  signOut,
  onAuthStateChanged,
  GoogleAuthProvider,
} from "firebase/auth";
import { auth } from "../firebase";
import { signInWithEmailAndPassword } from "firebase/auth";
import { createUserWithEmailAndPassword } from "firebase/auth";
import Loader1 from "../Loader/Loader";
import axios from "axios";
import { baseUrl } from "../enfile";

const AuthContext = createContext();

export const AuthContextProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [shrinkSidebar, setshrinkSidebar] = useState(false);
  const getUser = async (uid) => {
    try {
      const {data} = await axios.get(`${baseUrl}/user/${uid}`);
      return data;
    } catch (error) {
      console.error("Error fetching user:", error);
      throw error;
    }
  };
  const updateUser = async (uid, updatedData) => {
    try {
      
      await axios.put(`${baseUrl}/user/${uid}`, updatedData);
    } catch (error) {
      console.error("Error updating user:", error);
      throw error;
    }
  };
  const deleteUser = async (uid) => {
    try {
      await axios.delete(`${baseUrl}/user/${uid}`);
    } catch (error) {
      console.log(error)
    }
  };
  const googleSignIn = async () => {
    const provider = new GoogleAuthProvider();
    try {
      const userCredential = await signInWithPopup(auth, provider);
  
      const user = userCredential.user;
      
      // Check if the user already exists in the database
      const userExists = await checkUserExists(user.uid);
  
      if (!userExists) {
        await createUser(user);
      } 
    } catch (error) {
      console.log(error)
    }
  };
  
  // Function to check if the user exists in the database
  const checkUserExists = async (uid) => {
    const {data} = await axios.get(`${baseUrl}/user/checkUser/${uid}`);
    return data!==null;
  };
  const signInUsingEmailAndPassword = async (email, password) => {
    try {
      const data = await signInWithEmailAndPassword(auth, email, password);
      return data;
    } catch (error) {
      throw new Error(error);
    }
  };
  const signUpUsingEmailAndPassword = async (email, password) => {
    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );

      const user = userCredential.user;

      await createUser(user);
      return user;
    } catch (error) {
      throw new Error(error);
    }
  };
  const logOut = () => {
    signOut(auth);
  };
  const createUser = async (user) => {
    try {
      // Add additional user details to Firestore
      await axios.post(`${baseUrl}/user/`, {
        username:"mr",
        email: user.email,
        isAdmin: false,
        isActive: true,
        userId: user.uid,
      });
    } catch (error) {
      console.log(error)
    }
  };
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setLoading(false);
    });
    return () => unsubscribe();
  }, [user]);

  return (
    <AuthContext.Provider
      value={{
        user,
        googleSignIn,
        logOut,
        signInUsingEmailAndPassword,
        signUpUsingEmailAndPassword,
        shrinkSidebar,
        setshrinkSidebar,
        getUser,
        updateUser,
        deleteUser
      }}
    >
      {loading ? <Loader1 /> : children}
    </AuthContext.Provider>
  );
};

export const UserAuth = () => {
  return useContext(AuthContext);
};

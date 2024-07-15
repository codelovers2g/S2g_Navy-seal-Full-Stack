"use client";
import Navbar from "../ui/dashboard/navbar/navbar";
import Sidebar from "../ui/dashboard/sidebar/sidebar";
import styles from "../ui/dashboard/dashboard.module.css";
import Footer from "../ui/dashboard/footer/footer";
import "react-toastify/dist/ReactToastify.css";
import { UserAuth } from "../ui/Context/Authcontext";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { ToastContainer } from "react-toastify";

const Layout = ({ children }) => {
  const router = useRouter();
  const { user } = UserAuth();
  useEffect(() => {
    if (!user) {
      router.push("/login");
    }
  }, [user]);
  const [showSideBar, setshowSideBar] = useState(false);
  const toggleSideBar = () => {
    setshowSideBar(!showSideBar);
  };
  return (
    <div className={styles.container}>
      <ToastContainer/>
      <div className={styles.show}>
      <Sidebar toggleSideBar={toggleSideBar} showSideBar={showSideBar} />
      </div>
      <div className={styles.menu}>
        <Sidebar />
      </div>
      <div className={styles.content}>
        <Navbar toggleSideBar={toggleSideBar} />
        {children}
        <Footer />
      </div>
    </div>
  );
};

export default Layout;

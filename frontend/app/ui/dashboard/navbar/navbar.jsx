"use client";
import { usePathname, useRouter } from "next/navigation";
import styles from "./navbar.module.css";
import {
  MdNotifications,
  MdOutlineChat,
  MdPublic,
  MdSearch,
} from "react-icons/md";
import { HiMenuAlt3 } from "react-icons/hi";
import { UserAuth } from "../../Context/Authcontext";
import Link from "next/link";
const Navbar = ({toggleSideBar}) => {
  const { logOut, user } = UserAuth();
  
  const router = useRouter();
  const logoutUser = () => {
    logOut();
    router.push("/login");
    localStorage.clear();
  };
  return (
    <div className={`${styles.container} mb-5`}>
      <div className={styles.title}>Trend-Stock</div>
      <div className={styles.menu}>
        <div className={styles.icons}>
        <p onClick={toggleSideBar} className={`${styles.title} cursor-pointer ${styles.show}`}>
            <HiMenuAlt3
            fontSize={"25px"}
            />
          </p>
          <p onClick={logoutUser} className={`${styles.title} cursor-pointer`}>
            logout
          </p>
        </div>
      </div>
    </div>
  );
};

export default Navbar;

import { useEffect, useState } from "react";
import Image from "next/image";
import MenuLink from "./menuLink/menuLink";
import styles from "./sidebar.module.css";
import {
  MdDashboard,
  MdSupervisedUserCircle,
  MdShoppingBag,
  MdAttachMoney,
  MdLogout,
  MdOutlineSettings,
  MdPerson,
} from "react-icons/md";
import { IoMdCloseCircle } from "react-icons/io";
import { UserAuth } from "../../Context/Authcontext";
import { useRouter } from "next/navigation";
import { doc, getDoc, query, where, collection, getDocs } from "firebase/firestore";
import { db } from "../../firebase";
import Link from "next/link";

const menuItems = [
  {
    title: "Pages",
    list: [
      {
        title: "Dashboard",
        path: "/dashboard",
        icon: <MdDashboard />,
      },
      {
        title: "Users",
        path: "/dashboard/users",
        icon: <MdSupervisedUserCircle />,
      },
      {
        title: "Live Stocks",
        path: "/dashboard/live-stock",
        icon: <MdShoppingBag />,
      },
      {
        title: "My Watch List",
        path: "/dashboard/my-watchlist",
        icon: <MdAttachMoney />,
      },
    ],
  },
];

const Sidebar = ({toggleSideBar,showSideBar}) => {
  const { logOut, user } = UserAuth();
  const router = useRouter();
  const [userDetails, setuserDetails] = useState(null);

  useEffect(() => {
    const checkAdminStatus = async () => {
      if (user?.email) {
        try {
          const usersCollection = collection(db, "users");
          const q = query(usersCollection, where("email", "==", user.email));
          const querySnapshot = await getDocs(q);

          if (!querySnapshot.empty) {
            querySnapshot.forEach((doc) => {
              let user= {...doc.data(),id:doc.id};
              localStorage.setItem("user", JSON.stringify(user));
              setuserDetails(user);
            });
          } 
        } catch (error) {
          console.log(error)
        }
      }
    };
    let temp=localStorage.getItem("user")
    if(!temp) checkAdminStatus();
    else{
      setuserDetails(JSON.parse(temp));
    }
  }, [user]);

  const logoutUser = () => {
    logOut();
    router.push("/login");
    localStorage.clear()
  };

  return (
    <div className={`${styles.container} bg-[var(--bgSoft)] min-w-[250px] h-[100vh] 
    ${!(showSideBar!==undefined&&showSideBar)?'left-[-100%]':'left-[0]'}
    `}>
      <div className="flex justify-end">
        <button onClick={toggleSideBar} className={`text-white cursor-pointer ${(showSideBar)?'flex':'hidden'}`}>
          <IoMdCloseCircle 
          fontSize={"25px"}
          />
        </button>
      </div>
      <div className={styles.user}>
        <Image
          className={styles.userImage}
          src={user?.img || "/noavatar.png"}
          alt=""
          width="50"
          height="50"
        />
        <div className={styles.userDetail}>
          <span className={styles.username}>{userDetails?.username||"Admin"}</span>
        </div>
      </div>
      <ul className={styles.list}>
        {menuItems.map((cat) => (
          <li key={cat.title}>
            <span className={styles.cat}>{cat.title}</span>
            {cat.list.map((item) => (
              <MenuLink item={item} key={item.title} />
            ))}
          </li>
        ))}
       
      </ul>
      {
        userDetails?.id&&<Link href={`/dashboard/users/${userDetails?.id}`}  className={styles.logout}>
        <MdPerson />
        My Profile
      </Link>
      }
      <button onClick={logoutUser} className={styles.logout}>
        <MdLogout />
        Logout
      </button>
    </div>
  );
};

export default Sidebar;

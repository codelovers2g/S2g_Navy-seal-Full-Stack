"use client"
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { UserAuth } from "@/app/ui/Context/Authcontext";
import styles from "@/app/ui/dashboard/users/singleUser/singleUser.module.css";
import Image from "next/image";

const SingleUserPage = ({ params }) => {
  const { getUser, updateUser } = UserAuth();
  const { id } = params;
  const [user, setUser] = useState(null);
  const router = useRouter();
  const [userDetails, setuserDetails] = useState(null)

  useEffect(() => {
    let templocal=localStorage.getItem("user");
    if(templocal){
      setuserDetails(JSON.parse(templocal));
    }
    const fetchUser = async () => {
      const userData = await getUser(id);
      setUser(userData);
    };
    fetchUser();
  }, [id, getUser]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    if((!userDetails||(!userDetails?.isAdmin))&&(userDetails?.id!==id||!userDetails)){
      alert("You are not authorized to update this user!");
      return;  // prevent form submission if user is not admin.  The user should be redirected to dashboard/users page.  This is a simple example and may require additional logic to handle this case.
    }
    const formData = new FormData(event.target);
    const updatedUser = {
      username: formData.get("username"),
      email: formData.get("email"),
      isAdmin: formData.get("isAdmin") === "true",
      isActive: formData.get("isActive") === "true",
    };
    let data={
      ...userDetails,
     ...updatedUser,
    }
    if(id===userDetails.id){
      localStorage.setItem("user",JSON.stringify(data));
    }
    await updateUser(id,updatedUser);
    router.push("/dashboard/users");
  };

  if (!user) {
    return <div>Loading...</div>;
  }

  return (
    <div className={styles.container}>
      <div className={styles.infoContainer}>
        <div className={styles.imgContainer}>
          <Image src={user.img || "/noavatar.png"} alt="" fill />
        </div>
        {user?.username}
      </div>
      <div className={styles.formContainer}>
        <form className={styles.form} onSubmit={handleSubmit}>
          <input type="hidden" name="id" value={user.id} />
          <label>Username</label>
          <input type="text" name="username" defaultValue={user?.username} />
          <label>Email</label>
          <input type="email" name="email" defaultValue={user.email} />
         {userDetails?.isAdmin&&<>
          <label>Is Admin?</label>
          <select name="isAdmin" defaultValue={user.isAdmin ? "true" : "false"}>
            <option value={true}>Yes</option>
            <option value={false}>No</option>
          </select>
         </>}
          <label>Is Active?</label>
          <select name="isActive" defaultValue={user.isActive ? "true" : "false"}>
            <option value={true}>Yes</option>
            <option value={false}>No</option>
          </select>
          <button
     
          type="submit">Update</button>
        </form>
      </div>
    </div>
  );
};

export default SingleUserPage;

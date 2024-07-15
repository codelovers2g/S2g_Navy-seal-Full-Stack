"use client"
import { doc, deleteDoc, collection, getDocs } from "firebase/firestore";
import Link from "next/link";
import { useEffect, useState } from "react";
import Loader1 from "@/app/ui/Loader/Loader";
import { toast } from "react-toastify";
import axios from "axios";
import { baseUrl } from "@/app/ui/enfile";

const UsersPage = () => {
  const [usersList, setUsersList] = useState([]);
  const [userDetails, setuserDetails] = useState(null)
const [loading, setloading] = useState(false)
  const deleteUser = async (uid) => {
    try {
      await axios.delete(`${baseUrl}/user/${uid}`);
      setUsersList(usersList.filter((user) => user.id !== uid));
      toast.success("User deleted successfully");
    } catch (error) {
      console.error("Error deleting user:", error);
      alert("Error deleting user: " + error.message);
      toast.error("Error deleting user");
    }
  };

  const getAllUsers = async () => {
    try {
      const {data} = await axios.get(`${baseUrl}/user/all`);
      // const userSnapshot = await getDocs(usersCollection);
      // const userList = userSnapshot.docs.map((doc) => ({
      //   id: doc.id,
      //   ...doc.data(),
      // }));
      setUsersList(data);
    } catch (error) {
      console.error("Error fetching users:", error);
      alert("Error fetching users: " + error.message);
    }
  };

  useEffect(() => {
    let templocal=localStorage.getItem("user");
    if(templocal){
      setuserDetails(JSON.parse(templocal));
    }
    getAllUsers();
  }, []);

  const deleteUserById = (id) => {
    if (confirm("Are you sure you want to delete this user?")) {
      deleteUser(id);
    }
  };

  return (
    <div className="bg-[#182237] p-5 rounded-lg mt-5 w-full">
           <h1 className="text-3xl font-bold text-center mb-4">Users List</h1>

      {
loading?<Loader1/>:<div className="overflow-x-auto">
<table className="min-w-full bg-[#182237] rounded-lg overflow-hidden">
  <thead className="bg-[#182237] text-white">
    <tr>
      <th className="py-2 px-4 text-left">Name</th>
      <th className="py-2 px-4 text-left">Email</th>
      <th className="py-2 px-4 text-left">IsAdmin</th>
      <th className="py-2 px-4 text-left">Status</th>
      <th className="py-2 px-4 text-left">Action</th>
    </tr>
  </thead>
  <tbody>
    {usersList.map((user) => (
      <tr key={user.id} className="border-b text-white">
        <td className="py-2 px-4">
          <div className="flex items-center gap-3">{user.username ? user.username : 'mr'}</div>
        </td>
        <td className="py-2 px-4">{user.email}</td>
        <td className="py-2 px-4">{user.isAdmin ? "Admin" : "Client"}</td>
        <td className="py-2 px-4">{user.isActive ? "Active" : "Passive"}</td>
        <td className="py-2 px-4">
          <div className="flex gap-2">
            <Link href={`/dashboard/users/${user.id}`}>
              <button className="px-3 py-1 bg-teal-500 text-white rounded-md hover:opacity-80">
                View
              </button>
            </Link>
           {(userDetails&&userDetails.isAdmin)&& <button
              onClick={() => deleteUserById(user.id)}
              className="px-3 py-1 bg-red-600 text-white rounded-md hover:opacity-80"
            >
              Delete
            </button>}
          </div>
        </td>
      </tr>
    ))}
  </tbody>
</table>
</div>

      }
    </div>
  );
};

export default UsersPage;

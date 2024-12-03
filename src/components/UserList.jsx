import React, { useState, useEffect } from "react";
import { useSearchParams } from "react-router";
import { USERS_LIST } from "../Constants";
import axios from "axios";
import { toast } from "react-toastify";
import { Alert } from "../utilities/Alert";
import UserCard from "./UserCard";
const UserList = () => {
  const [searchParams] = useSearchParams();

  const [users, setusers] = useState([]);
  const [PageNo, setPageNo] = useState(1);
  const getList = async (url) => {
    try {
      if (!url) {
        Alert("Something went wrong", "w");
        return;
      }
      console.log(url);
      const response = await axios.get(url);
      console.log(response.data.data);
      if (response.data.data.length > 0) {
        setusers(response.data.data);
      } else {
        Alert("No Data to show", "w");
      }
    } catch (error) {
      Alert("Something went wrong", "f");
      console.log(error.message);
    }
  };
  useEffect(() => {
    const pageNo = searchParams.get("page");
    setPageNo(pageNo);
    let url = USERS_LIST;

    getList(url, pageNo);
  }, [searchParams]);

  return (
    <div>
      <div className="flex  flex-wrap justify-center mb-20">
        {users.map((user) => (
          <UserCard key={user.id} user={user}/>
        ))}
      </div>
    </div>
  );
};

export default UserList;

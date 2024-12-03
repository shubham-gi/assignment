import React, { useState, useEffect } from "react";
import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/20/solid";
import { USERS_LIST as USERSLIST_URL } from "../Constants";
import axios from "axios";
import { Alert } from "../utilities/Alert";
import UserCard from "./UserCard";
import Modal from "./Modal";
import { BounceLoader } from "react-spinners";
const UserList = () => {
  const [loading, setloading] = useState(false);
  const [isModalOpen, setisModalOpen] = useState(false);
  const [modalUser, setmodalUser] = useState({});
  const [users, setusers] = useState([]);
  const [PageNo, setPageNo] = useState(1);
  const [pageDetails, setpageDetails] = useState({});
  const onDelete=async(id)=>{
    if(!id ) return;
    try {
        const url=USERSLIST_URL+"/"+id;
        // console.log(url)
        const res=await axios.delete(url)
        const newUser=users.filter(user=>user.id!=id)
        setusers(newUser)
        Alert("User Deleted successfully",'s')
        // console.log("deleted "+id,res.data)
    } catch (error) {
        
    }
  }
  const getList = async (page) => {
    const newUrl = USERSLIST_URL + "?page=" + page;
    try {
      if (!newUrl) {
        Alert("Something went wrong", "w");
        return;
      }
    //   console.log(newUrl);
      const response = await axios.get(newUrl);
      const data = response.data;
      setpageDetails({
        totalPages: data.total_pages,
        perPage: data.per_page,
        total: data.total,
      });
    //   console.log(pageDetails);
      if (response.data.data.length > 0) {
        setusers(response.data.data);
      } else {
        Alert("No Data to show", "w");
      }
    } catch (error) {
      Alert("Something went wrong", "f");
    //   console.log(error.message);
    }
  };
  useEffect(() => {
    getList(PageNo);
  }, [PageNo]);
  if (loading) {
    return (
      <div className="h-screen flex justify-center items-center">
        <BounceLoader color="#4788ff" size={80} />
      </div>
    );
  }
  return (
    <div>
      <div className="flex  flex-wrap justify-center mb-20">
        {users.map((user) => (
          <UserCard
            key={user.id}
            user={user}
            onDelete={onDelete}
            onEdit={() => {
              setisModalOpen(true);
              setmodalUser(user);
            }}
          />
        ))}
      </div>
      <div className="flex items-center justify-between border-t border-gray-200 bg-white px-4 py-3 sm:px-6">
        <div className="flex flex-1 justify-between sm:hidden">
          <span
            className={`relative  inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 cursor-pointer `}
            onClick={() => {
              if (PageNo > 1) {
                setPageNo(PageNo - 1);
                window.scrollTo({
                  top: 0,
                  behavior: "smooth", // Smooth scrolling
                });
              }
            }}
          >
            Previous
          </span>
          <span
            onClick={() => {
              if (PageNo < pageDetails.totalPages) {
                setPageNo(PageNo + 1);
                window.scrollTo({
                  top: 0,
                  behavior: "smooth", // Smooth scrolling
                });
              }
            }}
            className="relative ml-3 inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 cursor-pointer"
          >
            Next
          </span>
        </div>
        <div className="hidden sm:flex sm:flex-1 sm:items-center sm:justify-between">
          <div>
            <p className="text-sm text-gray-700">
              Showing{" "}
              <span className="font-medium">
                {(PageNo - 1) * (pageDetails.perPage * 1) + 1}
              </span>{" "}
              to{" "}
              <span className="font-medium">
                {pageDetails.perPage * PageNo}
              </span>{" "}
              of <span className="font-medium">{pageDetails.total}</span>{" "}
              results
            </p>
          </div>
          <div>
            <nav
              aria-label="Pagination"
              className="isolate inline-flex -space-x-px rounded-md shadow-sm"
            >
              <span
                onClick={() => {
                  if (PageNo > 1) {
                    setPageNo(PageNo - 1);
                    window.scrollTo({
                      top: 0,
                      behavior: "smooth", // Smooth scrolling
                    });
                  }
                }}
                className={`relative inline-flex items-center rounded-l-md px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0  ${
                  PageNo == 1 ? "" : "hover:cursor-pointer"
                }`}
              >
                <span className="sr-only">Previous</span>
                <ChevronLeftIcon aria-hidden="true" className="size-5" />
              </span>
              {/* Current: "z-10 bg-indigo-600 text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600", Default: "text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:outline-offset-0" */}
              {PageNo != 1 && (
                <span
                  href="#"
                  aria-current="page"
                  className="border-2 border-solid border-gray-300 relative z-10 inline-flex items-center bg-white px-4 py-2 text-sm font-semibold text-gray-600 focus:z-20 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 hover:cursor-pointer"
                  onClick={() => {
                    setPageNo(PageNo - 1);
                    window.scrollTo({
                      top: 0,
                      behavior: "smooth", // Smooth scrolling
                    });
                  }}
                >
                  {PageNo - 1}
                </span>
              )}
              <span
                href="#"
                aria-current="page"
                className="relative z-10 inline-flex items-center bg-indigo-600 px-4 py-2 text-sm font-semibold text-white focus:z-20 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                {PageNo}
              </span>
              {PageNo < pageDetails.totalPages && (
                <span
                  href="#"
                  aria-current="page"
                  className="border-2 border-solid border-gray-300 relative z-10 inline-flex items-center bg-white px-4 py-2 text-sm font-semibold text-gray-600 focus:z-20 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 hover:cursor-pointer"
                  onClick={() => {
                    setPageNo(PageNo + 1);
                    window.scrollTo({
                      top: 0,
                      behavior: "smooth", // Smooth scrolling
                    });
                  }}
                >
                  {PageNo + 1}
                </span>
              )}

              <span
                onClick={() => {
                  if (PageNo < pageDetails.totalPages) {
                    setPageNo(PageNo + 1);
                    window.scrollTo({
                      top: 0,
                      behavior: "smooth", // Smooth scrolling
                    });
                  }
                }}
                className={`relative inline-flex items-center rounded-r-md px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0 ${
                  PageNo == pageDetails.totalPages ? "" : "hover:cursor-pointer"
                }`}
              >
                <span className="sr-only">Next</span>
                <ChevronRightIcon aria-hidden="true" className="size-5" />
              </span>
            </nav>
          </div>
        </div>
      </div>
      <Modal
        open={isModalOpen}
        setOpen={setisModalOpen}
        user={modalUser}
        setUser={setmodalUser}
      />
    </div>
  );
};

export default UserList;

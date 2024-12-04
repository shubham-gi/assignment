import React from "react";
import Avatar from '@mui/material/Avatar'
const UserCard = ({ user, onEdit, onDelete }) => {
  return (
    <div className="max-w-2xl mx-4 sm:max-w-sm md:max-w-sm lg:max-w-sm xl:max-w-sm sm:mx-auto md:mx-auto lg:mx-auto xl:mx-auto mt-16 bg-white shadow-xl rounded-lg text-gray-900">
      <div className="rounded-t-lg h-32 overflow-hidden">
        <img
          className="object-cover object-top w-full"
          src="https://images.unsplash.com/photo-1549880338-65ddcdfd017b?ixlib=rb-1.2.1&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=400&fit=max&ixid=eyJhcHBfaWQiOjE0NTg5fQ"
          alt="Mountain"
        />
      </div>
      <div className="mx-auto w-32 h-32 relative -mt-16 border-4 border-white rounded-full overflow-hidden">
        <Avatar alt={user.first_name+user.last_name} className="object-cover object-center h-32" sx={{height:120,width:120}}/>
        {/* <img
          className="object-cover object-center h-32"
          src={`https://avatar.iran.liara.run/username?username=${user.first_name}+${user.first_name}`}
          alt="Woman looking front"
        /> */}
      </div>
      <div className="text-center m-2">
        <h2 className="font-semibold text-xl">
          {user.first_name} {user.last_name}
        </h2>
      </div>
      <div className="p-4 border-t mx-8 mt-2 flex gap-2">
        <button
          className="block mx-auto rounded-full bg-blue-700 hover:shadow-lg font-semibold text-white px-5 py-2 hover:bg-blue-600"
          onClick={onEdit}
        >
          Edit
        </button>
        <button 
        onClick={()=>{
            onDelete(user.id);
        }}
        className="block mx-auto  rounded-full bg-red-600 hover:shadow-lg font-semibold text-white px-4 py-2 hover:bg-red-500">
          Delete
        </button>
      </div>
    </div>
  );
};

export default UserCard;

import { useState } from "react";
import {
  Dialog,
  DialogBackdrop,
  DialogPanel,
  DialogTitle,
} from "@headlessui/react";
import { Alert } from "../utilities/Alert";
import { validateEmail } from "../utilities/ValidateEmail";
import axios from "axios";
import { USERS_LIST  } from "../Constants";

export default function Modal({ open, setOpen, user, setUser }) {
  const [loading, setloading] = useState(false);
  const handleChange = (e) => {
    // console.log(e.target.value);
    setUser({ ...user, [e.target.name]: e.target.value });
  };
  const handleEdit = async () => {
    if (!user.first_name) {
      Alert("First name cannot be empty");
      return;
    }
    if (!user.last_name) {
      Alert("Last name cannot be empty");
      return;
    }
    if (!validateEmail(user.email)) {
      Alert("Enter correct email");
      return ;
    }
    try {
      const url = USERS_LIST + `/${user.id}`;
      setloading(true);
      const res = await axios.put(url,user);
      console.log(res.data);
      Alert("Update Successfull", "s");
      setOpen(false);
    } catch (error) {
      console.log(error.message);
      Alert("Something went wrong", "f");
    } finally {
      setloading(false);
    }
  };
  return (
    <Dialog open={open} onClose={setOpen} className="relative z-10">
      <DialogBackdrop
        transition
        className="fixed inset-0 bg-gray-500/75 transition-opacity data-[closed]:opacity-0 data-[enter]:duration-300 data-[leave]:duration-200 data-[enter]:ease-out data-[leave]:ease-in"
      />

      <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
        <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
          <DialogPanel
            transition
            className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all data-[closed]:translate-y-4 data-[closed]:opacity-0 data-[enter]:duration-300 data-[leave]:duration-200 data-[enter]:ease-out data-[leave]:ease-in sm:my-8 sm:w-full sm:max-w-lg data-[closed]:sm:translate-y-0 data-[closed]:sm:scale-95"
          >
            <div className="bg-white px-4 pb-4 pt-5 sm:p-6 sm:pb-4">
              <div className="sm:flex">
                <div className="mx-auto flex  shrink-0 items-center justify-center rounded-full bg-gray-200 sm:mx-0 sm:size-10">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth="1.5"
                    stroke="currentColor"
                    className="size-6"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10"
                    />
                  </svg>
                </div>
                <div className="mt-3 text-center sm:ml-4 sm:mt-0 sm:text-left flex-grow">
                  <DialogTitle
                    as="h2"
                    className="text-xl font-semibold text-gray-900"
                  >
                    Update User Details
                  </DialogTitle>
                  <div className="mt-4 ">
                    <p className="text-lg font-semibold text-gray-800">
                      First Name
                    </p>
                    <div className="w-full max-w-sm min-w-[200px]">
                      <input
                        type="text"
                        name="first_name"
                        id=""
                        onChange={handleChange}
                        className="w-full bg-transparent placeholder:text-slate-500  text-sm  border border-slate-200 rounded-md px-3 py-2 transition duration-300 ease focus:outline-none focus:border-slate-400 hover:border-slate-300 shadow-sm focus:shadow"
                        placeholder="John"
                        value={user.first_name ? user.first_name : ""}
                      />
                    </div>
                  </div>
                  <div className="mt-4 ">
                    <p className="text-lg font-semibold text-gray-800">
                      Last Name
                    </p>
                    <div className="w-full max-w-sm min-w-[200px]">
                      <input
                        type="text"
                        name="last_name"
                        id=""
                        onChange={handleChange}
                        className="w-full bg-transparent placeholder:text-slate-500 text-slate-700 text-sm border border-slate-200 rounded-md px-3 py-2 transition duration-300 ease focus:outline-none focus:border-slate-400 hover:border-slate-300 shadow-sm focus:shadow"
                        placeholder="Doe"
                        value={user.last_name ? user.last_name : ""}
                      />
                    </div>
                  </div>
                  <div className="mt-4 ">
                    <p className="text-lg font-semibold text-gray-800">Email</p>
                    <div className="w-full max-w-sm min-w-[200px]">
                      <input
                        type="text"
                        name="email"
                        id=""
                        onChange={handleChange}
                        className="w-full bg-transparent placeholder:text-slate-500 text-slate-700 text-sm border border-slate-200 rounded-md px-3 py-2 transition duration-300 ease focus:outline-none focus:border-slate-400 hover:border-slate-300 shadow-sm focus:shadow"
                        placeholder="example@gmail.com"
                        value={user.email ? user.email : ""}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
              {loading ? (
                <button
                  type="button"
                  className={`inline-flex w-full justify-center rounded-md bg-blue-400 px-3 py-2 text-sm font-semibold text-white shadow-sm  sm:ml-3 sm:w-auto `}
                >
                  Save Changes
                </button>
              ) : (
                <button
                  type="button"
                  onClick={() => handleEdit(false)}
                  className={`inline-flex w-full justify-center rounded-md bg-blue-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-blue-500 sm:ml-3 sm:w-auto `}
                >
                  Save Changes
                </button>
              )}
              <button
                type="button"
                data-autofocus
                onClick={() => setOpen(false)}
                className="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:mt-0 sm:w-auto"
              >
                Cancel
              </button>
            </div>
          </DialogPanel>
        </div>
      </div>
    </Dialog>
  );
}

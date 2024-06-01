"use client";

import React, { useEffect, useState } from "react";

import Link from "next/link";
import axios from "axios";
import { toast } from "react-hot-toast";
import { useRouter } from "next/navigation";

export default function SignupPage() {
  const router = useRouter();
  const [user, setUser] = useState({
    email: "",
    password: "",
    username: "",
  });

  const [buttonDisabled, setButtonDisabled] = useState(false);
  const [loading, setLoading] = useState(false);

  const onSignup = async () => {
    try {
      setLoading(true);
      const response = await axios.post("/api/users/signup", user);
      console.log("SignUp Success", response.data);
      router.push("/login");
    } catch (error: any) {
      console.log("SignUp Failed");
      toast.error(error.message);
    }
  };

  useEffect(() => {
    if (
      user.email.length > 0 &&
      user.password.length > 0 &&
      user.username.length > 0
    ) {
      setButtonDisabled(false);
    } else {
      setButtonDisabled(true);
    }
  }, [user]);
  return (
    <div className=" flex flex-col items-center justify-center min-h-screen py-2 ">
      <h1>{loading ? "Processing" : "SignUp"}</h1>
      <hr />
      <hr/>

      <label htmlFor="username">UserName</label>
      <input
        className="p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600 text-black"
        type="text"
        id="username"
        placeholder="UserName"
        value={user.username}
        onChange={(e) => setUser({ ...user, username: e.target.value })}
        
      />
      <hr />

      <label htmlFor="email">Email</label>
      <input
        className="p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600 text-black"
        type="text"
        id="email"
        placeholder="Email-Id"
        value={user.email}
        onChange={(e) => setUser({ ...user, email: e.target.value })}
        
      />
      <hr />

      <label htmlFor="password">Password</label>
      <input
        className="p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600 text-black"
        type="password"
        id="password"
        placeholder="Password"
        value={user.password}
        onChange={(e) => setUser({ ...user, password: e.target.value })}
        
      />
     
<button
 onClick={onSignup}
  className=""
>
  {buttonDisabled?"Fill Form First ":"Signup"}
</button>
<hr/>
<Link href="/login"> Visit Login Page </Link>


    </div>
  );
}

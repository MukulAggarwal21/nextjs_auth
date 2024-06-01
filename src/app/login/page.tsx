
"use client";

import React, { useEffect, useState } from "react";

import Link from "next/link";
import axios from "axios";
import { toast } from "react-hot-toast";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const router = useRouter();
  const [user, setUser] = useState({
    email: "",
    password: "",
  });

  const [buttonDisabled, setButtonDisabled] = useState(false);
  const [loading, setLoading] = useState(false);

  const onLogin = async () => {
    try {
      setLoading(true);
      const response = await axios.post("/api/users/login", user);
      console.log("Login Success", response.data);
      router.push("/profile");
    } catch (error: any) {
      console.log("SignUp Failed");
      toast.error(error.message);
    }
  };

  useEffect(() => {
    if (
      user.email.length > 0 &&
      user.password.length > 0 
    ) {
      setButtonDisabled(false);
    } else {
      setButtonDisabled(true);
    }
  }, [user]);
  return (
    <div className=" flex flex-col items-center justify-center min-h-screen py-2 ">
      <h1>{loading ? "Processing" : "Login"}</h1>
      <hr />
      <hr/>

     

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
 onClick={onLogin}
  className=""
>
  {buttonDisabled?"Fill Form First ":"Login"}
</button>
<hr/>
<Link href="/signup"> Visit SignUp Page </Link>


    </div>
  );
}

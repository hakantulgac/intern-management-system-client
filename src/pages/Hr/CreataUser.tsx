import React, { useState } from "react";
import { User } from '../../User';
import Register from "../../components/User/Register";

const CreataUser = () => {
  const [key,setKey] = useState(Date.now())
  return (
    <div className="flex">
      <div className="intern-table mr-20 w-full">
        <p className="text-white pl-16 text-xl fixed z-5 w-full pt-6 pb-6 border-b bg-[#001529]">
          Kullanıcı Oluştur
        </p>
        <Register key={key} setKey={setKey}/>
      </div>
    </div>
  );
};

export default CreataUser;

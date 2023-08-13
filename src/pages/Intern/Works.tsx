import React from 'react'
import TableWorks from '../../components/Intern/TableWorks'
import { useLocation } from 'react-router-dom';

const Works = () => {
  const location = useLocation();
  

  const searchParams = new URLSearchParams(location.search);
  const internId = searchParams.get("id");
  
  return (
    <div>
      <p className="mb-5 pl-16 text-xl fixed z-50 text-white bg-[#001529] w-full pt-6 pb-6">
        Çalışmalar
      </p>
      <div className="px-20 py-32 text-center">
        <TableWorks internId={internId||""}/>
      </div>  
    </div>
  )
}

export default Works
import React from 'react'
import TableApplications from '../../components/Hr/TableApplications'

export const InternshipApplications = () => {
  return (
    <div className='flex'>
      <div className="intern-table mr-20 w-full">
        <p className="text-white pl-16 text-xl fixed z-5 w-full pt-6 pb-6 border-b bg-[#001529]">
          Başvurular
        </p>
        <TableApplications/>
      </div>
    </div>
    
  )
}

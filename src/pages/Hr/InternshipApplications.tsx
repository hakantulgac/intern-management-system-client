import React from 'react'
import TableApplications from '../../components/Hr/TableApplications'

export const InternshipApplications = () => {
  return (
    <div className='flex'>
      <div className="intern-table mr-20 w-full">
        <p className="pl-10 text-xl fixed z-50 bg-white w-full pt-6 pb-6 border-b">
          Başvurular:
        </p>
        <TableApplications/>
      </div>
    </div>
    
  )
}

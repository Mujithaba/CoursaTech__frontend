import React from 'react'

interface AssignmentProps {
  courseID:string;
}


export default function AssignmentsView({courseID}:AssignmentProps) {
  console.log(courseID,"courseID-----");
  
  return (
    <div className='m-5 border-2 p-11 rounded-md bg-card'>
      <h1>Assignments:{courseID}</h1>
    </div>
  )
}

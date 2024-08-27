import React from 'react'

interface ReviewsProps {
  courseID:string;
}


export default function Reviews({courseID}:ReviewsProps) {
  console.log(courseID,"ReviewsProps");
  
  return (
    <div className='m-5 border-2 p-11 rounded-md bg-card'>
      <h1>Reviews:{courseID}</h1>
    </div>
  )
}

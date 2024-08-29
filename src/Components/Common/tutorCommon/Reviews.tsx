import { useEffect, useState } from 'react';

import { IReviews } from '../../../services/types';
import { reviewsFetchingT } from '../../../api/tutor';
import ReviewCardTui from '../../Ui/tutorUi/CardTReview';

interface ReviewsProps {
  courseID:string;
}


export default function CommonReviews({courseID}:ReviewsProps) {
 
  const [state,setState]=useState<boolean>(false)
  const [reviewData,setReviewData]= useState<IReviews[]>([])



  useEffect(()=>{
   async function fetchReviews(){
    try {
    
      const response  = await reviewsFetchingT(courseID)
      if(response){
        setState(false)
        console.log(response,"reviews fetching");
        setReviewData(response.data.getReviews)
      }
    } catch (error) {
      console.log(error);
      
    }
   }
   fetchReviews();
  },[courseID,state])
console.log(reviewData,"getReviews");

  
  return (
    <div className='m-5 border-2 p-8 flex gap-2 rounded-md bg-card'>
    <div className="flex-1 bg-white p-6 shadow-md rounded-lg">
      {reviewData.length === 0 ? (
        <div>No reviews available</div> 
      ) : (
        <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3'>
          <ReviewCardTui reviewsDatas={reviewData} />
        </div>
      )}
    </div>
  </div>
  )
}

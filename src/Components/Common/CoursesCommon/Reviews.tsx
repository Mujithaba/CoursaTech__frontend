import { Button } from '@nextui-org/react';
import  React, { FormEvent, useEffect, useState } from 'react';
import { FaStar } from 'react-icons/fa';
import { reviewsFetching, uploadReviews } from '../../../api/user';
import { toast } from 'react-toastify';
import { useSelector } from 'react-redux';
import { RootState } from '../../../redux/store';
import { IReviews } from '../../../services/types';
import ReviewCardUi from '../../Ui/User/ReviewCardUi';

interface ReviewsProps {
  courseID:string;
}


export default function Reviews({courseID}:ReviewsProps) {
  const [rating, setRating] = useState(0);
  const [hover, setHover] = useState(0);
  const [feedback, setFeedback] = useState('');
  const [state,setState]=useState<boolean>(false)
  const [reviewData,setReviewData]= useState<IReviews[]>([])

  const {userInfo}= useSelector((state:RootState)=> state.auth)
  
 


  const handleSubmit = async(e:FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const userId = userInfo._id as string
    const userName = userInfo.name as string
    console.log('Rating:', rating, 'Feedback:', feedback,courseID,userId,userName);
  const uploadReview = await uploadReviews(rating,feedback,courseID,userId,userName)
  if (uploadReview) {
    console.log(uploadReview,"uploadReview");
    setState(true)
    setFeedback('')
    setRating(0)
    toast.success("Your Review added successfully")
  }
  };


  useEffect(()=>{
   async function fetchReviews(){
    try {
    
      const response  = await reviewsFetching(courseID)
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
    <div className="w-96 bg-white p-6  shadow-md rounded-lg">
      <form className='m-2' onSubmit={handleSubmit}>
        <div className="flex mb-4">
          {[...Array(5)].map((star, index) => {
            const ratingValue = index + 1;
            return (
              <label key={index}>
                <input 
                  type="radio" 
                  name="rating" 
                  value={ratingValue}
                  onClick={() => setRating(ratingValue)}
                  className="hidden"
                  required
                />
                <FaStar 
                  className="cursor-pointer" 
                  color={ratingValue <= (hover || rating) ? "#ffc107" : "#e4e5e9"}
                  size={30}
                  onMouseEnter={() => setHover(ratingValue)}
                  onMouseLeave={() => setHover(0)}
                />
              </label>
            );
          })}
        </div>
        <textarea
          className="w-full p-2 border border-gray-500 rounded"
          rows={4}
          placeholder="Your feedback..."
          required
          value={feedback}
          onChange={(e) => setFeedback(e.target.value)}
        />
        <Button 
          type="submit"
          // color='warning'
          className="mt-4 text-white px-4 py-2 font-semibold rounded-full bg-black"
        >
          Submit Review
        </Button>
      </form>
    </div>
    <div className="flex-1 bg-white p-6 shadow-md rounded-lg">
    {reviewData.length === 0 ? (
        <div>No reviews available</div> 
      ) : (
      <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3'>

          <ReviewCardUi reviewsDatas={reviewData} />
      </div>
       )}
    </div>
  </div>
  )
}

import { Button } from "@nextui-org/react";
import { FormEvent, useEffect, useState } from "react";
import { FaStar } from "react-icons/fa";
import { reviewsFetching, uploadReviews } from "../../../api/user";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";
import { RootState } from "../../../redux/store";
import { IReviews } from "../../../services/types";
import ReviewCardUi from "../../Ui/User/ReviewCardUi";
import { motion } from "framer-motion";

interface ReviewsProps {
  courseID: string;
  isPurchase: boolean;
}

export default function Reviews({ courseID, isPurchase }: ReviewsProps) {
  const [rating, setRating] = useState(0);
  const [hover, setHover] = useState(0);
  const [feedback, setFeedback] = useState("");
  const [state, setState] = useState<boolean>(false);
  const [reviewData, setReviewData] = useState<IReviews[]>([]);

  const { userInfo } = useSelector((state: RootState) => state.auth);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const userId = userInfo._id as string;
    const userName = userInfo.name as string;
    console.log(
      "Rating:",
      rating,
      "Feedback:",
      feedback,
      courseID,
      userId,
      userName
    );
    const uploadReview = await uploadReviews(
      rating,
      feedback,
      courseID,
      userId,
      userName
    );
    if (uploadReview) {
      console.log(uploadReview, "uploadReview");
      setState(true);
      setFeedback("");
      setRating(0);
      toast.success("Your Review added successfully");
    }
  };

  useEffect(() => {
    async function fetchReviews() {
      try {
        const response = await reviewsFetching(courseID);
        if (response) {
          setState(false);
          console.log(response, "reviews fetching");
          setReviewData(response.data.getReviews);
        }
      } catch (error) {
        console.log(error);
      }
    }
    fetchReviews();
  }, [courseID, state]);

  return (
    <div className="p-4 md:p-8 flex flex-col md:flex-row gap-4">
      <motion.div
        className="w-full md:w-1/2 bg-white p-6 shadow-md rounded-lg"
        initial={{ opacity: 0, x: -50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5 }}
      >
        {isPurchase ? (
          <form className="m-2" onSubmit={handleSubmit}>
            <div className="flex mb-4">
              {[...Array(5)].map((_, index) => {
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
                      color={
                        ratingValue <= (hover || rating) ? "#ffc107" : "#e4e5e9"
                      }
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
              className="mt-4 text-white px-4 py-2 font-semibold rounded-full bg-black"
            >
              Submit Review
            </Button>
          </form>
        ) : (
          <p>You can add reviews after purchasing the course</p>
        )}
      </motion.div>

      <motion.div
        className="w-full md:w-1/2 bg-white p-6 shadow-md rounded-lg"
        initial={{ opacity: 0, x: 50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5 }}
      >
        {reviewData.length === 0 ? (
          <div>No reviews available</div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            <ReviewCardUi reviewsDatas={reviewData} />
          </div>
        )}
      </motion.div>
    </div>
  );
}

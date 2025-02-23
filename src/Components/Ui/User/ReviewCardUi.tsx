import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Avatar,
} from "@nextui-org/react";
import { IReviews } from "../../../services/types";
import { FaStar } from "react-icons/fa";
import { AiOutlineStar } from "react-icons/ai";
import { useSelector } from "react-redux";
import { RootState } from "../../../redux/store";

interface IReviewCardUiProps {
  reviewsDatas: IReviews[];
}

export default function ReviewCardUi({ reviewsDatas }: IReviewCardUiProps) {
  console.log(reviewsDatas, "reviewsDatas");

  const { userInfo } = useSelector((state: RootState) => state.auth);
  const userName = userInfo.name as string;

  return (
    <>
      {reviewsDatas.map((review) => (
        <Card key={review._id} className="max-w-[280px]">
          <CardHeader className="justify-between">
            <div className="flex gap-5">
              <Avatar
                isBordered
                radius="full"
                size="md"
                showFallback
                src="https://images.unsplash.com/broken"
              />
              <div className="flex flex-col gap-1 items-start justify-center">
                <h4 className="text-small font-semibold leading-none text-default-600">
                  {userName === review.userName ? "You" : review.userName}
                </h4>
              </div>
            </div>
          </CardHeader>
          <CardBody className="px-4 py-1 text-small text-default-400">
            <p>{review.feedback}</p>
          </CardBody>
          <CardFooter className="gap-3">
            <div className="flex gap-1">
              {[...Array(5)].map((_, index) => {
                const startIndex = index + 1;
                return startIndex <= review.rating ? (
                  <FaStar key={index} className="text-yellow-400" />
                ) : (
                  <AiOutlineStar key={index} className="text-yellow-400" />
                );
              })}
            </div>
          </CardFooter>
        </Card>
      ))}
    </>
  );
}

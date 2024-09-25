import { Button } from "@nextui-org/react";
import React, { ChangeEvent, FC, useState } from "react";
import { submitTheReport } from "../../api/user";
import { toast } from "react-toastify";

interface ReportModalProps {
  courseId: string;
  userId: string;
  Open: boolean;
  Close: () => void;
}

interface ReportFormState {
  issueType: string;
  description: string;
}

const ReportModal: FC<ReportModalProps> = ({
  courseId,
  userId,
  Open,
  Close,
}) => {
  const [formState, setFormState] = useState<ReportFormState>({
    issueType: "",
    description: "",
  });

  const [formError, setFormError] = useState<string>("");

  const handleChange = (
    e: ChangeEvent<HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    setFormState({
      ...formState,
      [e.target.name]: e.target.value,
    });

    // Clear error message when user starts typing
    if (formError) setFormError("");
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formState.issueType.trim() || !formState.description.trim()) {
      setFormError("Both Issue Type and Description are required.");
      return;
    }

    try {
      const response = await submitTheReport(courseId, userId, formState);
      if (response) {
        console.log(response, "Response Data");

        // Check the response data for different cases
        if (response.status === 200 && response.data === "AlreadyAdded") {
          toast.info(response.message, {
            position: "top-center",
            hideProgressBar: true,
            autoClose: 3000,
            closeButton: false,
          });
        } else if (response.status === 200) {
          toast.success(response.message, {
            hideProgressBar: true,
            autoClose: 3000,
            closeButton: false,
          });
          console.log("Reported Issue: ", response);
          setFormState({ issueType: "", description: "" });
          Close();
        } else if (response.status === 400) {
          toast.error(response.message);
        }
      }
    } catch (error) {
      console.error("Submission error:");
    } finally {
      setFormState({ issueType: "", description: "" });
      Close();
    }
  };

  if (!Open) return null;

  const isSubmitDisabled =
    !formState.issueType.trim() || !formState.description.trim();

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50  ">
      <div className="bg-white rounded-lg shadow-lg p-6 w-[600px] h-[330px]">
        <h2 className="text-xl font-semibold mb-4 flex justify-center underline">
          Report this Course
        </h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label
              htmlFor="issueType"
              className="block text-sm font-medium text-gray-600"
            >
              Issue Type <span className="text-red-600">*</span>
            </label>

            <select
              id="issueType"
              name="issueType"
              value={formState.issueType}
              onChange={handleChange}
              className="mt-1 block w-full  font-sans font-semibold   p-3 rounded-md border border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
            >
              <option className="text-gray-400" value="">
                Select an issue type
              </option>
              <option className="text-black" value="content">
                Content Issue
              </option>
              <option className="text-black" value="IncorrectInfo">
                Incorrect Information
              </option>
              <option className="text-black" value="technical">
                Technical Issue
              </option>
              <option className="text-black" value="other">
                Other
              </option>
            </select>
          </div>
          <div className="mb-4">
            <label
              htmlFor="description"
              className="block text-sm font-medium text-gray-600"
            >
              Description<span className="text-red-600">*</span>
            </label>
            <textarea
              id="description"
              name="description"
              value={formState.description}
              onChange={handleChange}
              className="mt-1 block w-full p-3 font-sans  text-black font-semibold rounded-md border border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
              required
            />
          </div>
          {formError && (
            <div className="text-red-500 text-sm mb-4">{formError}</div>
          )}
          <div className="flex justify-end">
            <Button
              type="button"
              onClick={Close}
              className="mr-2 px-4 py-2 text-sm font-medium text-gray-700 bg-gray-200 rounded-md hover:bg-gray-300"
            >
              Cancel
            </Button>
            <Button
              type="submit"
              className={`px-4 py-2 text-sm font-medium text-white rounded-md ${
                isSubmitDisabled
                  ? "bg-gray-400"
                  : "bg-gray-950 hover:bg-gray-800"
              }`}
              disabled={isSubmitDisabled}
            >
              Submit
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ReportModal;

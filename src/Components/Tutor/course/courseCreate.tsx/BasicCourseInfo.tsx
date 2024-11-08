import React, { useEffect, useState } from "react";
import { categoryData } from "../../../../api/tutor";
import { Button } from "@nextui-org/react";

interface BasicCourseInfoProps {
  onSubmit: (data: FormData) => void;
}

interface ICategory {
  _id: string;
  categoryName: string;
  is_listed?: boolean;
}

const BasicCourseInfo: React.FC<BasicCourseInfoProps> = ({ onSubmit }) => {
  const [categoriesFetch, setCategoriesFetch] = useState<ICategory[]>([]);
  const [thumbImage, setThumbImage] = useState<File | null>(null);
  const [video, setVideo] = useState<File | null>(null);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [price, setPrice] = useState("");
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const maxLengthDescription = 100;

  const handleThumbnailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const file = e.target.files[0];
      if (file && file.type.startsWith("image/")) {
        setThumbImage(file);
        setErrors((prev) => ({ ...prev, thumbnail: "" }));
      } else {
        setErrors((prev) => ({
          ...prev,
          thumbnail: "Please upload a valid image file (max 5MB).",
        }));
      }
    }
  };

  const handleVideoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const file = e.target.files[0];
      if (file && file.type.startsWith("video/")) {
        setVideo(file);
        setErrors((prev) => ({ ...prev, video: "" }));
      } else {
        setErrors((prev) => ({
          ...prev,
          video: "Please upload a valid video file (max 50MB).",
        }));
      }
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Trim inputs
    const trimmedTitle = title.trim();
    const trimmedDescription = description.trim();
    const trimmedPrice = price.trim();

    const formErrors: { [key: string]: string } = {};
    if (!thumbImage) formErrors.thumbnail = "Thumbnail image is required.";
    if (!video) formErrors.video = "Trailer video is required.";
    if (!trimmedTitle) formErrors.title = "Title is required.";
    if (!trimmedDescription)
      formErrors.description = "Description is required.";
    if (trimmedDescription.length > maxLengthDescription)
      formErrors.description = `Description cannot exceed ${maxLengthDescription} characters.`;
    if (!category) formErrors.category = "Category is required.";
    if (
      !trimmedPrice ||
      isNaN(Number(trimmedPrice)) ||
      Number(trimmedPrice) <= 0
    )
      formErrors.price = "Price must be a positive number.";

    if (Object.keys(formErrors).length > 0) {
      setErrors(formErrors);
      return;
    }

    const formData = new FormData();
    if (thumbImage) formData.append("thumbnail", thumbImage);
    if (video) formData.append("video", video);
    formData.append("title", trimmedTitle);
    formData.append("description", trimmedDescription);
    formData.append("category", category);
    formData.append("price", trimmedPrice);
    onSubmit(formData);
  };

  useEffect(() => {
    categoryDetail();
  }, []);

  const categoryDetail = async () => {
    try {
      const { getCateData } = await categoryData();
      console.log(getCateData, "getCateData");
      setCategoriesFetch(getCateData);
    } catch (error) {
      console.error("Error fetching category:", error);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="max-w-5xl mx-auto p-8 bg-white shadow-md rounded-lg border border-gray-200"
    >
      <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">
        Course Basic Info
      </h2>
      <hr className="border-t-2 border-black mb-2" />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="flex flex-col">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Course Thumbnail
          </label>
          <input
            type="file"
            accept="image/*"
            onChange={handleThumbnailChange}
            className="block p-1 w-full text-sm text-gray-900 border border-gray-300 rounded-lg shadow-sm"
          />
          {errors.thumbnail && (
            <p className="text-red-500 text-sm mt-1">{errors.thumbnail}</p>
          )}
          {thumbImage && (
            <img
              src={URL.createObjectURL(thumbImage)}
              alt="Thumbnail preview"
              className="mt-2 w-full h-32 object-cover border border-gray-300 rounded-lg"
            />
          )}
        </div>
        <div className="flex flex-col">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Trailer Video
          </label>
          <input
            type="file"
            accept="video/*"
            onChange={handleVideoChange}
            className="block p-1 w-full text-sm text-gray-900 border border-gray-300 rounded-lg shadow-sm"
          />
          {errors.video && (
            <p className="text-red-500 text-sm mt-1">{errors.video}</p>
          )}
          {video && (
            <video
              src={URL.createObjectURL(video)}
              controls
              className="mt-2 w-full h-32 object-cover border border-gray-300 rounded-lg"
            />
          )}
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Course Title
          </label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value.trim())}
            className="block w-full p-1 text-sm font-sans font-medium text-gray-900 border-2 border-gray-300 rounded-md shadow-sm"
          />
          {errors.title && (
            <p className="text-red-500 text-sm mt-1">{errors.title}</p>
          )}
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Course Description
          </label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value.trim())}
            rows={4}
            placeholder="Enter text (max 100 characters)"
            maxLength={100}
            className="block w-full p-1 text-sm font-sans font-medium text-gray-900 border-2 border-gray-300 rounded-md shadow-sm"
          />
          <p className="text-gray-800 text-sm font-mono">
            {maxLengthDescription - description.length} characters remaining
          </p>
          {errors.description && (
            <p className="text-red-500 text-sm mt-1">{errors.description}</p>
          )}
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Category
          </label>
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value.trim())}
            className="block w-full p-1 text-sm font-sans font-medium text-gray-900 border-2 border-gray-300 rounded-md shadow-sm"
          >
            <option value="" disabled>
              Select a category
            </option>
            {categoriesFetch.map((cat) => (
              <option key={cat._id} value={cat._id}>
                {cat.categoryName}
              </option>
            ))}
          </select>
          {errors.category && (
            <p className="text-red-500 text-sm mt-1">{errors.category}</p>
          )}
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Price
          </label>
          <input
            type="text"
            value={price}
            onChange={(e) => setPrice(e.target.value.trim())}
            className="block w-full p-1 text-sm font-sans font-medium text-gray-900 border-2 border-gray-300 rounded-md shadow-sm"
          />
          {errors.price && (
            <p className="text-red-500 text-sm mt-1">{errors.price}</p>
          )}
        </div>
      </div>
      <div className="flex justify-center">
        <Button
          type="submit"
          className="mt-8 w-96 bg-gray-950 text-white font-semibold py-3 px-1 rounded-lg shadow-lg focus:ring-1 focus:ring-blue-300"
        >
          Create
        </Button>
      </div>
    </form>
  );
};

export default React.memo(BasicCourseInfo);

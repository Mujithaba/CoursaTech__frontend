// export default BasicCourseInfo;
import React, { useEffect, useState } from "react";
import { categoryData } from "../../../../api/tutor";

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

  const handleThumbnailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setThumbImage(e.target.files[0]);
    }
  };

  const handleVideoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setVideo(e.target.files[0]);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const formData = new FormData();
    if (thumbImage) formData.append("thumbnail", thumbImage);
    if (video) formData.append("video", video);
    formData.append("title", title);
    formData.append("description", description);
    formData.append("category", category);
    formData.append("price", price);
    onSubmit(formData);
  };

  useEffect(() => {
    categoryDetail();
  }, []);
  // category fetch fun...
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
      <h2 className="text-2xl  font-bold text-gray-800 mb-6 text-center">
        {" "}
        Course Basic Info
      </h2>
      <hr className="border-t-2 border-black mb-2" />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="flex flex-col ">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Course Thumbnail
          </label>
          <input
            type="file"
            accept="image/*"
            onChange={handleThumbnailChange}
            className="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg shadow-sm"
          />
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
            className="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg shadow-sm"
          />
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
            onChange={(e) => setTitle(e.target.value)}
            className="block w-full p-1 text-sm font-sans font-medium text-gray-900 border-2 border-gray-300 rounded-md shadow-sm"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Course Description
          </label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            rows={4}
            className="block w-full p-1 text-sm font-sans font-medium text-gray-900 border-2 border-gray-300 rounded-md shadow-sm"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Category
          </label>
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="block w-full p-1 text-sm font-sans font-medium text-gray-900 border-2 border-gray-300 rounded-md shadow-sm"
            required
          >
            <option value="" disabled>
              Select a category
            </option>
            {categoriesFetch.map((categories) => (
              <option key={categories._id} value={categories._id}>
                {categories.categoryName}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Price
          </label>
          <input
            type="text"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            className="block w-full p-1 text-sm font-sans font-medium text-gray-900 border-2 border-gray-300 rounded-md shadow-sm"
            required
          />
        </div>
      </div>
      <div className="flex justify-center">
      <button
        type="submit"
        className="mt-8 w-96 bg-green-900 text-white font-semibold py-3 px-1 rounded-lg shadow-lg hover:bg-green-800 focus:ring-4 focus:ring-blue-300"
      >
        Create
      </button></div>
    </form>
  );
};

export default React.memo(BasicCourseInfo);

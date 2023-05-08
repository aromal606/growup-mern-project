import React, { useState } from "react";
import axios from "axios";
import Card from "../../Card/Card";
const userid = localStorage.getItem("id");
const PostSharingComponent = () => {
  const [caption, setCaption] = useState("");
  const [file, setFile] = useState(null);
  const handleCaptionChange = (event) => {
    setCaption(event.target.value);
  };

  const handleFileChange = (event) => {
    setFile(event.target.files[0]);
  };
  const handleSubmit = async (event) => {
    event.preventDefault();
    // Handle submission logic here, e.g. using fetch() to send the data to a server
    console.log({ caption, file });
    const formData = new FormData();

    // Append the caption and file to the form data object
    formData.append("caption", caption);
    formData.append("userid", userid);
    formData.append("file", file);
    try {
      const response = await axios.post(
        "http://localhost:4000/userPostShare",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      console.log(response.data);
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <>
      <div className=" w-3/4 rounded-md sm:p-2 md:p-3 xl:p-4">
        <form onSubmit={handleSubmit}>
          <Card>
            <div className="flex grow gap-1">
              {/* <ProfileImageComponent userId={user?.user} /> */}
                <textarea
                  value={caption}
                  onChange={(e) => setCaption(e.target.value)}
                  type="text"
                  className="grow p-3 h-14 bg-gray-50 border rounded-xl"
                  placeholder={"Whats on your mind"}
                />
              <div className="lg:ml-0 lg:mr-2 flex items-center">
                <div>
                  <label
                    htmlFor="file"
                    className="flex items-center cursor-pointer"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="blue"
                      viewBox="0 0 24 24"
                      strokeWidth={1.5}
                      stroke="#CBD5E0"
                      className="w-6 h-6"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M2.25 15.75l5.159-5.159a2.25 2.25 0 013.182 0l5.159 5.159m-1.5-1.5l1.409-1.409a2.25 2.25 0 013.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 001.5-1.5V6a1.5 1.5 0 00-1.5-1.5H3.75A1.5 1.5 0 002.25 6v12a1.5 1.5 0 001.5 1.5zm10.5-11.25h.008v.008h-.008V8.25zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z"
                      />
                    </svg>

                    <span className="text-gray-500">Add Image/Video</span>
                  </label>
                </div>
                <div>
                  <input
                    className="hidden"
                    id="file"
                    name="file"
                    type="file"
                    accept="image/*,video/*"
                    onChange={handleFileChange}
                  />
                </div>
              </div>
              <div className="flex  p-2 grow">
                {/* put commented code here(code is below ) */}
                
                  <button
                    type="submit"
                    className="text-white bg-blue-400 px-1 text-xs xl:px-6 py-1 xl:text-md rounded-md"
                  >
                    Share
                  </button>
                
              </div>
            </div>
          </Card>
        </form>
      </div>
    </>
  );
};

export default PostSharingComponent;

// drop this code mentioned above

{
  /* <div>
              <button className="flex items-center gap-1">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="blue"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="#CBD5E0"
                  className="w-6 h-6"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M15 19.128a9.38 9.38 0 002.625.372 9.337 9.337 0 004.121-.952 4.125 4.125 0 00-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 018.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0111.964-3.07M12 6.375a3.375 3.375 0 11-6.75 0 3.375 3.375 0 016.75 0zm8.25 2.25a2.625 2.625 0 11-5.25 0 2.625 2.625 0 015.25 0z"
                  />
                </svg>
                <p className=" text-xs sm:text-sm md:text-base xl:text-xl">
                  People
                </p>
              </button>
            </div>
            <div>
              <button className="flex items-center gap-1">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="blue"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="#CBD5E0"
                  className="w-6 h-6"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z"
                  />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z"
                  />
                </svg>
                <p className="text-gray-200 text-xs sm:text-sm md:text-base xl:text-xl">
                  Check in
                </p>
              </button>
            </div>
            <div>
              <button className="flex items-center gap-1">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="#CBD5E0"
                  className="w-6 h-6"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M15.182 15.182a4.5 4.5 0 01-6.364 0M21 12a9 9 0 11-18 0 9 9 0 0118 0zM9.75 9.75c0 .414-.168.75-.375.75S9 10.164 9 9.75 9.168 9 9.375 9s.375.336.375.75zm-.375 0h.008v.015h-.008V9.75zm5.625 0c0 .414-.168.75-.375.75s-.375-.336-.375-.75.168-.75.375-.75.375.336.375.75zm-.375 0h.008v.015h-.008V9.75z"
                  />
                </svg>
                <p className="text-gray-200 text-xs sm:text-sm md:text-base xl:text-xl">
                  Mood
                </p>
              </button>
            </div> */
}

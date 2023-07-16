import React, { useEffect, useState } from "react";
import Card from "../../Card/Card";
import axiosApi from "../../../API/axiosApi";
import PostCardHeaderSection from "../PostCard/PostCardHeaderSection";
const PostSharingComponent = () => {
  const { sharePost } = axiosApi();
  const [postRendering, setPostRendering] = useState(false);
  const [caption, setCaption] = useState("");
  const [file, setFile] = useState(null);
  const userid = localStorage.getItem("id");

  const handleCaptionChange = (event) => {
    setCaption(event.target.value);
  };

  const handleFileChange = (event) => {
    setFile(event.target.files[0]);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const formData = new FormData();
    formData.append("caption", caption);
    formData.append("userid", userid);
    formData.append("file", file);

    try {
      const response = await sharePost(formData);
      // onPostShare(response.data);
      setCaption(""); // Clear the caption and file inputs after successful submission
      setFile(null);
      postRendering ? setPostRendering(false) : setPostRendering(true);
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <>
      <div className=" rounded-md  sm:p-2 md:p-3 xl:p-4">
        <form onSubmit={handleSubmit}>
          <Card>
            <div className="flex flex-col grow gap-1">
              <textarea
                value={caption}
                onChange={(e) => setCaption(e.target.value)}
                type="text"
                className="grow p-3 h-14 bg-gray-50 border rounded-xl"
                placeholder={"Whats on your mind . . ."}
              />
              <div className="lg:ml-0 lg:mr-2 flex items-center gap-2">
                <div className="">
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
                <div className="">
                  <div className=" grow">
                    {/* put commented code here(code is below ) */}

                    <button
                      type="submit"
                      className="text-white bg-blue-400 px-1 text-xs xl:px-6 py-1 xl:text-md rounded-md"
                    >
                      Share
                    </button>
                  </div>
                </div>
              </div>
            </div>{" "}
            {}
          </Card>
        </form>
      </div>
      <div>
        <PostCardHeaderSection updateComponent={postRendering} />
      </div>
    </>
  );
};

export default PostSharingComponent;

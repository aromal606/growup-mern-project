import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";
const RightSideBarComponent = () => {
  const id = localStorage.getItem("id");
  const [suggestions, setSuggestions] = useState([]);
  const [followed, setFollowed] = useState(false);
  

const follow = async (followingId) => {
  try {
    const res = await axios.put(
      `http://localhost:4000/${followingId}/follow`,
      { id }
    );
    const userName = res.data.name;
    Swal.fire({
      icon: 'success',
      title: 'Followed!',
      text: `Started following ${userName}`,
    }).then(() => {
      setFollowed(!followed);

    });
  } catch (error) {
    console.log(error);
  }
};
  useEffect(() => {
    if (id || followed) {
      const getSuggestions = async () => {
        try {
          const response = await axios.get(
            `http://localhost:4000/suggestions/${id}`
          );
          setSuggestions(response.data);
        } catch (error) {
          console.log(error);
        }
      };
      getSuggestions();
    }
  }, [id, followed]);



  return (
    <>
      <div className="bg-gray-200 shadow-lg w-60 mt-10">
        <div className="space-y-2 ">
          <div className="flex items-center justify-center">Suggestions</div>
          <div className="flex-1 ">
            <ul className="pt-2 pb-4 space-y-1 text-sm ">
              {suggestions.map((suggestion) => (
                <div className="" key={suggestion._id}>
                  <li className="mt-2 rounded-sm hover:bg-gray-300 hover:scale-110 dark:hover:bg-gray-400 flex items-center justify-between">
                    <div className="flex items-center">

                    <img
                      className="overflow-hidden object-cover rounded-full w-14 h-14"
                      src={suggestion.imageName}
                      alt="profile pic"
                    />
                    <div className="flex flex-col ml-2">
                      <Link to={`/otherProfile/${suggestion._id}`}>
                        <span className="p-3">{suggestion.name}</span>
                      </Link>
                    </div>
                    </div>
                    <div className="mr-4">
                      <span
                        onClick={() => {
                          follow(suggestion._id);
                        }}
                        className="text-blue-400 font-semibold cursor-pointer"
                      >
                        follow
                      </span>
                    </div>
                  </li>
                  
                </div>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </>
  );
};

export default RightSideBarComponent;

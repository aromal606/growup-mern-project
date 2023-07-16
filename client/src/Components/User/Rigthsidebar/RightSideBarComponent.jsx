import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";
import axiosApi from "../../../API/axiosApi";
const RightSideBarComponent = () => {
  const { removeSuggetion, followUser, getsuggestion } = axiosApi();
  const id = localStorage.getItem("id");
  const [suggestions, setSuggestions] = useState([]);
  const [followed, setFollowed] = useState(false);
  const [removeSuggetions, setRemoveSuggetions] = useState(false);

  const follow = async (followingId) => {
    try {
 
      const res = await followUser(followingId,id)
      const userName = res.data.name;
      Swal.fire({
        icon: "success",
        title: "Followed!",
        text: `Started following ${userName}`,
      }).then(() => {
        setFollowed(!followed);
      });
    } catch (error) {
      console.log(error);
    }
  };

  const remove = async (Id, id) => {
    try {
      const response = await removeSuggetion(Id, id);
      setRemoveSuggetions(!removeSuggetions);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (id || followed) {
      const getSuggestions = async () => {
        try {
          // const response = await axios.get(
          //   `http://localhost:4000/suggestions/${id}`
          // );

          const response = await getsuggestion(id)

          setSuggestions(response.data);
        } catch (error) {
          console.log(error);
        }
      };
      getSuggestions();
    }
  }, [id, followed,removeSuggetions]);

  return (
    <>
      <div className="bg-gray-100 shadow-lg w-60 mt-10">
        <div className="space-y-2 ">
          <div className="flex items-center justify-center font-semibold">
            Suggestions
          </div>
          <div className="flex-1">
            <ul className="pt-2 pb-4 space-y-1 text-sm">
              {suggestions.map((suggestion) => {
                if (
                  suggestion.blacklistedid &&
                  suggestion.blacklistedid.includes(id)
                ) {
                  return null;
                }

                return (
                  <div className="" key={suggestion._id}>
                    <li className="rounded-sm hover:scale-110 dark:hover:bg-gray-300 flex items-center justify-between">
                      <div className="flex items-center mt-3">
                        <img
                          className="overflow-hidden object-cover rounded-full w-12 h-12"
                          src={suggestion.imageName}
                          alt="profile pic"
                        />
                        <div className="flex flex-col ml-2">
                          <Link to={`/otherProfile/${suggestion._id}`}>
                            <span className="font-semibold hover:text-cyan-600">{suggestion.name}</span>
                          </Link>
                        </div>
                      </div>
                      <div className="mr-4">
                        <span
                          onClick={() => {
                            follow(suggestion._id);
                          }}
                          className="text-blue-400 font-semibold cursor-pointer hover:text-blue-700 mr-2"
                        >
                          follow
                        </span>

                        <span
                          onClick={() => {
                            remove(suggestion._id, id);
                          }}
                          className="text-blue-400 font-semibold cursor-pointer hover:text-blue-700"
                        >
                          remove
                        </span>
                      </div>
                    </li>
                  </div>
                );
              })}
            </ul>
          </div>
        </div>
      </div>
    </>
  );
};

export default RightSideBarComponent;

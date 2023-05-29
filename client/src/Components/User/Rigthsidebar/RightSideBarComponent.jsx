import React, { useEffect, useState } from "react";
import axios from "axios";
import {Link} from "react-router-dom"
const RightSideBarComponent = () => {
  const id = localStorage.getItem("id");
  const [displaySuggestion, setDisplaysuggestion] = useState(false)
  console.log(id);
  const [suggetions, setSuggetions] = useState("");
  const handleSuggetion=(boolean)=>{
    setDisplaysuggestion(boolean)
  }
  useEffect(() => {
    if (id) {
      const getSuggetions = async () => {
        const response = await axios.get(
          `http://localhost:4000/suggetions/${id}`
        );
        console.log(response,"1111111111111");
        setSuggetions(response.data);
      };
      getSuggetions();
    }
  }, [displaySuggestion,id]);

  const follow = async (followingId) => {
    console.log(followingId,"rrrrrrrrrr");
    const res = await axios.put(`http://localhost:4000/${followingId}/follow`, { id })
    const userName = res.data.name
    alert(`started following ${userName}`)
    handleSuggetion(true)

}

  return (
    <>
      <div className="bg-gray-200 shadow-lg w-60 mt-10">
        <div className="space-y-2">
          <div className="flex items-center">Suggetions</div>
          <div className="flex-1 border">
            <ul className="pt-2 pb-4 space-y-1 text-sm">
              {suggetions && suggetions.map((suggetion) => (
                <div className="">
                <li className="rounded-sm hover:bg-gray-300 hover:scale-110 dark:hover:bg-gray-400">
                  <a
                    href="#"
                    className="flex items-center p-2 space-x-3 rounded-md"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={1.5}
                      stroke="currentColor"
                      className="w-6 h-6"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M17.982 18.725A7.488 7.488 0 0012 15.75a7.488 7.488 0 00-5.982 2.975m11.963 0a9 9 0 10-11.963 0m11.963 0A8.966 8.966 0 0112 21a8.966 8.966 0 01-5.982-2.275M15 9.75a3 3 0 11-6 0 3 3 0 016 0z"
                      />
                    </svg>
<Link to={`/otherProfile/${suggetion._id}`}>
                    <span className="p-3">{suggetion.name}</span>
</Link>

                  <span onClick={()=>{follow(suggetion._id)}} className='text-blue-400 font-semibold cursor-pointer m-2 mb-4 '>follow</span>

                    </a>
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

import React, { useState, useEffect } from "react";
import axios from "axios";
import Modal from "react-modal";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
// import { setCheck } from '../../redux/userData'
import ProfileAvatar from "../Avatar";
import Card from "../../Card/Card";
export default function UserProfileComponent({}) {
  const [modal, setModel] = useState();
  const toggleModal = () => {
    setModel(!modal);
  };
  const [details, setDetails] = useState();
  useEffect(() => {
    const id = localStorage.getItem("id");
    console.log(id);
    (async () => {
      const response = await axios.get(
        `http://localhost:4000/getprofile/${id}`
      );
      setDetails(response.data);
    })();
  }, []);
  return (
    <>
      <Card>
        <div className="overflow-hidden w-full h-full">
          <img
            src="https://i.pinimg.com/474x/69/44/39/694439b3031503a7564eda9e24f673eb.jpg"
            alt="image"
            className="h-44 w-full overflow-hidden object-cover"
          />
          <div className="block md:flex gap-6">
     
            <div className="h-28 w-28 overflow-hidden border rounded-full">
              <img
                src="https://media.istockphoto.com/id/1225173869/photo/house-boat-anchored-in-lake-with-jungle-background-backwaters-kerala-india.jpg?s=612x612&w=0&k=20&c=uo-bsRQjhlT9AgeWBs_pkSvHQwStCelMC75EUpzwjHU="
                alt="your-image-description"
                className="rounded-full w-full h-full object-cover border-4 md:relative z-5 md:left-0"
              />
            </div>
            

            {details && details.length > 0
              ? details.map((data) => (
                  <div key={data._id} className="grid gap-3">
                    <div className="flex justify-between">
                      <p className="font-semibold md:text-2xl text-xl">
                        {data.name}
                      </p>
                      <Link to={"/Update"}>
                        <button className="bg-blue-500 hover:bg-blue-700 text-white mt-3 font-bold py-2 px-4 rounded-full">
                          edit
                        </button>
                      </Link>
                    </div>
                    <div className="bio">
                      <p className="">{data.bio}</p>
                    </div>
                    <div className="max-h-16 w-full">
                      <h1 className="text-xl font-bold">skills</h1>
                      <ul className="flex gap-7 text-lg">
                        {data.workingOn.map((workingOn, index) => (
                          <li key={index}>{workingOn}</li>
                        ))}
                      </ul>
                    </div>
                    <div className="flex md:gap-32">
                      <div className="post">
                        <h1 className="font-semibold text-lg">Following</h1>
                        <h1 className="font-semibold text-slate-700 text-center text-sm">
                          682
                        </h1>
                      </div>
                      <div className="followers">
                        <h1 className="font-semibold text-lg">Followers</h1>
                        <h1 className="font-semibold text-slate-700 text-center text-sm">
                          224
                        </h1>
                      </div>
                      <div className="following ">
                        <h1 className="font-semibold text-lg">Post</h1>
                        <h1 className="font-semibold text-slate-700 text-center text-sm">
                          82
                        </h1>
                      </div>
                    </div>
                  </div>
                ))
              : null}
          </div>
        </div>
      </Card>
    </>
  );
}

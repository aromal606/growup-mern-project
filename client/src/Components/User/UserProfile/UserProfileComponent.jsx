import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
// import { setCheck } from '../../redux/userData'
import ProfileAvatar from "../Avatar";
import Card from "../../Card/Card";

export default function UserProfileComponent({}) {
  let data = {
    name: "aromal",
  };
  let post = {
    length: 3,
  };
  // const postNo = post?.length
  const postNo = 3;
  const dispatch = useDispatch();
  const [showModal, setShowModal] = useState(false);
  const navigate = useNavigate();
  const user = useSelector((state) => state.user);
  const target = localStorage.getItem("targetId");
  const [owner, setOwner] = useState(false);

  const [name, setName] = useState(data.name);
  const [bio, setBio] = useState(data?.bio);
  const [file, setFile] = useState();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("userId", data._id);
    formData.append("name", name);
    formData.append("bio", bio);
    formData.append("image", file);

    try {
      const { data } = await axios.post(
        `${import.meta.env.VITE_AXIOS_KEY}/updateProfile`,
        formData,
        { headers: { "Content-Type": "multipart/form-data" } }
      );
      navigate("/profile");
      dispatch(setCheck({ check: data._id }));
    } catch (error) {
      console.log(error);
    }
  };

  const fileSelected = (event) => {
    const file = event.target.files[0];
    setFile(file);
  };

  const addChat = {
    senderId: user?.user,
    receiverId: target,
  };
  const handleChat = async () => {
    await axios.post(`${import.meta.env.VITE_AXIOS_KEY}/chat`, addChat);
    navigate("/chats");
  };

  useEffect(() => {
    const checkUser = () => {
      if (user?.user != target) {
        setOwner(false);
      } else {
        setOwner(true);
      }
    };
    checkUser();
  }, [user]);

  return (
 <>
 <Card>
  <div className="">
    <img src="https://media.licdn.com/dms/image/D5616AQHbtWfQ4xan_Q/profile-displaybackgroundimage-shrink_350_1400/0/1673000623239?e=1689206400&v=beta&t=ircyZX6o5y2GNXoFmkHb03PkY3rmraF0NUNLoE5wUA0" alt="image" className="h-36 w-full overflow-hidden object-cover"/>
    <div className="block md:flex gap-6">
      <div className="">
      <img src="https://media.licdn.com/dms/image/D5603AQFhKjREMRo7FQ/profile-displayphoto-shrink_200_200/0/1672999633339?e=1689206400&v=beta&t=-waphQ9DTZdKDE2H_2zNOKK_tBytPZFXW94td4n3u_8" alt="your-image-description" className=" object-cover rounded-full border-4 md:relative z-5 md:-top-5 -top-10 left-[33%] md:left-0" />
      </div>
<div className="grid gap-3">
        <div className="flex justify-between">
         <p className="font-semibold md:text-4xl text-xl">Aromal</p>
         <button className="mr-5 text-blue-700 underline">edit</button>
        </div>
        <div className="bio">
          <p className="">Lorem ipsum dolor, sit amet consectetur adipisicing elit. Ratione consequuntur similique eos ad hic vero porro corporis maiores soluta animi dolores in necessitatibus molestiae enim, iure recusandae minus pariatur earum.</p>
        </div>
        <div className=" max-h-16 w-full">
          <h1 className="text-xl font-bold">skills</h1>
        <ul  className="flex gap-7 text-xl ">
  <li>Javascript</li>
  <li>Python</li>
  <li>Java</li>
</ul>

        </div>
        <div className="flex md:gap-32">
          <div className="post">
          <h1 className="font-bold text-xl">Following</h1>
            <h1 className="font-semibold text-slate-700 text-center text-xl ">682</h1>
          </div>
          <div className="followers">
          <h1 className="font-bold text-xl">Followers</h1>
            <h1 className="font-semibold text-slate-700 text-center text-xl ">224</h1>
          </div>
          <div className="following ">
            <h1 className="font-bold text-xl">Post</h1>
            <h1 className="font-semibold text-slate-700 text-center text-xl ">824</h1>
          </div>
        </div>
      </div>
    </div>
  </div>
 </Card>
 </>
  );
}

// import React from "react";
// import {useNavigate} from "react-router-dom"
// import PostCardComponent from "../PostCard/PostCardComponent";
// const homeComponent = () => {

//   const posts = [
//     {
//       text: "Check out this cool cat!",
//       mediaType: "image",
//       mediaUrl: "https://www.pictureframesexpress.co.uk/blog/wp-content/uploads/2020/05/7-Tips-to-Finding-Art-Inspiration-Header-1024x649.jpg"
//     },
//     {
//       text: "Amazing view from my hike!",
//       mediaType: "video",
//       mediaUrl: "https://www.w3schools.com/html/mov_bbb.mp4"
//     },
//     {
//       text: "Amazing view from my hike!",
//       mediaType: "video",
//       mediaUrl: "https://www.w3schools.com/html/mov_bbb.mp4"
//     },
//     {
//       text: "Amazing view from my hike!",
//       mediaType: "video",
//       mediaUrl: "https://www.w3schools.com/html/mov_bbb.mp4"
//     }
//   ];

//   const navigate=useNavigate()
//     const logout=()=>{
//         localStorage.clear();
//         navigate('/login')
//       }
//   return (
//     <>
//       <div className="flex border flex-col  p-3 max-h-screen bg-gray-50 shadow w-auto h-auto">
//       <div className="grid grid-cols-3">
//       {posts.map((post, index) => (
//         <PostCardComponent post={post} key={index} />
//       ))}
//     </div>
//       </div>
//     </>
//   );
// };

// export default homeComponent;

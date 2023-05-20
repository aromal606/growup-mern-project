import axios from 'axios'
import React,{useState,useEffect} from 'react'
// import { getNameUser } from '../../api/NameRequests'
// import { useDispatch } from 'react-redux';
// import { setSearch } from '../../redux/userData';
// import { useNavigate } from 'react-router-dom';

const NameComponent = (props) => {
  
  const userId = props
  const reUserId = userId?.userId
//   const dispatch = useDispatch()
//   const navigate = useNavigate()
  const [name,setName] = useState()
//   const [lastName,setLastName] = useState()
  
  useEffect(() => {
    const getUserName = async ()=>{
     const {data}=await axios.post("http://localhost:4000/getUsername",userId)
     setName(data?.name);
    }
    getUserName() 
  }, [])

//   const handleSearch=()=>{
//     dispatch(setSearch({search:reUserId}))
//     localStorage.setItem("targetId",reUserId)
//     navigate('/searchPage')
//   }
  
  return (
    // <div onClick={handleSearch}>
    //   {name} {lastName}
    // </div>
    <div>
        {name}
      </div>
  )
}

export default NameComponent
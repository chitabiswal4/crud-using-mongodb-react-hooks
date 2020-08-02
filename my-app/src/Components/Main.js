import React,{useState}from 'react';
import axios from 'axios';
import EditForm from './EditForm';
import UserList from './UserList';
import AddUser from './AddUser';

const Main=(props)=>{
  const [user,setUser]=useState([]);
  const initialFormList={id:'',name:'',username:''}

  const [currentUser,setCurrentUser]=useState(initialFormList);
  const[editing,setEditing]=useState(false);
  

  


 const  getBlogPost = () => {
    axios.get('http://localhost:8080/attentions')
      .then((response) => {
        setUser(response.data)
        console.log('Data has been received!!');
      })
      .catch(() => {
        alert('Error retrieving data!!!');
      });
  }



  // useEffect(()=>{
  //   const fetchData=async()=>{
  //       const response =await axios.get(
  //           `http://localhost:8080/attentions`
  //       );
  //       console.log(response.data);
  //       setUser(response.data)
  //   }
  //   fetchData();
  // },[]) 

 
  
  
  const  deleteUser=_id=>{
  
    
    setEditing(false)
    console.log(_id)
    axios.delete(`http://localhost:8080/attention/${_id}`)
    .then(res => {
      console.log(res);
      getBlogPost();
      console.log(res.data);
     })
    

  }
	const userUpdate = (id, updatedUser) => {
		setEditing(false)

		
	}

const editData=(user)=>{
  setEditing(true)

  setCurrentUser({id:user._id,name:user.name,username:user.username})
}


return(
  <>{
      editing ?(
        <>
        <h1>Edit User</h1>
         <EditForm
        getBlogPost={getBlogPost}
        editing={editing}
        setEditing={setEditing}
        currentUser={currentUser}
        userUpdate={userUpdate}/>
        </>
    
      ):
      (
        <>
        <AddUser  getBlogPost={getBlogPost}/>
        </>
      )
      
  }
 <div className="flex-large">
      <h1>View User</h1>
    <UserList user={user} getBlogPost={getBlogPost} editData={editData} deleteUser={deleteUser}/>
 </div>
   
 </>
  )
}

export default Main;
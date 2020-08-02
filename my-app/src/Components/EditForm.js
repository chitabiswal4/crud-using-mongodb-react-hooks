import React, { useState,useEffect } from 'react';
import axios from 'axios';

const EditForm=props=>{
    const [user,setUser]=useState(props.currentUser);

    useEffect(() => {setUser(props.currentUser)},[ props ])

    const handleInputChange = event => {
        const { name, value } = event.target
    
        setUser({ ...user, [name]: value })
      }
    
   const EditData=()=>{
    var data={
        username:user.username,
        name:user.name
    }
    console.log(data);

  axios.put(`http://localhost:8080/attention/${user.id}`, data)
  .then(response => {
    console.log("Post data rsp:" + response);
    console.log(response.data);
    props.getBlogPost();
   /* this.setState({
      title : ''
    }); */
  /*  this.props.func(); */
  }).catch(error=>{
    console.log("post error" + error)

  });
   }

        return (
            <form className="form-div"
              onSubmit={event => {
                event.preventDefault()
        
                props.userUpdate(user.id, user);
                EditData(user.id);
              }}
            >
              <label>Username</label>
              <input type="text" name="username" value={user.username} onChange={handleInputChange} />
              <label>Name</label>
              <input type="text" name="name" value={user.name} onChange={handleInputChange} />
              <button className="button btn-primary">Update user</button>
              <button onClick={() => props.setEditing(false)} className="button btn-danger">
                Cancel
              </button>
            </form>
          )
        }

export default EditForm;
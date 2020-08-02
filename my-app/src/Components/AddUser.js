import React,{useState} from 'react';
import axios from 'axios';


const AddUser =(props)=>{
   const initialUserState={
        username:'',
        name:''
    }
const [user,setUser]=useState(initialUserState);

const handleChange=(event)=>{
    const {name,value} =event.target;
    setUser({...user,[name]:value});
};

const saveData=(event)=>{
    event.preventDefault()
    var data={
        username:user.username,
        name:user.name
    }
    console.log(data);

  axios.post(`http://localhost:8080/attention`, data)
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
  setUser(initialUserState);

}




    return(
      <div>
        <form className="form-div" onSubmit={saveData}>
            <label>User name</label>
            <input type="text" id="username" name="username" value={user.username} onChange={handleChange}/>
            <label>name</label>
            <input type="text" id="name" name="name" value={user.name} onChange={handleChange}/>
            <input className="button btn-primary" value="Add User" type="submit"/>
        </form>
        </div>
    )
}

export default AddUser;
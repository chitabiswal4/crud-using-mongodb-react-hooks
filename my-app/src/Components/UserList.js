import React,{useState, useEffect} from 'react';


const UserList=(props)=>{
    const [user,setUser]=useState([]);

    useEffect(()=>{
        props.getBlogPost();
     },[user])
    
   
// useEffect(()=>{
//     axios.get(`http://localhost:8080/attentions`)
//       .then(res => {
//         const users = res;
//         console.log(users)
//         //for (el in res.data) {console.log("ID:" +res.data[el]._id + res.data[el].attention);}
//        // this.setState({ attentions });
//        setUser(res.user);
//        console.log(user)
//       })
//     })

  return(
    //  <ul>
    //      {props.user.map(user=>(
    //          <div key={user._id}> <div>{user.username}</div>
    //                              <div>{user.name}</div>
    //                              <button onClick={()=>{props.deleteUser(user._id)}}>Delete</button>
    //                              <button onClick={()=>{props.editData(user)}}>Edit</button> <hr/> </div> 
    //      ))}
    //  </ul>
        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Username</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {props.user.length > 0 ? (
              props.user.map(user => (
                <tr key={user._id}>
                  <td>{user.username}</td>
                  <td>{user.name}</td>
                  <td>
                  <button className="button btn-success" onClick={()=>{props.editData(user)}}>Edit</button> 
                  <button className="button btn-danger" onClick={()=>{if (window.confirm('Are u sure you wish to delete this User??'))props.deleteUser(user._id)}}>Delete</button>                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={3}>No users</td>
              </tr>
            )}
          </tbody>
        </table>
      )
      

}
export default UserList;
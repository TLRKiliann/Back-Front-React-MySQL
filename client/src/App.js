import './App.css';
import {useState} from "react";
import axios from 'axios';

function App() {
  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [birth, setBirth] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  //Display all members
  const [listMembers, setListMembers] = useState([])

  //Update
  const [newUsrName, setNewUsrName] = useState("");

  //add member and refresh the list of members displayed
  const addMemeber = () => {
    //console.log(name, lastname, birth, user, email, passwd);
    axios.post('http://localhost:3001/create', {//http://localhost:3001
      firstname: firstname,
      lastname: lastname,
      birth: birth,
      username: username,
      email: email,
      password: password
    }).then(() => {
      //console.log("success !")
      setListMembers([...listMembers, {
        firstname: firstname,
        lastname: lastname,
        birth: birth,
        username: username,
        email: email,
        password: password
      }])
    })
  }

  const displayMembers = () => {
    axios.get('http://localhost:3001/allMembers').then(response => {
      //console.log(response)
      setListMembers(response.data);
    })
  }

  const updateMembers = (order_id) => {
    axios.put('http://localhost:3001/update', {username: newUsrName, order_id: order_id}).then(
      (response) => {
        setListMembers(
          listMembers.map((val) => {
            return val.order_id === order_id 
              ? {
                order_id: val.order_id, 
                firstname: val.firstname, 
                lastname: val.lastname,
                birth: val.birth, 
                username: val.newUsrName, 
                email: val.email, 
                password: val.password
              }
              : val;
          })
        )
      }
    )
  };

  const deleteDataMember = (order_id) => {
    axios.delete(`http://localhost:3001/delete/${order_id}`).then(
      (response) => {
        setListMembers(
          listMembers.filter((val) => {
            return val.order_id !== order_id
          })
        )
      }
    );
  };

  return (
    <div className="App">
      <h1>Members Manager</h1>
      <div className="information">

        <div className="conf--div">
          <label>Firstname</label>
          <input 
          type="text" placeholder="firstname"
          onChange={(event) => setFirstname(event.target.value)} required />
        </div>
        <div className="conf--div">
          <label>Lastname</label>
          <input 
          type="text" placeholder="lastname"
          onChange={(event) => setLastname(event.target.value)} required />
        </div>
        <div className="conf--div">
          <label>Birthdate</label>
          <input 
          type="text" placeholder="00/00/00"
          onChange={(event) => setBirth(event.target.value)} required />
        </div>
        <div className="conf--div">
          <label>Username</label>
          <input 
          type="text" placeholder="username"
          onChange={(event) => setUsername(event.target.value)} required />
        </div>
        <div className="conf--div">
          <label>e-mail</label>
          <input 
          type="text" placeholder="e-mail"
          onChange={(event) => setEmail(event.target.value)} required />
        </div>
        <div className="conf--div">
          <label>Password</label>
          <input 
          type="password" placeholder="password"
          onChange={(event) => setPassword(event.target.value)} required />
        </div>

        <button onClick={addMemeber}>Send Data to DB</button>

        <button onClick={displayMembers}>
          Show All Members
        </button>
      </div>

        <div className="align--perfectly">
        {listMembers.map((val, key) => {
          return (
            <div key={key} className="display--members">
              <h3>Firstname: {val.firstname}</h3>
              <h4>Lastname: {val.lastname}</h4>
              <h4>Birthdate: {val.birth}</h4>
              <h4>Username: {val.username}</h4>
              <input 
                type="text" placeholder="change username"
                onChange={(e)=>setNewUsrName(e.target.value)}/>
              <h4>e-mail: {val.email}</h4>
              <h4>password: {val.password}</h4>



              <button onClick={() => updateMembers(val.order_id)}>Update</button>

              <button onClick={() => deleteDataMember(val.order_id)}>
                Delete !!!
              </button>

            </div>
            )
        })}
        </div>

    </div>
  );
}

export default App;

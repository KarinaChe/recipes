import { useState } from "react";
import axios from 'axios';
import { useCookies} from "react-cookie";
import { useNavigate } from "react-router-dom";



export const Auth = () =>{
    return <div className=" flex justify-center items-center h-screen bg-gray-200">
        <Login />
        <Register />
    </div>
}

const Login = () =>{
    const [username, setUsername] = useState("");
    const [password,setPassword] = useState("");

    const [_,setCookies] = useCookies(["access_token"]);
    const navigate = useNavigate();

    const onSubmit = async (e) =>{
        e.preventDefault();
        try{
           const response = await axios.post("http://localhost:3001/auth/login",{
            username,
            password
           })
        setCookies("access_token",response.data.token);
        console.log(response.data)
        window.localStorage.setItem("userId",response.data.userId);
        navigate("/")
        }catch(err) {
            console.log(err)
        }
    }

    return <Form 
      username={username} 
      setUsername={setUsername} 
      password={password} 
      setPassword={setPassword} 
      label="Login"
      onSubmit={onSubmit}
      />
}

const Register = () =>{
    const [username, setUsername] = useState("");
    const [password,setPassword] = useState("");

    const onSubmit = async (e) =>{
       e.preventDefault();
       try {
         await axios.post("http://localhost:3001/auth/register",{
            username,
            password
         });
         alert("Registration Completed!!!")
       } catch(err) {
          console.log(err)
       }
    }

    return <Form 
      username={username} 
      setUsername={setUsername} 
      password={password} 
      setPassword={setPassword} 
      label="Register" 
      onSubmit={onSubmit}
    />
}

const Form = ({username,setUsername,password,setPassword,label,onSubmit})=>{

    return (
        <div className="flex flex-col justify-center items-center p-5 bg-white rounded shadow-md m-5 w-full sm:w-96">
          <form onSubmit={onSubmit}>
            <h2 className="text-4xl mb-2">{label}</h2>
            <div className="mb-5">
              <label htmlFor="username">Username:</label>
              <input className="border-4 w-full" type="text" value={username} id="username" onChange={(e) => setUsername(e.target.value)} />
            </div>
            <div className="mb-5">
              <label htmlFor="password">Password:</label>
              <input className="border-4 w-full" type="password" value={password} id="password" onChange={(e) => setPassword(e.target.value)} />
            </div>
            <button
              type="submit"
              className="w-full focus:outline-none text-white bg-purple-700 hover:bg-purple-800 focus:ring-4 focus:ring-purple-300 font-medium rounded-lg text-sm px-5 py-2.5 mb-2 dark:bg-purple-600 dark:hover:bg-purple-700 dark:focus:ring-purple-900"
            >
              {label}
            </button>
          </form>
        </div>
      );
      
}
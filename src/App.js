import {BrowserRouter, Navigate, Route, Routes} from "react-router-dom";
import LoginPage from "./pages/auth/LoginPage";
import ResponsiveAppBar from "./components/Header/Header";
import RegisterPage from "./pages/auth/RegisterPage";
import HomePage from "./pages/HomePage";
import Cookies from "universal-cookie";
import { useEffect, useState } from "react";
import Loading from "./components/Loading/Loading";


function App() {

  const [auth, setAuth] = useState(null)

  useEffect(()=>{
    const cookies = new Cookies();
    const token = cookies.get("TOKEN");

    const configuration = {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    
    fetch('/auth/endpoint',configuration)
    .then(res=>res.json())
    .then(data=>{
      if(data.error){
        setAuth(false)
      }
      else {
        setAuth(true)
      }
    })
    .catch(err=>{
      console.log(err)
    })
  }, [])

  return (
    <div className="App">
      
      <BrowserRouter>
          <Routes>
            <Route path="*" element={<ResponsiveAppBar />}/>
          </Routes>
          <Routes>
            
            {auth===null?<Route path="*" element={<Loading />}/>
            :auth===true?
            (<>
            <Route path="/" element={<HomePage />}/>
            <Route path="login" element={<Navigate to="/" />} />
            <Route path="register" element={<Navigate to="/" />}/>
            </>
            ):
            (
              <>            
              <Route path="/" element={<Navigate to="/login" />}/>
              <Route path="login" element={<LoginPage />} />
              <Route path="register" element={<RegisterPage />}/>
              </>
            )
            }
          </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;

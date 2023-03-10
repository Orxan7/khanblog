import {BrowserRouter, Navigate, Route, Routes} from "react-router-dom";
import LoginPage from "./pages/auth/LoginPage";
import ResponsiveAppBar from "./components/Header/Header";
import RegisterPage from "./pages/auth/RegisterPage";
import HomePage from "./pages/HomePage";
import { useEffect } from "react";
import Loading from "./components/Loading/Loading";
import { useSelector, useDispatch } from 'react-redux'
import { authTrue, authFalse } from "./redux/actions";
import ProfilePage from "./pages/ProfilePage";
import PageNotFound from "./pages/PageNotFound";

function App() {

  const auth = useSelector((state) => state.auth)
  const dispatch = useDispatch()

  useEffect(()=>{  
    const configuration = {
      method: "GET",
    };

    fetch('/auth/endpoint',configuration)
    .then(res=>res.json())
    .then(data=>{
      if(data.error){
        dispatch(authFalse())
      }
      else {
        dispatch(authTrue(data.user.id, data.user.username))
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
            :auth?
            (<>
            <Route path="/" element={<HomePage />}/>
            <Route path="login" element={<Navigate to="/" />} />
            <Route path="register" element={<Navigate to="/" />}/>
            <Route path="user/:id" element={<ProfilePage />} />
            <Route path="*" element={<PageNotFound />} />
            </>
            ):
            (
              <>            
              <Route path="login" element={<LoginPage />} />
              <Route path="register" element={<RegisterPage />}/>
              <Route path="*" element={<Navigate to="/login" />}/>
              </>
            )
            }
          </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;

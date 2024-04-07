import React, { useEffect, useState} from 'react';
import { Route, Redirect } from 'react-router-dom'
import { useSelector } from "react-redux";
import jwtDecode from 'jwt-decode';
import { useDispatch } from 'react-redux';
import {setTokenFalse} from "./services/agent/action"

const PrivateRoute = ({ component: Component, ...rest }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(null)
  const dispatch = useDispatch()
  useEffect(() => {
    let token = sessionStorage.getItem('token')
        if(token){
            let tokenExpiration = jwtDecode(token).exp;
            let dateNow = new Date();

            if(tokenExpiration < dateNow.getTime()/1000){
                setIsAuthenticated(false)
                dispatch(setTokenFalse(false))
            }else{
                setIsAuthenticated(true)
            }
        } else {
           setIsAuthenticated(false)
           dispatch(setTokenFalse(false))

        }
  })

  if(isAuthenticated === null){
    return <></>
  }

  return (
    <Route {...rest} render={props =>
      !isAuthenticated ? (
        <Redirect to='/agent/login'/>
      ) : (
        <Component {...props} />
      )
    }
    />
  );
};

export default PrivateRoute;

import axios from "axios";
import actionType from "./actionType.js";
import URL from "../../Assets/config";
import { toastr } from 'react-redux-toastr';
import jwt from 'jwt-decode';
import qs from 'qs';












export const loginAgent = (payload) => (dispatch) => {
    const config = {
      method: "post",
      url: URL.agent.AGENT_LOGIN,
      data: qs.stringify(payload),
      headers: {
        "Content-Type": "application/x-www-form-urlencoded;charset=utf-8",
      },
    };
    axios(config)
      .then((res) => {
        console.log(res, "resssssssssssss");
        if (res.status === 200) {
          sessionStorage.setItem("user_type", "agent");
          sessionStorage.setItem("token", res.data.access_token);
          sessionStorage.setItem("refresh_token", res.data.refresh_token);
          sessionStorage.setItem("token_expiretime", res.data.expires_in);
          sessionStorage.setItem("refresh_token_expiretime", res.data.refresh_expires_in); 
          dispatch({
            type: actionType.AGENT_LOGIN_SUCCESS,
          });
          
        } else if (res.status === 206) {
          localStorage.setItem("statusCode", res.data.message);
          toastr.warning(res.data.message);
          dispatch({
            type: actionType.AGENT_LOGIN_FAILURE,
          });
        }
      })
      .catch((error) => {
        
  
        //   dispatch(hideIsLoading());

        if(error.response && error.response.data)
        {
            toastr.error(error.response.data.error_description);
        }
        
        dispatch({
          type: actionType.AGENT_LOGIN_FAILURE,
        });
      });
  };
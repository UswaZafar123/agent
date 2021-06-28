import axios from "axios";
import actionType from "../common/actionType";
import URL from "../../Assets/config";
import { toastr } from 'react-redux-toastr';
import jwt from 'jwt-decode';
import qs from 'qs';


var fileDownload = require('js-file-download');


export const login = (payload) =>dispatch => {
    const config = {
        method: "post",
        url: URL.client.LOGIN,
        data: qs.stringify(payload),
        headers: {
            "Content-Type": "application/x-www-form-urlencoded;charset=utf-8",
        }
      };
      axios(config)
        .then(res => {
          if (res.status === 200) {
            if (res.data) {
              sessionStorage.setItem("token", res.data.access_token);
              sessionStorage.setItem("refresh_token", res.data.refresh_token);
              sessionStorage.setItem("token_expiretime", res.data.expires_in);
              sessionStorage.setItem("refresh_token_expiretime", res.data.refresh_expires_in); 
                sessionStorage.setItem("user_type","client")
                dispatch({
                    type: actionType.CLIENT_LOGIN_SUCCESS,
                });
            }
          } 
        })
        .catch(error => {
            dispatch({
                type: actionType.CLIENT_LOGIN_FAILURE,
            });
        });
}
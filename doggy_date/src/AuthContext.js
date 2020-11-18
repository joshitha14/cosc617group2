import React, {useState, createContext} from 'react';
import {useHistory} from 'react-router-dom';

const AuthContext = createContext();

const AuthProvider = (props) => {
     const history = useHistory();
     const isAuth = localStorage.getItem('isAuth');
     const expiresAt = localStorage.getItem('expiresAt');
     const userInfo = localStorage.getItem('userInfo');
     
     const [authState,setAuthState] = useState({isAuth, expiresAt, userInfo:userInfo ? JSON.parse(userInfo): {}});

     const isAuthenticated = () => {
          if(!authState.isAuth || !authState.expiresAt) {
               return false;
          }
          return new Date() < new Date(authState.expiresAt);
     }

     const logout = () => {
          localStorage.removeItem('isAuth');
          localStorage.removeItem('expiresAt');
          localStorage.removeItem('userInfo');

          const requestOptions = {
               method: 'post',
               mode: 'cors',
               credentials: 'include',
               headers: {
                 'Accept': 'application/json',
                 'Content-Type': 'application/json',
               },
               // body: JSON.stringify(user)
           }
           
           fetch('http://localhost:3001/logout', requestOptions)
             .then(res => {
               return res.json()
             })
             .then(data => {
               console.log(data);
             })

          setAuthState({
               isAuth: false,
               expiresAt: null,
               userInfo: {}
          });
          history.push('/');
     }
     const setAuthInfo = ({isAuth, expiresAt, userInfo}) => {
          localStorage.setItem('isAuth', isAuth)
          localStorage.setItem('expiresAt', expiresAt)
          localStorage.setItem('userInfo', JSON.stringify(userInfo));

          setAuthState({
               isAuth,
               expiresAt,
               userInfo
          });
     };

     return (
          <AuthContext.Provider value={{authState,setAuthState: authInfo => setAuthInfo(authInfo), isAuthenticated, logout, history}} >
          {props.children}
          </AuthContext.Provider>
     );
};

export {AuthContext, AuthProvider};
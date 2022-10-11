import React, { createContext, useState, useContext, useEffect } from "react";
import { auth, database } from "../misc/firebase";

const ProfileContext = createContext();
// creating context api we can manage state management here like global state mgt

// manage the profile context api 
// and it is directly used from the app component
export const ProfileProvider = ({ children }) =>{

  const [ profile, setProfile ] = useState(null);
  const [ isLoading, setIsLoading ] = useState(true);

  useEffect(()=>{

    let userRef;
    const authUnsub = auth.onAuthStateChanged(authObj =>{
      //console.log('auth0',authObj);

      if(authObj){
        userRef = database.ref(`/profiles/${authObj.uid}`)
        userRef.on('value', (snap)=>{    // realtime listener whenever data is modified it will changes everywhere
          const {name, createdAt, avatar} =  snap.val();
          //console.log(profileData);
          const data = {
            name,
            createdAt,
            avatar,
            uid: authObj.uid,
            email: authObj.email
          };
          setProfile(data);
          setIsLoading(false);
        }); // signed on

      }else{
        if(userRef){
          userRef.off(); // signed off
        }
        setProfile(null);
        setIsLoading(false);
      }
    }); 

    return () =>{
      authUnsub();
      if(userRef){
        userRef.off();
      }
    }
  },[]);

  return (
    <ProfileContext.Provider value={{isLoading, profile}}>
      {children}
    </ProfileContext.Provider>
  );
};

export const useProfile = () => useContext(ProfileContext);

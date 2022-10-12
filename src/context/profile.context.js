import React, { createContext, useState, useContext, useEffect } from "react";
import { auth, database } from "../misc/firebase";
import firebase from "firebase/compat/app";

export const isOfflineForDatabase = {
  state: 'offline',
  last_changed: firebase.database.ServerValue.TIMESTAMP,
};

const isOnlineForDatabase = {
  state: 'online',
  last_changed: firebase.database.ServerValue.TIMESTAMP,
};
const ProfileContext = createContext();
// creating context api we can manage state management here like global state mgt

// manage the profile context api 
// and it is directly used from the app component
export const ProfileProvider = ({ children }) =>{

  const [ profile, setProfile ] = useState(null);
  const [ isLoading, setIsLoading ] = useState(true);

  useEffect(()=>{

    let userRef;
    let userStatusRef;
    const authUnsub = auth.onAuthStateChanged(authObj =>{
      //console.log('auth0',authObj);

      if(authObj){
        userRef = database.ref(`/profiles/${authObj.uid}`);
        userStatusRef = database.ref(`/status/${authObj.uid}`);

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


        database.ref('.info/connected').on('value', (snapshot)=> {
          // If we're not currently connected, don't do anything.
          if (snapshot.val() === false) {
              return;
          };
      
         
          userStatusRef.onDisconnect().set(isOfflineForDatabase).then(()=> {
              userStatusRef.set(isOnlineForDatabase);
          });
      });
      

      }else{
        if(userRef){
          userRef.off(); // signed off
        }
        if(userStatusRef){
          userStatusRef.off(); // signed off
        }

        database.ref('.info/connected').off();

        setProfile(null);
        setIsLoading(false);
      }
    }); 

    return () =>{
      authUnsub();

      database.ref('.info/connected').off();
      if(userRef){
        userRef.off();
      }
      if(userStatusRef){
        userStatusRef.off(); // signed off
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

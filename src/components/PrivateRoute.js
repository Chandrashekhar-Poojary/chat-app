import React from 'react'
import { Redirect, Route } from 'react-router';
import { useProfile } from '../context/profile.context';
import {Container, Loader} from 'rsuite';

const PrivateRoute = ({ children, ...routeProps }) => {
  
  const {profile ,isLoading} = useProfile();  // that is called to the profile.context component

  if(isLoading && !profile){
    return(
      <Container>
        <Loader center vertical size="md" content="Loading" speed='slow'/>
      </Container>
    );
  }

  if(!profile && !isLoading){
    return <Redirect to="/signin"/>//if 
  }

  return (
    <Route {...routeProps}>
      {children}
    </Route>
  )
}

export default PrivateRoute;
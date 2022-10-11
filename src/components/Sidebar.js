import React,{useRef,useState, useEffect} from 'react';
import {Divider} from 'rsuite';
import CreateRoomBtnModal from './CreateRoomBtnModal'
import DashboardToggle from './dashboard/DashboardToggle'
import ChatroomList from './rooms/ChatroomList';

const Sidebar = () => {

  const topSidebarRef = useRef();
  const [height, setHeight] = useState(0);

  useEffect(()=>{
    if(topSidebarRef.current){
      setHeight(topSidebarRef.current.scrollHeight)
    }
  },[topSidebarRef])
  return (
    <div className='h-100 pt-2'>

    <div>
      <DashboardToggle/>
      <CreateRoomBtnModal />
      <Divider>Join Conversation</Divider>
    </div>
    <ChatroomList aboveElHeight={height}/>

    </div>
  )
}

export default Sidebar

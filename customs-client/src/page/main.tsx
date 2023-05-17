import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import './components/css/main.css';
import Main_Header from './components/main_header';
import Main_Content from './components/main_content';

type userInfo = {
    id: number;
    username: string;
    password: string;
  }

const Main: React.FC = () => {
  const location = useLocation();
  const state = location.state as userInfo;
  console.log(state)
  const [rightTitle, setRightTitle] = useState("Ephemeral");
  const handleSwitch = (text: string) => {
    setRightTitle(text)
  }
  return (
    <div className='content'>
      <Main_Header rightTitle={rightTitle}/>
      <Main_Content handleSwitch={handleSwitch} />
    </div>
  );
};

export default Main;
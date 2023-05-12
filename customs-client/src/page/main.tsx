import React from 'react';
import { useLocation } from 'react-router-dom';

type userInfo = {
    id: number;
    username: string;
    password: string;
  }

export default function Main() {
    const location = useLocation();
    const state = location.state as userInfo;
    console.log(state)
    return (
        <div className="main">
            <h1>{state.username}进入主页面</h1>
        </div>
    );
} 
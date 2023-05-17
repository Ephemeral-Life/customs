import React from 'react';
import './css/main_header.css';
interface MainHeaderProps {
    rightTitle: string;
}
const Main_Header: React.FC<MainHeaderProps> = ({ rightTitle }) =>{
    return (
        <div className="Main_Header">
            <div className="left">
                <p className="left-title">
                    数据海关
                </p>
            </div>
            <div className="right">
                <p className="right-title">
                    {rightTitle}
                </p>
            </div>
        </div>
    );
} 
export default Main_Header
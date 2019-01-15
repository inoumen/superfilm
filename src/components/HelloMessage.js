import React from 'react';
import tvPic from '../images/tv.png'
export default () => {
    return (
        <div className="HelloMessage">
            <img src={tvPic} width="75%" height="75%" alt="tv"/>
            <p>Для получения списка сериалов,</p>
            <p>пожалуйста, выберите </p>
            <p>необходимый месяц и день.</p>
        </div>
    )
}
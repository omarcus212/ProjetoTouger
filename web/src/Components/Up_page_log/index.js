import React from "react";
import "./style/index.scss"




const UpPage = ({title,img,icon}) => {

    return (
        <div className="upPage">
               <span className="logo"><img src={img}/></span>
                <span className="title">{title}</span>
                <span className="icon_up">{icon}</span>
        </div>
    )
}


export default UpPage;
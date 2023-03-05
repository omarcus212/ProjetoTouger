import React from "react";
import './style/index.scss'





const Containerinfo = ({className,text1,text2}) =>{

<div className={className==''?'ContainerInfo':className}>
    <h2>{text1}</h2>
    <div>
        {text2}
        </div>         
</div>
}

export default Containerinfo;
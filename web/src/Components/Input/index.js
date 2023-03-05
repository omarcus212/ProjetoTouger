import React from "react";
import "./style/index.scss"



const Input = ({title,type,name,divclass, onChange, value,extiltle}) => {
    return (
        <div className={divclass ==  ""?"all_div":divclass}>
            <p>{title}</p>
            <input type={type} name={name} onChange={onChange} value={value}/>
            <p className="example">{extiltle}</p>
        </div>
    )



}


export default Input;
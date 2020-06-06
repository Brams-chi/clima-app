import React  from 'react';
import "../_styles/custom.css";

const Notice = props =>{
    return (
        <div className="container-notice">
            <div className="Card">
                <h6 className="py-3" style={{color:"white"}}>{props.texto}</h6>
            </div>
        </div>
    );
};

export default Notice;


import React  from 'react';
import "../_styles/custom.css";

function Welcome (){
    return (
       <div className="container-welcome">
           <h2 className="title-welcome">Bienvenidos</h2>
           <h4 className="subtitle">Aquí sabrán el clima de 200.000 ciudades.</h4>
       </div>
    );
};

export { Welcome };


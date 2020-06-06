import React, { useEffect } from 'react';
import "../_styles/custom.css";
import { BrowserRouter as Router,Link } from 'react-router-dom';
import { Routes } from '../App/App';
export function NavBar() {
    return (
        <div className="container-navbar">
            <div className="subcontainer-img">
                <img src="../src/_styles/image/Silver-glow-large-2.png" alt="imagen logotipo"/>
            </div>
            <div className="botons-nav">
                <ul>
                    <li>
                        <Link className="link" to={{pathname: '/homepage'}}>Home</Link>
                    </li>
                    <li>
                        <Link className="link" to={{pathname: '/weather'}}>Ver clima</Link>
                    </li>
                  {  /*<li>
                        <Link className="link" to={{pathname: '/weeklypage'}}>Semanal</Link>
                    </li>
                    Se comentó esta linea ya que la api no permite vision del tiempo semanal a menos que tengas acceso de pago
                    */}
                </ul>
            </div>
        </div>
    );
}



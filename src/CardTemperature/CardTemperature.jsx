import React  from 'react';
import "../_styles/custom.css";

const CardTemperature = props =>{
    return (
        <div className="container text-light">
            <div className="Card">
                <h1 className="text-white py-3">{props.ciudad}</h1>
                {/* Celsius */}
                {props.temp_celsius ? (
                    <h2 className="py-2">{props.temp_celsius}&deg;</h2>
                ) : null}
                {props.sensation ? (
                    <h5 className="py-2">Sensación térmica {props.sensation}&deg;</h5>
                ) : null}

                {/* show max and min temp */}
                {maxminTemp(props.temp_min, props.temp_max)}

                {/* Weather description */}
                <h4 className="py-3">
                    Estado :
                    {' '+ props.description.charAt(0).toUpperCase() +
                    props.description.slice(1)}
                </h4>
            </div>
        </div>
    );
};

export default CardTemperature;

function maxminTemp(min, max) {
    if (max && min) {
        return (
            <h3>
                <span className="px-4">Min : {min}&deg;</span>
                <span className="px-4">Max : {max}&deg;</span>
            </h3>
        );
    }
}

import React, {useEffect, useState} from 'react';
import "../_styles/custom.css";
import regeneratorRuntime from "regenerator-runtime";
import CardTemperature from '../CardTemperature/CardTemperature'
import Notice from '../Notice/Notice';
class WeatherPage extends React.Component {
    constructor(props){
        super(props);
        this.state={
            pais:'',
            ciudad:'',
            icon: undefined,
            main: undefined,
            celsius: undefined,
            temp_max: null,
            temp_min: null,
            description: "",
            sensation:null,
            error: false,
            allready:false,
            texto:"Intenta llenando el formulario con valores validos",
        };
        this.handleClick();
        this.handleChange = this.handleChange.bind(this);
    }
    calCelsius(temp) {
        let cell = Math.floor(temp - 273.15);
        return cell;
    }
    handleClick = async (e) =>{
        e.preventDefault();

        const country = e.target.pais.value;
        const city = e.target.ciudad.value;
        const api_key="813c3263f652b7922b8aa80ed207a240";
        if (country && city) {
            const api_call = await fetch(
                `http://api.openweathermap.org/data/2.5/weather?q=${city},${country}&appid=${api_key}&lang=sp`
            );

            const response = await api_call.json();
            console.log(response.main.feels_like);
            if(response.name && response.sys.country){
                this.setState({allready:true});
                this.setState({
                    ciudad: `${response.name}, ${response.sys.country}`,
                    pais: response.sys.country,
                    main: response.weather[0].main,
                    celsius: this.calCelsius(response.main.temp),
                    temp_max: this.calCelsius(response.main.temp_max),
                    temp_min: this.calCelsius(response.main.temp_min),
                    sensation: this.calCelsius(response.main.feels_like),
                    description: response.weather[0].description,
                    error: false
                });
            }else {
                this.setState({allready:false});
                this.setState({
                    error: true,
                    allready:false,
                    texto:'Campos no validos, intenta nuevamente'
                });
            }
        } else {
            this.setState({
                error: true,
                allready:false,
                texto:'Campos no validos, intenta nuevamente'
            });
        }
    };
    handleChange(e) {
        if(e.target.name==='pais'){
            this.setState({pais:e.target.value});
        }else{
            this.setState({ciudad:e.target.value});
        }
    }

    render() {
        let card;
        if (this.state.allready){
            card= <CardTemperature
                ciudad={this.state.ciudad}
                weatherIcon={this.state.icon}
                temp_celsius={this.state.celsius}
                temp_max={this.state.temp_max}
                temp_min={this.state.temp_min}
                sensation={this.state.sensation}
                description={this.state.description}
            />;
        }else{
            card= <Notice
                texto={this.state.texto}
            />;
        }
    return (
        <div className="page-container">
            <div className="container-image" >
            </div>
            <div className="container-form">
                <h2 style={{fontWeight:"900",color:"#2c3e50",marginBottom:"25px"}}>Pronostico del tiempo</h2>
                <form name="form" onSubmit={this.handleClick} className="form-container">
                    <div className="form-group">
                        <input placeholder="Pais" type="text" name="pais" value={this.state.pais} onChange={this.handleChange} />
                    </div>
                    <div className="form-group">
                        <input placeholder="Ciudad" type="text" name="ciudad" value={this.state.ciudad} onChange={this.handleChange}/>
                    </div>
                    <div className="form-group button">
                        <button className="btn btn-primary btn-send">
                            Revisar
                        </button>
                    </div>
                </form>
                {card}
            </div>
        </div>
    );
}
}

export { WeatherPage };

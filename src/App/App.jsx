import React, { useEffect } from 'react';
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom';
import {Provider, useDispatch, useSelector} from 'react-redux';
import { history } from '../_helpers';
import { alertActions } from '../_actions';
import { PrivateRoute } from '../_components';
import { WeatherPage } from '../WeatherPage';
import { NavBar } from "../Navbar";
import { Welcome } from "../WelcomePage";
import "../_styles/custom.css";
function App() {
    const alert = useSelector(state => state.alert);
    const dispatch = useDispatch();

    useEffect(() => {
        history.listen((location, action) => {
            // clear alert on location change
            dispatch(alertActions.clear());
        });
    }, []);

    return (
        <div >
            <Router>
                <NavBar/>
                <div className="jumbotron" style={{backgroundImage:"url('../../images/valparaiso.png')",  backgroundRepeat: "no-repeat",backgroundPosition: "center",paddingTop:"-5px",backgroundSize: "100% 101%",overflow: "hidden"}}>
                    {alert.message &&
                    <div className={`alert ${alert.type}`}>{alert.message}</div>
                    }
                    <Switch>
                        <PrivateRoute exact path="/" component={Welcome} />
                        <Route path="/homepage" component={Welcome} />
                        <Route path="/weather" component={WeatherPage} />
                        {/*<Route path="/weeklypage" component={WeeklyPage} /> Se comentó esta linea ya que la api no permite vision del tiempo semanal a menos que tengas acceso de pago*/}
                        <Redirect from="*" to="/homepage" />
                    </Switch>
                </div>
            </Router>
        </div>
    );
}

export { App };

import React from "react";

import Titles from "./components/Titles";
import Form from "./components/Form";
import Weather  from "./components/Weather";
import API_KEY  from "./private/private";


class App extends React.Component {
  state = {
    temperature: undefined,
    city: undefined,
    country: undefined,
    humidity: undefined,
    description: undefined,
    error: undefined
  }
  getWeather = async (e) => {
    e.preventDefault();
    const city = e.target.elements.city.value;
    const country = e.target.elements.country.value;
    const api_call = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city},${country}&appid=${API_KEY}&units=imperial`);
    const data = await api_call.json();
    if (city && country) {
      //console log the data to see what JSON data is coming in
      console.log(data);
      this.setState({
        temperature: data.main.temp,
        city: data.name,
        country: data.sys.country,
        humidity: data.main.humidity,
        description: data.weather[0].description,
        error: ""
      });
    } else {
      this.setState({
        temperature: undefined,
        city:undefined,
        country: undefined,
        humidity:undefined,
        description: undefined,
        error: "Please enter the Value."
      });
    }
  }
  render() {
    return (
      <div>
        <div className="wrapper">
          <div className="main">
            <div className="container full">
              <div className="row">
                <div className="col-xs-12 col-sm-5 title-container">
                  <Titles/>
                </div>
                <div className="col-xs-12 col-sm-7 form-container">
                  <Form getWeather={this.getWeather}/>
                    <Weather
                      temperature= {this.state.temperature}
                      city= {this.state.city}
                      country= {this.state.country}
                      humidity= {this.state.humidity}
                      description= {this.state.description}
                      error={this.state.error}
                    />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
};


//render before adding classes @ 46
// render() {
//   return (
//     <div>
//       <Titles />
//       <Form getWeather={this.getWeather}/>
//       <Weather
//         temperature={this.state.temperature}
//         city={this.state.city}
//         country={this.state.country}
//         humidity={this.state.humidity}
//         description={this.state.description}
//         error={this.state.error}
//       />
//     </div>
//   );
// }

export default App;

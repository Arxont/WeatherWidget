import React, { Component } from "react";
import styled from "styled-components";
import { format } from "date-fns";

const Container = styled.div`
  display: flex;
  flex-wrap: wrap;
  font-family: roboto;
  font-size: 25px;
`;
const Card = styled.div`
  margin: auto;
  margin-bottom: 2%;
  width: 30%;
  border-style: solid;
  border-width: 1px;
`;
const Header = styled.p``;
class Weather extends Component {
  state = {
    Weather: []
  };
  componentDidMount() {
    fetch(
      `http://api.ipapi.com/check?access_key=4e69fb73d1764a00abae2b683a9e5c48`
    )
      .then(r => r.json())
      .then(City => {
        return fetch(
          `http://api.openweathermap.org/data/2.5/forecast?q=${City.city},${
            City.country_code
          }&APPID=a2adb89591df3a8c3709cdc9b211cc43`
        );
      })
      .then(response => response.json())
      .then(resp => {
        const Weather = resp.list;
        this.setState({ Weather });
        console.log(Weather);
      });
  }
  render() {
    return (
      <Container>
        {this.state.Weather.map(post => {
          return (
            <Card key={post.dt}>
              <Header>
                Wether forecast for {format(new Date(post.dt_txt), "dddd H")}{" "}
                hours is:
              </Header>
              <p>
                {post.weather.map(qq => (
                  <span key={post.dt}>
                    {qq.description}

                    <img
                      src={`http://openweathermap.org/img/w/${qq.icon}.png`}
                      alt="icon"
                    />
                  </span>
                ))}
                {(post.main.temp_min - 273.15).toFixed(0)}°:{" "}
                {(post.main.temp_max - 273.15).toFixed(0)}°
              </p>
            </Card>
          );
        })}
      </Container>
    );
  }
}

const App = () => {
  return <Weather />;
};

export default App;






 // IMPORTANT
 const Header = styled.p``;
 class Weather extends Component {
   state = {
     Weather: []
   };
   componentDidMount() {
     fetch(
       `http://api.ipapi.com/check?access_key=4e69fb73d1764a00abae2b683a9e5c48`
     )
       .then(r => r.json())
       .then(City => {
         return fetch(
           `http://api.openweathermap.org/data/2.5/forecast?q=${City.city},${
             City.country_code
           }&APPID=a2adb89591df3a8c3709cdc9b211cc43`
         );
       })
       .then(response => response.json())
       .then(resp => {
         const Weather = resp.list;
     this.setState({ Weather });
         //   console.log(Weather);
       })
       .then(qq => {
         qq = this.state.Weather;
         //   console.log(qq);
         const DayOfTheWeek = qq.map(originalArray => ({
           originalArray,
           day: format(originalArray.dt_txt, "dddd")
         }));
         //   console.log(DayOfTheWeek);
         const Yebla = DayOfTheWeek.filter(a => a.day === "Monday");
         this.setState({ Yebla });
         console.log(Yebla);
       });
   }
   render() {
     return (
       <Container>
         {this.state.Weather.map(post => {
           return (
             <Card key={post.dt}>
               <Header>
                 Wether forecast for {format(new Date(post.dt_txt), "dddd H")}{" "}
                 hours is:
               </Header>
               <p>
                 {post.weather.map(weather => (
                   <span key={post.dt}>
                     {weather.description}
 
                     <img
                       src={`http://openweathermap.org/img/w/${
                         weather.icon
                       }.png`}
                       alt="icon"
                     />
                   </span>
                 ))}
                 {(post.main.temp_min - 273.15).toFixed(0)}°:{" "}
                 {(post.main.temp_max - 273.15).toFixed(0)}°
               </p>
             </Card>
           );
         })}
       </Container>
     );
   }
 }
 
 const App = () => {
   return <Weather />;
 };
 
 export default App;





 for (let i = 0; i < DayOfTheWeek.length; i++) {
  if (
    DayOfTheWeek[i].day === "Monday" &&
    DayOfTheWeek[i].originalArray.main.temp ===
      Math.max.apply(
        Math,
        DayOfTheWeek.map(max => max.originalArray.main.temp)
      )
  ) {
    const Chitadrita = DayOfTheWeek[i];
    console.log(Chitadrita);
  }
}
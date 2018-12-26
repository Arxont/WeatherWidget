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

class Weather extends Component {
  state = {
    ChosenDay: []
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
        console.log(Weather);
        const DayOfTheWeek = Weather.map(originalArray => ({
          originalArray,
          day: format(originalArray.dt_txt, "dddd")
        }));
        console.log(DayOfTheWeek);
        const Monday = DayOfTheWeek.filter(a => a.day === "Monday").slice(0, 1);
        const Tuesday = DayOfTheWeek.filter(a => a.day === "Tuesday").slice(
          0,
          1
        );
        const Wednesday = DayOfTheWeek.filter(a => a.day === "Wednesday").slice(
          0,
          1
        );
        const Thursday = DayOfTheWeek.filter(a => a.day === "Thursday").slice(
          0,
          1
        );
        const Friday = DayOfTheWeek.filter(a => a.day === "Friday").slice(0, 1);
        const Saturday = DayOfTheWeek.filter(a => a.day === "Saturday").slice(
          0,
          1
        );
        const Sunday = DayOfTheWeek.filter(a => a.day === "Sunday").slice(0, 1);
        const qq = [];
        const ChosenDay = qq.concat(
          Monday,
          Tuesday,
          Wednesday,
          Thursday,
          Friday,
          Saturday,
          Sunday
        );

        this.setState({ ChosenDay });
        console.log(ChosenDay);
      });
  }
  render() {
    return (
      <Container>
        {this.state.ChosenDay.map(post => {
          return (
            <Card key={post.originalArray.dt}>
              Wether forecast for{" "}
              {format(new Date(post.originalArray.dt_txt), "dddd")} is:
              <p>
                {post.originalArray.weather.map(weather => (
                  <span key={post.originalArray.dt}>
                    {weather.description}

                    <img
                      src={`http://openweathermap.org/img/w/${
                        weather.icon
                      }.png`}
                      alt="icon"
                    />
                  </span>
                ))}
                {(post.originalArray.main.temp_min - 273.15).toFixed(0)}°:{" "}
                {(post.originalArray.main.temp_max - 273.15).toFixed(0)}°
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

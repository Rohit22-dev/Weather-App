import React, { useEffect, useState } from "react";
import Navbar from "./Navbar";
import { BsFan, BsFillMoonStarsFill, BsFillSunFill } from "react-icons/bs";
import AdditionalData from "./AdditionalData";
import { Background } from "./Background";
import Footer from "./Footer";

const Weather = () => {
  const weekday = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  const [cday, setDay] = useState("Day");
  const [wIcon, setWICON] = useState("01d");

  const [Data, setWeather] = useState(null);
  const [height, setHeight] = useState(25);
  const [city, setCity] = useState("kannauj");
  const [endpoint, setEndpoint] = useState(
    "avenue-2215317_1920_ldDl1XqtD.jpg?ik-sdk-version=javascript-1.4.3&updatedAt=1678350011389"
  );

  const timeConversion = (item) => {
    const unixTimestamp = item;
    const date = new Date(unixTimestamp * 1000);
    const options = { timeZone: "Asia/Kolkata", hour12: true };
    const timeString = date.toLocaleTimeString("en-US", options);
    return timeString;
  };
  const getBackground = (key) => {
    const defaultKey =
      "avenue-2215317_1920_ldDl1XqtD.jpg?ik-sdk-version=javascript-1.4.3&updatedAt=1678350011389";
    const backgroundImageUrl = Background[key] || Background[defaultKey];
    return backgroundImageUrl;
  };

  useEffect(() => {
    const func = async () => {
      const day = new Date().getDay();
      setDay(weekday[day]);

      // const url = `http://openweathermap.org/img/wn/10d@2x.png`

      try {
        fetch(
          `https://api.openweathermap.org/data/2.5/weather?q=${
            city === "" ? "kannauj" : city
          }&units=metric&appid=7ba1fbfc4aa2748f162f370158d1b94b`
        )
          .then((response) => response.json())
          .then((data) => {
            setWeather(data);
            setWICON(data.weather[0].icon);
            setEndpoint(getBackground(data.weather[0].main));
          });
      } catch (error) {
        console.log(error);
      }
    };
    func();
  }, [city]);
  return (
    <div className="flex flex-col w-screen h-screen relative">
      <img
        src={`https://ik.imagekit.io/octivion/Weather/${endpoint}`}
        className="absolute -z-10 object-cover w-full h-full"
      />

      <Navbar city={Data?.name} setWeather={setWeather} setCity={setCity} />

      <div className="flex justify-between flex-col glass w-11/12 sm:w-3/5 h-2/3 m-auto rounded-3xl overflow-hidden ">
        <div className="flex justify-between items-center p-3 px-10 text-2xl bg-[#00000080]">
          <p className="font-body">{cday}</p>
          <BsFan
            className=" text-red-500 animate-spin-slow hover:animate-spin hover:text-emerald-500"
            size={40}
          />
          <div className="flex gap-4 items-center">
            <p className="font-mono font-semibold ">
              {Data && Data.weather[0].main}
            </p>
            <img src={`http://openweathermap.org/img/wn/${wIcon}.png`} />
          </div>
        </div>

        <div className="flex flex-1 flex-col md:flex-row justify-around items-center px-10 relative mt-4">
          <p className="text-7xl lg:text-9xl font-display text-black">
            {Data ? Data.main.temp : "--"}
            <span className="font-body">°c</span>
          </p>
          <div className="flex flex-col justify-center text-xs shadow-md shadow-black h-fit rounded-lg p-2 gap-1">
            <div className="flex items-center gap-2">
              <BsFillSunFill className=" text-amber-500" size={16} />
              <p>{timeConversion(Data?.sys.sunrise)}</p>
            </div>
            <div className="flex items-center gap-2">
              <BsFillMoonStarsFill className=" text-zinc-800" size={16} />
              <p>{timeConversion(Data?.sys.sunset)}</p>
            </div>
          </div>
        </div>

        <div className="flex p-5 gap-2 flex-wrap">
          <AdditionalData item="Pressure" value={Data?.main.pressure} />
          <AdditionalData item="Humidity" value={Data?.main.humidity} />
          <AdditionalData item="Visibility" value={Data?.visibility} />
          <AdditionalData item="Wind Speed" value={Data?.wind.speed} />
          <AdditionalData item="Max temp" value={Data?.main.temp_max} />
          <AdditionalData item="Min temp" value={Data?.main.temp_min} />
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default Weather;

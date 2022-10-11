/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable @next/next/no-img-element */
import { Box, Stack, styled, TextField, Typography } from "@mui/material";
import { SearchNormal1 } from "iconsax-react";
import React, { useEffect, useState } from "react";
// ======= images =====
import cloudy from "../../public/Images/cloudy.jpg";
import haze from "../../public/Images/haze.jpg";
import rainy from "../../public/Images/rainy.jpg";
import sunny from "../../public/Images/sunny.jpg";

//  ========= icons ==========
import axios from "axios";
import sunnyIcon from "../../public/icons/01d.png";
import cloudyIcon from "../../public/icons/03d.png";
import hazeIcon from "../../public/icons/04d.png";
import rainyIcon from "../../public/icons/11d.png";

export default function Weather() {
  const [city, setCity] = useState("mumbai");
  const [weatherImage, setWeatherImage] = useState("");
  const [weatherData, setWeatherDate] = useState("");
  const [weatherIcon, setWeatherIcon] = useState("");
  const [dayName, setDayName] = useState("");

  let year = new Date().getFullYear();
  let day = new Date().getDate();
  let month = new Date().getMonth();
  let fullDate = new Date(year, month, day);

  const cities = [
    { id: 1, title: "new York" },
    { id: 2, title: "new California" },
    { id: 3, title: "paris" },
    { id: 4, title: "tokyo" },
  ];

  // getApi
  const getWeatherInfo = async () => {
    const response = await axios
      .get(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=c187c82a42c5157c8af4eeca02f821b2`
      )
      .catch((err) => {
        console.log("err", err);
      });
    setWeatherDate(response?.data);
  };

  useEffect(() => {
    getWeatherInfo();
  }, []);
  // =======  change image and icons=======
  useEffect(() => {
    if (!!weatherData) {
      if (weatherData.weather[0].main === "clouds") {
        setWeatherIcon(cloudyIcon);
        setWeatherImage(cloudy);
      } else if (weatherData.weather[0].main === "Clear") {
        setWeatherIcon(sunnyIcon);
        setWeatherImage(sunny);
      } else if (weatherData.weather[0].main === "Rain") {
        setWeatherIcon(rainyIcon);
        setWeatherImage(rainy);
      } else if (weatherData.weather[0].main === "Haze") {
        setWeatherIcon(hazeIcon);
        setWeatherImage(haze);
      } else {
        setWeatherIcon(hazeIcon);
        setWeatherImage(haze);
      }
    }
  }, [city, weatherData]);
  // ======= day name =======
  useEffect(() => {
    switch (new Date().getDay()) {
      case 0:
        setDayName("Sunday");
        break;
      case 1:
        setDayName("Monday");
        break;
      case 2:
        setDayName("Tuesday");
        break;
      case 3:
        setDayName("Wednesday");
        break;
      case 4:
        setDayName("Thursday");
        break;
      case 5:
        setDayName("Friday");
        break;
      case 6:
        setDayName("Saturday");
    }
  }, []);

  return (
    <Stack
      sx={{
        height: "100vh",
        justifyContent: "center",
        alignItems: "center",
        backgroundImage: "linear-gradient(to top, #a8edea 0%, #fed6e3 100%)",
      }}
    >
      <Stack
        direction="row"
        sx={{
          border: 1,
          justifyContent: "space-between",
          backgroundImage: `url(${weatherImage.src})`,
          backgroundRepeat: "no-repeat",
          backgroundSize: "cover",
          backgroundPosition: "center",
          color: "#fff",
          transition: "500ms",
          opacity: 1,
          width: "700px",
        }}
      >
        {/* ================= leftPart ============== */}
        <Stack
          justifyContent="space-between"
          sx={{ width: "100%", pl: 2, py: 2, pr: 8 }}
        >
          <Typography>the weather</Typography>

          <Stack direction="row" spacing={3} sx={{ alignItems: "center" }}>
            <Stack alignItems="center" justifyContent="center">
              <Typography variant="h3" sx={{ mt: 1 }}>
                {weatherData?.main?.temp}&#176;
              </Typography>
            </Stack>
            <Stack sx={{ alignItems: "center" }}>
              <Typography align="center" variant="h5" sx={{ mt: 1 }}>
                {weatherData?.name}
              </Typography>
              <Stack spacing={1} direction="row" sx={{ mt: 1 }}>
                <Typography variant="caption">{dayName}</Typography>
                <Typography variant="caption">
                  {year}.{month}.{day}
                </Typography>
              </Stack>
            </Stack>
            <Stack sx={{ minWidth: "100px" }}>
              <Stack sx={{ justifyContent: "center", alignItems: "center" }}>
                <img src={weatherIcon.src} alt="" style={{ width: "50px" }} />
              </Stack>
              {weatherData?.weather && (
                <Typography variant="caption" align="center">
                  {weatherData?.weather[0].description}
                </Typography>
              )}
            </Stack>
          </Stack>
        </Stack>
        {/* ============== right part ================ */}
        <Box
          display="flex"
          spacing={2}
          sx={{
            flexDirection: "column",
            width: "100%",
            height: "450px",
            pl: 2,
            background: "rgba(110 , 110 , 110 , 0.25)",
            boxShadow: "0 8px 32px 0 rgba(0 , 0 , 0 , 0.3)",
            backdropFilter: "blur(10px)",
            overflowY: "scroll",
          }}
        >
          <Stack
            direction="row"
            sx={{ alignItems: "center", justifyContent: "space-between" }}
          >
            <Stack sx={{ pt: 1 }}>
              <TextField
                id="standard-basic"
                variant="standard"
                placeholder="search"
                value={city}
                sx={{ pr: 2, color: "#fff" }}
                onChange={(e) => setCity(e.target.value)}
              />
            </Stack>
            <Stack
              sx={{
                backgroundColor: "#f97316",
                height: "100%",
                alignItem: "center",
                width: "30%",
                justifyContent: "center",
              }}
              onClick={getWeatherInfo}
            >
              <Stack justifyContent="center" alignItems="center">
                <SearchNormal1 color="#000" size={16} />
              </Stack>
            </Stack>
          </Stack>
          <Stack sx={{ pr: 3 }}>
            <Stack spacing={2} sx={{ borderBottom: 1, py: 2, pb: 3 }}>
              {cities.map((item) => (
                <Box key={item.id} onClick={() => setCity(item.title)}>
                  <Typography sx={{ cursor: "pointer" }}>
                    {item?.title}
                  </Typography>
                </Box>
              ))}
            </Stack>
            <Stack spacing={4} sx={{ py: 2, borderBottom: 1, mb: 2 }}>
              <Typography variant="body1" sx={{ mb: 1 }}>
                Weather Details
              </Typography>
              <Stack
                direction="row"
                sx={{ justifyContent: "space-between", alignItem: "center" }}
              >
                <Typography>cloudy</Typography>
                <Typography variant="caption" sx={{ pt: 1 }}>
                  {weatherData?.clouds?.all}%
                </Typography>
              </Stack>
              <Stack direction="row" sx={{ justifyContent: "space-between" }}>
                <Typography>Humidity</Typography>
                <Typography variant="caption" sx={{ pt: 1 }}>
                  {weatherData?.main?.humidity}%
                </Typography>
              </Stack>
              <Stack direction="row" sx={{ justifyContent: "space-between" }}>
                <Typography>Wind</Typography>
                <Typography variant="caption" sx={{ pt: 1 }}>
                  {weatherData?.wind?.speed}km/h
                </Typography>
              </Stack>
              <Stack direction="row" sx={{ justifyContent: "space-between" }}>
                <Typography>pressure</Typography>
                <Typography variant="caption" sx={{ pt: 1 }}>
                  {weatherData?.main?.pressure}
                </Typography>
              </Stack>
              <Stack direction="row" sx={{ justifyContent: "space-between" }}>
                <Typography>feels_like</Typography>
                <Typography variant="caption" sx={{ pt: 1 }}>
                  {weatherData?.main?.feels_like}
                </Typography>
              </Stack>
              <Stack direction="row" sx={{ justifyContent: "space-between" }}>
                <Typography>feels_like</Typography>
                <Typography variant="caption" sx={{ pt: 1 }}>
                  {weatherData?.main?.feels_like}
                </Typography>
              </Stack>
            </Stack>
          </Stack>
        </Box>
      </Stack>
    </Stack>
  );
}

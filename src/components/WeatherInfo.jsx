// src/components/WeatherInfo.jsx
import React from "react";
import styled from "styled-components";
import { useWeatherContext } from "../context/WeatherContext";

const WeatherInfo = () => {
  const { weatherData, city, unit } = useWeatherContext();

  if (!weatherData) return null;

  const {
    main: { temp, humidity, feels_like, pressure },
    weather,
    wind: { speed },
    visibility,
  } = weatherData;

  const iconUrl = `https://openweathermap.org/img/wn/${weather[0].icon}@4x.png`;
  const description = weather[0].description;
  const temperatureUnit = unit === "metric" ? "°C" : "°F";
  const windUnit = unit === "metric" ? "m/s" : "mph";

  // Convert visibility from meters to km/miles
  const visibilityConverted =
    unit === "metric"
      ? `${(visibility / 1000).toFixed(1)} km`
      : `${(visibility * 0.000621371).toFixed(1)} mi`;

  return (
    <Container>
      <MainCard>
        <HeaderSection>
          <CityName>{city}</CityName>
          <WeatherIcon src={iconUrl} alt={description} />
        </HeaderSection>

        <TemperatureSection>
          <MainTemp>
            {Math.round(temp)}
            {temperatureUnit}
          </MainTemp>
          <Description>
            {description.charAt(0).toUpperCase() + description.slice(1)}
          </Description>
          <FeelsLike>
            Feels like {Math.round(feels_like)}
            {temperatureUnit}
          </FeelsLike>
        </TemperatureSection>
      </MainCard>

      <DetailsGrid>
        <DetailCard>
          <DetailIcon>💧</DetailIcon>
          <DetailValue>{humidity}%</DetailValue>
          <DetailLabel>Humidity</DetailLabel>
        </DetailCard>

        <DetailCard>
          <DetailIcon>💨</DetailIcon>
          <DetailValue>
            {speed} {windUnit}
          </DetailValue>
          <DetailLabel>Wind Speed</DetailLabel>
        </DetailCard>

        <DetailCard>
          <DetailIcon>👁️</DetailIcon>
          <DetailValue>{visibilityConverted}</DetailValue>
          <DetailLabel>Visibility</DetailLabel>
        </DetailCard>

        <DetailCard>
          <DetailIcon>🌡️</DetailIcon>
          <DetailValue>{pressure} hPa</DetailValue>
          <DetailLabel>Pressure</DetailLabel>
        </DetailCard>
      </DetailsGrid>
    </Container>
  );
};

export default WeatherInfo;

const Container = styled.div`
  width: 100%;
  max-width: 500px;
  margin: 0 auto;
  padding: 1rem;
  display: flex;
  flex-direction: column;
  gap: 1.5rem;

  @media (max-width: 768px) {
    padding: 0.75rem;
    gap: 1.25rem;
  }

  @media (max-width: 480px) {
    padding: 0.5rem;
    gap: 1rem;
  }
`;

const MainCard = styled.div`
  background: linear-gradient(
    135deg,
    rgba(255, 255, 255, 0.25),
    rgba(255, 255, 255, 0.1)
  );
  backdrop-filter: blur(20px);
  border: 1px solid rgba(255, 255, 255, 0.2);
  border-radius: 24px;
  padding: 2rem;
  text-align: center;
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.1),
    inset 0 1px 0 rgba(255, 255, 255, 0.3);
  transition: transform 0.3s ease, box-shadow 0.3s ease;

  &:hover {
    transform: translateY(-4px);
    box-shadow: 0 25px 50px rgba(0, 0, 0, 0.15),
      inset 0 1px 0 rgba(255, 255, 255, 0.4);
  }

  @media (max-width: 768px) {
    padding: 1.5rem;
    border-radius: 20px;
  }

  @media (max-width: 480px) {
    padding: 1.25rem;
    border-radius: 16px;
  }
`;

const HeaderSection = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;
  margin-bottom: 1.0rem;

  @media (max-width: 480px) {
    gap: 0.75rem;
    margin-bottom: 1rem;
  }
`;

const CityName = styled.h1`
  font-size: 2rem;
  font-weight: 700;
  color: #2c3e50;
  margin: 0;
  text-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  letter-spacing: -0.5px;

  @media (max-width: 768px) {
    font-size: 1.75rem;
  }

  @media (max-width: 480px) {
    font-size: 1.5rem;
  }
`;

const WeatherIcon = styled.img`
  width: 120px;
  height: 120px;
  filter: drop-shadow(0 4px 8px rgba(0, 0, 0, 0.2));
  animation: float 3s ease-in-out infinite;

  @keyframes float {
    0%,
    100% {
      transform: translateY(0px);
    }
    50% {
      transform: translateY(-8px);
    }
  }

  @media (max-width: 768px) {
    width: 100px;
    height: 100px;
  }

  @media (max-width: 480px) {
    width: 80px;
    height: 80px;
  }
`;

const TemperatureSection = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.5rem;
`;

const MainTemp = styled.div`
  font-size: 4rem;
  font-weight: 800;
  color: #2c3e50;
  line-height: 1;
  text-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  background: linear-gradient(135deg, #2c3e50, #34495e);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;

  @media (max-width: 768px) {
    font-size: 3.5rem;
  }

  @media (max-width: 480px) {
    font-size: 3rem;
  }
`;

const Description = styled.p`
  font-size: 1.25rem;
  font-weight: 500;
  color: #546e7a;
  margin: 0;
  text-transform: capitalize;

  @media (max-width: 768px) {
    font-size: 1.125rem;
  }

  @media (max-width: 480px) {
    font-size: 1rem;
  }
`;

const FeelsLike = styled.p`
  font-size: 0.95rem;
  color: #78909c;
  margin: 0;
  font-weight: 400;

  @media (max-width: 480px) {
    font-size: 0.875rem;
  }
`;

const DetailsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 1rem;

  @media (max-width: 480px) {
    gap: 0.75rem;
  }
`;

const DetailCard = styled.div`
  background: linear-gradient(
    135deg,
    rgba(255, 255, 255, 0.2),
    rgba(255, 255, 255, 0.05)
  );
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.2);
  border-radius: 16px;
  padding: 1.25rem;
  text-align: center;
  transition: all 0.3s ease;
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.05);

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 12px 24px rgba(0, 0, 0, 0.1);
    border-color: rgba(255, 255, 255, 0.3);
  }

  @media (max-width: 768px) {
    padding: 1rem;
    border-radius: 14px;
  }

  @media (max-width: 480px) {
    padding: 0.875rem;
    border-radius: 12px;
  }
`;

const DetailIcon = styled.div`
  font-size: 1.5rem;
  margin-bottom: 0.5rem;
  display: block;

  @media (max-width: 480px) {
    font-size: 1.25rem;
    margin-bottom: 0.375rem;
  }
`;

const DetailValue = styled.div`
  font-size: 1.125rem;
  font-weight: 700;
  color: #2c3e50;
  margin-bottom: 0.25rem;
  line-height: 1.2;

  @media (max-width: 768px) {
    font-size: 1rem;
  }

  @media (max-width: 480px) {
    font-size: 0.95rem;
  }
`;

const DetailLabel = styled.div`
  font-size: 0.8rem;
  color: #78909c;
  font-weight: 500;
  text-transform: uppercase;
  letter-spacing: 0.5px;

  @media (max-width: 480px) {
    font-size: 0.75rem;
  }
`;

// src/components/Forecast.jsx
import React from "react";
import styled from "styled-components";
import { useWeatherContext } from "../context/WeatherContext";

const Forecast = () => {
  const { forecastData, unit } = useWeatherContext();

  if (!forecastData) return null;

  // Filter to get 1 forecast per day (around 12:00 PM)
  const dailyForecasts = forecastData.list.filter((forecast) =>
    forecast.dt_txt.includes("12:00:00")
  );

  // Helper to get unit symbol
  const getUnitSymbol = (unit) => (unit === "imperial" ? "°F" : "°C");

  return (
    <Container>
      <Header>
        <Title>5-Day Forecast</Title>
        <Subtitle>Weather outlook for the coming days</Subtitle>
      </Header>

      <ForecastGrid>
        {dailyForecasts.map((day, index) => {
          const date = new Date(day.dt_txt);
          const isToday = index === 0;

          const dayName = isToday
            ? "Today"
            : date.toLocaleDateString(undefined, { weekday: "short" });

          const dateString = date.toLocaleDateString(undefined, {
            month: "short",
            day: "numeric",
          });

          const icon = `https://openweathermap.org/img/wn/${day.weather[0].icon}@4x.png`;
          const temperature = Math.round(day.main.temp);
          const tempHigh = Math.round(day.main.temp_max);
          const tempLow = Math.round(day.main.temp_min);
          const description = day.weather[0].description;
          const humidity = day.main.humidity;

          return (
            <ForecastCard key={index} isToday={isToday}>
              <CardHeader>
                <DayName isToday={isToday}>{dayName}</DayName>
                <DateText>{dateString}</DateText>
              </CardHeader>

              <WeatherIconContainer>
                <WeatherIcon src={icon} alt={description} />
              </WeatherIconContainer>

              <TemperatureSection>
                <MainTemperature isToday={isToday}>
                  {temperature}
                  {getUnitSymbol(unit)}
                </MainTemperature>
                <TemperatureRange>
                  <HighTemp>{tempHigh}°</HighTemp>
                  <LowTemp>{tempLow}°</LowTemp>
                </TemperatureRange>
              </TemperatureSection>

              <WeatherDetails>
                <Description>
                  {description.charAt(0).toUpperCase() + description.slice(1)}
                </Description>
                <HumidityInfo>💧 {humidity}%</HumidityInfo>
              </WeatherDetails>
            </ForecastCard>
          );
        })}
      </ForecastGrid>
    </Container>
  );
};

export default Forecast;

const Container = styled.div`
  width: 100%;
  max-width: 1200px;
  margin: 2rem auto 0;
  padding: 0 1rem;

  @media (max-width: 768px) {
    margin: 1.5rem auto 0;
    padding: 0 0.75rem;
  }

  @media (max-width: 480px) {
    margin: 1rem auto 0;
    padding: 0 0.5rem;
  }
`;

const Header = styled.div`
  text-align: center;
  margin-bottom: 2rem;

  @media (max-width: 768px) {
    margin-bottom: 1.5rem;
  }

  @media (max-width: 480px) {
    margin-bottom: 1rem;
  }
`;

const Title = styled.h2`
  font-size: 2rem;
  font-weight: 700;
  color: #2c3e50;
  margin: 0 0 0.5rem 0;
  text-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  letter-spacing: -0.5px;

  @media (max-width: 768px) {
    font-size: 1.75rem;
  }

  @media (max-width: 480px) {
    font-size: 1.5rem;
  }
`;

const Subtitle = styled.p`
  font-size: 1rem;
  color: #78909c;
  margin: 0;
  font-weight: 400;

  @media (max-width: 480px) {
    font-size: 0.9rem;
  }
`;

const ForecastGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 1.5rem;

  @media (max-width: 768px) {
    grid-template-columns: repeat(auto-fit, minmax(160px, 1fr));
    gap: 1rem;
  }

  @media (max-width: 480px) {
    grid-template-columns: 1fr;
    gap: 0.75rem;
  }
`;

const ForecastCard = styled.div`
  background: linear-gradient(
    135deg,
    ${(props) =>
      props.isToday
        ? "rgba(74, 144, 226, 0.15), rgba(74, 144, 226, 0.05)"
        : "rgba(255, 255, 255, 0.25), rgba(255, 255, 255, 0.1)"}
  );
  backdrop-filter: blur(20px);
  border: 1px solid
    ${(props) =>
      props.isToday ? "rgba(74, 144, 226, 0.3)" : "rgba(255, 255, 255, 0.2)"};
  border-radius: 20px;
  padding: 1.5rem;
  text-align: center;
  box-shadow: 0 15px 35px rgba(0, 0, 0, 0.1),
    inset 0 1px 0 rgba(255, 255, 255, 0.3);
  transition: all 0.3s ease;
  position: relative;
  overflow: hidden;

  &::before {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 3px;
    background: ${(props) =>
      props.isToday
        ? "linear-gradient(90deg, #4a90e2, #357abd)"
        : "transparent"};
  }

  &:hover {
    transform: translateY(-4px);
    box-shadow: 0 20px 40px rgba(0, 0, 0, 0.15),
      inset 0 1px 0 rgba(255, 255, 255, 0.4);
  }

  @media (max-width: 768px) {
    padding: 1.25rem;
    border-radius: 16px;
  }

  @media (max-width: 480px) {
    padding: 1rem;
    border-radius: 14px;
    display: flex;
    align-items: center;
    text-align: left;
    gap: 1rem;
  }
`;

const CardHeader = styled.div`
  margin-bottom: 1rem;

  @media (max-width: 480px) {
    margin-bottom: 0;
    flex: 1;
  }
`;

const DayName = styled.h3`
  font-size: 1.125rem;
  font-weight: ${(props) => (props.isToday ? "700" : "600")};
  color: ${(props) => (props.isToday ? "#4a90e2" : "#2c3e50")};
  margin: 0 0 0.25rem 0;
  text-transform: uppercase;
  letter-spacing: 0.5px;

  @media (max-width: 768px) {
    font-size: 1rem;
  }

  @media (max-width: 480px) {
    font-size: 0.95rem;
  }
`;

const DateText = styled.p`
  font-size: 0.85rem;
  color: #78909c;
  margin: 0;
  font-weight: 500;

  @media (max-width: 480px) {
    font-size: 0.8rem;
  }
`;

const WeatherIconContainer = styled.div`
  margin: 0.75rem 0;

  @media (max-width: 480px) {
    margin: 0;
    flex-shrink: 0;
  }
`;

const WeatherIcon = styled.img`
  width: 80px;
  height: 80px;
  filter: drop-shadow(0 4px 8px rgba(0, 0, 0, 0.15));
  transition: transform 0.3s ease;

  ${ForecastCard}:hover & {
    transform: scale(1.1);
  }

  @media (max-width: 768px) {
    width: 70px;
    height: 70px;
  }

  @media (max-width: 480px) {
    width: 60px;
    height: 60px;
  }
`;

const TemperatureSection = styled.div`
  margin: 1rem 0;

  @media (max-width: 480px) {
    margin: 0;
    flex: 1;
    display: flex;
    flex-direction: column;
    align-items: flex-end;
  }
`;

const MainTemperature = styled.div`
  font-size: ${(props) => (props.isToday ? "2rem" : "1.75rem")};
  font-weight: 800;
  color: ${(props) => (props.isToday ? "#4a90e2" : "#2c3e50")};
  line-height: 1;
  margin-bottom: 0.5rem;

  @media (max-width: 768px) {
    font-size: ${(props) => (props.isToday ? "1.75rem" : "1.5rem")};
  }

  @media (max-width: 480px) {
    font-size: ${(props) => (props.isToday ? "1.5rem" : "1.25rem")};
    margin-bottom: 0.25rem;
  }
`;

const TemperatureRange = styled.div`
  display: flex;
  justify-content: center;
  gap: 0.75rem;
  font-size: 0.9rem;

  @media (max-width: 480px) {
    justify-content: flex-end;
    gap: 0.5rem;
    font-size: 0.85rem;
  }
`;

const HighTemp = styled.span`
  color: #e74c3c;
  font-weight: 600;
`;

const LowTemp = styled.span`
  color: #3498db;
  font-weight: 600;
`;

const WeatherDetails = styled.div`
  @media (max-width: 480px) {
    display: none;
  }
`;

const Description = styled.p`
  font-size: 0.85rem;
  color: #546e7a;
  margin: 0 0 0.5rem 0;
  font-weight: 500;
  text-transform: capitalize;

  @media (max-width: 768px) {
    font-size: 0.8rem;
  }
`;

const HumidityInfo = styled.p`
  font-size: 0.75rem;
  color: #78909c;
  margin: 0;
  font-weight: 500;

  @media (max-width: 768px) {
    font-size: 0.7rem;
  }
`;

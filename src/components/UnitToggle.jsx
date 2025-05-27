// src/components/UnitToggle.jsx
import React from "react";
import styled from "styled-components";
import { useWeatherContext } from "../context/WeatherContext";

const UnitToggle = () => {
  const { unit, setUnit } = useWeatherContext();

  const handleToggle = () => {
    setUnit((prev) => (prev === "metric" ? "imperial" : "metric"));
  };

  return (
    <Container>
      <ToggleWrapper>
        <ToggleLabel>Temperature Unit</ToggleLabel>
        <ToggleSwitch onClick={handleToggle} isMetric={unit === "metric"}>
          <ToggleSlider isMetric={unit === "metric"}>
            <SliderIcon>{unit === "metric" ? "°C" : "°F"}</SliderIcon>
          </ToggleSlider>
          <ToggleOption isActive={unit === "metric"} position="left">
            °C
          </ToggleOption>
          <ToggleOption isActive={unit === "imperial"} position="right">
            °F
          </ToggleOption>
        </ToggleSwitch>
        <ToggleDescription>
          Currently showing temperatures in{" "}
          {unit === "metric" ? "Celsius" : "Fahrenheit"}
        </ToggleDescription>
      </ToggleWrapper>
    </Container>
  );
};

export default UnitToggle;

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 1rem;

  @media (max-width: 768px) {
    padding: 0.75rem;
  }
`;

const ToggleWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.75rem;

  @media (max-width: 480px) {
    gap: 0.5rem;
  }
`;

const ToggleLabel = styled.span`
  font-size: 0.875rem;
  font-weight: 500;
  color: rgba(51, 51, 51, 0.8);
  margin-bottom: 0.1rem;

  @media (max-width: 480px) {
    font-size: 0.8rem;
  }
`;

const ToggleSwitch = styled.button`
  position: relative;
  width: 120px;
  height: 50px;
  background: linear-gradient(
    135deg,
    ${(props) => (props.isMetric ? "#4a90e2, #357abd" : "#ff6b6b, #e55555")}
  );
  border: none;
  border-radius: 25px;
  cursor: pointer;
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
  overflow: hidden;
  outline: none;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1),
    inset 0 1px 2px rgba(255, 255, 255, 0.2);

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 8px 25px rgba(0, 0, 0, 0.15),
      inset 0 1px 2px rgba(255, 255, 255, 0.3);
  }

  &:active {
    transform: translateY(-1px);
  }

  &:focus {
    box-shadow: 0 0 0 3px rgba(74, 144, 226, 0.3), 0 4px 15px rgba(0, 0, 0, 0.1),
      inset 0 1px 2px rgba(255, 255, 255, 0.2);
  }

  @media (max-width: 768px) {
    width: 100px;
    height: 42px;
    border-radius: 21px;
  }

  @media (max-width: 480px) {
    width: 90px;
    height: 38px;
    border-radius: 19px;
  }
`;

const ToggleSlider = styled.div`
  position: absolute;
  top: 3px;
  left: ${(props) => (props.isMetric ? "3px" : "calc(100% - 44px - 3px)")};
  width: 44px;
  height: 44px;
  background: linear-gradient(135deg, #ffffff, #f8f9fa);
  border-radius: 50%;
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15), 0 2px 4px rgba(0, 0, 0, 0.1);

  @media (max-width: 768px) {
    width: 36px;
    height: 36px;
    left: ${(props) => (props.isMetric ? "3px" : "calc(100% - 36px - 3px)")};
  }

  @media (max-width: 480px) {
    width: 32px;
    height: 32px;
    left: ${(props) => (props.isMetric ? "3px" : "calc(100% - 32px - 3px)")};
  }
`;

const SliderIcon = styled.span`
  font-size: 0.875rem;
  font-weight: 700;
  color: #333;
  text-shadow: 0 1px 2px rgba(0, 0, 0, 0.1);

  @media (max-width: 768px) {
    font-size: 0.8rem;
  }

  @media (max-width: 480px) {
    font-size: 0.75rem;
  }
`;

const ToggleOption = styled.span`
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  ${(props) => (props.position === "left" ? "left: 18px;" : "right: 18px;")}
  font-size: 0.875rem;
  font-weight: 600;
  color: ${(props) =>
    props.isActive ? "rgba(255, 255, 255, 0.4)" : "rgba(255, 255, 255, 0.9)"};
  transition: all 0.3s ease;
  pointer-events: none;
  text-shadow: 0 1px 2px rgba(0, 0, 0, 0.2);

  @media (max-width: 768px) {
    font-size: 0.8rem;
    ${(props) => (props.position === "left" ? "left: 14px;" : "right: 14px;")}
  }

  @media (max-width: 480px) {
    font-size: 0.75rem;
    ${(props) => (props.position === "left" ? "left: 12px;" : "right: 12px;")}
  }
`;

const ToggleDescription = styled.p`
  font-size: 0.75rem;
  color: rgba(51, 51, 51, 0.6);
  margin: 0;
  text-align: center;
  font-weight: 400;

  @media (max-width: 480px) {
    font-size: 0.7rem;
  }
`;

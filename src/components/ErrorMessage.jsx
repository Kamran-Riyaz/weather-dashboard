import React from "react";
import styled from "styled-components";
import { useWeatherContext } from "../context/WeatherContext";

const ErrorMessage = () => {
  const { error } = useWeatherContext();

  if (!error) return null;

  return <ErrorBox>{error}</ErrorBox>;
};

export default ErrorMessage;

const ErrorBox = styled.div`
  background-color: #ffe0e0;
  color: #d8000c;
  padding: 1rem;
  margin: 1rem auto;
  width: 90%;
  max-width: 500px;
  border: 1px solid #d8000c;
  border-radius: 8px;
  text-align: center;
  font-weight: bold;
`;

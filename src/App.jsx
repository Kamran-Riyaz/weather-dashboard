import React from "react";
import styled, { createGlobalStyle } from "styled-components";
import { WeatherProvider } from "./context/WeatherContext";
import SearchInput from "./components/SearchInput";
import WeatherInfo from "./components/WeatherInfo";
import ErrorMessage from "./components/ErrorMessage";
import UnitToggle from "./components/UnitToggle";
import Forecast from "./components/Forecast";

const App = () => {
  return (
    <WeatherProvider>
      <GlobalStyle />
      <AppContainer>
        <Header>
          <h1>🌤️ Weather Dashboard</h1>
        </Header>

        <MainContent>
          <SearchSection>
            <SearchInput />
            <UnitToggle />
          </SearchSection>

          <ErrorMessage />
          <WeatherInfo />
          <Forecast />
        </MainContent>
        <Footer>Developed by Kamran Riyaz | &copy; 2025</Footer>
      </AppContainer>
    </WeatherProvider>
  );
};

export default App;

const GlobalStyle = createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  body {
    font-family: 'Inter', sans-serif;
    background-color: #f4f6f8;
    color: #222;
    min-height: 100vh;
  }
`;

const AppContainer = styled.div`
  max-width: 700px;
  margin: 0 auto;
  padding: 2rem 1rem;
`;

const Header = styled.header`
  text-align: center;
  margin-bottom: 0.3rem;

  h1 {
    font-size: 2.5rem;
    font-weight: 700;
  }
`;

const MainContent = styled.main`
  display: flex;
  flex-direction: column;
  gap: 2rem;
`;

const SearchSection = styled.section`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;
`;

const Footer = styled.footer`
  text-align: center;
  margin-top: 3rem;
  font-size: 0.9rem;
  color: #777;
`;

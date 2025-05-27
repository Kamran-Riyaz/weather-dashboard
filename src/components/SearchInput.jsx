// src/components/SearchInput.jsx
import React, { useState } from "react";
import styled from "styled-components";
import { useWeatherContext } from "../context/WeatherContext";
import { saveCity } from "../utils/localStorage";

const SearchInput = () => {
  const { setCity } = useWeatherContext();
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;

    setIsLoading(true);
    try {
      setCity(input.trim());
      saveCity(input.trim());
      setInput("");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <SearchContainer>
      <Form onSubmit={handleSubmit}>
        <InputWrapper>
          <Input
            type="text"
            placeholder="Search for a city..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
            disabled={isLoading}
          />
          <SearchButton type="submit" disabled={!input.trim() || isLoading}>
            {isLoading ? (
              <LoadingSpinner />
            ) : (
              <SearchIcon>
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <circle cx="11" cy="11" r="8" />
                  <path d="m21 21-4.35-4.35" />
                </svg>
              </SearchIcon>
            )}
          </SearchButton>
        </InputWrapper>
      </Form>
    </SearchContainer>
  );
};

export default SearchInput;

const SearchContainer = styled.div`
  width: 100%;
  max-width: 500px;
  margin: 0 auto;
  padding: 0 1rem;

  @media (max-width: 768px) {
    padding: 0 0.75rem;
  }
`;

const Form = styled.form`
  width: 100%;
  margin: 1rem 0;

  @media (max-width: 768px) {
    margin: 1.0rem 0;
  }
`;

const InputWrapper = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  background: linear-gradient(
    135deg,
    rgba(255, 255, 255, 0.1),
    rgba(255, 255, 255, 0.05)
  );
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.2);
  border-radius: 16px;
  overflow: hidden;
  transition: all 0.3s ease;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1),
    inset 0 1px 0 rgba(255, 255, 255, 0.2);

  &:hover {
    border-color: rgba(30, 144, 255, 0.4);
    box-shadow: 0 12px 40px rgba(0, 0, 0, 0.15),
      inset 0 1px 0 rgba(255, 255, 255, 0.3);
  }

  &:focus-within {
    border-color: rgba(30, 144, 255, 0.6);
    box-shadow: 0 0 0 4px rgba(30, 144, 255, 0.1),
      0 12px 40px rgba(0, 0, 0, 0.15), inset 0 1px 0 rgba(255, 255, 255, 0.3);
  }

  @media (max-width: 480px) {
    border-radius: 12px;
  }
`;

const Input = styled.input`
  flex: 1;
  padding: 1rem 1.25rem;
  border: none;
  background: transparent;
  font-size: 1rem;
  font-weight: 400;
  color: #333;
  outline: none;
  transition: all 0.2s ease;

  &::placeholder {
    color: rgba(51, 51, 51, 0.6);
    font-weight: 300;
  }

  &:disabled {
    opacity: 0.7;
    cursor: not-allowed;
  }

  @media (max-width: 768px) {
    padding: 0.875rem 1rem;
    font-size: 0.95rem;
  }

  @media (max-width: 480px) {
    padding: 0.75rem 0.875rem;
    font-size: 0.9rem;
  }
`;

const SearchButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 1rem;
  margin: 0.25rem;
  background: linear-gradient(135deg, #1e90ff, #0f78d4);
  border: none;
  border-radius: 12px;
  color: white;
  cursor: pointer;
  transition: all 0.3s ease;
  min-width: 48px;
  min-height: 48px;

  &:hover:not(:disabled) {
    background: linear-gradient(135deg, #0f78d4, #0056b3);
    transform: translateY(-1px);
    box-shadow: 0 4px 12px rgba(30, 144, 255, 0.3);
  }

  &:active:not(:disabled) {
    transform: translateY(0);
  }

  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
    transform: none;
  }

  @media (max-width: 768px) {
    padding: 0.875rem;
    min-width: 44px;
    min-height: 44px;
    border-radius: 10px;
  }

  @media (max-width: 480px) {
    padding: 0.75rem;
    min-width: 40px;
    min-height: 40px;
    border-radius: 8px;
  }
`;

const SearchIcon = styled.div`
  width: 20px;
  height: 20px;
  display: flex;
  align-items: center;
  justify-content: center;

  svg {
    width: 100%;
    height: 100%;
  }

  @media (max-width: 768px) {
    width: 18px;
    height: 18px;
  }

  @media (max-width: 480px) {
    width: 16px;
    height: 16px;
  }
`;

const LoadingSpinner = styled.div`
  width: 20px;
  height: 20px;
  border: 2px solid rgba(255, 255, 255, 0.3);
  border-radius: 50%;
  border-top-color: white;
  animation: spin 1s ease-in-out infinite;

  @keyframes spin {
    to {
      transform: rotate(360deg);
    }
  }

  @media (max-width: 768px) {
    width: 18px;
    height: 18px;
  }

  @media (max-width: 480px) {
    width: 16px;
    height: 16px;
  }
`;

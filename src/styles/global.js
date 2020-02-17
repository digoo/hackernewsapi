import { createGlobalStyle } from 'styled-components';

export default createGlobalStyle`
@import url('https://fonts.googleapis.com/css?family=Roboto:400,700&display=swap');

* {
  margin: 0;
  padding: 0;
  outline: 0;
  box-sizing: border-box;
  }

  *:focus {
    outline: 0;
  }
  html, body, #root {
    height: 100%;
    font-size: 62.5%;

    @media (max-width: 1080px) {
    font-size: 58%;
    }
    @media (max-width: 720px) {
    font-size: 54%;
    }
    @media (max-width: 560px) {
    font-size: 46%;
    }
    @media (max-width: 480px) {
    font-size: 42%;
    }
    @media (max-width: 400px) {
    font-size: 38%;
    }
  }



body {
  height: 100%;
  background: #fff;
  -webkit-font-smoothing: antialiased;
}

body, input, button {
  font: 14px Roboto, sans-serif;
}

a {
    text-decoration: none;
  }

  ul {
    list-style: none;
  }

button {
  cursor: pointer;
}

`;

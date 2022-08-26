import { createGlobalStyle } from 'styled-components';

export const GlobalStyle = createGlobalStyle`
:root{
  --background: #fffcf7;
  --light: #ececec;
  --dark: #21203f;
  --medium: #e7bfa5;
  --medium-dark: #c5a898;
  --dark-light: #4b3c5d;
  --red:  #fc1a1a;
  --text: #969CB3;
}

*{
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

html{
  @media (max-width: 1080px){
    font-size: 93.75%;
  }

  @media(max-width: 720px){
    font-size: 87.5%;
  }
}

body{
  background: var(--background);
  -webkit-font-smoothing: antialiased;
}

body, input, textarea, button {
  font-family: 'Roboto', sans-serif;
  font-weight: 400;
}

h1, h2, h3, h4, h5, h6, strong {
  font-weight: 600;
  color: var(--dark-light);
}

button{
  cursor: pointer;
}

[disabled] {
  opacity: 0.6;
  cursor: not-allowed;
}

`;

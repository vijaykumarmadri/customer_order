import { createGlobalStyle } from 'styled-components';

const GlobalStyles = createGlobalStyle`
  body {
    font-size:16px;
    margin: 0;
    padding: 0;
    background:black;
    display:flex;
    justify-content:center;
    align-items:center;
    height:100vh;
  }
  h1{
    font-size:32px;
  }
  Container{
    height:100vh;
  }

  label {
    display: block;
    margin-bottom: 10px;
  }
  label .input{
    width:100px
  }

  input {
    margin-top: 5px;
    padding: 5px;
    width:600px;
    border: 1px solid white;
    border-radius:5px;
    background-color: #030303;
    color: #ffffff;
  }
  .radio{
    width:50px;
    
  }

  button {
    background-color: #6741D9;
    color: #ffffff;
    padding: 10px;
    cursor: pointer;
    border-radius:10px;
  }
  .regular-song{
    width:150px;
    margin:5px;
  }
  .bar{
    background:white;
    color:#FOC3F1
  }
  .button:hover{
    border-radius:3px solid FOC3F1;
  }
`;

export default GlobalStyles;

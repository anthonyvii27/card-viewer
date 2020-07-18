import React, { useState } from 'react';
import styled from 'styled-components';
import InputMask from 'react-input-mask';
import Card from './components/Card';

import './global.css';

import mastercard from './images/mastercard.png';
import visa from './images/visa.png';
import american_express from './images/american-express.png';
import icon_github from './images/icon-github.png';
import icon_instagram from './images/icon-instagram.png';
import icon_linkedin from './images/icon-linkedin.png';

export const Container = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  grid-template-rows: 5fr 1fr;

  width: 100vw;
  height: 100vh;  
  
  main {
    grid-row-start: 1/2;
    max-width: 1100px;
    margin: 0 auto;

    display: flex;  
    justify-content: space-between;
    align-items: center;

    .padding-inside {
      padding: 50px;
    }

    section {
      grid-row-start: 1/2;
      background-color: #F2F2F2;
      border-radius: 20px;
      padding: 40px;
      box-shadow: 0px 0px 7px #CCC, inset 0px 0px 4px #FFF;
      
      display: grid;
      grid-template-columns: 1fr 1fr;
      grid-template-rows: 1fr 1fr 1fr;

      align-items: center;

      div {
        padding: 10px 20px;
        height: 100%;
      }

      label {
        color: #777;
        font-size: 10pt;
      }

      .input-control {    
        width: 100%;
        height: 40px;
        border: none;
        padding: 10px;
        border-radius: 5px;
        margin-bottom: 7px;
      }

      .input-control:focus {
        outline: 1px solid #00A3C7;
      }

      button {
        width: 100%;
        height: 40px;
        margin-top: 20px;
        margin-bottom: -10px;
        border: none;
        background-color: #00A3C7;
        font-size: 11pt;
        border-radius: 5px;
        color: #FFF;
      }   

      button:hover {
        box-shadow: 0px 0px 7px #888;
        transition: .6s;
      }
    }
  }  

  footer {
    grid-row-start: 2/3;
    grid-column-start: 1/3;
    max-width: 1000px;

    display: grid;
    grid-template-columns: 1fr 1fr;
    grid-template-rows: 1fr 1fr;

    margin: 0 auto;

    div {
      text-align: center;

      h1 {
        font-size: 18pt;
        color: #777;
      }

      span {
        font-size: 10pt;
        color: #888;
      }
    }

    ul {
      display: flex;
      justify-content: center;
      list-style: none;

      li {
        display: inline-block;
        
        img {
          width: 40px;
          margin: 0 5px 0 5px;
        }
      }
    }
  }
` 


export default function App() {
  const [flipped, setFlipped] = useState(true);
  const [side, setSide] = useState('front');

  const [cardNumber, setCardNumber] = useState('');
  const [cardValidateDate, setCardValidateDate] = useState('');
  const [cardName, setCardName] = useState('');
  const [cardCVV, setCardCVV] = useState('');
  const [cardFlag, setCardFlag] = useState('');


  function monitoringSide(newSide) {
    if(side !== newSide) {
      setFlipped(state => !state) 
      setSide(newSide)
    }            
  }

  function manageCardNumber(number) {
    let aux = [];
    setCardFlag('');

    if(number.split('').length >= 2) {
      aux = number.split('');

      if(aux[0] === '4') 
        setCardFlag(visa);
      
  
      if (parseInt(aux[0].concat(aux[1])) > 50 && parseInt(aux[0].concat(aux[1])) <=  55) 
        setCardFlag(mastercard);
      

      if (aux[0].concat(aux[1]) === '34' || aux[0].concat(aux[1]) ===  '37') 
        setCardFlag(american_express);
    }     

    setCardNumber(number)
  }


  return (
    <Container>
      <main>
        <div className="padding-inside">
          <Card 
            number={ cardNumber }
            validate_date={ cardValidateDate }
            name={ cardName }
            cvv={ cardCVV }
            flag={ cardFlag }
            flipped={ flipped }
          />
        </div>

        <div className="padding-inside">
          <section>        
            <label htmlFor="card-number">Número do cartão *</label>
            <InputMask
              type="text"
              className="input-control"
              name="card-number"
              id="card-number"
              defaultValue={ cardNumber }
              onFocus={() => monitoringSide('front')}
              onChange={e => manageCardNumber(e.target.value)}
              mask="9999 9999 9999 9999"
              maskChar=" "
              autoComplete="off"
              required
            />

            <label htmlFor="card-name">Nome do responsável *</label>
            <input 
              type="text" 
              className="input-control" 
              name="card-name"
              id="card-name" 
              placeholder="Conforme está no cartão"
              onFocus={() => monitoringSide('front')}
              onChange={e => setCardName(e.target.value.toUpperCase())}
              defaultValue={ cardName }
            />           
        
            <label htmlFor="card-validate-date">Data de validade *</label>
            <InputMask
              type="text"
              className="input-control"
              name="card-validate-date"
              id="card-validate-date"
              defaultValue={ cardValidateDate }
              onFocus={() => monitoringSide('front')}
              onChange={e => setCardValidateDate(e.target.value)}
              mask="99/99"
              maskChar=" "
              autoComplete="off"
              placeholder="mm/yy"
              required
            />  

            <label htmlFor="card-cvv"> Código de Segurança *</label>
            <InputMask
              type="text"
              className="input-control"
              name="card-cvv"
              id="card-cvv"
              defaultValue={ cardCVV }
              onFocus={() => monitoringSide('back')}
              onChange={e => setCardCVV(e.target.value)}
              mask="9 99"
              maskChar=" "
              autoComplete="off"
              required
            />       

            <div />

            <button type="button">Enviar</button>
          </section>
        </div>
      </main>      

      <footer>
        <div>
          <h1>Anthony Vinicius - 2020</h1>
          <span>ENTHONYDEV</span>
        </div>
        <ul>
          <li><a href="https://github.com/anthonyvii27" target="_blank" rel="noopener noreferrer"><img src={icon_github} alt="icon_github" /></a></li>
          <li><a href="https://www.instagram.com/enthony.dev/" target="_blank" rel="noopener noreferrer"><img src={icon_instagram} alt="icon_instagram" /></a></li>
          <li><a href="https://www.linkedin.com/in/anthonyvinicius/" target="_blank" rel="noopener noreferrer"><img src={icon_linkedin} alt="icon_linkedin" /></a></li>
        </ul>
      </footer>
    </Container>
  );
}

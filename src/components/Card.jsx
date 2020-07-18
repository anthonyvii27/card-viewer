import React, { useState, useEffect } from 'react'
import { useSpring, animated } from 'react-spring'
import styled from 'styled-components';

import enthonydev from '../images/enthonydev.png';
import signal from '../images/signal.png';

export const CardArea = styled.div`
  max-width: 425px;
  width: 50ch;
  height: 50ch;
  max-height: 264px;

  .card {
    background-color: #00A3C7;
    position: absolute;
    max-width: 425px;
    max-height: 264px;
    border-radius: 15px;
    width: 50ch;
    height: 50ch;
    will-change: transform, opacity;
  }

  .back {
    .black-bar {
      background: #545454;
      height: 56px;
      width: 100%;
      margin-top: 35px;
    }

    .cvv-area {
      background: #ECECEC;
      border-radius: 3px;
      height: 43px;
      width: 60%;
      margin: 20px 0 0 20px;

      span {
        float: right;
        margin: 12px 12px 0 0;
      }
    }

    .area-detail {
      height: 70px;

      .detail {
        background: #E2E2E2;
        border-radius: 25px;
        height: 50px;
        width: 82px;
        margin: 10px 20px 0 0;
        float: right;
      }
    }      

    img {
      float: right;
      margin: 10px 10px 0 0;
    }
  }

  .front {
    .area-card {
      padding: 30px;
    }

    .area-chip {
      display: flex;
      align-items: center;
      width: 100%;
      margin: 25px 0 0 15px;

      img {
        width: 21px;
        height: 33px;
        margin-left: 12px;
      }
    }

    .chip {
      height: 43px;
      width: 60px;
      background-color: #E5E5E5;
      border-radius: 5px;
    }

    h1 {
      color: #FFF;
      text-align: center;
      padding: 25px 0 25px 0;
      letter-spacing: .08em;
      font-size: 28px;
    }

    .valid-thru-area {
      display: flex;
      align-items: center;
      color: #FFF;
      margin-top: -15px;
      
      span { 
        padding: 7px;
        font-size: 13px;      
      }
    }

    .name-flag-area {
      h2 {
        color: #FFF;
        font-size: 18px;
        letter-spacing: .04em;
        margin-top: 7px;
        width: max-content; 
      }

      img {
        float: right;
        width: 80px;
        margin-top: -60px;
        margin-right: -18px;
      }
    }
  }
`

export default function Card(props) {
  const [flipped, setFlipped] = useState(true);

  const { transform, opacity } = useSpring({
    opacity: flipped ? 1 : 0,
    transform: `perspective(600px) rotateY(${flipped ? 180 : 0}deg)`,
    config: { mass: 6, tension: 300, friction: 80 }
  })

  useEffect(() => {
    setFlipped(state => !state);
  }, [props.flipped])

  return (
    <CardArea>
      <animated.div className="card front" style={{ opacity: opacity.interpolate(o => 1 - o), transform }}>
        <div className="area-card">
          <div className="area-chip">
            <div className="chip" />
            <img src={ signal } alt="signal" />
          </div>
          <h1>{ props.number }</h1>
          <div className="valid-thru-area">
            <span>VALID <br />THRU</span>
            <span>{ props.validate_date }</span>
          </div>
          <div className="name-flag-area">
            <h2>{ props.name } </h2>
            {(props.flag) ? <img src={ props.flag } alt="flag" /> : ''}
          </div>
        </div>
      </animated.div>
      <animated.div className="card back" style={{ opacity, transform: transform.interpolate(t => `${t} rotateY(180deg)`) }}>
        <div className="black-bar" />
        <div className="cvv-area">
          <span>{ props.cvv }</span>
        </div>
        <div className="area-detail">
          <div className="detail" />
        </div>
        <div>
          <img src={ enthonydev } alt="enthonydev" />
        </div>
      </animated.div>
    </CardArea>
  )
}

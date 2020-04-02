import React from "react";
import { motion } from 'framer-motion';
import styled, { keyframes } from 'styled-components';
import PropTypes from 'prop-types';


const move = props => keyframes`
  100% { 
    motion-offset: ${props.distance};
    offset-distance: ${props.distance};
  }
`

const Marker = styled(motion.div)`
  /*motion-path: path('M 0 0 H 0 50 V 50 100 H 50 0 V 100 0');*/
  motion-path: path(${props => props.offsetPath});
  offset-path: path(${props => props.offsetPath});
  animation: ${move} ${props => props.period} ${props => props.loop} ${props => props.timingFunction} ${props =>props.direction} ${props=>props.playState};
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: ${props=>props.fontSize};
`;

function Rectangle(props) {

  let delay = 0;
  const delayConst = props.delayConst;
  let count = 0;

  const letters = Array.from(props.text);


  function getRectanglePath(x, y, s1, s2) {
    const path = 'M ' + x + ' ' + y + ' H ' + x + ' ' + (x + s1) + ' V ' + y + ' ' + (y + s2) + ' H ' + (x + s1) + ' ' + x + ' V ' + (y + s2) + ' ' + y;
    return "'" + path + "'";
  }

  function getAnimationType() {
    const animationType= (props.timingFunction.trim()).toLowerCase();
    if (animationType === "linear") {
      return "linear";
    }
    else if (animationType === "quadratic") {
      return "cubic-bezier(.46,.03,.52,.96)";
    }
    else if (animationType === "cubic") {
      return "cubic-bezier(.65,.05,.36,1)";
    }
    else {
      return animationType;
    }
  }

  function getLetter(letter) {
    delay += delayConst;

    if (letter === " ") {
      return "\u00A0";
    }
    else {
      return letter;
    }
  }

  function handleColor(a, letter){
    if(props.colors !== undefined){
      
      // Alternates Color
      if(letter === " "){
        return;
      }
      if(count === props.colors.length){
        count = 0;
        const color = props.colors[count];
        count++;
        return color;
      }
      else{
        const color = props.colors[count];
        count++;
        return color;
      }
      
    }
    else{
      // Picks a random color if no array is provided
      count++;
      return '#'+(0x1000000+(Math.random())*0xffffff).toString(16).substr(1,6);  
    }
    
  }

  return (
    <Marker direction={props.direction} playState={props.playState} distance={props.distance} fontSize={props.fontSize} offsetPath={getRectanglePath(props.x, props.y, props.s1, props.s2)} 
      period={props.period + 's'} timingFunction={getAnimationType()} loop={props.loop}>
      {letters.map((letter, index) => (
        <motion.span key={index} initial={{ opacity: 0, color: "#000000"}}
          animate={{opacity: 1, color: handleColor(count, letter)}}
          transition={{delay: delay}}>
          {getLetter(letter)}
        </motion.span>
      ))}
    </Marker>
  );
}

Rectangle.propTypes={
  text: PropTypes.string,
  delayConst: PropTypes.number,
  period: PropTypes.number,
  timingFunction: PropTypes.string,
  fontSize: PropTypes.string,
  colors: PropTypes.array,
  distance: PropTypes.string,
  direction: PropTypes.string,
  playState: PropTypes.string,
  x: PropTypes.number,
  y: PropTypes.number,
  s1: PropTypes.number,
  s2: PropTypes.number



}

Rectangle.defaultProps={
  text: "Rectangle",
  delayConst: 0.03,
  period: 2,
  timingFunction: "quadratic",
  loop: "infinite",
  fontSize: "4rem",
  distance: "100%",
  direction: "normal",
  playState: "running",
  x: 300,
  y: 0,
  s1: 200,
  s2: 200

}


export default Rectangle;
import React from 'react';
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
  /*motion-path: path('M 100, 100m -75, 0a 75,75 0 1,0 150,0a 75,75 0 1,0 -150,0');*/
  motion-path: path(${props => props.test});
  offset-path: path(${props => props.test});
  animation: ${move} ${props => props.period} ${props => props.loop} ${props => props.timingFunction} ${props =>props.direction} ${props=>props.playState} ${props=>props.delay};
  font-size: ${props=>props.fontSize};
  display: inline-block;
  transform-origin: center;

`;

function CustomPath(props) {
  let delay = props.delay;
  const delayConst = props.delayConst;
  let count = 0;

  const letters = Array.from(props.text);

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

  function getPath(){
    const path = props.path;
    return "'" + path + "'";
  }

  return (
    <Marker delay={props.delay + "s"} fontSize={props.fontSize} direction={props.direction} playState={props.playState} distance={props.distance} initial={{ opacity: 0 }} period={props.period + "s"} animate={{ opacity: 1 }} transition={{delay: props.delay}}
      test={getPath()} loop={props.loop} timingFunction={getAnimationType()}>
      {letters.map((letter, index) => (
        <motion.span key={index} initial={{ opacity: 0, color: "#000000" }}
          animate={{ opacity: 1, color: handleColor(count, letter) }}
          transition={{ delay: delay }}>
          {getLetter(letter)}
        </motion.span>
      ))}
    </Marker>
  );
}

CustomPath.propTypes = {
  period: PropTypes.number,
  text: PropTypes.string,
  timingFunction: PropTypes.string,
  delayConst: PropTypes.number,
  fontSize: PropTypes.string,
  colors: PropTypes.array,
  path: PropTypes.string,
  distance: PropTypes.string,
  direction: PropTypes.string,
  playState: PropTypes.string,
  delay: PropTypes.number
}

CustomPath.defaultProps = {
  period: 3,
  text: "Hello",
  loop: "1",
  timingFunction: "forwards",
  delayConst: 0.09,
  fontSize: "4rem",
  path: "M1 46C74.6667 12.3333 247.2 -34.8 348 46C448.8 126.8 640.667 79.6667 724 46",
  distance: "100%",
  direction: "normal",
  playState: "running",
  delay: 0


}

export default CustomPath;
import React from 'react';
import { motion } from 'framer-motion';
import styled from 'styled-components';
import PropTypes from "prop-types";

const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: ${props =>props.fontSize};

`;


function Arc(props) {
  let count = 0;
  let curHeight = 0;
  const startingRot = props.startingRot;
  let curRot = startingRot;
  const heightIncrement = props.heightIncrement;
  let delay = 0;
  const delayConst = props.delayConst;
  const letters = Array.from(props.text);

  function getParabolaHeight(index, letter) {
    const mid = letters.length / 2;
    if (index <= mid && index !== 0 && letter !== " ") {
      curHeight += heightIncrement;
      return curHeight;

    }
    else if (index > mid && letter !== " ") {
      curHeight -= heightIncrement;
      return curHeight;

    }
  }

  function getParabolaRotation(index){
    const deltaRot = (startingRot*2)/(letters.length-1);
    if(index !== 0){
      curRot-=deltaRot;
    }
    return curRot;
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

  function getLetter(letter){
    delay += delayConst;

    if(letter === " "){
      return "\u00A0";
    }
    else{
      return letter;
    }
  }

  return (
    <Container fontSize={props.fontSize}>
      {letters.map((letter, index) => (
        <motion.div key={index} initial={{opacity: 0, color: "#000000"}}
          animate={{opacity: 1, y:getParabolaHeight(index, letter), rotate: props.rotate ? getParabolaRotation(index) : 0,
            color: handleColor(count, letter)}}
          transition={{delay: delay, damping: 16, stiffness: 100,}}>
          {getLetter(letter)}
         </motion.div>
      ))}
    </Container>
  );
}

Arc.propTypes = {
  delayConst: PropTypes.number,
  heightIncrement: PropTypes.number,
  startingRot: PropTypes.number,
  text: PropTypes.string,
  colors: PropTypes.array,
  fontSize: PropTypes.string,
  rotate: PropTypes.bool
}

Arc.defaultProps ={
  delayConst: .09,
  heightIncrement: -7,
  startingRot: -15,
  text: "This is cool",
  fontSize: "4rem",
  rotate: true
}

export default Arc;


import React from 'react';
import { motion } from 'framer-motion';
import styled from 'styled-components';
import PropTypes from "prop-types";

const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: ${props => props.fontSize};
`;


function Snake(props) {
  const letters = Array.from(props.text);
  let count = 0;
  let height = 0;
  let heightIncrement = props.heightIncrement;
  let delay = 0;
  const delayConst = props.delayConst;

  function getLetter(letter) {
    delay += delayConst;

    if (letter === " ") {
      return "\u00A0";
    }
    else {
      return letter;
    }
  }

  function getSnakeHeight(index, letter) {
    if ((index + 1) % props.lenOfEachIncrement === 0) {
      heightIncrement = heightIncrement * -1;
    }
    const heightToReturn = height;
    height += heightIncrement;
    return heightToReturn;
  }


  function handleColor(letter) {
    if (props.colors !== undefined) {

      // Alternates Color
      if (letter === " ") {
        return;
      }
      if (count === props.colors.length) {
        count = 0;
        const color = props.colors[count];
        count++;
        return color;
      }
      else {
        const color = props.colors[count];
        count++;
        return color;
      }
    }
    else {
      // Picks a random color if no array is provided
      count++;
      return '#' + (0x1000000 + (Math.random()) * 0xffffff).toString(16).substr(1, 6);
    }
  }

  return (
    <Container fontSize={props.fontSize}>
      {letters.map((letter, index) => (
        <motion.div key={index} initial={{ opacity: 0, color: "#000000" }}
          animate={{ opacity: 1, y: getSnakeHeight(index, letter), color: handleColor(letter) }}
          transition={{ delay: delay }}>
          {getLetter(letter)}
        </motion.div>
      ))}
    </Container>
  );
}

Snake.propTypes={
  delayConst: PropTypes.number,
  heightIncrement: PropTypes.number,
  lenOfEachIncrement: PropTypes.number,
  text: PropTypes.string,
  fontSize: PropTypes.string,
  colors: PropTypes.array,

}

Snake.defaultProps={
  delayConst: .09,
  heightIncrement: -7,
  lenOfEachIncrement: 4,
  text: "This is cool",
  fontSize: "4rem"
}

export default Snake;
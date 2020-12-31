import React from 'react';
import { BeatLoader } from 'react-spinners';
import styled from 'styled-components';

const Container = styled.div`
  height: 100vh;
  width: 100vw;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export default (props) => {

  if (props.error) {
    return (
      <Container>
        <button onClick={props.retry}>retry</button>
        <p>{props.error.message}</p>
      </Container>
    );
  }

  if (props.timedOut) {
    return (
      <Container>
        <button onClick={props.retry}>retry</button>
        <p>timed out</p>
      </Container>
    );
  }

  if (props.pastDelay) {
    return (
      <Container>
        <BeatLoader
          color="#BDBDBD"
          size={30}
          margin="2px"
        />
      </Container>
    );
  }

  return null;

};

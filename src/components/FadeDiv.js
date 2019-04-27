import React from 'react';
import styled, { keyframes } from 'styled-components';
//import FadeIn from '@bit/formidablelabs.react-animations.fade-in';

class FadeDiv extends React.Component {
  state = { }


  render() {
    const { props } = this;

    //    const FadeInAnimation = keyframes`${FadeIn}`;
    //    const ContainDiv = styled.div`
    //      animation: ease-out 500ms ${FadeInAnimation};
    //     `;

    return (
      <div>
        {props.children}
      </div>
    );
  }
}

export default FadeDiv;

import React from 'react';
import Spinner from 'react-spinkit';

class Loading extends React.Component {
  state = { }

  render() {
    return (<Spinner className='spinner' name='line-scale-party' color='black' fadeIn='none' />);
  }
}

export default Loading;

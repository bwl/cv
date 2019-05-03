import React from 'react';
import {
  Flex, Box, Image, Text, Heading,
} from 'rebass';
import axios from 'axios';
import NotFound from './NotFound';
import FadeInDiv from '../components/FadeDiv';
import Loading from '../components/Loading';

import Player from '../components/Player';

export default class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      doc: null,
      notFound: false,
    };
  }

  componentDidMount() {
    document.body.classList.add('page-home');
    this.fetchPage();
  }

  componentDidUpdate(prevProps) {}

  componentWillUnmount() {
    document.body.classList.remove('page-home');
  }

  fetchPage = () => {
    axios.get('https://mcapi.us/server/query?ip=cheeseburgervacation.com')
      .then((response) => {
      // handle success
        this.setState({
          doc: response.data,
        });
      })
      .catch((error) => {
      // handle error
      })
      .then(() => {
      // always executed
      });
  }

  render() {
    const { doc } = this.state;


    if (doc) {
      const { motd } = doc;


      if (!doc.online) {
        return 'Server offline at the moment.';
      }

      const playersText = `Online Now (${doc.players.now})`;
      const version = `BungeeCord Version ${doc.version}`;
      const server = doc.server_mod;
      const players = doc.players.list;

      return (
        <FadeInDiv>

          {/* <Box className='map'><iframe src='http://cheeseburgervacation.com:8123/?worldname=world&mapname=surface&zoom=5&x=-16&y=64&z=-271' /></Box> */}

          <Flex className='font-averta-regular content-wrapper'>
            <Box p={5}>

              <Text fontSize={5} py={3}>Cheeseburger Vacation</Text>
              <Text fontSize={4} pb={3}>Minecraft Server Network</Text>
              <Text fontSize={2} pt={2}>{version}</Text>
              <Text fontSize={1} pt={2} pb={4}>{server}</Text>

              {players && (
              <>
                <Text fontSize={2} py={4}>{playersText}</Text>
                {players.map(player => <Player username={player} />)}
              </>
              )}

              <Player username='bwl' />


            </Box>
          </Flex>
        </FadeInDiv>
      );
    }
    if (this.state.notFound) {
      return <NotFound />;
    }
    return <Loading />;
  }
}

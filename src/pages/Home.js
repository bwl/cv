import React from 'react';
import {
  Flex, Box, Image, Text, Heading,
} from 'rebass';
import axios from 'axios';
import NotFound from './NotFound';
import FadeInDiv from '../components/FadeDiv';
import Loading from '../components/Loading';

import discordIcon from '../assets/images/discord.svg';

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
        setTimeout(() => this.fetchPage(), 60000);
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
      if (!doc.online) {
        return 'Server offline at the moment.';
      }

      const playersText = `Online Now (${doc.players.now})`;
      const version = `BungeeCord Version ${doc.version}`;
      const server = doc.server_mod;
      const players = doc.players.list;

      return (
        <FadeInDiv>
          <Flex className='font-averta-regular content-wrapper'>
            <Box pt={0} p={5}>
              <Flex flexDirection='column'>
                <Text fontSize={5} py={3}>Cheeseburger Vacation</Text>
                <Text fontSize={4} pb={3}>Minecraft Server Network</Text>
                <Text fontSize={2} pt={2}>{version}</Text>
                <Text fontSize={1} pt={2} pb={4}>{server}</Text>
                <Flex alignItems='center' py={1}>
                  <img width='32' src={discordIcon} />
                  <a style={{color: 'darkblue'}}href="https://discord.gg/fECUvJd">Join the discord</a>
                </Flex>
                {players && (
                  <>
                    <Box>
                      <Text fontSize={2} py={4}>{playersText}</Text>
                    </Box>
                    <Flex>
                      {players.map(player => <Player username={player} />)}
                    </Flex>
                  </>
                )}

                {!players && (
                  < >
                    <Player username='bwl' />
                    {/* <Player username='subee' />
                    <Player username='hukt0nf0nikz' />
                    <Player username='jokester247' />
                    <Player username='synthesists' /> */}
                  </ >
                )}
              </Flex>
            </Box>
          </Flex>
          <Box className='map'>
            <iframe title='map' src='http://cheeseburgervacation.com:8123/index.html?worldname=forest&mapname=surface&zoom=3&x=97&y=64&z=30' />
          </Box>
        </FadeInDiv>
      );
    }
    if (this.state.notFound) {
      return <NotFound />;
    }
    return <Loading />;
  }
}

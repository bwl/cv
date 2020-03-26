import React from 'react';
import { Text } from 'rebass';
import axios from 'axios';

class Player extends React.Component {
  state = {
    uuid: '',
    skin: '',
    name: '',
  }


  componentDidMount() {
    const { username } = this.props;
    this.getPlayerInfo(username);
  }

  getPlayerInfo = (username) => {
    axios.get(`https://api.minetools.eu/uuid/${username}`)
      .then((response) => {
        this.setState({
          uuid: response.data.id,
        },
        this.getProfile(response.data.id));
      })
      .catch((error) => {
        console.log(error);
      })
      .then(() => {
        // always executed
      });
  }

  getProfile = (uuid) => {
    axios.get(`https://api.minetools.eu/profile/${uuid}`)
      .then((res) => {
        this.setState({
          skin: res.data.decoded.textures.SKIN.url,
          name: res.data.decoded.profileName,
        });
      })
      .catch((error) => {
        console.log(error);
      })
      .then(() => {
        // always executed
      });
  }


  render() {
    const { uuid, skin, name } = this.state;


    const src = `https://crafatar.com/renders/body/${uuid}?size=256&overlay`;

    return (
      <Text width={120} pb={4} fontSize={2} textAlign='center'>
        <img width={64} title='player' src={src} alt={name} />
        <br />
        {name}
      </Text>
    );
  }
}

export default Player;

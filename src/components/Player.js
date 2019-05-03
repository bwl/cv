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

    return (
      <Text fontSize={5}>
        <img src={`http://www.minecraft-skin-viewer.net/?username=${name}&vert_rotation=180&hor_rotation=140&head_rotation=210&left_arm=170&right_arm=190&left_leg=180&right_leg=180&head_only=0&display_hairs=1&antialiasing=1`} />
        <br />
        {name}
      </Text>
    );
  }
}

export default Player;

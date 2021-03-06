import React from 'react';
import PropTypes from 'prop-types';
import { withNavigation } from 'react-navigation';

import {
  View, Text, TouchableOpacity, StatusBar, AsyncStorage,
} from 'react-native';

import Icon from 'react-native-vector-icons/FontAwesome';

import styles from './styles';

class Header extends React.Component {
  static propTypes = {
    title: PropTypes.string.isRequired,
    navigation: PropTypes.shape({
      navigate: PropTypes.func,
    }).isRequired,
  };

  state = {}

  signOut = async () => {
    const { navigation } = this.props;

    await AsyncStorage.clear();

    navigation.navigate('Welcome');
  }

  render() {
    const { title } = this.props;

    return (
      <View style={styles.container}>
        <StatusBar backgroundColor="#333" />

        <View style={styles.left} />

        <Text style={styles.title}>{title}</Text>

        <TouchableOpacity onPress={this.signOut}>
          <Icon name="exchange" size={16} style={styles.icon} />
        </TouchableOpacity>
      </View>
    );
  }
}

export default withNavigation(Header);

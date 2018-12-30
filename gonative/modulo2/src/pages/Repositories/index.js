import React from 'react';
import PropTypes from 'prop-types';

import {
  View, Text, AsyncStorage, ActivityIndicator,
} from 'react-native';
import api from '~/services/api';

import Icon from 'react-native-vector-icons/FontAwesome';

import Header from '~/components/Header';
import styles from './styles';

const TabIcon = ({ tintColor }) => (
  <Icon
    name="list-alt"
    size={20}
    color={tintColor}
  />
);

TabIcon.propTypes = {
  tintColor: PropTypes.string.isRequired,
};

class Repositories extends React.Component {
  static navigationOptions = {
    tabBarIcon: TabIcon,
  }

  state = {
    data: [],
    loading: true,
  }

  async componentDidMount() {
    const username = await AsyncStorage.getItem('@Githuber:username');

    const { data } = await api.get(`/users/${username}/repos`);

    this.setState({ data, loading: false });
  }

  renderList = () => (
    <Text>Lista</Text>
  )

  render() {
    const { loading } = this.state;

    return (
      <View>
        <Header title="Repositories" />
        {
          loading
            ? <ActivityIndicator style={styles.loading} />
            : this.renderList()
        }
      </View>
    );
  }
}

export default Repositories;

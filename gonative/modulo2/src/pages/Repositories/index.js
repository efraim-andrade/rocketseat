import React from 'react';
import PropTypes from 'prop-types';

import {
  View, Text, AsyncStorage, ActivityIndicator, FlatList,
} from 'react-native';
import api from '~/services/api';

import Icon from 'react-native-vector-icons/FontAwesome';

import Header from '~/components/Header';
import styles from './styles';
import RepositoryItem from './RepositoryItem';

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
    refreshing: false,
  }

  componentDidMount() {
    this.loadRepositories();
  }

  loadRepositories = async () => {
    this.setState({ refreshing: true });

    const username = await AsyncStorage.getItem('@Githuber:username');

    const { data } = await api.get(`/users/${username}/repos`);

    this.setState({ data, loading: false, refreshing: false });
  }

  renderListItem = ({ item }) => <RepositoryItem repository={item} />

  renderList = () => {
    const { data, refreshing } = this.state;

    return (
      <FlatList
        data={data}
        keyExtractor={item => String(item.id)}
        renderItem={this.renderListItem}
        onRefresh={this.loadRepositories}
        refreshing={refreshing}
      />
    );
  }

  render() {
    const { loading } = this.state;

    return (
      <View style={styles.container}>
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

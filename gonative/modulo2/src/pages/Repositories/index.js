import React from 'react';
import PropTypes from 'prop-types';

import { View, Text } from 'react-native';

import Icon from 'react-native-vector-icons/FontAwesome';

import Header from '~/components/Header';
// import styles from './styles';

const Repositories = () => (
  <View>
    <Header title="Repositories" />
    <Text>teasdsa</Text>
  </View>
);

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


Repositories.navigationOptions = {
  tabBarIcon: TabIcon,
};

export default Repositories;

import React from 'react';
import PropTypes from 'prop-types';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Creators as AlbumsActions } from '~/store/ducks/albums';

import {
  View, StatusBar, TouchableOpacity, FlatList, ActivityIndicator,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';

import AlbumItem from './components/AlbumItem';

import styles from './styles';

class Main extends React.Component {
  static propTypes = {
    navigation: PropTypes.shape({
      navigate: PropTypes.func,
    }).isRequired,
    getAlbumsRequest: PropTypes.func.isRequired,
    albums: PropTypes.shape({
      data: PropTypes.arrayOf({
        id: PropTypes.number,
      }),
      loading: PropTypes.bool,
    }).isRequired,
  };

  static navigationOptions = ({ navigation }) => ({
    title: 'Sua Biblioteca',
    headerRight: (
      <TouchableOpacity
        style={styles.headerRight}
        onPress={() => navigation.navigate('Search')}
      >
        <Icon name="search" size={24} color="#FFF" />
      </TouchableOpacity>
    ),
  });

  componentDidMount() {
    // this.props.getAlbumsRequest();
  }

  render() {
    const { navigation } = this.props;

    return (
      <View style={styles.container}>
        <StatusBar barStyle="light-content" />

        {
          this.props.albums.loading
            ? <ActivityIndicator size="small" color="#999" style={styles.loading} />
            : (
              <FlatList
                data={this.props.albums}
                keyExtractor={album => String(album.id)}
                renderItem={({ item }) => <AlbumItem onPress={() => navigation.navigate('Album', { album: item })} album={item} />}
              />
            )
        }


      </View>
    );
  }
}

const mapStateToProps = state => ({
  albums: state.albums,
});

const mapDispatchToProps = dispatch => bindActionCreators(AlbumsActions, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(Main);


import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Content, Text, ListItem } from 'native-base';
import { Actions, ActionConst } from 'react-native-router-flux';

import { closeDrawer } from '../../actions/drawer';
import { setIndex } from '../../actions/list';

import styles from './style';

class SideBar extends Component {

  static propTypes = {
    // setIndex: React.PropTypes.func,
    closeDrawer: React.PropTypes.func,
    navigateTo: React.PropTypes.func,
  }

  navigateTo(route) {
    this.props.navigateTo(route, 'home');
  }

  render() {
    return (
      <Content style={styles.sidebar} >
        <ListItem button onPress={() => { Actions.home(); this.props.closeDrawer(); }} >
          <Text>Home</Text>
        </ListItem>
        <ListItem button onPress={() => { Actions.blankPage(); this.props.closeDrawer(); }} >
          <Text>Blank Page</Text>
        </ListItem>
				<ListItem button onPress={() => { Actions.piyasaDegeri(); this.props.closeDrawer(); }} >
          <Text>Piyasa Degeri</Text>
        </ListItem>
				<ListItem button onPress={() => { Actions.blankPage(); this.props.closeDrawer(); }} >
          <Text>Raporlar</Text>
        </ListItem>
				<ListItem button onPress={() => { Actions.blankPage(); this.props.closeDrawer(); }} >
          <Text>Analizler</Text>
        </ListItem>
				<ListItem button onPress={() => { Actions.blankPage(); this.props.closeDrawer(); }} >
          <Text>Hizmetler</Text>
        </ListItem>
        <ListItem button onPress={() => { Actions.blankPage(); this.props.closeDrawer(); }} >
          <Text>Hakkimizda</Text>
        </ListItem>
				<ListItem button onPress={() => { Actions.login({ type: ActionConst.RESET }); this.props.closeDrawer(); }} >
          <Text>Cikis</Text>
        </ListItem>
      </Content>
    );
  }
}

function bindAction(dispatch) {
  return {
    closeDrawer: () => dispatch(closeDrawer()),
    setIndex: index => dispatch(setIndex(index)),
  };
}

export default connect(null, bindAction)(SideBar);

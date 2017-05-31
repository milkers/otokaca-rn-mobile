
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Actions } from 'react-native-router-flux';
import { View } from 'react-native';
import { Container, Header, Title, Content, Text, Button, Icon, Left, Right, Body } from 'native-base';

import { openDrawer } from '../../actions/drawer';
import styles from './styles';

class PiyasaDegeriSonuc extends Component {

  static propTypes = {
    name: React.PropTypes.string,
    index: React.PropTypes.number,
    list: React.PropTypes.arrayOf(React.PropTypes.string),
    openDrawer: React.PropTypes.func,
  }

  constructor(props) {
    super(props);
    this.state = {

    };
  }

  componentWillMount() {
    console.log('piyasa degeri sonuc cwm.');
  }

  _fetchPiyasaAnalizim() {

  }

  _fetchPiyasaDegerim() {

  }

  render() {
    const { props: { name, index, list } } = this;

    return (
      <Container style={styles.container}>
        <Header>
          <Left>
            <Button transparent onPress={() => Actions.pop()}>
              <Icon name="ios-arrow-back" />
            </Button>
          </Left>

          <Body>
            <Title>{(name) ? this.props.name : 'Piyasa Degeri'}</Title>
          </Body>

          <Right>
            <Text/>
          </Right>
        </Header>

        <Content padder>
          <Text>
            {this.props.oto.marka}
          </Text>
          <Text>
            {this.props.oto.seri}
          </Text>
          <Text>
            {this.props.oto.vites} vites
          </Text>
          {this.props.oto.yil !== '-1' ?
            <Text>
              {this.props.oto.yil} model
            </Text>
            :
            <Text />
          }
          <View
            style={{
              marginTop: 5,
              borderBottomColor: 'black',
              borderBottomWidth: 1,
            }}
          />






        </Content>
      </Container>
    );
  }
}

function bindAction(dispatch) {
  return {
    openDrawer: () => dispatch(openDrawer()),
  };
}

const mapStateToProps = state => ({
  name: state.user.name,
  index: state.list.selectedIndex,
  list: state.list.list,
  oto: state.oto,
});


export default connect(mapStateToProps, bindAction)(PiyasaDegeriSonuc);

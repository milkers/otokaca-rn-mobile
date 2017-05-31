
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
      pazarAnalizim: {},
      ortKM: '',
      ortTL: '',
    }

  }

  componentWillMount() {
    console.log('piyasa degeri sonuc cwm.');
    this._fetchPazarAnalizim();
  }

  _fetchPazarAnalizim() {
    console.log('_fetchPazarAnalizim');

    fetch('https://otokaca.com/ikinci-el-fiyatlari/PazarAnalizim', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        markaId: this.props.oto.markaId,
        seriId: this.props.oto.seriId,
        yilId: this.props.oto.yil,
        modelId: this.props.oto.modelId,
        vitesId: this.props.oto.vitesId,
      })
    }).then(responseData => {
      // console.log('response : ', value, responseData.json());
      responseData.json().then( response => {
        console.log('PazarAnalizim response: ', response);
        let jsonResponse = JSON.parse(response);
        let ortKM = '0';
        let ortTL = '0';
        if (jsonResponse.rows.length === 2) {
          ortKM = jsonResponse.rows[1].c[2].f;
          ortTL = jsonResponse.rows[0].c[2].f;
        }
        else {
          ortKM = jsonResponse.rows[3].c[2].f;
          ortTL = jsonResponse.rows[1].c[2].f;
        }

        console.log('PazarAnalizim json response: ', jsonResponse, ortKM, ortTL);

        this.setState({
          pazarAnalizim: jsonResponse,
          ortKM: ortKM,
          ortTL: ortTL,
        });

      });

    }).catch(err => {
      console.log('PazarAnalizim err: ', err);
    })
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
          {this.props.oto.model !== '-1' ?
            <Text>
              {this.props.oto.model}
            </Text>
            :
            <Text />
          }
          <View
            style={{
              marginTop: 15,
              marginBottom: 15,
              borderBottomColor: 'black',
              borderBottomWidth: 1,
            }}
          />
        <Text>
          Bu tür araçlar ortalama <Text style={{color: 'red'}}>{this.state.ortKM}</Text> km kullanılmıştır ve
          ortalama <Text style={{color: 'red'}}>{this.state.ortTL}</Text> TL civarında fiyat istenmektedir.
        </Text>





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


import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Actions } from 'react-native-router-flux';
import {
  Container, Header, Title,
  Content, Text, Button, Icon,
  Left, Right, Body, Picker,
  Separator,
} from 'native-base';
const Item = Picker.Item;

import { openDrawer } from '../../actions/drawer';
import { setOto } from '../../actions/oto';
import styles from './styles';
import brandList from './brandList.json';
const { brandArr } = brandList;


class PiyasaDegeri extends Component {

  static propTypes = {
    name: React.PropTypes.string,
    index: React.PropTypes.number,
    list: React.PropTypes.arrayOf(React.PropTypes.string),
    openDrawer: React.PropTypes.func,
  }

  constructor(props) {
    super(props);
    this.state = {
      isMarkaSeriVitesFilled: false,
      selectedBrandValue: '-1',
      selectedBrandLabel: 'Lutfen marka seciniz',
      selectedSeriValue: '-1',
      selectedSeriLabel: 'Lutfen seri seciniz',
      selectedVitesValue: '-1',
      selectedVitesLabel: 'Lutfen vites seciniz',
      selectedYilValue: '-1',
      selectedYilLabel: 'Lutfen yil seciniz',
      brandList: [], // Holds Item components
      seriList: [], // Holds Item components
      yilList: [], // Holds Item components
    };
  }

  componentWillMount() {
    this._getBrandItemList();
    this._getBrandSeriItemList(this.state.seriList);
    this._getBrandSeriYilItemList(this.state.yilList);
  }

  componentWillUpdate(nextProps, nextState) {
    if (this.state.selectedBrandValue !== nextState.selectedBrandValue ||
        this.state.selectedSeriValue !== nextState.selectedSeriValue ||
        this.state.selectedVitesValue !== nextState.selectedVitesValue) {

      // console.log('cwu change happens on brand, seri, vites');
      if (nextState.selectedBrandValue !== '-1' &&
          nextState.selectedSeriValue !== '-1' &&
          nextState.selectedVitesValue !== '-1') {

        this.setState({
          isMarkaSeriVitesFilled: true,
        });
        // console.log('cwu, isMarkaSeriVitesFilled - true');

      } else {
        this.setState({
          isMarkaSeriVitesFilled: false,
        });
        // console.log('cwu, isMarkaSeriVitesFilled - false');

      }

    }

  }

  onBrandValueChange (value: string) {
    console.log('onBrandValueChange: ', value);

    fetch('https://otokaca.com/ikinci-el-fiyatlari/GetSeriByMarka', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        markaId: value,
      })
    }).then(responseData => {
      // console.log('response : ', value, responseData.json());
      responseData.json().then( response => {

        console.log('response: ', response);

        this.setState({
          selectedBrandValue : value,
          selectedSeriValue: '-1',
          selectedYilValue: '-1',
          yilList: [],
        });

        this._getBrandSeriItemList(response);
        this._getBrandSeriYilItemList([]); // initialize yilItemList

      });

    }).catch(err => {
      console.log('GetSeriByMarka err: ', err);
    })
  }

  onSeriValueChange( seri: string ) {
    console.log('onSeriValueChange: ', seri);

    fetch('https://otokaca.com/ikinci-el-fiyatlari/GetYilBySeriMarka', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        markaId: this.state.selectedBrandValue,
        seriId: seri,
      })
    }).then(responseData => {
      // console.log('response : ', value, responseData.json());
      responseData.json().then( response => {

        console.log('GetYilBySeriMarka response: ', response);

        this.setState({
          selectedSeriValue: seri,
          selectedYilValue: '-1',
          yilList: [],
        });

        this._getBrandSeriYilItemList(response);

      });

    }).catch(err => {
      console.log('GetYilBySeriMarka err: ', err);
    })

  }

  onVitesValueChange( vites: string ){
    console.log('onVitesValueChange: ', vites);

    if (vites === '1') {
      this.setState({
        selectedVitesValue: vites,
        selectedVitesLabel: 'Manuel',
      });
    }
    else if (vites === '2') {
      this.setState({
        selectedVitesValue: vites,
        selectedVitesLabel: 'Otomatik',
      });
    }
    else {
      this.setState({
        selectedVitesValue: '-1',
        selectedVitesLabel: 'Lutfen vites seciniz',
      });
    }

  }

  onYilValueChange( yil: string ){
    console.log('onYilValueChange: ', yil);

    this.setState({
      selectedYilValue: yil,
    });
  }


  _getBrandItemList() {
    let brandItemList = [];
    let tmpBrandLookup= {}

    // default value
    brandItemList.push(
      <Item label='Lutfen seri seciniz.' value='-1' key='-1'/>
    )

    for (let tmpBrand of brandArr) {
      // console.log('tmpBrand: ', tmpBrand);
      brandItemList.push(
        <Item label={tmpBrand.label} value={tmpBrand.value} key={tmpBrand.value}/>
      );

      tmpBrandLookup[tmpBrand.value] = tmpBrand.label;
    }

    this.setState({
      brandList: brandItemList,
    });
    this._brandLookup = tmpBrandLookup; // llokup for brandId to brand name.
  }

  _getBrandSeriItemList(brandSeriList) {
    let brandSeriItemList = [];
    let tmpSeriLookup = {};

    console.log('_getBrandSeriItemList: ', brandSeriList);

    // default value
    brandSeriItemList.push(
      <Item label='Lutfen seri seciniz.' value='-1' key='-1'/>
    )

    for (let tmpSeri of brandSeriList) {
      brandSeriItemList.push(
        <Item label={tmpSeri.Seri1} value={tmpSeri.ID} key={tmpSeri.ID}/>
      );

      tmpSeriLookup[tmpSeri.ID] = tmpSeri.Seri1;
    }

    this.setState({
      seriList: brandSeriItemList,
    });
    this._seriLookup = tmpSeriLookup;
  }

  _getBrandSeriYilItemList(brandSeriYilList) {
    console.log('_getBrandSeriYilItemList: ', brandSeriYilList);

    let brandSeriYilItemList = [];

    // default value
    brandSeriYilItemList.push(
      <Item label='Lutfen yil seciniz.' value='-1' key='-1'/>
    );

    for (let tmpYil of brandSeriYilList) {
      brandSeriYilItemList.push(
        <Item label={tmpYil.yil.toString()} value={tmpYil.yil.toString()} key={tmpYil.yil.toString()}/>
      )
    }

    this.setState({
      yilList: brandSeriYilItemList,
    });

  }

  _onCheckoutPressed() {

    if (this.state.isMarkaSeriVitesFilled) {

      let tmpOto = {
        marka: this._brandLookup[this.state.selectedBrandValue],
        seri: this._seriLookup[this.state.selectedSeriValue],
        vites: this.state.selectedVitesLabel,
        markaId: this.state.selectedBrandValue,
        seriId: this.state.selectedSeriValue,
        vitesId: this.state.selectedVitesValue,
        yil: this.state.selectedYilValue,
      };
      // console.log('piyasa degeri hazir: ', tmpOto);
      this.props.setOto(tmpOto); // write current oto to redux.
      Actions.piyasaDegeriSonuc();
    }
    else {
      console.log('piyasa degerini gormek icin marka, seri ve vites alanlarini doldurunuz.');
    }

  }


  render() {
    // console.log('marka listesi: ', brandArr);

    const { props: { name, index, list } } = this;

    return (
      <Container style={styles.container}>
        <Header>
          <Left>
            <Button transparent onPress={this.props.openDrawer}>
              <Icon name="ios-menu" />
            </Button>
          </Left>

          <Body>
            <Title>{(name) ? this.props.name : 'Piyasa Degeri'}</Title>
          </Body>

          <Right>
            <Button transparent onPress={() => this._onCheckoutPressed()}>
              { this.state.isMarkaSeriVitesFilled ?
                <Icon ios="ios-checkmark-circle"
                      android="md-checkmark-circle"
                      style={{ color: 'red'}} />
                :
                <Icon ios="ios-checkmark-circle-outline"
                      android="md-checkmark-circle-outline"
                      style={{ color: 'red'}} />
              }
            </Button>
          </Right>
        </Header>

        <Content>

          <Separator bordered>
            <Text>Marka<Text style={{color: 'red'}}>*</Text></Text>
          </Separator>

          <Picker
            supportedOrientations={['portrait']}
            iosHeader="Marka"
            mode="dropdown"
            selectedValue={this.state.selectedBrandValue}
            onValueChange={this.onBrandValueChange.bind(this)}>
            {this.state.brandList}
          </Picker>

          <Separator bordered>
            <Text>Seri<Text style={{color: 'red'}}>*</Text></Text>
          </Separator>

          <Picker
            supportedOrientations={['portrait']}
            iosHeader="Seri"
            mode="dropdown"
            selectedValue={this.state.selectedSeriValue}
            onValueChange={this.onSeriValueChange.bind(this)}>
            {this.state.seriList}
          </Picker>

          <Separator bordered>
            <Text>Vites<Text style={{color: 'red'}}>*</Text></Text>
          </Separator>

          <Picker
            supportedOrientations={['portrait']}
            iosHeader="Seri"
            mode="dropdown"
            selectedValue={this.state.selectedVitesValue}
            onValueChange={this.onVitesValueChange.bind(this)}>
            <Item label='Lutfen vites seciniz.' value='-1' key='-1'/>
            <Item label='Manuel' value='1' key='1'/>
            <Item label='Otomatik' value='2' key='2'/>
          </Picker>

          <Separator bordered>
            <Text>Yil</Text>
          </Separator>

          <Picker
            supportedOrientations={['portrait']}
            iosHeader="Yil"
            mode="dropdown"
            selectedValue={this.state.selectedYilValue}
            onValueChange={this.onYilValueChange.bind(this)}>
            {this.state.yilList}
          </Picker>


        </Content>

      </Container>
    );
  }
}

function bindAction(dispatch) {
  return {
    openDrawer: () => dispatch(openDrawer()),
    setOto: (otoProps) => dispatch(setOto(otoProps)),
  };
}

const mapStateToProps = state => ({
  name: state.user.name,
  index: state.list.selectedIndex,
  list: state.list.list,
});


export default connect(mapStateToProps, bindAction)(PiyasaDegeri);

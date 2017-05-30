
const React = require('react-native');

const { StyleSheet, Dimensions } = React;

const deviceHeight = Dimensions.get('window').height;

export default {
  container: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: '#FFFFFF',
  },

  bg: {
    flex: 1,
    // marginTop: deviceHeight / 1.75,
    paddingTop: 100,
    paddingLeft: 10,
    paddingRight: 10,
    paddingBottom: 30,
    bottom: 0,
  },
	shadow: {
    flex: 1,
		paddingLeft: 10,
    paddingRight: 10,
    marginBottom: 30,
		alignSelf: 'center',
  },
  input: {
    marginBottom: 20,
  },
  btn: {
    marginTop: 20,
    alignSelf: 'center',
  },
};

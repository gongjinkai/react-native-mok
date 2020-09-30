/**
 * Created By hasee on 2020/5/22
 */
import React from 'react'
import { View, Text, StyleSheet, Image, ImageBackground  } from 'react-native'
import px from '../utils/px'
import AsyncStorage from '@react-native-community/async-storage';

class WelcomePage extends React.Component {
    constructor(props) {
        super(props)
    }
    componentDidMount() {
         this.timer = setTimeout(() => {
            this.props.navigation.navigate('Guide')
         }, 3000)
    }

    componentWillUnmount() {
        this.timer&&clearTimeout(this.timer);//同时为真的才执行卸载
    }

    render() {
        return (
            <View style={ styles.container }>
              <Image
                style={ styles.launch }
                source={ require('../../assets/images/launch.png') } />
              <View style={ styles.bottomWrap }>
                <Image style={ styles.logo }
                       source={ require('../../assets/images/launch-logo.png') } />
                <Text style={ styles.text }>Copyright ©2019-2020 Mok</Text>
              </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: '#fff'
  },
  bottomWrap: {
    position: 'absolute',
    bottom: 40,
    alignItems: 'center'
  },
  launch: {
    marginTop: px(35),
    width: px(520),
    height: px(1040)
  },
  logo: {
    marginBottom: px(5),
    width: px(104),
    height: px(104),
  },
  text: {
    color: '#C1C1C1',
    fontSize: 10,
  }
});

export default WelcomePage

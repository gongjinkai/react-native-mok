import React from 'react'
import { View, Text, StyleSheet, Animated, Easing } from 'react-native'


class PageLoading extends React.Component {
  constructor(props) {
    super(props);
    this.spinValue = new Animated.Value(0)
    this.state = {

    }
  }

  componentDidMount() {
    this.spin();
  }

  spin = () => {
    this.spinValue.setValue(0)
    Animated.timing(this.spinValue, {
      toValue: 1, // 最终值 为1，这里表示最大旋转 360度
      duration: 4000,
      easing: Easing.linear
    }).start(() => this.spin())
  }


  render() {
    //映射 0-1的值 映射 成 0 - 360 度
    const spin = this.spinValue.interpolate({
      inputRange: [0, 1],//输入值
      outputRange: ['0deg', '360deg'] //输出值
    });
    return (
      <View style={ styles.flex_page }>
        <Animated.Image
          style={[styles.circle,{transform:[{rotate: spin }]}]}
          source={ require('../../assets/images/loading.gif') } />
        <Text style={{ color: '#909090', fontSize: 16 }}>加载中...</Text>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  flex_page: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  },
  circle: {
    width: 30,
    height: 30
  }
});

export default PageLoading

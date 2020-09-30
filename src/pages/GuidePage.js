import React, { useState  } from 'react'
import { View, Text, Image, StyleSheet, Button } from 'react-native'
import Swiper from 'react-native-swiper'
import px from '../utils/px'

const GuidePage = (props) => {
  const guideDesc = [
    {
      title: '每日记录步数打卡',
      desc: '完成赛季挑战可获得奖金池内大奖',
      uri: require('../../assets/images/guide-one.png')
    },
    {
      title: '天梯排行',
      desc: '最强王者等你来战',
      uri: require('../../assets/images/guide-two.png')
    },
    {
      title: '真实体检报告',
      desc: '为您安排最合适的训练计划',
      uri: require('../../assets/images/guide-three.png')
    }
  ];

  //React hooks
  const [swiperIndex, setIndex] = useState(0);

  const swiperChange = (i) => {
    setIndex(i)
  }

  const goHome = () => {
    props.navigation.navigate('Auth');
  }

  return (
    <View style={ styles.container }>
      <Swiper
        loop={false}
        index={swiperIndex}
        onIndexChanged={ (index) => swiperChange(index) }
        showsPagination={ swiperIndex < 2 }
        activeDot={
          <View style={{
            backgroundColor: '#B8EAFF',
            width: 20,
            height: 8,
            borderRadius: 8,
            marginRight: 6,
        }}/>}>
        {
          guideDesc.map((item,index) => (
            <View style={ styles.item_page } key={index}>
              <Image style={ styles.top_picture } source={ require('../../assets/images/guide-cloud.png') } />
              <View style={ styles.center_info }>
                <Image style={ styles.center_picture } source={ item.uri } />
              </View>
              <View style={ styles.title }>
                <Text style={ styles.lg_text }>{ item.title }</Text>
              </View>
              <View style={ styles.desc }>
                <Text style={ styles.sm_text }>{ item.desc }</Text>
              </View>
              {
                index === 2? <Button title={'立即体验'} onPress={ () => goHome() }></Button> :null
              }
            </View>
          ))
        }
      </Swiper>
    </View>
  )
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  item_page:{
    flex: 1,
  },
  top_picture: {
    width: px(480),
    height: px(300)
  },
  center_info: {
    alignItems: 'center',
  },
  center_picture: {
    width: px(600),
    height: px(750),
  },
  title: {
    marginTop: px(73),
    alignItems: 'center'
  },
  desc: {
    marginTop: px(10),
    alignItems: 'center'
  },
  lg_text: {
    fontSize: 22,
    color: '#00B2FF'
  },
  sm_text: {
    fontSize: 18,
    color: '#636D76'
  }
});


export default GuidePage

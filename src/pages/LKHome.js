// /**
//  * Created By hasee on 2020/5/22
//  */
// import React from 'react'
// import {
//     View,
//     Text,
//     Share,
//     Button
// } from 'react-native'
// import Hyperlink from 'react-native-hyperlink'
// import Toast, { DURATION } from 'react-native-easy-toast'
//
// export default class LKHome extends React.Component {
//     static navigationOptions = ({ navigation }) => {
//       return {
//         headerRight: <Text>扫码</Text>
//       }
//     }
//
//     componentDidMount() {
//         this._navListener = this.props.navigation.addListener('didFocus', () => {
//           this.getData();
//         });
//     }
//
//     componentWillUnmount() {
//         this._navListener.remove();
//     }
//
//     getData() {
//
//     }
//
//     goDetail() {
//        const { navigation } = this.props;
//        navigation.navigate('detail', { id: 1 })
//     }
//
//     shareExample() {
//       Share.share({
//         message: '这个是百度的网址',
//         url: 'https://www.baidu.com',
//         title: '百度'
//       }, {
//         dialogTitle: '分享百度链接到',
//       }).then(result => {
//         console.log(result.action === Share.sharedAction)
//       }).catch((error) => this.setState({result: '错误提示: ' + error.message}));
//     }
//
//     toastShow() {
//       this.refs.toast.show('hello world!',DURATION.LENGTH_LONG)
//     }
//
//     render() {
//         return (
//             <View>
//                 <Text>LKHome</Text>
//                 <Text onPress={ () => this.goDetail() }>详情</Text>
//                 <Text onPress={ () => this.props.navigation.navigate('scanner') }>扫码页面</Text>
//                 <Text onPress={ () => this.props.navigation.navigate('contact') } style={{ fontSize: 20 }}>联系人</Text>
//                 <Button title={'分享'} onPress={ () => this.shareExample() } />
//                 <Hyperlink linkDefault={ true }>
//                   <Text style={ { fontSize: 15, color: 'red', textDecorationLine: 'underline' } }>
//                     This text will be parsed to check for clickable strings like https://github.com/obipawan/hyperlink and made clickable.
//                   </Text>
//                 </Hyperlink>
//                 <Text
//                   style={{ fontSize: 20 }}
//                   onPress={ () => this.props.navigation.navigate('tab') }>跳转Tabs</Text>
//                 <Text style={{ fontSize: 20 }} onPress={ () => this.props.navigation.navigate('load') }>
//                   跳转loading-page
//                 </Text>
//                 <Text onPress={ () => this.toastShow() }>Toast 提示</Text>
//                 <Toast ref="toast" position='center' />
//             </View>
//         )
//     }
// }
//

import React from 'react'
import { connect } from 'react-redux'
import {
  StatusBar,
  View,
  Text,
  StyleSheet,
  Image,
  TouchableHighlight,
  FlatList,
  RefreshControl,
  ScrollView,
  TouchableOpacity
} from 'react-native'
import * as Progress from 'react-native-progress'
import px from '../utils/px'

class HomeScreen extends React.Component {
  static navigationOptions = ({ navigation }) => {
    return {
      headerShown: false,
    }
  };

  constructor(props) {
    super(props);
    this.state = {
      progress: 0.8,
    }
  }

  componentDidMount() {
    this.query();
    //添加statusBar监听
    this._navDidFocusListener = this.props.navigation.addListener('didFocus', () => {
      StatusBar.setBarStyle('light-content');
      StatusBar.setBackgroundColor('#5BC8F7')
    });
  }

  componentWillUnmount() {
    this._navDidFocusListener.remove();
  }

  query() {
    const { dispatch } = this.props;
    dispatch({
      type: 'article/query'
    });
    dispatch({
      type: 'home/query'
    })
  }

  _contentViewScroll(e) {
    let offsetY = e.nativeEvent.contentOffset.y; //滑动距离
    let contentSizeHeight = e.nativeEvent.contentSize.height; //scrollView contentSize高度
    let oriageScrollHeight = e.nativeEvent.layoutMeasurement.height; //scrollView高度
    if (offsetY + oriageScrollHeight >= contentSizeHeight){
      console.log('上传滑动到底部事件')
    }
  }

  goToDetail(item) {
    this.props.navigation.navigate('article', { id: item.id, title: item.title })
  }

  goToActivity(list) {
    const link = list[0].link;
    const title = list[0].title;
    this.props.navigation.navigate('activity', { link, title });
  }

  render() {
    const { article, loading, home } = this.props;
    const { list } = article;
    const { eventSeasonList } = home;
    return (
      <View
        style={ styles.container }>
        <StatusBar backgroundColor={'#5BC8F7'} StatusBarAnimation={'none'} />
        <View style={ styles.header_bar }>
          <Text style={ styles.header_bar_text }>MoK</Text>
          <Image source={ require('../../assets/icons/icon-message.png') }/>
        </View>
        <ScrollView
          refreshControl = {
            <RefreshControl
              title={'加载中...'}
              colors={['red']}//此颜色无效
              tintColor={'orange'}
              titleColor={'red'}//只有ios有效
              refreshing={ loading.effects['home/query'] || loading.effects['home/query']  }
              onRefresh={ ()=>{
                console.log('上拉刷新')
              }}
            />
          }
          onMomentumScrollEnd = {this._contentViewScroll}>
          <TouchableOpacity onPress={ () => this.goToActivity(eventSeasonList) } activeOpacity={1}>
            <Image
              style={{ width: px(750),height:px(376) }}
              source={{ uri: eventSeasonList.length > 0 ? eventSeasonList[0].photo : '' }} />
          </TouchableOpacity>
          <Text style={ styles.title }>今日运动数据</Text>
          <View style={ styles.center_info }>
            <View style={ styles.info_left }>
              <View style={ styles.info_left_item }>
                <View style={ styles.icon_box }>
                  <Image source={ require('../../assets/icons/icon-run.png') } />
                </View>
                <View>
                  <View style={{ flexDirection: 'row', alignItems: 'flex-start', justifyContent: 'flex-start'}}>
                    <Text style={{ fontSize: px(24) }}>今天走了
                      <Text style={{
                        fontSize: px(44),
                        color: '#636D76',
                        fontWeight: 'bold',
                      }}>3.1</Text>
                      <Text style={{ fontSize: px(24) }}>KM</Text>
                    </Text>
                  </View>
                  <Text style={{ fontSize: px(24), color: '#BABFC2' }}>相当于节省了0.37升汽油</Text>
                </View>
              </View>
              <View style={ [styles.info_left_item, { marginTop: px(10) }]}>
                <View style={ styles.icon_box }>
                  <Image source={ require('../../assets/icons/icon-whatshot.png') } />
                </View>
                <View>
                  <View style={{ flexDirection: 'row', alignItems: 'flex-start', justifyContent: 'flex-start'}}>
                    <Text style={{ fontSize: px(24) }}>今天走了
                      <Text style={{
                        fontSize: px(44),
                        color: '#636D76',
                        fontWeight: 'bold',
                      }}>3.1</Text>
                      <Text style={{ fontSize: px(24) }}>KM</Text>
                    </Text>
                  </View>
                  <Text style={{ fontSize: px(24), color: '#BABFC2' }}>相当于节省了0.37升汽油</Text>
                </View>
              </View>
              <View style={ styles.info_operation }>
                <TouchableHighlight style={ styles.center_btn }>
                  <Text style={ styles.center_btn_text }>完成打卡</Text>
                </TouchableHighlight>
              </View>
            </View>
            <View style={ styles.info_right}>
              <Progress.Circle
                size={ px(270) }
                unfilledColor="#d0d0d0"
                color={'7F73F7'}
                thickness={ px(30) }
                borderWidth={ 0 }
                strokeCap={'round'}
                progress={this.state.progress}
                showsText={true}
                formatText={ text => <Text>{ text }</Text> }/>
            </View>
          </View>
          <Text style={[styles.title,{ marginTop: 30 }]}>为你推荐</Text>
          <FlatList
            style={{ marginLeft: px(32), marginRight: px(32), flex: 1 }}
            data={list}
            showsVerticalScrollIndicator = {false}
            onEndReachedThreshold={0.1}
            ListFooterComponent={ ()=> <View style={{ alignItems: 'center',paddingTop: px(20), paddingBottom: px(20) }}><Text>没有更多了</Text></View>  }
            ItemSeparatorComponent={ () => { return (<View style={ styles.line } />) } }
            renderItem={({ item, index, separators }) => (
              <TouchableOpacity style={ styles.list_item } onPress={ () => this.goToDetail(item)} key={index}>
                <View>
                  <Image
                    source={{ uri: item.photo}}
                    style={{
                      width: px(280),
                      height: px(160),
                      borderRadius: 10,
                    }}
                    resizeMode={'cover'} />
                </View>
                <View style={{ marginLeft: px(10) }}>
                  <Text style={{ fontSize: 14 }}>{ item.title }</Text>
                  <Text style={{ fontSize: 10, color: '#BABFC2' }}>{ item.subtitle }</Text>
                </View>
              </TouchableOpacity>
            )} />
        </ScrollView>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff'
  },
  header_bar: {
    paddingLeft: px(44),
    paddingRight: px(32),
    alignItems: 'center',
    justifyContent: 'space-between',
    height: px(88),
    flexDirection: 'row',
    backgroundColor: '#5bc8f7'
  },
  header_bar_text: {
    color: '#fff',
    fontSize: px(44)
  },
  title: {
    marginTop: px(24),
    paddingLeft: px(32),
    fontSize: px(32),
    color: '#636D76',
    fontWeight: 'bold'
  },
  center_info: {
    marginLeft: px(32),
    marginRight: px(32),
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between'
  },
  icon_box: {
    marginRight: px(22),
    alignItems: 'center',
    justifyContent: 'center',
    width: px(64),
    height: px(64),
    backgroundColor: '#636D76',
    borderRadius: 50,
  },
  info_left: {

  },
  info_left_item: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  info_right: {

  },
  info_operation: {
    marginTop: px(28),
    alignItems: 'center'
  },
  center_btn: {
    paddingTop: px(10),
    paddingBottom: px(10),
    paddingLeft: px(70),
    paddingRight: px(70),
    backgroundColor: '#BABFC2',
    borderRadius: 100
  },
  center_btn_text: {
    fontSize: px(26),
    color: '#fff'
  },
  list_item: {
    marginTop: px(20),
    paddingBottom: px(20),
    flexDirection: 'row',
  },
  line: {
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
});

export default connect(({ common, article, home, loading }) => ({ common, article, home, loading }))(HomeScreen)


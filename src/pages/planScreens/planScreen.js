import React from 'react'
import { connect } from 'react-redux'
import {
  View,
  ScrollView,
  Text,
  StatusBar,
  StyleSheet,
  TouchableOpacity,
  Image,
  FlatList,
  RefreshControl
} from 'react-native'
import AntDesign from 'react-native-vector-icons/AntDesign'
import NavigationUtil from '../../navigator/NavigationUtil'

class PlanHomeScreen extends React.Component {
  static navigationOptions = ({ navigation }) => {
    return {
      headerShown: false,
    }
  };

  constructor(props) {
    super(props);
    this.state = {
      pageNum: 1,
      pageSize: 10
    }
  }

  componentDidMount() {
    this.query();
    //添加statusBar监听
    this._navDidFocusListener = this.props.navigation.addListener('didFocus', () => {
      StatusBar.setBarStyle('dark-content');
      StatusBar.setBackgroundColor('#fff')
    });
  }

  componentWillUnmount() {
    this._navDidFocusListener.remove();
  }

  query() {
    this.props.dispatch({
      type: 'plan/query',
      payload: {
        pageNum: this.state.pageNum,
        pageSize: this.state.pageSize,
      }
    })
  }

  goToDetail(item) {
    NavigationUtil.goPage({ ...this.props, id: item.id }, 'Detail')
  }

  render() {
    const { plan, loading } = this.props;
    const { list } = plan;
    return (
      <ScrollView style={ styles.container }>
        <View style={ styles.lg_title }>
          <Text style={ styles.lg_title_text }>训练计划</Text>
        </View>
        <View style={ styles.sm_title }>
          <Text style={ styles.sm_title_text }>请您在保障自身安全情况下，根据自身情况完成相应计划。</Text>
        </View>
        <View style={ styles.plan_list }>
          <FlatList
            data={list}
            renderItem={({ item, index, separators }) => (
              <TouchableOpacity style={ styles.list_item } onPress={ () => this.goToDetail(item)} key={index}>
                <View style={ styles.plan_item }>
                  <Image
                    source={{ uri: item.photo }}
                    style={{
                      height: 150,
                      borderRadius: 5,
                    }}
                    resizeMode={'cover'} />
                  <View style={ styles.bg_abs } />
                  <View style={ styles.abs_info }>
                    { item.state !== 0 ? <AntDesign name={'lock'}/> : null }
                    <Text style={ styles.lg_text }>{ item.title }</Text>
                    <Text style={ styles.plan_info }>Day{index + 1}·{item.minute}分钟</Text>
                  </View>
                </View>
              </TouchableOpacity>
            )}
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
            } />
        </View>
      </ScrollView>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  lg_title: {
    paddingTop: 10,
    paddingBottom: 10,
    paddingLeft: 16,
    backgroundColor: '#fff'
  },
  lg_title_text: {
    color: '#636D76',
    fontSize: 18,
  },
  sm_title: {
    marginTop: 0,
    marginBottom: 13,
    paddingLeft: 16,
  },
  sm_title_text: {
    fontSize: 13,
    color: '#636D76'
  },
  plan_list: {
    marginLeft: 16,
    marginRight: 16,
  },
  plan_item: {
    marginBottom: 20,
  },
  abs_info: {
    position: 'absolute',
    bottom: 9,
    left: 12,
  },
  lg_text: {
    fontSize: 28,
    color: '#fff',
    fontWeight: 'bold'
  },
  plan_info: {
    fontSize: 12,
    color: '#DEDEDE'
  },
  bg_abs: {
    position: 'absolute',
    height: 150,
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0,0,0,.25)'
  }
});

export default connect(({ plan, loading }) => ({ plan, loading }))(PlanHomeScreen)

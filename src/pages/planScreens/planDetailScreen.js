import React from 'react'
import { connect } from 'react-redux'
import {View, Text, StyleSheet, Image, TouchableOpacity, ScrollView, StatusBar} from 'react-native'
import Spinner from 'react-native-loading-spinner-overlay'
import MoviePlayer from '../../components/moviePlayer'
import NavigationUtil from "../../navigator/NavigationUtil";

class PlanDetailScreen extends React.Component {
  static navigationOptions = ({ navigation }) => {
    return {
      headerShown: false,
    }
  };

  constructor(props) {
    super(props);
    this.state = {
      detail: {},
    }
  }

  componentDidMount() {
    this.query();
    //监听页面显示隐藏处理StatusBar
    this._navDidFocusListener = this.props.navigation.addListener('didFocus', () => {
      StatusBar.setTranslucent(true)
    });
    this._navDidBlurListener = this.props.navigation.addListener('didBlur', () => {
      StatusBar.setTranslucent(false)
    });
  }

  componentWillUnmount() {
    this._navDidFocusListener.remove();
    this._navDidBlurListener.remove();
  }

  query() {
    this.props.dispatch({
      type: 'plan/queryDetail',
      payload: this.props.navigation.state.params
    })
  }

  goPage(path) {
    NavigationUtil.goPage(this.props, path);
  }

  render() {
    const { plan, loading } = this.props;
    const { detail } = plan;
    return (
      <View style={ styles.container }>
        <ScrollView style={ styles.content }>
          <Image style={ styles.cover_picture } source={{ uri: detail.busPlan ? detail.busPlan.photo : '' }}/>
          <View style={ styles.info_card }>
            <View>
              <Text style={ styles.lg_text }>{ detail.busPlan ? detail.busPlan.title : '' }</Text>
            </View>
            <View style={ styles.line_text }>
              <View style={ styles.arrow_left }>
                <Text style={ styles.n_font }>{ detail.busPlan ? detail.busPlan.heat + '千卡': ''}</Text>
                <Text style={ styles.c_font }>{ detail.busPlan ? detail.busPlan.minute + '分钟(请合理规划您的时间)':''}</Text>
                <Text style={ styles.c_font }>{ detail.busPlan ? detail.busPlan.number + '人完成': ''}</Text>
              </View>
            </View>
            <View style={ styles.tip_content }>
              <Text style={ styles.tip_title }>注意事项:</Text>
              <Text style={ styles.tip_text }>1.开始训练前，不要吃太多东西否则训练中可能会引起腹部不适若训练过程中出现剧烈疼痛，请停止训练。</Text>
              <Text style={ styles.tip_text }>2.老年人（年龄大于60岁）、孕妇、残疾人士，患有骨科伤病及心血管，肺部等疾病的人群不可参加。</Text>
              <Text style={ styles.tip_text }>3.健身任务开启后不可中断，若中断时长超过1分钟可能会产生扣分。</Text>
              <Text style={ styles.tip_text }>4.本次运动后会初步获取相应运动得分，累积排名最高着可获得最终大奖。</Text>
              <Text style={ styles.tip_text }>5.开启任务后可重新挑战1次，重新挑战后前次成绩自动作废。</Text>
              <Text style={ styles.tip_text }>6.过程中不可有任何作弊行为，一经发现立刻取消资格。</Text>
            </View>
            <View style={{ marginBottom: 20 }}>
              <MoviePlayer url={ detail.busPlan ? detail.busPlan.video : '' } title={ detail.busPlan ? detail.busPlan.title : '' } />
            </View>
          </View>
          <Spinner
            visible={ loading.effects['plan/queryDetail'] }
            textContent={'数据加载中...'}
            textStyle={styles.spinnerTextStyle}
          />
        </ScrollView>
        <View>
          <TouchableOpacity style={ styles.fixed_button } onPress={ () => this.goPage('PlanRunning') }>
            <Text style={ styles.fixed_button_text }>开始训练(1/2)</Text>
          </TouchableOpacity>
        </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  content: {

  },
  cover_picture: {
    height: 215,
  },
  info_card: {
    marginTop: 17,
    marginLeft: 16,
    marginRight: 16,
  },
  lg_text: {
    color: '#636D76',
    fontSize: 22,
  },
  line_text: {
    marginTop: 6,
    justifyContent: 'space-between'
  },
  arrow_left: {
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  n_font: {
    color: '#636D76',
  },
  c_font: {
    color: '#c1c1c1'
  },
  tip_content: {
    marginTop: 13,
    paddingBottom: 15,
    borderBottomWidth: 2,
    borderBottomColor: '#EEEEEE'
  },
  tip_title: {
    marginBottom: 5,
    fontSize: 16,
    color: '#636d76'
  },
  tip_text: {
    color: '#636d76',
    fontSize: 13,
    letterSpacing: 1,
  },
  video: {
    height: 400,
    width: 300,
  },
  fixed_button: {
    height: 50,
    backgroundColor: '#5BC8F7',
    alignItems: 'center',
    justifyContent: 'center'
  },
  fixed_button_text: {
    color: '#fff',
    fontSize: 18,
  }
});


export default connect(({ plan, loading }) => ({ plan, loading }))(PlanDetailScreen)

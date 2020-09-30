import React from 'react'
import { connect } from 'react-redux'
import { View, Text, StyleSheet } from 'react-native'
import Spinner from 'react-native-loading-spinner-overlay'
import CustomHeader from "../../components/CustomHeader";
import NavigationUtil from "../../navigator/NavigationUtil";

class NoticeDetail extends React.Component {
  static navigationOptions = ({ navigation }) => {
    return {
      header: (
        <CustomHeader
          barStyle={'dark'}
          backgroundColor={'#fff'}
          title={ navigation.state.params.title }
          goBack={ () => NavigationUtil.goBack(navigation) }/>
      )
    }
  }

  componentDidMount() {
    const { navigation } = this.props;
    const _id = navigation.state.params.id;
    this.props.dispatch({
      type: 'notice/queryDetail',
      payload: {
        id: _id,
      }
    })
  }

  render() {
    const { notice, loading } = this.props;
    const { noticeDetail } = notice;
    return (
      <View style={ styles.container }>
        <View style={ styles.content }>
          <Text style={ styles.text }>{ noticeDetail.remindContent }</Text>
        </View>
        <Spinner
          visible={ loading.effects['notice/queryDetail'] }
          textContent={'数据加载中...'}
          textStyle={styles.spinnerTextStyle}
        />
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8F8FA'
  },
  content: {
    paddingTop: 18,
    paddingLeft: 16,
    paddingRight: 16
  },
  text: {
    fontSize: 13,
    color: '#636D76'
  }
});


export default connect(({ notice, loading }) => ({ notice, loading }))(NoticeDetail)

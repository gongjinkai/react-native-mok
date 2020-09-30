import React from 'react'
import { connect } from 'react-redux'
import { View, StatusBar, Text } from 'react-native'
import WebView from 'react-native-webview'
import CustomHeader from '../components/CustomHeader'

class ArticleScreen extends React.Component {

  static navigationOptions = ({ navigation }) => {
    return {
      header: (
        <CustomHeader
          barStyle={'dark'}
          backgroundColor={'#fff'}
          title={ navigation.state.params.title }
          goBack={ () => navigation.goBack() }/>
      )
    }
  };

  componentDidMount() {
    this.query(this.props.navigation.state.params);
    //添加statusBar监听
    this._navDidFocusListener = this.props.navigation.addListener('didFocus', () => {
      StatusBar.setBarStyle('dark-content');
      StatusBar.setBackgroundColor('#fff');
    });
  }

  componentWillUnmount() {
    this._navDidFocusListener.remove();
  }

  query(params) {
    this.props.dispatch({
      type: 'article/queryDetail',
      payload: params,
    })
  }

  goBack() {
    this.props.navigation.goBack();
  }

  render() {
    const { article } = this.props;
    const { content } = article;
    return (
      <View style={{ flex: 1 }}>
        <WebView
          originWhitelist={['*']}
          source={{ html: `<meta name="viewport" content="width=device-width,height=device-height,initial-scale=1.0, minimum-scale=1.0, maximum-scale=1.0, user-scalable=no"><head><style>img{max-width: 100%; !important;height:auto !important}p{margin-top:0 !important;margin-bottom:0 !important;}</style></head><body style='margin:20px;padding:0'><html><body>${content}</body></html>` }}
        />
      </View>
    )
  }
}

export default connect(({ article, loading }) => ({ article, loading }))(ArticleScreen)

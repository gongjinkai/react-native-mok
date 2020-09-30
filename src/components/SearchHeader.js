import React from 'react'
import {View, Text, TextInput, Image, StyleSheet, TouchableOpacity} from 'react-native'

class SearchHeader extends React.Component {
  render() {
    return (
      <View style={ styles.search_bar }>
        <TouchableOpacity
          style={ styles.icon_back }
          onPress={ () => this.props.goBack() }>
          <Image source={ this.props.barStyle === 'dark' ? require('../../assets/icons/icon-back_dark.png'): require('../../assets/icons/icon-back_light.png') }/>
        </TouchableOpacity>
        <View style={ styles.search_input }>
          <Image source={ require('../../assets/icons/icon-baseline-search.png') }/>
          <TextInput
            clearButtonMode={true}
            style={ styles.text_input }
            placeholder={'请输入你想要搜索的内容'}
          />
        </View>
        <Text style={{ marginLeft: 8 }}>取消</Text>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  search_bar: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingLeft: 16,
    paddingRight: 16,
    paddingTop: 7,
    paddingBottom: 7,
    backgroundColor: '#FFF'
  },
  search_input: {
    paddingTop: 0,
    paddingBottom: 0,
    paddingLeft: 12,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F7F8FA',
    flex: 2,
    borderRadius: 30
  },
  text_input: {
    height: 36,
    alignItems: 'center',
    justifyContent: 'center'
  }
});

export default SearchHeader

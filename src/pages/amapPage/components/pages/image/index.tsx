import React from 'react'
import { View, Text, Image } from '@tarojs/components'

import nervLogo from './nerv_logo.png'

import Header from '../../components/head/head'
import "./index.scss";

export default class PageView extends React.Component {
  render() {
    return (
      <View className='components-page'>
        <View className='components-page__header'>
          <Header title='Image'></Header>
        </View>
        <View className='components-page__body'>
          <View className='components-page__body-example example'>
            <View className='example-header'>
              Local Image
            </View>
            <View className='example-body'>
              <Image
                style='width: 300px;height: 300px;'
                src={nervLogo} ></Image>
            </View>
          </View>
          <View className='components-page__body-example example'>
            <View className='example-header'>
              Internet Image
            </View>
            <View className='example-body'>
              <Image
                style='width: 300px;height: 300px;'
                src='https://amap.agreechina.com/dist/logo_small.png' ></Image>
            </View>
          </View>
        </View>
      </View>
    )
  }
}

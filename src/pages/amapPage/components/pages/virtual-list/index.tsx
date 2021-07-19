import React from 'react';
import {View, Text, Button} from '@tarojs/components';
import Taro from '@tarojs/taro';
import VirtualList from '@tarojs/components/virtual-list';
import Header from '../../components/head/head';
import "./index.scss";

function buildData(offset = 0) {
  return Array(10)
    .fill(0)
    .map((_, i) => i + offset);
}

const Row = React.memo(({id, index, style, data}) => {
  return (
    <View
      id={id}
      className={index % 2 ? 'ListItemOdd' : 'ListItemEven'}
      style={style}>
      Row {index} : {data[index]}
    </View>
  );
});

export default class VirtualListView extends React.Component {
  state = {
    data: buildData(0),
  };

  loading = false;

  listReachBottom() {
    Taro.showLoading();
    // 如果 loading 与视图相关，那它就应该放在 `this.state` 里
    // 我们这里使用的是一个同步的 API 调用 loading，所以不需要
    this.loading = true;
    setTimeout(() => {
      const {data} = this.state;
      this.setState(
        {
          data: data.concat(buildData(data.length)),
        },
        () => {
          this.loading = false;
          Taro.hideLoading();
        },
      );
    }, 1000);
  }

  onScrollNative = (e) => {
    console.log(e);
  };

  render() {
    const {data} = this.state;
    const dataLen = data.length;
    const itemSize = 100;
    return (
      <View className="components-page">
        <View className="components-page__header">
          <Header title="VirtualList"></Header>
        </View>
        <VirtualList
          height={500}
          ref={this.$ref}
          width="100%"
          itemData={data}
          itemCount={dataLen}
          itemSize={itemSize}
          onScrollNative={this.onScrollNative}
          onScroll={this.onScroll}
          overscanCount={1}
          overscanCount={1}
          scrollWithAnimation>
          {Row}
        </VirtualList>
      </View>
    );
  }
}

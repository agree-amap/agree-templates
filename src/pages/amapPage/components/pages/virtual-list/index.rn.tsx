import React, {Component} from 'react';
import {View, Text, VirtualList} from '@tarojs/components';
import Taro from '@tarojs/taro';

import Header from '../../components/head/head';


import './index.scss';

function buildData(offset = 0) {
  return Array(100)
    .fill(0)
    .map((_, i) => i + offset);
}

const Row = React.memo(({index, style, data}) => {
  return (
    <View className={index % 2 ? 'ListItemOdd' : 'ListItemEven'} style={style}>
      Row {index}
    </View>
  );
});
export default class Index extends Component {
  state = {
    data: buildData(0),
  };

  $ref = React.createRef();
  componentDidMount() {
    setTimeout(() => {
      this.$ref.current.scrollTo({offset: 200});
    }, 3000);
  }

  loading = false;

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

  onScroll = (data) => {
    console.log(data);
  };

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
          onScrollNative={({scrollDirection, scrollOffset}) => {
            if (
              // 避免重复加载数据
              !this.loading &&
              // 只有往前滚动我们才触发
              scrollDirection === 'forward' &&
              // 5 = (列表高度 / 单项列表高度)
              // 100 = 滚动提前加载量，可根据样式情况调整
              scrollOffset > (dataLen - 10) * itemSize + 100
            ) {
              this.listReachBottom();
            }
          }}>
          {Row}
        </VirtualList>
      </View>
    );
  }
}

import Taro, { getCurrentInstance } from "@tarojs/taro";
import React, { Component } from "react";
import { View, Image, Text, ScrollView } from "@tarojs/components";
import logo from "../asset/component/logo.png";
import viewPng from "../asset/component/view.png";
import contentPng from "../asset/component/content.png";
import formPng from "../asset/component/form.png";
import layoutPng  from "../asset/component/form.png";
import navPng from "../asset/component/nav.png";
import mediaPng from "../asset/component/media.png";
import mapPng from "../asset/component/map.png";
import canvasPng from "../asset/component/canvas.png";
import "./index.scss";

const PNGS = {
  viewPng,
  contentPng,
  formPng,
  layoutPng,
  navPng,
  mediaPng,
  mapPng,
  canvasPng
};

export default class Index extends Component<never, any> {
  constructor(props: never) {
    super(props);
    this.state = {
      list: [
        {
          id: "view",
          name: "基础视图容器",
          open: false,
          pages: [
            "view",
            "scroll-view",
            "swiper",
            "movable-view",
            "image"
          ]
        },
        {
          id: "content",
          name: "基础组件内容",
          open: false,
          pages: ["text", "icon", "progress", "rich-text"]
        },
        {
          id: "form",
          name: "表单组件",
          open: false,
          pages: [
            "button",
            "checkbox",
            "form",
            "input",
            "label",
            "picker",
            "picker-view",
            "radio",
            "slider",
            "switch",
            "textarea"
          ]
        },
         {
          id: "layout",
          name: "布局组件",
          open: false,
          pages: [
            "grid",
            "virtual-list"
          ]
        }
      ]
    };
  }

  kindToggle = (id: string) => () => {
    const list = this.state.list;
    for (var i = 0, len = list.length; i < len; ++i) {
      if (list[i].id == id) {
        list[i].open = !list[i].open;
      } else {
        list[i].open = false;
      }
    }
    this.setState({
      list: list
    });
  };

  goToComponent = (page: { url: string }) => {
    Taro.navigateTo({
      url: page.url
    });
  };

  render() {
    return (
      <ScrollView className="index" enableBackToTop>
        <View className="index-hd">
          <Image className="index-logo" src={logo} />
          <View className="index-desc">
            <Text className="index-desc_text">
              以下将展示AMAP基础组件能力，组件样式仅供参考，开发者可根据自身需求自定义组件样式。
            </Text>
          </View>
        </View>
        <View className="index-bd">
          <View className="kind-list">
            {this.state.list
              .map(item => {
                item.hdClass =
                  "kind-list-item-hd " +
                  (item.open ? "kind-list-item-hd-show" : "");
                item.bdClass =
                  "kind-list-item-bd " +
                  (item.open ? "kind-list-item-bd-show" : "");
                item.boxClass =
                  "navigator-box " + (item.open ? "navigator-box-show" : "");
                item.imgSrc = PNGS[`${item.id}Png`];
                item._pages = item.pages.map(page => {
                  return {
                    page: page,
                    url: `/pages/amapPage/components/pages/${page}/index`
                  };
                });
                return item;
              })
              .map((item, index) => {
                return (
                  <View className="kind-list-item" key={index}>
                    <View
                      className={item.hdClass}
                      onClick={this.kindToggle(item.id)}
                    >
                      <View className="kind-list-text">
                        <Text>{item.name}</Text>
                      </View>
                      <Image className="kind-list-img" src={item.imgSrc} />
                    </View>
                    <View className={item.bdClass}>
                      <View className={item.boxClass}>
                        {item._pages.map((page, index) => {
                          return (
                            <View
                              onClick={this.goToComponent.bind(this, page)}
                              key={index}
                              className="navigator"
                            >
                              <Text className="navigator-text">
                                {page.page}
                              </Text>
                              <View className="navigator-arrow" />
                            </View>
                          );
                        })}
                      </View>
                    </View>
                  </View>
                );
              })}
          </View>
        </View>
      </ScrollView>
    );
  }
}

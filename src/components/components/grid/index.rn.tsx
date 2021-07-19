import classNames from "classnames";
import _chunk from "lodash/chunk";
import PropTypes, { InferProps } from "prop-types";
import React from "react";
import { Image, Text, View } from "@tarojs/components";
import { CommonEvent } from "@tarojs/components/types/common";
import { AtGridItem, AtGridProps } from "../types/grid";
import "./index.scss";

export default class AtGrid extends React.Component<AtGridProps> {
  public static defaultProps: AtGridProps;
  public static propTypes: InferProps<AtGridProps>;

  private handleClick = (
    item: AtGridItem,
    index: number,
    row: number,
    event: CommonEvent
  ): void => {
    const { onClick, columnNum = 3 } = this.props;
    if (typeof onClick === "function") {
      const clickIndex = row * columnNum + index;
      onClick(item, clickIndex, event);
    }
  };

  public render(): JSX.Element | null {
    const { data, mode, columnNum = 3, hasBorder } = this.props;

    if (Array.isArray(data) && data.length === 0) {
      return null;
    }

    const gridGroup = _chunk(data, columnNum);

    return (
      <View className="at-grid">
        {gridGroup.map((item, i) => (
          <View className="example-body" key={`at-grid-group-${i}`}>
            <View className="example-body__list">
              {item.map((childItem, index) => (
                <View
                  key={`at-grid-item-${index}`}
                  className=".at-grid-item-rect"
                  onClick={this.handleClick.bind(this, childItem, index, i)}
                  style={[
                    {
                      justifyContent: "center",
                      alignItems: "center",
                      width: "33%",
                      borderColor: "#B2B2B2",
                      borderWidth: hasBorder ? 0.5 : 0.1,
                    },

                    mode == "square"
                      ? {
                          height: 100,
                        }
                      : {
                          flexDirection: "row",
                          height: 50,
                        },
                  ]}
                >
                  {mode == "square" ? (
                      <Image
                        className="content-inner__img"
                        src={childItem.image}
                        mode="scaleToFill"
                      />
                    ) : (
                      <Image
                        className="content-inner__img2"
                        src={childItem.image}
                        mode="scaleToFill"
                      />
                    )}
                  <Text className="content-inner__text">{childItem.value}</Text>
                </View>
              ))}
            </View>
          </View>
        ))}
      </View>
    );
  }
}

AtGrid.defaultProps = {
  data: [],
  columnNum: 3,
  mode: "square",
  hasBorder: true,
};

AtGrid.propTypes = {
  mode: PropTypes.string,
  onClick: PropTypes.func,
  hasBorder: PropTypes.bool,
  columnNum: PropTypes.number,
  data: PropTypes.arrayOf(
    PropTypes.shape({
      image: PropTypes.string,
      value: PropTypes.string,
      iconInfo: PropTypes.shape({
        size: PropTypes.number,
        value: PropTypes.string,
        color: PropTypes.string,
        prefixClass: PropTypes.string,
        customStyle: PropTypes.oneOfType([PropTypes.object, PropTypes.string]),
        className: PropTypes.oneOfType([PropTypes.array, PropTypes.string]),
      }),
    })
  ),
};

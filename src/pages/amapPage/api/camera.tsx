import React, { useState } from "react";
import Taro from '@tarojs/taro'

import {
    Button,
    View,
    Image,
    Text
} from '@tarojs/components'
import { AMAPSDK } from './AmapJSAPI'


export default () => {

    const [image, setImage] = useState('')

    return (
        <View>
            <Button
                type="primary"
                onClick={()=>{
                  AMAPSDK.chooseImage({
                    count:1,
                    sourceType:'picture'
                  },(success)=>{
                    console.warn(success)
                  })
                }
              }
               >chooseImage</Button>

        </View>
    )
}

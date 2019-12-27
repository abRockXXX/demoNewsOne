import React, { Component } from 'react'
import { WebView } from 'react-native-webview';
import { Actions } from 'react-native-router-flux';
import { View } from 'react-native'
import { Feather, AntDesign, Entypo } from "@expo/vector-icons";
import Colors from '../constant/color'


class WebViewCom extends React.Component {
    constructor(props) {
        super(props)
        this.state = {

        }
    }
    onBackPress = () => {
        Actions.pop()
    }


    render() {
        console.log(this.props.data)
        return (
            <View style={{ width: "100%", height: "100%" }}>
                <View style={{ width: "100%", height: 70, backgroundColor: "gray", padding: 10 }}>
                    <View style={{ alignSelf: "flex-start", paddingTop: 25, paddingLeft: 10, width: 60 }}>
                        {/* <FAB
                        style={{ backgroundColor: "blue" }}
                        small
                        icon="arrow-left"
                        onPress={() => console.log('Pressed')}
                    /> */}
                        <AntDesign onPress={() => this.onBackPress()} name="arrowleft" size={22} color={Colors.accent} />

                    </View>
                </View>
                <WebView source={{ uri: `${this.props.data}` }} style={{ margin: 20 }} />
            </View>
        )
    }
}

export default WebViewCom


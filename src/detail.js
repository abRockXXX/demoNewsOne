import React from 'react'
import { View, Text, Image, StyleSheet, ActivityIndicator } from 'react-native'
import { Feather, AntDesign, Entypo } from "@expo/vector-icons";
import { Card, Paragraph, Subheading, Caption, FAB, Button } from "react-native-paper";
import Colors from './constant/color'
import { WebView } from 'react-native-webview';
import { Actions } from 'react-native-router-flux';

class Detail extends React.Component {
    constructor(props) {
        super(props)
        this.state = {

        }
    }

    onBackPress = () => {
        Actions.pop()//BACK NAVIGATE
    }
    readMorePress = () => {
        Actions.wvcom(this.props.url)//NAVIGATE
    }
    render() {
        return (
            <View >
                <View style={{ width: "100%", height: 70, backgroundColor: "gray", padding: 10 }}>
                    <View style={{ alignSelf: "flex-start", paddingTop: 25, paddingLeft: 10, width: 60 }}>
                        <AntDesign onPress={() => this.onBackPress()} name="arrowleft" size={22} color={Colors.accent} />
                    </View>
                </View>
                <Card style={[styles.mainContainer, { padding: 10, margin: 10, }]}>
                    <Card.Cover
                        style={styles.map}
                        source={{
                            uri: this.props.urlToImage
                        }}
                    />
                    <View style={styles.container}>
                        <View style={styles.header}>
                            <Text style={styles.title}>{this.props.title}</Text>
                        </View>
                        <Caption>{new Date(`${this.props.publishedAt}`).toLocaleString()}</Caption>
                        <View style={styles.header}>
                            <Caption>
                                <Feather name="map-pin" size={18} color={Colors.accent} />
                                {this.props.source.name}
                            </Caption>
                            <Caption>
                                <AntDesign name="user" size={18} color={Colors.accent} />
                                {this.props.author}
                            </Caption>
                        </View>
                        <View>
                            <Paragraph>{this.props.content.split("").slice(0, -13).join("")}</Paragraph>
                        </View>
                    </View>
                    <Button icon="read" mode="contained" onPress={() => this.readMorePress()}>
                        Read Full Artical
                    </Button>
                </Card>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        padding: 15,
        margin: 10
    },
    header: {
        flexDirection: "row",
        justifyContent: "space-between",
        marginBottom: 6
    },
    title: {
        fontSize: 15,
        fontWeight: "600",
        color: Colors.primary
    },
    liteText: {
        color: Colors.liteGrey
    }
});

export default Detail;
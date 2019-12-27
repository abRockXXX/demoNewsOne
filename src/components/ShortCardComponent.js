import React from "react";
import { View, Text, StyleSheet, TouchableOpacity, Image } from "react-native";
import { Feather, AntDesign } from "@expo/vector-icons";
import { Card, Paragraph } from "react-native-paper";
import { Actions } from 'react-native-router-flux';
//import SosDetailsScreen from '../screens/SosDetailsScreen'
import Colors from '../constant/color'

const CardComponent = props => {
  onSosClick = (data) => {
    Actions.detail(data)//NAVIGATE
  }


  return (
    <TouchableOpacity
     onPress={() => onSosClick(props.fullData)}
    >
      <Card style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.title}>{props.title}</Text>
        </View>
        <Text style={[styles.liteText, { paddingBottom: 5 }]}>{props.publishedAt}</Text>
        <View style={styles.header}>
          <Text style={styles.liteText}>
            <Feather name="map-pin" size={18} color={Colors.accent} />
            {props.source.name}
          </Text>
          <Text style={styles.liteText}>
            <AntDesign name="user" size={18} color={Colors.accent} />
            {props.author}
          </Text>
        </View>
        <View>
          <Image
            style={{ width: "100%", height: 200,borderRadius:10 }}
            source={{ uri: props.urlToImage }}
          />
        </View>
        <View>
          <Paragraph>{props.description === undefined||props.description === null ? null : props.description.substring(0, 150)}</Paragraph>
        </View>
      </Card>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 15,
    margin: 10,
   // backgroundColor:"gray"
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

export default CardComponent;

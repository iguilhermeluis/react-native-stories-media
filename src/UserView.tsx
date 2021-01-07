/* eslint-disable */
import React, { memo } from "react";
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";

type Props = {
  onClosePress: () => void;
  profile: string;
  name: string;
  datePublication: string;
};

const diffDateWithNow = (date) => {
  let startDate = new Date(date);
  // Do your operations
  let endDate = new Date();
  let seconds = (endDate.getTime() - startDate.getTime()) / 1000;
  let minutes = seconds / 60;
  let hours = minutes / 60;
  let days = hours / 24;
  let current: string;
  if (days >= 1) {
    current = days == 1 ? "dia" : "dias";
    return Math.trunc(days) + " " + current;
  } else if (hours > 1) {
    current = days == 1 ? "hora" : "horas";
    return Math.trunc(hours) + " " + current;
  } else {
    current = minutes == 1 ? "minuto" : "minutos";
    return Math.trunc(hours) + " " + current;
  }
};

export default memo(function UserView(props: Props) {
  return (
    <View style={styles.userView}>
      <Image source={{ uri: props.profile }} style={styles.image} />
      <View style={{ flex: 1 }}>
        <View style={styles.barUsername}>
          <Text style={styles.name}>{props.name}</Text>
          <Image
            source={require("./imgs/verify_icon.png")}
            style={styles.verifyIcon}
          />
        </View>

        <Text style={styles.time}>
          {!!props.datePublication &&
            `Publicado há ${diffDateWithNow(props.datePublication)}`}
        </Text>
      </View>
      <TouchableOpacity onPress={props.onClosePress}>
        <Icon name="close" color="white" size={25} style={{ marginRight: 8 }} />
      </TouchableOpacity>
    </View>
  );
});

const styles = StyleSheet.create({
  barUsername: {
    flexDirection: "row",
    alignItems: "center",
  },
  image: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginLeft: 8,
  },
  verifyIcon: {
    width: 20,
    height: 20,
    marginLeft: 20,
  },
  userView: {
    flexDirection: "row",
    position: "absolute",
    top: 55,
    width: "98%",
    alignItems: "center",
  },
  name: {
    fontSize: 18,
    fontWeight: "500",
    marginLeft: 12,
    color: "white",
  },
  time: {
    fontSize: 12,
    fontWeight: "400",
    marginTop: 3,
    marginLeft: 12,
    color: "white",
  },
});

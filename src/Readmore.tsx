import React, { memo } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";

type Props = {
  onReadMore: () => void;
  title: string;
};

export default memo(function Readmore({ onReadMore, title }: Props) {
  return (
    <TouchableOpacity onPress={onReadMore} style={styles.readMoreWrapper}>
      <View style={styles.readMore}>
        <Icon name="chevron-up" size={20} color="white" />
      </View>
      <Text style={styles.readText}>{title ? title : "Read more"}</Text>
    </TouchableOpacity>
  );
});

const styles = StyleSheet.create({
  readMore: {
    width: 30,
    height: 30,
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center",
    borderColor: "white",
    borderWidth: 2,
  },
  readText: {
    fontSize: 14,
    fontWeight: "500",
    color: "white",
  },
  readMoreWrapper: {
    position: "absolute",
    bottom: 25,
    width: "98%",
    justifyContent: "space-between",
    alignItems: "center",
  },
});

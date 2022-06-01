import React, { useRef, useState, useEffect } from "react";
import {
  FlatList,
  Image,
  Modal,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { StoryType } from "./src";

const { CubeNavigationHorizontal } = require("react-native-3dcube-navigation");

import StoryContainer from "./src/StoryContainer";

type Props = {
  data: StoryType[];
  containerAvatarStyle?: StyleSheet.Styles;
  avatarStyle?: StyleSheet.Styles;
  titleStyle?: StyleSheet.Styles;
  textReadMore?: string;
  defaultStory?: number;
  onClosePress?: () => void;
};

const Stories = (props: Props) => {
  const hasDefaultStory =
    typeof props.defaultStory === "number" &&
    Number(props.defaultStory) < props.data.length - 1;
  const [isModelOpen, setModel] = useState(hasDefaultStory); // defaultStory ? true : false);
  const [currentUserIndex, setCurrentUserIndex] = useState(
    hasDefaultStory ? Number(props.defaultStory) : 0
  );
  const [currentScrollValue, setCurrentScrollValue] = useState(0);
  const modalScroll = useRef(null);

  const onStorySelect = (index) => {
    setCurrentUserIndex(index);
    setModel(true);
  };

  const onStoryClose = () => {
    setModel(false);
    if (typeof props.onClosePress === "function") {
      props.onClosePress();
    }
  };

  const onStoryNext = (isScroll: boolean) => {
    const newIndex = currentUserIndex + 1;
    if (props.data.length - 1 > currentUserIndex) {
      setCurrentUserIndex(newIndex);
      if (!isScroll) {
        //erro aqui
        try {
          modalScroll.current.scrollTo(newIndex, true);
        } catch (e) {
          console.warn("error=>", e);
        }
      }
    } else {
      setModel(false);
    }
  };

  const onStoryPrevious = (isScroll: boolean) => {
    const newIndex = currentUserIndex - 1;
    if (currentUserIndex > 0) {
      setCurrentUserIndex(newIndex);
      if (!isScroll) {
        modalScroll.current.scrollTo(newIndex, true);
      }
    }
  };

  const onScrollChange = (scrollValue) => {
    if (currentScrollValue > scrollValue) {
      onStoryNext(true);
      setCurrentScrollValue(scrollValue);
    }
    if (currentScrollValue < scrollValue) {
      onStoryPrevious(false);
      setCurrentScrollValue(scrollValue);
    }
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={props.data}
        horizontal
        keyExtractor={(item) => item.title}
        renderItem={({ item, index }) => (
          <View style={styles.boxStory}>
            <TouchableOpacity onPress={() => onStorySelect(index)}>
              <View style={[styles.superCircle, props.containerAvatarStyle]}>
                <Image
                  style={[styles.circle, props.avatarStyle]}
                  source={{ uri: item.profile }}
                />
              </View>

              <Text style={[styles.title, props.titleStyle]}>{item.title}</Text>
            </TouchableOpacity>
          </View>
        )}
      />

      <Modal
        animationType="slide"
        transparent={false}
        visible={isModelOpen}
        style={styles.modal}
        onShow={() => {
          if (currentUserIndex > 0) {
            modalScroll.current.scrollTo(currentUserIndex, false);
          }
        }}
        onRequestClose={onStoryClose}
      >
        <CubeNavigationHorizontal
          callBackAfterSwipe={(g) => onScrollChange(g)}
          ref={modalScroll}
          style={styles.container}
        >
          {props.data.map((item, index) => (
            <StoryContainer
              key={item.title}
              onClose={onStoryClose}
              onStoryNext={onStoryNext}
              onStoryPrevious={onStoryPrevious}
              dataStories={item}
              isNewStory={index !== currentUserIndex}
              textReadMore={props.textReadMore}
            />
          ))}
        </CubeNavigationHorizontal>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  boxStory: {
    marginLeft: 15,
  },
  ItemSeparator: { height: 1, backgroundColor: "#ccc" },
  container: {
    flex: 1,
    backgroundColor: "rgba(255,255,255,255)",
    paddingBottom: 5,
  },
  circle: {
    width: 50,
    height: 50,
    borderRadius: 60,
    borderWidth: 3,
    borderColor: "#FFF",
  },
  superCircle: {
    borderWidth: 3,
    borderColor: "blue",
    borderRadius: 60,
  },
  modal: {
    flex: 1,
  },
  title: {
    fontSize: 8,
    textAlign: "center",
  },
});

export default Stories;

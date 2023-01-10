import {
  View,
  Text,
  StyleSheet,
  ViewStyle,
  Dimensions,
  TouchableWithoutFeedback,
  ScrollView,
} from "react-native";
import React, { useCallback, useContext, useState } from "react";
import { commonListTodo } from "../../config/types/commonListTodo";
import ThemeContext from "../../contexts/themeContext";
import { theme } from "../../config/colors";
import Animated, {
  FadeIn,
  FadeInUp,
  FadeOut,
  Layout,
} from "react-native-reanimated";
import { Swipeable } from "react-native-gesture-handler";
import { MaterialIcons } from "@expo/vector-icons";

type renderItemProps = {
  item: commonListTodo;
  index: number;
  key?: string;
};

interface Props {
  data: commonListTodo[];
  contentContainerStyle?: ViewStyle;
  deleteFunction: Function;
}

const AnimatedList: React.FC<Props> = (props) => {
  const { data, contentContainerStyle, deleteFunction } = props;
  const { theme } = useContext(ThemeContext);

  const styles = themeStyles(theme);

  const RenderItem = (props: renderItemProps) => {
    const { index, item } = props;

    const RightAction = () => {
      return (
        <TouchableWithoutFeedback onPress={() => deleteFunction(item.item.id)}>
          <Animated.View
            entering={FadeInUp.damping(1000)}
            style={styles.rightActionStyle}
          >
            <MaterialIcons name="delete-forever" size={36} color="#FFF" />
            <Text style={styles.buttonText}>{`Delete`}</Text>
          </Animated.View>
        </TouchableWithoutFeedback>
      );
    };

    return (
      <Swipeable renderRightActions={RightAction}>
        <Animated.View
          style={styles.listItem}
          entering={FadeIn.delay(100 * index)}
          layout={Layout.delay(200)}
          exiting={FadeOut}
        >
          <Text style={styles.titleText}>{item.item.title}</Text>
        </Animated.View>
      </Swipeable>
    );
  };

  return (
    <View style={[styles.container, contentContainerStyle]}>
      <ScrollView style={styles.scrollView}>
        {data.map((e, index) => {
          return <RenderItem item={e} index={index} key={index.toString()} />;
        })}
      </ScrollView>
    </View>
  );
};

const themeStyles = (theme: theme) =>
  StyleSheet.create({
    container: {
      flex: 1,
    },
    scrollView: {
      flex: 1,
    },
    listItem: {
      height: 120,
      backgroundColor: theme.colors.primary,
      width: "90%",
      marginVertical: 10,
      borderRadius: 20,
      alignSelf: "center",
      padding: 10,
      elevation: 5,
      shadowColor: "#000",
      shadowOpacity: 0.1,
      shadowOffset: { width: 0, height: 10 },
      shadowRadius: 4,
    },
    titleText: {
      color: theme.colors.text,
      fontSize: 18,
      fontWeight: "600",
    },
    rightActionStyle: {
      height: 120,
      backgroundColor: theme.colors.secondary,
      alignSelf: "center",
      width: 80,
      marginRight: 20,
      borderRadius: 20,
      padding: 10,
      justifyContent: "center",
      alignItems: "center",
    },
    buttonText: {
      color: theme.colors.text,
      fontWeight: "300",
      paddingTop: 10,
    },
  });

export default AnimatedList;

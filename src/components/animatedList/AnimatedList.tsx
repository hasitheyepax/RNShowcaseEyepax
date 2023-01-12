import {
  View,
  Text,
  StyleSheet,
  ViewStyle,
  TouchableWithoutFeedback,
  ScrollView,
} from "react-native";
import React, { useContext, useEffect, useRef } from "react";
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
import { localTask } from "../../config/types/localTask";
import { timeStampToLocal } from "../../helpers/timeHelpers";
import { useAppDispatch } from "../../redux/hooks";
import { removeTask } from "../../redux/slices/taskSlice";
import { SimpleLineIcons } from "@expo/vector-icons";

type renderItemProps = {
  item: localTask;
  index: number;
  key?: string;
};

interface Props {
  data: localTask[];
  contentContainerStyle?: ViewStyle;
}

const AnimatedList: React.FC<Props> = (props) => {
  const { data, contentContainerStyle } = props;
  const { theme } = useContext(ThemeContext);
  const dispatch = useAppDispatch();

  const styles = themeStyles(theme);

  const handleDelete = (task: localTask) => {
    dispatch(removeTask(task));
  };

  const RenderItem = (props: renderItemProps) => {
    const { index, item } = props;

    const RightAction = () => {
      return (
        <TouchableWithoutFeedback onPress={() => handleDelete(item)}>
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
          <Text style={styles.titleText}>{item.title}</Text>
          {item.description && (
            <Text style={styles.descriptionText}>{item.description}</Text>
          )}
          <View style={styles.timestamp}>
            <Text style={styles.regularText}>
              {`${timeStampToLocal(item.createdTimestamp)}`}
            </Text>
          </View>
          <View style={styles.icon}>
            <SimpleLineIcons
              name="note"
              size={20}
              color={theme.colors.background}
            />
          </View>
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
    descriptionText: {
      color: theme.colors.text,
      fontSize: 18,
      fontWeight: "400",
      marginTop: 10,
    },
    regularText: {
      color: theme.colors.text,
      fontSize: 14,
      fontWeight: "400",
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
    timestamp: {
      flex: 1,
      alignSelf: "flex-end",
      justifyContent: "flex-end",
    },
    icon: {
      position: "absolute",
      top: 10,
      right: 10,
    },
  });

export default AnimatedList;

import {
  View,
  Text,
  StyleSheet,
  ViewStyle,
  TouchableWithoutFeedback,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import React, { useContext, useEffect, useRef, useState } from "react";
import ThemeContext from "../../contexts/themeContext";
import { theme } from "../../config/colors";
import Animated, {
  FadeIn,
  FadeInUp,
  FadeOut,
  Layout,
  useAnimatedStyle,
  useSharedValue,
  withSpring,
  withTiming,
} from "react-native-reanimated";
import { Swipeable } from "react-native-gesture-handler";
import { MaterialIcons } from "@expo/vector-icons";
import { localTask } from "../../config/types/localTask";
import { timeStampToLocal } from "../../helpers/timeHelpers";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { removeTask } from "../../redux/slices/taskSlice";
import { SimpleLineIcons } from "@expo/vector-icons";
import stringUtils from "../../utils/stringUtils";
import { selectSwipeToDeleteEnabled } from "../../redux/slices/settingsSlice";

type renderItemProps = {
  item: localTask;
  index: number;
  key?: string;
};

interface Props {
  data: localTask[];
  contentContainerStyle?: ViewStyle;
  setActiveItem?: Function;
}

const AnimatedList: React.FC<Props> = (props) => {
  const { data, contentContainerStyle, setActiveItem } = props;
  const { theme } = useContext(ThemeContext);
  const dispatch = useAppDispatch();
  const swipeToDeleteEnabled = useAppSelector(selectSwipeToDeleteEnabled);

  const styles = themeStyles(theme);

  const handleDelete = (task: localTask) => {
    dispatch(removeTask(task));
  };

  const initialMode = useRef<boolean>(true);

  useEffect(() => {
    initialMode.current = false;
  }, []);

  const RenderItem = (props: renderItemProps) => {
    const { index, item } = props;
    const [active, setActive] = useState(false);

    const height = useSharedValue(120);
    const opacity = useSharedValue(0);
    const scale = useSharedValue(0);

    const animatedStyle = useAnimatedStyle(() => {
      if (active) {
        height.value = withTiming(200);
      } else {
        height.value = withTiming(120);
      }
      return {
        height: height.value,
      };
    }, [active]);

    const animatedEditContainerStyle = useAnimatedStyle(() => {
      if (active) {
        opacity.value = withTiming(1);
        scale.value = withSpring(1);
      } else {
        opacity.value = withTiming(0);
        scale.value = withSpring(0);
      }
      return {
        opacity: opacity.value,
        transform: [
          {
            scale: scale.value,
          },
        ],
      };
    }, [active]);

    const RightAction = () => {
      return (
        <TouchableWithoutFeedback onPress={() => handleDelete(item)}>
          <Animated.View style={[styles.rightActionStyle, animatedStyle]}>
            <MaterialIcons name="delete-forever" size={36} color="#FFF" />
            <Text accessible={false} style={styles.buttonText}>{`Delete`}</Text>
          </Animated.View>
        </TouchableWithoutFeedback>
      );
    };

    const handleTouch = () => {
      setActive(!active);
    };

    const handleEditTouch = () => {
      setActiveItem?.(item);
    };

    return (
      <TouchableOpacity activeOpacity={1} onPress={handleTouch}>
        <Swipeable
          renderRightActions={swipeToDeleteEnabled ? RightAction : undefined}
        >
          <Animated.View
            style={[styles.listItem, animatedStyle]}
            entering={initialMode.current ? FadeIn.delay(100 * index) : FadeIn}
            exiting={FadeOut}
            onTouchEnd={undefined}
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
            <Animated.View
              style={[styles.editContainer, animatedEditContainerStyle]}
              onTouchEnd={handleEditTouch}
            >
              <Text style={styles.editText}>{`Edit`}</Text>
            </Animated.View>
          </Animated.View>
        </Swipeable>
      </TouchableOpacity>
    );
  };

  return (
    <View style={[styles.container]}>
      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={contentContainerStyle}
      >
        {data.map((item, index) => (
          <RenderItem key={item.id} index={index} item={item} />
        ))}
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
    editContainer: {
      flexDirection: "row",
      backgroundColor: theme.colors.secondary,
      position: "absolute",
      bottom: 0,
      left: 0,
      borderBottomLeftRadius: 20,
      padding: 10,
    },
    editText: {
      color: theme.colors.text,
    },
  });

export default AnimatedList;

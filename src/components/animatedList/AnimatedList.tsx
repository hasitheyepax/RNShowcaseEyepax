import { View, Text } from "react-native";
import React from "react";
import { commonListTodo } from "../../config/types/commonListTodo";

interface Props {
  data: commonListTodo[];
  renderItem: React.FC;
}

const AnimatedList: React.FC<Props> = (props) => {
  const { data, renderItem: RenderItem } = props;

  return (
    <View>
      <RenderItem />
    </View>
  );
};

export default AnimatedList;

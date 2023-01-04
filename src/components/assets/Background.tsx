import { Path } from "react-native-svg";

export default function Background({ color }: { color: string }) {
  return (
    <Path
      fill={color}
      d="M20 0H0c11.046 0 20 8.953 20 20v5c0 19.33 15.67 35 35 35s35-15.67 35-35v-5c0-11.045 8.954-20 20-20H20z"
    />
  );
}

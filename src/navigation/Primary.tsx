import { FC } from "react";
import { useAppSelector } from "../redux/hooks";
import { selectAuth } from "../redux/slices/authSlice";
import Auth from "./Auth";
import User from "./User";

const Primary: FC = (): JSX.Element => {
  const isLoggedIn = useAppSelector(selectAuth);

  if (isLoggedIn) {
    return <User />;
  } else {
    return <Auth />;
  }
};

export default Primary;

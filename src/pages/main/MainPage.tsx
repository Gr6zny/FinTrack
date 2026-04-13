import React from "react";
import { useAppSelector } from "../../store/services/useAppSelector";

const MainPage: React.FC = () => {
  const user = useAppSelector((state) => state.user);
  return <div>{user.user?.username}</div>;
};

export default MainPage;

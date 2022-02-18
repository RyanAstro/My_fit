import React from "react";
import { View, Text } from "react-native";
import { StatusBar } from "expo-status-bar";

import { DataProvider } from "./hooks/data";

import Routes from "./routes";

const Main: React.FC = () => {
  return (
    <DataProvider>
      <StatusBar style="light" />
      <Routes />
    </DataProvider>
  );
};

export default Main;

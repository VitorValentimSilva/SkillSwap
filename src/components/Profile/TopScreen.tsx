import React from "react";
import { ImageBackground } from "react-native";
import TopButton from "./TopButton";

export default function TopScreen() {
  return (
    <ImageBackground
      source={require("../../assets/pizza-de-pepperoni-caseira-portal-minha-receita.jpg")}
      style={{ width: "100%", height: 200 }}
      resizeMode="cover"
    >
      <TopButton />
    </ImageBackground>
  );
}

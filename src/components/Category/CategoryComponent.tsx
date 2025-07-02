import { View } from "react-native";
import Category from "./Category";
import {
  CATEGORY_STYLES,
  FILTER_OPTIONS_AS_SELECT,
} from "../../utils/constants";

export default function CategoryComponent() {
  const categorias = FILTER_OPTIONS_AS_SELECT.categoria.slice(0, 6);

  return (
    <View className="flex-row items-center justify-between flex-wrap px-2">
      {categorias.map((option) => {
        const style = CATEGORY_STYLES[option.value];

        if (!style) return null;

        return (
          <Category
            key={option.value}
            name={option.value}
            iconName={style.iconName}
            iconBgColor={style.iconBgColor}
            iconColor={style.iconColor}
          />
        );
      })}
    </View>
  );
}

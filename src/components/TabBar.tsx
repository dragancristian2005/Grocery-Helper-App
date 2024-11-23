import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { FontAwesome } from "@expo/vector-icons";
import React from "react";

const TabBar = ({
  state,
  descriptors,
  navigation,
}: {
  state: any;
  descriptors: any;
  navigation: any;
}) => {
  const icons: any = {
    List: (props: any) => (
      <FontAwesome name="bars" size={26} color="black" {...props} />
    ),
    Cart: (props: any) => (
      <FontAwesome name="shopping-cart" size={26} color="black" {...props} />
    ),
    Add: (props: any) => (
      <FontAwesome name="plus" size={26} color="black" {...props} />
    ),
    Settings: (props: any) => (
      <FontAwesome name="gear" size={26} color="black" {...props} />
    ),
  };

  return (
    <View style={styles.tabBar}>
      {state.routes.map(
        (
          route: { key: string | number; name: any; params: any },
          index: any,
        ) => {
          const { options } = descriptors[route.key];
          const label =
            options.tabBarLabel !== undefined
              ? options.tabBarLabel
              : options.title !== undefined
                ? options.title
                : route.name;

          const isFocused = state.index === index;

          const onPress = () => {
            const event = navigation.emit({
              type: "tabPress",
              target: route.key,
              canPreventDefault: true,
            });

            if (!isFocused && !event.defaultPrevented) {
              navigation.navigate(route.name, route.params);
            }
          };

          const onLongPress = () => {
            navigation.emit({
              type: "tabLongPress",
              target: route.key,
            });
          };

          return (
            <TouchableOpacity
              key={route.name}
              style={styles.tabBarItem}
              accessibilityRole={"button"}
              accessibilityState={isFocused ? { selected: true } : {}}
              accessibilityLabel={options.tabBarAccessibilityLabel}
              testID={options.tabBarTestID}
              onPress={onPress}
              onLongPress={onLongPress}
            >
              {icons[route.name]({
                color: isFocused ? "#005BAA" : "#222",
              })}
              <Text style={{ color: isFocused ? "#005BAA" : "#222" }}>
                {label}
              </Text>
            </TouchableOpacity>
          );
        },
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  tabBar: {
    flexDirection: "row",
    position: "absolute",
    bottom: 25,
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "white",
    marginHorizontal: 20,
    paddingVertical: 15,
    borderRadius: 25,
    borderCurve: "continuous",
    shadowColor: "black",
    shadowOffset: { width: 0, height: 10 },
    shadowRadius: 10,
    shadowOpacity: 0.1,
  },
  tabBarItem: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    gap: 5,
  },
});

export default TabBar;

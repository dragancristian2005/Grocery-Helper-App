import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import ProductListScreen from "../screens/app/ProductListScreen";
import AddProductScreen from "../screens/app/AddProductScreen";
import SettingsScreen from "../screens/app/SettingsScreen";
import { StyleSheet, View } from "react-native";
import ShoppingCartScreen from "../screens/app/ShoppingCartScreen";
//@ts-ignore
import Icons from "react-native-vector-icons/FontAwesome";

const Tab = createBottomTabNavigator();

const TabNavigator = () => {
  return (
    <Tab.Navigator
      screenOptions={{ headerShown: false, tabBarStyle: styles.tabBar }}
    >
      <Tab.Screen
        name={"ProductList"}
        component={ProductListScreen}
        options={{
          tabBarIcon: ({ focused }) => (
            <View style={styles.iconContainer}>
              <Icons name={"bars"} size={30} color={focused ? "#005BAA" : ""} />
            </View>
          ),
        }}
      />
      <Tab.Screen
        name={"ShoppingCart"}
        component={ShoppingCartScreen}
        options={{
          tabBarIcon: ({ focused }) => (
            <View style={styles.iconContainer}>
              <Icons
                name={"shopping-cart"}
                size={30}
                color={focused ? "#005BAA" : ""}
              />
            </View>
          ),
        }}
      />
      <Tab.Screen
        name={"AddProduct"}
        component={AddProductScreen}
        options={{
          tabBarIcon: ({ focused }) => (
            <View style={styles.iconContainer}>
              <Icons name={"plus"} size={30} color={focused ? "#005BAA" : ""} />
            </View>
          ),
        }}
      />
      <Tab.Screen
        name={"Settings"}
        component={SettingsScreen}
        options={{
          tabBarIcon: ({ focused }) => (
            <View style={styles.iconContainer}>
              <Icons name={"gear"} size={30} color={focused ? "#005BAA" : ""} />
            </View>
          ),
        }}
      />
    </Tab.Navigator>
  );
};

const styles = StyleSheet.create({
  tabBar: {
    backgroundColor: "#ffffff",
    position: "absolute",
    borderTopWidth: 0,
    borderRadius: 35,
    bottom: 20,
    marginHorizontal: 25,
    height: 70,
    flexDirection: "row",
    alignItems: "center",
  },
  iconContainer: {
    justifyContent: "center",
    alignItems: "center",
    width: 60,
    height: 70,
  },
});

export default TabNavigator;

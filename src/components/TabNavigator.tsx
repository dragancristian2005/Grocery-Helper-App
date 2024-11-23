import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import ProductListScreen from "../screens/app/ProductListScreen";
import AddProductScreen from "../screens/app/AddProductScreen";
import SettingsScreen from "../screens/app/SettingsScreen";
import ShoppingCartScreen from "../screens/app/ShoppingCartScreen";
import TabBar from "./TabBar";

const Tab = createBottomTabNavigator();

const TabNavigator = () => {
  return (
    <Tab.Navigator
      screenOptions={{ headerShown: false }}
      tabBar={(props) => <TabBar {...props} />}
    >
      <Tab.Screen name={"List"} component={ProductListScreen} />
      <Tab.Screen name={"Cart"} component={ShoppingCartScreen} />
      <Tab.Screen name={"Add"} component={AddProductScreen} />
      <Tab.Screen name={"Settings"} component={SettingsScreen} />
    </Tab.Navigator>
  );
};

export default TabNavigator;

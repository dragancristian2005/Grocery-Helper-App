import KSpacer from "../../components/KSpacer";
import { Button, Text } from "react-native";
import AddProductScreen from "./AddProductScreen";
import { logout } from "../../backend";

const SettingsScreen = () => {
  return (
    <KSpacer>
      <Text>Settings</Text>
      <Button onPress={logout} title="Logout" />
    </KSpacer>
  );
};

export default SettingsScreen;

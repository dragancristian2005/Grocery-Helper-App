import KSpacer from "../../components/KSpacer";
import { Button } from "react-native";
import { logout } from "../../backend";
import ScreenTitle from "../../components/ScreenTitle";

const SettingsScreen = () => {
  return (
    <KSpacer>
      <ScreenTitle name={"Settings"} />
      <Button onPress={logout} title="Logout" />
    </KSpacer>
  );
};

export default SettingsScreen;

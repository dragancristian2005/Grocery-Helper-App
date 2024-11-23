import KSpacer from "../../components/KSpacer";
import { StyleSheet, Text, TouchableOpacity } from "react-native";
import { logout } from "../../backend";
import ScreenTitle from "../../components/ScreenTitle";
import HowToUse from "../../components/HowToUse";

const SettingsScreen = () => {
  return (
    <KSpacer>
      <ScreenTitle name={"Settings"} />

      <HowToUse />

      <TouchableOpacity onPress={logout} style={styles.logoutBtn}>
        <Text style={styles.logoutBtnTxt}>Logout</Text>
      </TouchableOpacity>
    </KSpacer>
  );
};

const styles = StyleSheet.create({
  logoutBtn: {
    backgroundColor: "#032959",
    padding: 12,
    width: 120,
    borderRadius: 15,
  },
  logoutBtnTxt: {
    color: "white",
    fontWeight: "bold",
    fontSize: 18,
    alignSelf: "center",
  },
});

export default SettingsScreen;

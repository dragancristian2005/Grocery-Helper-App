import KSpacer from "../../components/KSpacer";
import {
  Text,
  Image,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { useState } from "react";
import { register } from "../../backend";

const RegisterScreen = () => {
  const navigation = useNavigation();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  return (
    <KSpacer>
      <Image
        source={require("../../../assets/grocery-helper-high-resolution-logo-transparent.png")}
        style={styles.logo}
      />
      <Text style={styles.title}>Create an account</Text>

      <TextInput
        placeholder={"Email:"}
        style={styles.textInputs}
        keyboardType={"email-address"}
        autoCapitalize={"none"}
        value={email}
        onChangeText={setEmail}
      />
      <TextInput
        placeholder={"Password:"}
        style={styles.textInputs}
        secureTextEntry={true}
        value={password}
        onChangeText={setPassword}
      />
      <TextInput
        placeholder={"Confirm password:"}
        style={styles.textInputs}
        secureTextEntry={true}
        value={confirmPassword}
        onChangeText={setConfirmPassword}
      />

      <TouchableOpacity
        onPress={() => {
          if (password.trim() === confirmPassword.trim()) {
            register({ email, password });
          }
        }}
        style={styles.btn}
      >
        <Text style={styles.btnTxt}>Register</Text>
      </TouchableOpacity>

      <View style={{ flexDirection: "row", gap: 8, marginTop: 8 }}>
        <Text style={styles.loginQ}>Already have an account?</Text>
        <TouchableOpacity onPress={() => navigation.navigate("Login")}>
          <Text style={styles.loginTxt}>Login here</Text>
        </TouchableOpacity>
      </View>
    </KSpacer>
  );
};

const styles = StyleSheet.create({
  logo: {
    width: 150,
    height: 150,
    marginTop: 50,
  },
  title: {
    fontSize: 32,
    color: "white",
    marginTop: 25,
    marginBottom: 12,
  },
  textInputs: {
    backgroundColor: "white",
    padding: 15,
    borderRadius: 10,
    width: "75%",
    marginVertical: 8,
  },
  btn: {
    backgroundColor: "#032959",
    width: "75%",
    padding: 15,
    borderRadius: 10,
    alignItems: "center",
    marginTop: 20,
  },
  btnTxt: {
    fontWeight: "bold",
    color: "white",
  },
  loginQ: {
    color: "#01234e",
    fontSize: 15,
  },
  loginTxt: {
    fontSize: 15,
    fontWeight: "bold",
    color: "#01234e",
  },
});

export default RegisterScreen;

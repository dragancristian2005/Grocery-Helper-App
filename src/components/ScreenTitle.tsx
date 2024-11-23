import { View, Text, StyleSheet } from "react-native";

const ScreenTitle = ({ name }: { name: string }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>{name}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: "100%",
    marginLeft: 50,
    marginTop: 20,
  },
  title: {
    fontSize: 32,
    color: "white",
    fontWeight: "bold",
  },
});

export default ScreenTitle;

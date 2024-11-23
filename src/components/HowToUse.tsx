import { View, Text, StyleSheet } from "react-native";

const HowToUse = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.containerTitle}>How to use:</Text>
      <View style={styles.innerContainer}>
        <Text style={{ fontSize: 15 }}>
          1. Add your favourite products using the "Add" section.
        </Text>
      </View>
      <View style={styles.innerContainer}>
        <Text style={{ fontSize: 15 }}>
          2. Use the "List" section to select the products you want to add to
          your cart.
        </Text>
      </View>
      <View style={styles.innerContainer}>
        <Text style={{ fontSize: 15 }}>
          3. Now go to the "Cart" section and you will see all the items you
          selected and how much it will cost to buy them.
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: "85%",
    margin: 25,
    padding: 25,
    borderRadius: 25,
    backgroundColor: "#fff",
  },
  containerTitle: {
    fontSize: 28,
    fontWeight: "bold",
  },
  innerContainer: {
    backgroundColor: "#eee",
    padding: 10,
    borderRadius: 12,
    marginVertical: 10,
    justifyContent: "center",
    alignItems: "center",

    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,

    elevation: 3,
  },
});

export default HowToUse;

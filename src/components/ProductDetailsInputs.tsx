import { StyleSheet, TextInput, View } from "react-native";
import React from "react";

const ProductDetailsInputs = ({
  name,
  setName,
  price,
  setPrice,
}: {
  name: string;
  setName: any;
  price: string;
  setPrice: any;
}) => {
  return (
    <View>
      <TextInput
        value={name}
        onChangeText={setName}
        placeholder={"Enter product name:"}
        style={styles.input}
        autoCapitalize={"words"}
      />
      <TextInput
        value={price}
        onChangeText={setPrice}
        placeholder={"Enter product price:"}
        style={styles.input}
        autoCapitalize={"words"}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  input: {
    width: 220,
    backgroundColor: "white",
    padding: 8,
    borderRadius: 12,
    marginTop: 20,
  },
});

export default ProductDetailsInputs;

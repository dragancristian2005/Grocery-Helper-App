import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React from "react";
import * as ImagePicker from "expo-image-picker";

type ImageResponse = ImagePicker.ImagePickerResult;

const ImageControls = ({
  imageUri,
  setImageUri,
}: {
  imageUri: string | null;
  setImageUri: any;
}) => {
  const selectImage = async () => {
    try {
      const result: ImageResponse = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ["images"],
        quality: 1,
        allowsEditing: true,
      });

      if (!result.canceled) {
        setImageUri(result.assets[0].uri);
      }
    } catch (e) {
      console.error("Error selecting image", e);
    }
  };

  const takePhoto = async () => {
    try {
      const result: ImageResponse = await ImagePicker.launchCameraAsync({
        allowsEditing: true,
        quality: 1,
      });
      if (!result.canceled) {
        setImageUri(result.assets[0].uri);
      }
    } catch (e) {
      console.error("Error taking photo", e);
    }
  };

  return (
    <View style={styles.btnContainer}>
      <TouchableOpacity onPress={selectImage} style={styles.selectBtn}>
        <Text style={styles.selectBtnTxt}>Select Photo</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={takePhoto} style={styles.selectBtn}>
        <Text style={styles.selectBtnTxt}>Take Photo</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  btnContainer: {
    flexDirection: "row",
    gap: 25,
    marginBottom: 30,
  },

  selectBtn: {
    backgroundColor: "#032959",
    padding: 12,
    borderRadius: 15,
    width: 130,
  },

  selectBtnTxt: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
    alignSelf: "center",
  },
});

export default ImageControls;

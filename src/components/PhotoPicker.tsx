import React, { useEffect } from "react";
import {
  View,
  Text,
  Button,
  Image,
  Platform,
  Alert,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
  TextInput,
} from "react-native";
import * as ImagePicker from "expo-image-picker";

type ImageResponse = ImagePicker.ImagePickerResult;

const PhotoPicker = ({
  imageUri,
  setImageUri,
  name,
  setName,
  price,
  setPrice,
}: {
  imageUri: string | null;
  setImageUri: any;
  name: string;
  setName: any;
  price: string;
  setPrice: any;
}) => {
  useEffect(() => {
    const requestPermission = async () => {
      if (Platform.OS !== "web") {
        const { status: cameraStatus } =
          await ImagePicker.requestCameraPermissionsAsync();
        const { status: galleryStatus } =
          await ImagePicker.requestMediaLibraryPermissionsAsync();

        if (cameraStatus !== "granted") {
          Alert.alert("Permission required", "Camera access is required.");
        }
        if (galleryStatus !== "granted") {
          Alert.alert("Permission required", "Gallery access is required.");
        }
      }
    };
    requestPermission();
  }, []);

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
    <View style={styles.container}>
      <View style={styles.btnContainer}>
        <TouchableOpacity onPress={selectImage} style={styles.selectBtn}>
          <Text style={styles.selectBtnTxt}>Select Photo</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={takePhoto} style={styles.selectBtn}>
          <Text style={styles.selectBtnTxt}>Take Photo</Text>
        </TouchableOpacity>
      </View>
      {imageUri && <Image source={{ uri: imageUri }} style={styles.image} />}

      <TextInput
        value={name}
        onChangeText={setName}
        placeholder={"Enter product name:"}
        style={styles.input}
      />
      <TextInput
        value={price}
        onChangeText={setPrice}
        placeholder={"Enter product price:"}
        style={styles.input}
      />

      {/*  add OnPress  */}
      <TouchableOpacity
        style={[styles.selectBtn, { marginTop: 15, width: 220 }]}
      >
        <Text style={styles.selectBtnTxt}>Add Product</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: "100%",
    alignItems: "center",
    marginVertical: 30,
  },

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
  image: {
    width: 220,
    height: 220,
    marginTop: 10,
    borderRadius: 25,
  },
  input: {
    width: 220,
    backgroundColor: "white",
    padding: 8,
    borderRadius: 12,
    marginTop: 20,
  },
});

export default PhotoPicker;

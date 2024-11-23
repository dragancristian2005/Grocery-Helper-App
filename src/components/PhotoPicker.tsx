import React, { useEffect } from "react";
import {
  View,
  Text,
  Image,
  Platform,
  Alert,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import * as ImagePicker from "expo-image-picker";
import ImageControls from "./ImageControls";
import ProductDetailsInputs from "./ProductDetailsInputs";
import { auth } from "../backend/config";
import { db } from "../backend/config";
import { ref, push } from "firebase/database";

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

  const addProduct = async () => {
    const user = auth.currentUser;
    if (user === null) return;
    const userId = user.uid;
    try {
      const userRef = ref(db, `users/${userId}`);
      await push(userRef, {
        imageUri,
        name,
        price,
      });
      setName("");
      setPrice("");
      setImageUri("");
    } catch (e) {
      alert(e);
    }
  };

  return (
    <View style={styles.container}>
      <ImageControls imageUri={imageUri} setImageUri={setImageUri} />
      {imageUri && <Image source={{ uri: imageUri }} style={styles.image} />}

      <ProductDetailsInputs
        name={name}
        setName={setName}
        price={price}
        setPrice={setPrice}
      />

      <TouchableOpacity
        onPress={addProduct}
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
  image: {
    width: 220,
    height: 220,
    marginTop: 10,
    borderRadius: 25,
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

export default PhotoPicker;

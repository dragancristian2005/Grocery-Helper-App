import KSpacer from "../../components/KSpacer";
import ScreenTitle from "../../components/ScreenTitle";
import PhotoPicker from "../../components/PhotoPicker";
import { useState } from "react";

const AddProductScreen = () => {
  const [imageUri, setImageUri] = useState<string | null>(null);
  const [name, setName] = useState<string>("");
  const [price, setPrice] = useState<string>("");

  return (
    <KSpacer>
      <ScreenTitle name="Add Product" />
      <PhotoPicker
        imageUri={imageUri}
        setImageUri={setImageUri}
        name={name}
        setName={setName}
        price={price}
        setPrice={setPrice}
      />
    </KSpacer>
  );
};

export default AddProductScreen;

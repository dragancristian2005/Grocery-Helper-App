import KSpacer from "../../components/KSpacer";
import ScreenTitle from "../../components/ScreenTitle";
import { useEffect, useState } from "react";
import { db, auth } from "../../backend/config";
import { ref, onValue } from "firebase/database";
import { FlatList, View, Image, Text } from "react-native";

interface Product {
  imageUri: string;
  name: string;
  price: string;
}

const ProductListScreen = () => {
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const user = auth.currentUser;
        if (user) {
          const productRef = ref(db, `users/${user.uid}`);
          onValue(productRef, (snapshot) => {
            const productData = snapshot.val();
            if (productData) {
              setProducts(productData);
            } else {
              setProducts([]);
            }
          });
        }
      } catch (e) {
        alert(e);
      }
    };
    fetchProducts();

    return () => {
      const user = auth.currentUser;
      if (user) {
        const productRef = ref(db, `users/${user.uid}`);
        onValue(productRef, () => {});
      }
    };
  }, []);

  console.log(products);
  /// products are obiectele cum trebuie dar sunt inside alt obiect cu numele id-ului produsului

  return (
    <KSpacer>
      <ScreenTitle name="Items List" />
      <FlatList
        data={products}
        keyExtractor={(_, index) => index.toString()}
        renderItem={({ item }) => (
          <View>
            <Image source={{ uri: item.imageUri }} />
            <Text>{item.name}</Text>
            <Text>${item.price}</Text>
          </View>
        )}
      />
    </KSpacer>
  );
};

export default ProductListScreen;

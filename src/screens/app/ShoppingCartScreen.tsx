import KSpacer from "../../components/KSpacer";
import ScreenTitle from "../../components/ScreenTitle";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useEffect, useState } from "react";
import { useNavigation } from "@react-navigation/native";
import { FlatList, View, Text, Image, StyleSheet } from "react-native";
import { auth, db } from "../../backend/config";
import { ref, get } from "firebase/database";

interface Product {
  imageUri: string;
  name: string;
  price: string;
  product?: string;
}

const ShoppingCartScreen = () => {
  const navigation = useNavigation();
  const [addedProducts, setAddedProducts] = useState<(string | undefined)[]>(
    [],
  );
  const [products, setProducts] = useState<Product[]>([]);

  const loadProductsFromStorage = async () => {
    try {
      const storedProducts = await AsyncStorage.getItem("addedProducts");
      if (storedProducts) {
        setAddedProducts(JSON.parse(storedProducts));
      }
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    navigation.addListener("focus", () => loadProductsFromStorage());
  }, [navigation]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const user = auth.currentUser;
        if (user) {
          const productsPromises = addedProducts.map(async (prod) => {
            const productsRef = ref(db, `users/${user.uid}/${prod}`);
            const product = await get(productsRef);
            return product.val();
          });
          const productsData = await Promise.all(productsPromises);

          setProducts(productsData);
        }
      } catch (e) {
        console.error(e);
      }
    };
    fetchProducts();
  }, [addedProducts]);

  return (
    <KSpacer>
      <ScreenTitle name="Shopping Cart" />
      <FlatList
        data={products}
        keyExtractor={(_, index) => index.toString()}
        style={styles.container}
        renderItem={({ item }) => (
          <View style={styles.productContainer}>
            <Image
              source={{ uri: item.imageUri }}
              style={{ width: 100, height: 100, borderRadius: 16 }}
            />

            <View style={styles.nameContainer}>
              <Text style={styles.productName}>{item.name}</Text>
            </View>
            <View
              style={{
                alignItems: "center",
                justifyContent: "space-between",
              }}
            >
              <Text style={{ fontSize: 20, color: "white" }}>
                {item.price}RON
              </Text>
            </View>
          </View>
        )}
      />
    </KSpacer>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    width: "100%",
    marginBottom: 60,
  },
  nameContainer: {
    flex: 1,
    marginHorizontal: 10,
  },
  productName: {
    color: "white",
    fontSize: 20,
  },
  productContainer: {
    flex: 1,
    width: "100%",
    marginVertical: 10,
    flexDirection: "row",
    justifyContent: "space-between",
    backgroundColor: "#032959",
    padding: 15,
    borderRadius: 25,
  },
});

export default ShoppingCartScreen;

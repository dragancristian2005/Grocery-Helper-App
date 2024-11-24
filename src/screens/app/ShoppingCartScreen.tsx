import KSpacer from "../../components/KSpacer";
import ScreenTitle from "../../components/ScreenTitle";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useEffect, useState } from "react";
import { useNavigation } from "@react-navigation/native";
import {
  FlatList,
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
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

  const clearStorage = async () => {
    try {
      setAddedProducts([]);
      await AsyncStorage.setItem("addedProducts", JSON.stringify([]));
    } catch (error) {
      console.error("Error clearing AsyncStorage:", error);
    }
  };

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

  const removeProduct = async (name: string) => {
    const filteredProducts = products.filter((item) => item.name !== name);
    setProducts(filteredProducts);
  };

  useEffect(() => {
    fetchProducts();
  }, [addedProducts]);

  useEffect(() => {
    navigation.addListener("focus", () => {
      loadProductsFromStorage();
    });
  }, []);

  return (
    <KSpacer>
      <ScreenTitle name="Shopping Cart" />
      <View style={styles.priceContainer}>
        <TouchableOpacity style={styles.clearCartBtn} onPress={clearStorage}>
          <Text style={styles.totalPrice}>Clear Cart</Text>
        </TouchableOpacity>

        <View style={styles.priceSection}>
          <Text style={styles.totalPrice}>
            Total:{" "}
            {products.reduce(
              (prev, curr) =>
                curr.price !== null ? prev + Number(curr.price) : prev,
              0,
            )}{" "}
            RON
          </Text>
        </View>
      </View>

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
              <TouchableOpacity
                style={styles.deleteBtn}
                onPress={() => {
                  removeProduct(item.name);
                }}
              >
                <Text style={styles.deleteBtnTxt}>Delete</Text>
              </TouchableOpacity>
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
  priceContainer: {
    width: "100%",
    height: 45,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    borderRadius: 15,
    padding: 10,
    marginTop: 10,
    gap: 10,
  },
  totalPrice: {
    color: "white",
    fontSize: 18,
  },
  priceSection: {
    backgroundColor: "#032959",
    height: 45,
    justifyContent: "center",
    alignItems: "center",
    padding: 10,
    borderRadius: 15,
  },
  clearCartBtn: {
    backgroundColor: "#032959",
    height: 45,
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 15,
  },
  deleteBtn: {
    backgroundColor: "tomato",
    padding: 6,
    borderRadius: 12,
  },
  deleteBtnTxt: {
    color: "white",
  },
});

export default ShoppingCartScreen;

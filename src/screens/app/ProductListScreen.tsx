import KSpacer from "../../components/KSpacer";
import ScreenTitle from "../../components/ScreenTitle";
import { useEffect, useState } from "react";
import { db, auth } from "../../backend/config";
import { ref, onValue, get } from "firebase/database";
import {
  FlatList,
  View,
  Image,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
} from "react-native";

interface Product {
  imageUri: string;
  name: string;
  price: string;
}

const ProductListScreen = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const user = auth.currentUser;
        if (user) {
          const productRef = ref(db, `users/${user.uid}`);
          onValue(productRef, async (snapshot) => {
            const productData = snapshot.val();
            if (productData) {
              const productsArray: Product[] = await Promise.all(
                Object.keys(productData).map(async (product) => {
                  const productIdRef = ref(db, `users/${user.uid}/${product}`);
                  const prod = await get(productIdRef);
                  return prod.val();
                }),
              );
              setProducts(productsArray);
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

  const filteredProducts = products.filter((product) =>
    product.name.toLowerCase().includes(search.toLowerCase()),
  );

  return (
    <KSpacer>
      <ScreenTitle name="Items List" />
      <TextInput
        placeholder="Search for a product:"
        style={styles.searchBox}
        value={search}
        onChangeText={(text) => setSearch(text)}
      />
      {products.length > 0 ? (
        <FlatList
          data={filteredProducts}
          keyExtractor={(_, index) => index.toString()}
          style={styles.container}
          renderItem={({ item }) => (
            <TouchableOpacity
              style={styles.productContainer}
              onPress={() => console.log("pressed")}
            >
              <Image
                source={{ uri: item.imageUri }}
                style={{ width: 100, height: 100, borderRadius: 16 }}
              />
              <View style={styles.nameContainer}>
                <Text style={styles.productName}>{item.name}</Text>
              </View>
              <Text style={styles.productPrice}>{item.price}RON</Text>
            </TouchableOpacity>
          )}
        />
      ) : (
        <Text style={{ fontSize: 16, margin: 20, color: "white" }}>
          No products available.
        </Text>
      )}
    </KSpacer>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    width: "100%",
    marginBottom: 60,
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
  nameContainer: {
    flex: 1,
    marginHorizontal: 10,
  },
  productName: {
    color: "white",
    fontSize: 20,
  },
  productPrice: {
    color: "white",
    fontSize: 20,
  },
  searchBox: {
    backgroundColor: "white",
    width: "90%",
    borderRadius: 15,
    padding: 12,
    marginTop: 10,
  },
});

export default ProductListScreen;

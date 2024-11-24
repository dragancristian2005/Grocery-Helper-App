import KSpacer from "../../components/KSpacer";
import ScreenTitle from "../../components/ScreenTitle";
import { useEffect, useState } from "react";
import { db, auth } from "../../backend/config";
import { ref, onValue, get, remove } from "firebase/database";
import {
  FlatList,
  View,
  Image,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Alert,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation } from "@react-navigation/native";

interface Product {
  imageUri: string;
  name: string;
  price: string;
  product?: string;
}

const ProductListScreen = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [search, setSearch] = useState("");
  const [addedProducts, setAddedProducts] = useState<(string | undefined)[]>(
    [],
  );
  const navigation = useNavigation();

  const saveProductsToStorage = async (products: (string | undefined)[]) => {
    try {
      await AsyncStorage.setItem("addedProducts", JSON.stringify(products));
    } catch (error) {
      console.error(error);
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

  useEffect(() => {
    navigation.addListener("focus", () => {
      loadProductsFromStorage();
    });
  }, [navigation]);

  useEffect(() => {
    saveProductsToStorage(addedProducts);
  }, [addedProducts]);

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
                  return { ...prod.val(), product };
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

  const removeProduct = async (productId: string | undefined) => {
    try {
      const user = auth.currentUser;
      if (user) {
        const productRef = ref(db, `users/${user.uid}/${productId}`);
        await remove(productRef);
      }
    } catch (e) {
      console.error(e);
    }
  };

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
                <Text style={styles.productPrice}>{item.price}RON</Text>

                <TouchableOpacity
                  onPress={() => {
                    Alert.alert(
                      "Confirm deletion?",
                      "Are you sure you want to delete this item?",
                      [
                        {
                          text: "Cancel",
                          style: "cancel",
                        },
                        {
                          text: "Delete",
                          onPress: () => removeProduct(item.product),
                          style: "destructive",
                        },
                      ],
                      { cancelable: false },
                    );
                  }}
                  style={styles.removeBtn}
                >
                  <Text style={styles.removeBtnTxt}>Remove</Text>
                </TouchableOpacity>

                <TouchableOpacity
                  style={styles.addBtn}
                  onPress={() => {
                    if (!addedProducts.includes(item.product)) {
                      setAddedProducts((prevData) => [
                        ...prevData,
                        item.product,
                      ]);
                    } else {
                      alert("Item already in cart.");
                    }
                  }}
                >
                  <Text style={styles.addBtnTxt}>Add To Cart</Text>
                </TouchableOpacity>
              </View>
            </View>
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
  removeBtn: {
    backgroundColor: "tomato",
    marginVertical: 5,
    width: 70,
    padding: 5,
    borderRadius: 8,
    alignSelf: "flex-end",
  },
  removeBtnTxt: {
    color: "white",
    textAlign: "center",
  },
  addBtn: {
    backgroundColor: "#005BAA",
    borderRadius: 8,
    padding: 5,
  },
  addBtnTxt: {
    color: "white",
    textAlign: "center",
  },
});

export default ProductListScreen;

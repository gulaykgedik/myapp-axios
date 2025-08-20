import { StyleSheet, Text, TextInput, TouchableOpacity, View, ScrollView, Alert } from 'react-native';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getProducts, updateProductThunk } from '../redux/slices/productSlice';

const ProductEditPage = ({ route, navigation }) => {
  const { id } = route.params;
  const dispatch = useDispatch();
  const { products } = useSelector((state) => state.product);

  const [form, setForm] = useState({
    name: "",
    description: "",
    price: "",
    stock: "",
    brand: "",
    rating: "",
    imageURL: "",
    color: "",
  });

  // ürünleri çek (eğer daha önce çekilmediyse)
  useEffect(() => {
    if (!products.length) {
      dispatch(getProducts());
    }
  }, [dispatch]);

  // seçilen ürünü bul ve formu doldur
  useEffect(() => {
    const product = products.find(p => p.id === id);
    if (product) {
      setForm({
        name: product.name || "",
        description: product.description || "",
        price: product.price?.toString() || "",
        stock: product.stock?.toString() || "",
        brand: product.brand || "",
        rating: product.rating?.toString() || "",
        imageURL: product.imageURL || "",
        color: product.color || "",
      });
    }
  }, [products, id]);

  const handleChange = (field, value) => {
    setForm({ ...form, [field]: value });
  };

  const handleSubmit = () => {
    dispatch(updateProductThunk({
      ...form,
      id
    }));
 
    navigation.goBack();
  };

  return (
    <ScrollView style={styles.container}>
      {Object.keys(form).map((key) => (
        <View key={key} style={styles.inputGroup}>
          <Text style={styles.label}>{key.charAt(0).toUpperCase() + key.slice(1)}</Text>
          <TextInput
            style={styles.input}
            value={form[key]}
            onChangeText={(t) => handleChange(key, t)}
          />
        </View>
      ))}

      <TouchableOpacity style={styles.button} onPress={handleSubmit}>
        <Text style={styles.buttonText}>Update Product</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

export default ProductEditPage;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 15,
    backgroundColor: "#f8f8f8"
  },
  inputGroup: {
    marginBottom: 12
  },
  label: {
    fontSize: 14,
    fontWeight: "600",
    marginBottom: 5
  },
  input: {
    backgroundColor: "#fff",
    borderRadius: 8,
    padding: 10,
    borderWidth: 1,
    borderColor: "#ddd"
  },
  button: {
    marginTop: 20,
    backgroundColor: "#2980b9",
    padding: 15,
    borderRadius: 10,
    alignItems: "center"
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600"
  }
});

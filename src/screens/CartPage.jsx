import { StyleSheet, Text, TextInput, TouchableOpacity, View, Alert, ScrollView } from 'react-native'
import React, { useState } from 'react'
import { useDispatch } from 'react-redux';
import { createProductThunk } from '../redux/slices/productSlice';
// import { createProductThunk } from '../redux/slices/productSlice'; // unutma bunu ekle

const CreateProductPage = ({ navigation }) => {
  const [form, setForm] = useState({
    name: "",
    description: "",
    price: "",
    stock: "",
    brand: "",
    rating: "",
    imageURL: "https://picsum.photos/200/200",
    color: "",
   
  });

  const dispatch = useDispatch();

  const handleChange = (field, value) => {
    setForm({ ...form, [field]: value });
  };

  const handleSubmit = async () => {
    dispatch(createProductThunk(form)); // Redux için aktif et
   
    Alert.alert("Product Created", "The product has been successfully created.");
    navigation.goBack();
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.inputGroup}>
        <Text style={styles.label}>Name *</Text>
        <TextInput 
          style={styles.input} 
          value={form.name} 
          onChangeText={(t) => handleChange("name", t)} 
        />
      </View>

      <View style={styles.inputGroup}>
        <Text style={styles.label}>Description</Text>
        <TextInput 
          style={styles.input} 
          value={form.description} 
          onChangeText={(t) => handleChange("description", t)} 
        />
      </View>

      <View style={styles.inputGroup}>
        <Text style={styles.label}>Price *</Text>
        <TextInput
          style={styles.input}
          keyboardType="numeric"
          value={form.price.toString()}
          onChangeText={(t) => handleChange("price", t)}
        />
      </View>

      <View style={styles.inputGroup}>
        <Text style={styles.label}>Stock</Text>
        <TextInput
          style={styles.input}
          keyboardType="numeric"
          value={form.stock.toString()}
          onChangeText={(t) => handleChange("stock", t)}
        />
      </View>

      <View style={styles.inputGroup}>
        <Text style={styles.label}>Brand</Text>
        <TextInput 
          style={styles.input} 
          value={form.brand} 
          onChangeText={(t) => handleChange("brand", t)} 
        />
      </View>

      <View style={styles.inputGroup}>
        <Text style={styles.label}>Rating</Text>
        <TextInput
          style={styles.input}
          keyboardType="numeric"
          value={form.rating.toString()}
          onChangeText={(t) => handleChange("rating", t)}
        />
      </View>

      <View style={styles.inputGroup}>
        <Text style={styles.label}>Image URL *</Text>
        <TextInput 
          style={styles.input} 
          value={form.imageURL} 
          onChangeText={(t) => handleChange("imageURL", t)} 
        />
      </View>

      <View style={styles.inputGroup}>
        <Text style={styles.label}>Color</Text>
        <TextInput 
          style={styles.input} 
          value={form.color} 
          onChangeText={(t) => handleChange("color", t)} 
        />
      </View>

     
      <TouchableOpacity style={styles.button} onPress={handleSubmit}>
        <Text style={styles.buttonText}>Create Product</Text>
      </TouchableOpacity>
    </ScrollView>
  )
}

export default CreateProductPage

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 15,
    backgroundColor: "#f8f8f8"
  },
  inputGroup: {
    marginBottom: 12,
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
    backgroundColor: "#27ae60",
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

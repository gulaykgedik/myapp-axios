import { ActivityIndicator, Alert, Image, StyleSheet, Text, TouchableOpacity, View, ScrollView } from 'react-native'
import React, { useCallback, useEffect, useState } from 'react'
import api from '../utils/api';
import { useDispatch } from 'react-redux';
import { deleteProductThunk } from '../redux/slices/productSlice';

const ProductPage = ({ navigation, route }) => {
  const { id } = route.params;
  const [product, setProduct] = useState(null);
  const [imageLoading, setImageLoading] = useState(true);

  const dispatch = useDispatch();

  const handleDelete = async () => {
    dispatch(deleteProductThunk({ id }));
    
    navigation.goBack();
  };

  useEffect(
    useCallback(() => {
      const getProduct = async () => {
        api.get(`/products/${id}`)
          .then((res) => { setProduct(res.data) })
          .catch(err => console.log(err))
      };
      getProduct();
    }, [id])
  );

  if (!product) {
    return (
      <View style={styles.loaderContainer}>
        <ActivityIndicator size="large" color="black" />
      </View>
    );
  }

  return (
    <ScrollView contentContainerStyle={styles.container}>
      {/* IMAGE */}
      <View style={styles.imageWrapper}>
        {imageLoading && (
          <ActivityIndicator
            size="large"
            color="black"
            style={styles.loaderStyle}
          />
        )}
        <Image
          source={{ uri: product?.imageURL }}
          style={styles.image}
          resizeMode='contain'
          onLoadStart={() => setImageLoading(true)}
          onLoadEnd={() => setImageLoading(false)}
        />
      </View>

      {/* JUST VALUES */}
      {Object.entries(product).map(([key, value]) => {
        if (key === "id" || key === "imageURL") return null; // id ve image gösterme
        return (
          <Text key={key} style={styles.valueText}>
            {value?.toString()}
          </Text>
        );
      })}

      {/* ACTION BUTTONS */}
      <View style={styles.btnContainer}>
        <TouchableOpacity onPress={handleDelete} style={styles.btnDelete}>
          <Text style={styles.btnText}>Delete</Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => navigation.navigate("ProductEditPage", { id: product?.id })}
          style={styles.btnUpdate}
        >
          <Text style={styles.btnText}>Update</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

export default ProductPage;

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    padding: 20,
    
  },
  loaderContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center"
  },
  imageWrapper: {
    width: "100%",
    height: 250,
    marginBottom: 20,
    position: "relative"
  },
  image: {
    width: "100%",
    height: "100%"
  },
  loaderStyle: {
    position: "absolute",
    top: "50%", left: "50%",
    transform: [{ translateX: -20 }, { translateY: -20 }]
  },
  valueText: {
    fontSize: 18,
    fontWeight: "500",
    color: "#333",
    marginVertical: 6,
    textAlign: "center"
  },
  btnContainer: {
    flexDirection: "row",
    justifyContent: "center",
    marginTop: 50
  },
  btnDelete: {
    backgroundColor: "rgba(219, 78, 78, 1)",
    padding: 15,
    borderRadius: 10,
    marginRight: 10
  },
  btnUpdate: {
    backgroundColor: "#27ae60",
    padding: 15,
    borderRadius: 10
  },
  btnText: {
    color: "white",
    fontWeight: "600",
    fontSize: 16
  }
});

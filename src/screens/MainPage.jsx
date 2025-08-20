import { ActivityIndicator, Alert, FlatList, Image, SafeAreaView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { getProducts } from '../redux/slices/productSlice';

const MainPage = ({ navigation }) => {

 

   const { products, loading, error } = useSelector((state) => state.product);


    const dispatch = useDispatch();

    useEffect(() => {
    
         dispatch(getProducts())

    }, [])

   if (loading) {
    return (
        <View style={styles.container}>
            <ActivityIndicator size="large" />
            <Text>Loading products...</Text>
        </View>
    )
}


    if (error) {
        return (
            <View style={styles.container}>
               <Text style={{ color: "red" }}>Error: {error?.message || error}</Text>
            </View>
        )
    }

    if (!loading && products.length === 0) {
    return (
        <View style={styles.container}>
            <Text>No products available</Text>
        </View>
    )
}


    return  (
        <SafeAreaView style={{ flex: 1 }}>
            <FlatList
                data={products}
                keyExtractor={(item) => item.id.toString()}
                renderItem={({ item }) => {
                    return (
                        <TouchableOpacity
                            onPress={() => navigation.navigate('ProductPage', { id: item.id, products})}
                            style={styles.card}>
                            
                            {/* Product Image */}
                            <View style={styles.imgBg}>
                                <Image source={{ uri: item?.imageURL }} style={styles.img} resizeMode='contain' />
                            </View>
                            
                            {/* Product Info */}
                            <View style={styles.textContainer}>
                                <Text style={styles.title}>{item.name}</Text>
                                <Text numberOfLines={2} style={styles.description}>{item.description}</Text>
                                <Text style={styles.brand}>Brand: {item.brand}</Text>
                                <Text style={styles.rating}>⭐ {item.rating}</Text>
                                <Text style={styles.price}>{item.price} $</Text>
                            </View>
                        </TouchableOpacity>
                    )
                }}
            />
        </SafeAreaView>
    )
};

export default MainPage

const styles = StyleSheet.create({
    imgBg: {
        height: 100,
        width: 100,
        backgroundColor: "white",
        margin: 5,
        borderRadius: 10,
        borderWidth: 2,
        borderColor: "rgba(0,0,0,0.2)",
        justifyContent: "center",
        alignItems: "center"
    },
    img: {
        width: "100%",
        height: "100%",
        borderRadius: 10
    },
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center"
    },
    card: {
        flexDirection: "row",
        width: "90%",
        alignSelf: "center",
        borderWidth: 1,
        borderColor: "rgba(0,0,0,0.1)",
        padding: 10,
        borderRadius: 10,
        marginVertical: 10,
        backgroundColor: "#fff",
        elevation: 2
    },
    textContainer: {
        flex: 1,
        paddingHorizontal: 10,
        justifyContent: "center"
    },
    title: {
        fontSize: 16,
        fontWeight: "bold",
        marginBottom: 2
    },
    description: {
        fontSize: 13,
        color: "#555",
        marginBottom: 4
    },
    brand: {
        fontSize: 12,
        color: "#333"
    },
    rating: {
        fontSize: 12,
        color: "#f39c12",
        marginVertical: 2
    },
    price: {
        fontSize: 15,
        fontWeight: "bold",
        color: "purple",
        marginTop: 5
    }
})

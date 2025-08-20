import { View, Text, TouchableOpacity } from 'react-native'
import React from 'react'
import { createStackNavigator } from '@react-navigation/stack';
import MainPage from '../screens/MainPage';
import ProductPage from '../screens/ProductPage';
import CartPage from '../screens/CartPage';
import ProductEditPage from '../screens/ProductEditPage';


const Stack = createStackNavigator();

const RootNavigator = () => {
    return (

        <Stack.Navigator>
            <Stack.Screen
                options={({ navigation }) => ({
                    headerRight: () =>
                        <TouchableOpacity
                            onPress={() => navigation.navigate('CartPage')}
                            style={{
                                alignItems: "center",
                                justifyContent: "center"
                            }}>
                            <Text style={{ marginRight: 20 }}>Create</Text>
                        </TouchableOpacity>
                })}

                name='MainPage' component={MainPage} />
            <Stack.Screen name='ProductPage' component={ProductPage} />
            <Stack.Screen name='ProductEditPage' component={ProductEditPage} />
            <Stack.Screen name='CartPage' component={CartPage} />
        </Stack.Navigator>

    )
}

export default RootNavigator
import {NavigationContainer, useNavigation} from '@react-navigation/native';
import React, {useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  ToastAndroid,
} from 'react-native';
import Icon from 'react-native-vector-icons/dist/FontAwesome';
import AsyncStorage from '@react-native-async-storage/async-storage';
import ProductDetails from './ProductDetails';

export default function Products({productItem}) {
  const navigation = useNavigation();

  const saveProducts = async () => {
    try {
      const temp = JSON.parse(await AsyncStorage.getItem('CART'));
      const arr = temp? temp:[]
      console.log(arr);
      arr.push(productItem);
      await AsyncStorage.setItem('CART', JSON.stringify(arr));
      navigation.navigate('Cart');

    } catch (error) {
      console.log(error);
    }

    // AsyncStorage.getItem('CART')?.then(products => {
    //   const arr = products ? JSON.parse(products) : [];
    //   arr.push(productItem);
    //   AsyncStorage.setItem('CART', JSON.stringify(arr));
    //   navigation.navigate('Cart');
    // });
  };

  return (
    <View style={styles.card}>
      <Image
        resizeMode="cover"
        style={styles.thumb}
        source={{uri: productItem.thumbnail}}
      />

      <TouchableOpacity
        style={styles.btn}
        onPress={() => {
          saveProducts();
        }}>
        <Icon
          style={styles.cartIcon}
          name="cart-plus"
          color="black"
          size={30}
        />
      </TouchableOpacity>

      <View style={styles.infoWrapper}>
        <View style={styles.itemInfoContainer}>
          <Text style={styles.title}>{productItem.title}</Text>
          <Text style={styles.price}>{productItem.price}$</Text>
          <Text style={styles.price}>Qty:{productItem.stock}</Text>
        </View>
        <Text style={styles.description}>{productItem.description}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    marginVertical: 10,
    marginHorizontal: 10,
    backgroundColor: 'white',
    borderRadius: 16,
    shadowOpacity: 0.2,
    shadowColor: 'black',
    shadowRadius: 4,
    shadowOffset: {
      height: 0,
      width: 0,
    },
  },
  thumb: {
    height: 200,
    overflow: 'visible',
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
  },
  infoWrapper: {
    margin: 16,
  },
  itemInfoContainer: {
    flexDirection: 'column',
    justifyContent: 'space-between',
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  price: {
    fontSize: 16,
    fontWeight: '500',
  },
  description: {
    fontSize: 14,
    fontWeight: '300',
    color: '#787878',
  },
  btn: {
    position: 'absolute',
    height: 60,
    width: 60,
    right: 16,
    borderRadius: 80 / 2,
    backgroundColor: 'orange',
    top: 210 - 80 / 2,
  },
  cartIcon: {
    position: 'absolute',
    right: 17,
    top: 15,
  },
});

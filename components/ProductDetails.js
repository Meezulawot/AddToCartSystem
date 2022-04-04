import React, {useEffect, useState, useContext} from 'react';
import {Text, Image, View, Button, StyleSheet} from 'react-native';

export function ProductDetails({productItem}) {
  const arr = [];
  const [products, setProducts] = useState([]);

  const addItemToCart = async(product) => {
    setProducts(prevItems => {
      const item = prevItems.find(item => item.id == product.id);
      if (!item) {
        return [
          ...prevItems,
          {
            item,
          },
        ];
      } else {
        return prevItems.map(item => {
          if (item.id == product.id) {
            // item.qty++;
            item.totalPrice += product.price;
          }
          return item;
        });
      }
    });

    arr.push(products);
    await AsyncStorage.setItem('CART', JSON.stringify(arr));
  };

  return (
    <View style={styles.card}>
      <Image style={styles.image} source={productItem.image} />
      <View style={styles.infoContainer}>
        <Text style={styles.name}>{productItem.name}</Text>
        <Text style={styles.price}>$ {productItem.price}</Text>
        <Text style={styles.description}>{productItem.description}</Text>
        <Button
          onPress={() => {
            navigation.navigate('Cart'), addItemToCart(products);
          }}
        />
      </View>
    </View>
  );
}
const styles = StyleSheet.create({
  card: {
    backgroundColor: 'white',
    borderRadius: 16,
    shadowOpacity: 0.2,
    shadowRadius: 4,
    shadowColor: 'black',
    shadowOffset: {
      height: 0,
      width: 0,
    },
    elevation: 1,
    marginVertical: 20,
  },
  image: {
    height: 300,
    width: '100%',
  },
  infoContainer: {
    padding: 16,
  },
  name: {
    fontSize: 22,
    fontWeight: 'bold',
  },
  price: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 8,
  },
  description: {
    fontSize: 16,
    fontWeight: '400',
    color: '#787878',
    marginBottom: 16,
  },
});

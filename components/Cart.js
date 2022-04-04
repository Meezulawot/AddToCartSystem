import React, {useState, useEffect} from 'react';
import {View, Text, StyleSheet, FlatList, ToastAndroid, TouchableOpacity} from 'react-native';
import {useIsFocused} from '@react-navigation/native'
import CartProduct from './CartProduct';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function Cart() {
  const [cartproducts, setProductsCart] = useState([]);
  const [totalPrice, setTotal] = useState(null);
  const [loading, setLoading] = useState(false);
  const isFocused = useIsFocused();

  const getProducts = async () => {
    try {
      setLoading(true);
      const product = await AsyncStorage.getItem('CART');
      setProductsCart(JSON.parse(product));
      
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
      getTotal(cartproducts);
    }
  };

  //remove data from Cart
  const deleteProduct = async id => {
    try {
      const product = await AsyncStorage.getItem('CART');
      let products = JSON.parse(product);

      const productList = products.filter(item => item.id != id);
      await AsyncStorage.setItem('CART', JSON.stringify(productList));
      getProducts();
    } catch (error) {
      console.log(error);
    }
  };

  //get total price of all items in the cart
  const getTotal = async (productData) => {
    let total = 0;
    productData.forEach(element => {
      console.log(element.price);
      total = total + element.price;
    });

    setTotal(total);
  };

  // const discountedprice =(product)=>{
  //   discountPrice = product.price - ((product.price * product.discountPercentage)/ 100)
  // }

  useEffect(() => {
    getProducts();
  }, [isFocused]);

  return (
    <View style={styles.wrapper}>
      <FlatList
        onRefresh={getProducts}
        refreshing={loading}
        style={styles.productContainer}
        data={cartproducts}
        renderItem={({item}) => (
          <CartProduct item={item} deleteProduct={deleteProduct} />
        )}
      />

      <View style={{paddingHorizontal: 16, marginTop: 40, marginBottom: 80}}>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}>
          <Text style={styles.orderInfoDetails}>Total</Text>
          <Text style={styles.orderInfoDetails}> ${totalPrice}</Text>
        </View>
        
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  productContainer: {
    paddingTop: 10,
    backgroundColor: '#f3f3f3',
  },
  orderInfoDetails: {
    fontSize: 18,
    fontWeight: '500',
    color: 'black',
  },
  btn: {
    backgroundColor: '#c2bad8',
    padding: 9,
    margin: 5,
  }
});

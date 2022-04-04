import React, {useState, useEffect} from 'react';
import {View, Text, StyleSheet, FlatList} from 'react-native';
import Products from './Products';

export default function HomeScreen() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false)
  
    const getProducts = async () => {
        try {
          setLoading(true)
            const response = await fetch('https://dummyjson.com/products');
            const json = await response.json();
            setProducts(json);
        } catch (error) {
            console.error(error); 
        }finally{
          setLoading(false);
        }
    };

  useEffect(() => {
        getProducts();
  }, []);

  return (
    <View style={styles.wrapper}>
      <FlatList
        onRefresh={getProducts}
        refreshing={loading}
        style={styles.productListContainer}
        data={products.products}
        renderItem={({item}) => <Products productItem={item} />}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  productListContainer: {
    paddingTop: 10,
    backgroundColor: '#f3f3f3'
  },
});

//   <View style={styles.wrapper}>

//       <FlatList style={styles.list}
//             data={products}
//             renderItem={({ item }) => (
//                 // <Products item={item}
//                 console.log(item)
//                 // <Text>{item.title}</Text>
//             )}

//         />

//     {/* <Text>Home page</Text>
//     <Button title='Go to Profile' onPress={()=> navigation.navigate('Profile')}/> */}
//   </View>

import React from 'react';
import {View, StyleSheet, Image, Text, TouchableOpacity} from 'react-native';
import Icon from 'react-native-vector-icons/dist/FontAwesome';

export default function ({item, deleteProduct}) {
  
  return (
    <View style={styles.cartProductContainer}>
      <TouchableOpacity style={{position: 'absolute', right: 10}}>
        <Icon name="remove" size={20} onPress={() => deleteProduct(item.id)} />
      </TouchableOpacity>

      <View style={{flexDirection: 'row', marginTop: 20}}>
        <Image style={styles.thumb} source={{uri: item.thumbnail}} />

        <View>
          <Text style={styles.title}>{item.title}</Text>
          <Text>Actual price: {item.price}$</Text>
          {/* <Text>DiscountPercent: {item.discountPercentage}%</Text>
          <Text>
            Discounted price:
            {item.price - (item.price * item.discountPercentage) / 100}$
          </Text> */}
          {/* <View
            style={{
              width: 70,
              flexDirection: 'row',
              justifyContent: 'space-around',
              marginTop: 10,
            }}>
            <TouchableOpacity>
              <Icon name="minus" size={20} color="black"/>
            </TouchableOpacity>

            <Text>0</Text>

            <TouchableOpacity>
              <Icon
                name="plus"
                size={20}
                color="black"
                // onPress={() => setCount(parseInt(count) - 1)}
              />
            </TouchableOpacity>
          </View> */}
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  cartProductContainer: {
    marginVertical: 10,
    marginHorizontal: 10,
    paddingVertical: 10,
    paddingHorizontal: 5,
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
    height: 90,
    width: 100,
    marginHorizontal: 10,
  },
  title: {
    width: 250,
  },
});

import React from 'react';
import { NavigationContainer} from '@react-navigation/native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import HomeScreen from './components/HomeScreen';
import Cart from './components/Cart';

// function NotificationScreen() {
//   const navigation = useNavigation();
//   return (
//     <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
//       <Text>Details Screen</Text>
//       <Button title="Go back" onPress={() => navigation.goBack()} />
//       <Button title="Go back to first" 
//       onPress={() => navigation.canGoBack()} />
//     </View>
//   );
// }

// function ProfileScreen({navigation}) {
//   return (
//     <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
//       <Text>Profile page</Text>
//       <Button title="Go back" onPress={() => navigation.goBack()} />
//       <Button title='Go to Notification' onPress={()=> navigation.navigate('Notification')}/>
//     </View>
//   )
// }

// function ChatScreen() {
//   return (
//     <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
//       <Text>Chat page</Text>
//     </View>
//   )
// }

const Drawer = createDrawerNavigator();
function NavDrawer() {
  return (
    <Drawer.Navigator initialRouteName='Home' >
      <Drawer.Screen name='Home' component={HomeScreen} />
      <Drawer.Screen name='Cart' component={Cart} />
      {/* <Drawer.Screen name='Profile' component={ProfileScreen} />
      <Drawer.Screen name='Chat' component={ChatScreen} /> */}
    </Drawer.Navigator>
  )
}

export default function App() {
  return (
    <NavigationContainer>
      <NavDrawer />
    </NavigationContainer>
  )
}

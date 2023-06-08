import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { StatusBar } from 'expo-status-bar';
import Allplaces from './screen/AllPlaces';
import AddPlace from './screen/AddPlace';
import IconButton from './component/UI/IconButton';
import {Colors} from './constants/colors';
import Map from './screen/Map';
import { useEffect, useState } from 'react';
import { init } from './util/database';
import AppLoading from 'expo-app-loading';
import PlaceDetail from './screen/PlaceDetail';

const Stack = createNativeStackNavigator();

export default function App() {
  const [dbInitialized, setDbInitialized] = useState(false);

  useEffect(() =>{
    init()
      .then(() => {
        console.log("db Initialized");
        setDbInitialized(true);
      })
      .catch((error) =>{
        console.log("error: " + error);
      });
      
  },[])

  return (
    <>
      <StatusBar style='auto'/>
      <NavigationContainer>
        <Stack.Navigator initialRouteName='AllPlaces' screenOptions={{
          headerStyle: {backgroundColor: Colors.primary500},
          headerTintColor: Colors.gray700,
          contentStyle: {backgroundColor: Colors.gray700}
        }}
        >
          <Stack.Screen name='AllPlaces' component={Allplaces} options={({navigation}) => ({
            headerRight: () => <IconButton name="add" color="black" size={24} onPress={() => navigation.navigate("AddPlace")}/>,
            title: 'Your favorite places'
          })}
          />
          <Stack.Screen name='AddPlace' component={AddPlace} options={{
            title: "Add new place"
          }}
          />
          <Stack.Screen name='Map' component={Map}/>
          <Stack.Screen name='PlaceDetail' component={PlaceDetail} options={{title: "Loading place ..."}}/>
        </Stack.Navigator>
      </NavigationContainer>
    </>
  );
}

import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import SelectDishes from '../screens/SelectDishes';
import DishDetail from '../screens/DishDetail';

type Props = {};

const NavigationHandler = (props: Props) => {
  const Stack = createNativeStackNavigator();

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Select Dishes">
        <Stack.Screen name="Select Dishes" component={SelectDishes} />
        <Stack.Screen name="Dish Detail" component={DishDetail}  />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default NavigationHandler;

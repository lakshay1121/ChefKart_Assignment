import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  ScrollView,
  TouchableOpacity,
  ImageBackground,
  ActivityIndicator,
} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import axios from 'axios';

import {ALL_DETAILS} from '@env';

type Props = {};

const SelectDishes = ({navigation}) => {
  const [selectedCuisine, setSelectedCuisine] = useState('');
  const [popularDishesData, setPopularDishesData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [dishes, setDishes] = useState([]);

  const cuisineData = [
    'Indian',
    'Chinese',
    'Italian',
    'Mexican',
    'Japanese',
    'Thai',
    'Greek',
  ];

  const handleCuisineSelection = cuisine => {
    setSelectedCuisine(cuisine);
  };

  useEffect(() => {
    axios
      .get(ALL_DETAILS)
      .then(response => {
        setPopularDishesData(response?.data?.popularDishes);
        setDishes(response?.data?.dishes);
        setIsLoading(false);
      })
      .catch(error => {
        console.log('this is error', error);
        setIsLoading(false);
      });
  }, []);

  return (
    <SafeAreaView style={styles.mainContainer}>
      <View style={styles.blackBox}></View>
      <View style={styles.calendarAndTimeContainer}>
        <View style={styles.calendarContainer}>
          <Image
            style={styles.calendarTimeIcon}
            source={require('../assets/icons/calendar.png')}
          />
          <Text style={{color: 'black', fontSize: 12, fontWeight: '700'}}>
            21 May 2021
          </Text>
        </View>
        <View style={styles.timeContainer}>
          <Image
            style={styles.calendarTimeIcon}
            source={require('../assets/icons/clock.png')}
          />
          <Text style={{color: 'black', fontSize: 12, fontWeight: '700'}}>
            10:30 Pm-12:30 Pm
          </Text>
        </View>
      </View>

      <ScrollView
        contentContainerStyle={styles.cuisineContainer}
        horizontal={true}>
        {cuisineData.map((cuisine, index) => (
          <TouchableOpacity
            key={index}
            style={[
              styles.cuisineButton,
              selectedCuisine === cuisine && styles.selectedCuisineButton,
            ]}
            onPress={() => {
              setSelectedCuisine(cuisine);
            }}>
            <Text
              style={{
                color: selectedCuisine === cuisine ? '#FF941A' : '#8A8A8A',
                fontSize: 10,
              }}>
              {cuisine}
            </Text>
          </TouchableOpacity>
        ))}
      </ScrollView>

      <Text
        style={{
          color: 'black',
          fontSize: 14,
          fontWeight: '900',
          alignSelf: 'flex-start',
          marginLeft: 20,
          top: -40,
        }}>
        Popular Dishes
      </Text>

      {isLoading ? (
        <ActivityIndicator size="large" color="orange" />
      ) : (
        <ScrollView
          contentContainerStyle={styles.popularDishesScrollView}
          horizontal={true}>
          {popularDishesData.map((dish, index) => (
            <View style={styles.popularDishesContainer} key={index}>
              <ImageBackground
                style={styles.imageBackground}
                imageStyle={styles.image}
                source={{uri: dish.image}}>
                <View style={styles.overlay}></View>
                <Text style={styles.dishName}>{dish.name}</Text>
              </ImageBackground>
            </View>
          ))}
        </ScrollView>
      )}

      <ScrollView contentContainerStyle={styles.dishesScrollView}>
        <View style={styles.menuContainer}>
          <View style={styles.recommendedContainer}>
            <Text
              style={{
                fontSize: 16,
                color: 'black',
                fontWeight: '900',
                marginRight: 5,
              }}>
              Recommended
            </Text>
            <Image source={require('../assets/icons/downArrow.png')} />
          </View>

          <TouchableOpacity style={styles.menuButton}>
            <Text style={{fontSize: 10, color: 'white'}}>Menu</Text>
          </TouchableOpacity>
        </View>
        {isLoading ? (
          <ActivityIndicator size="large" color="orange" />
        ) : (
          <View style={styles.dishesContainer}>
            {dishes.map((dish, index) => (
              <View style={styles.dishContainer} key={index}>
                <View>
                  <View style={styles.dishNameContainer}>
                    <Text
                      style={{
                        color: 'black',
                        fontSize: 12,
                        fontWeight: '700',
                        marginRight: 8,
                        marginLeft: 8,
                      }}>
                      {dish.name}
                    </Text>
                    <Image
                      source={require('../assets/icons/veg.png')}
                      style={{width: 8, height: 8, marginRight: 8}}
                    />
                    <View style={styles.ratingView}>
                      <Text
                        style={{color: 'white', fontSize: 6, marginRight: 1}}>
                        {dish.rating}
                      </Text>
                      <Image
                        source={require('../assets/icons/star.png')}
                        style={{width: 4, height: 4}}
                      />
                    </View>
                  </View>

                  <View style={styles.otherDetailsView}>
                    <View
                      style={{
                        flexDirection: 'row',
                        justifyContent: 'center',
                        alignItems: 'center',
                      }}>
                      <View style={styles.fridgeContainer}>
                        {dish.equipments.map((equipment, index) => (
                          <View
                            key={index}
                            style={{
                              justifyContent: 'center',
                              alignItems: 'center',
                              width: 50,
                              height: 50,
                            }}>
                            <Image
                              source={require('../assets/icons/fridge.png')}
                            />
                            <Text style={{color: 'black', fontSize: 4}}>
                              {equipment}
                            </Text>
                          </View>
                        ))}
                      </View>

                      <View style={styles.ingredientsContainer}>
                        <Text
                          style={{
                            color: 'black',
                            fontSize: 6,
                            fontWeight: '700',
                          }}>
                          Ingredients
                        </Text>
                        <View style={styles.viewList}>
                          <TouchableOpacity
                            style={styles.viewListButton}
                            onPress={() => {
                              navigation.navigate('Dish Detail');
                            }}>
                            <Text
                              style={{
                                color: 'white',
                                fontSize: 8,
                                marginRight: 2,
                              }}>
                              View List
                            </Text>
                          </TouchableOpacity>
                        </View>
                      </View>
                    </View>

                    <Text style={{color: '#707070', fontSize: 8, marginTop: 5}}>
                      {dish.description}
                    </Text>
                  </View>
                </View>

                <View style={styles.dishImageContainer}>
                  <Image source={{uri: dish.image}} style={styles.dishImage} />
                  <TouchableOpacity style={styles.addDishButton}>
                    <Text style={{color: '#FF9A26'}}>Add</Text>
                  </TouchableOpacity>
                </View>
              </View>
            ))}
          </View>
        )}
      </ScrollView>
    </SafeAreaView>
  );
};

export default SelectDishes;

const styles = StyleSheet.create({
  addDishButton: {
    width: 58,
    height: 21,
    borderColor: '#FF9A26',
    borderWidth: 1,
    borderRadius: 3,
    justifyContent: 'center',
    alignItems: 'center',
    top: -15,
    backgroundColor: 'white',
  },
  blackBox: {
    width: '100%',
    height: 42,
    backgroundColor: 'black',
  },
  calendarAndTimeContainer: {
    width: 350,
    height: 63,
    backgroundColor: 'white',
    borderRadius: 9,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 5,
    position: 'absolute',
    top: 25,
    zIndex: 1,
  },
  calendarContainer: {
    display: 'flex',
    flexDirection: 'row',
    marginRight: 80,
  },
  calendarTimeIcon: {
    width: 16,
    height: 16,
    marginRight: 9,
  },
  cuisineContainer: {
    height: 80,
    marginTop: 40,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    marginBottom: 40,
  },
  cuisineButton: {
    width: 76,
    height: 24,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 17,
    borderWidth: 0.5,
    borderColor: '#8A8A8A',
    marginRight: 10,
  },

  dishesScrollView: {
    width: '100%',
    marginTop: 50,
    marginBottom: 50,
    top: -50,
  },
  dishesContainer: {
    flexGrow: 1,
    marginTop: 40,
    marginBottom: 20,
  },
  dishContainer: {
    flexDirection: 'row',
    marginBottom: 28,
  },
  dishImageContainer: {
    width: 100,
    justifyContent: 'center',
    alignItems: 'center',
  },
  dishNameContainer: {
    width: 125,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  dishName: {
    fontSize: 10,
    margin: 10,
    marginTop: 17,
  },
  dishImage: {
    width: 92,
    height: 68,
  },
  fridgeContainer: {
    flexDirection: 'row',
    marginRight: 20,
  },
  imageBackground: {
    width: 60,
    height: 60,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    borderRadius: 30,
  },
  image: {
    borderRadius: 30,
  },

  mainContainer: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
    backgroundColor: 'white',
    display: 'flex',
  },
  menuContainer: {
    flexDirection: 'row',
  },
  menuButton: {
    width: 56,
    height: 22,
    backgroundColor: 'black',
    borderRadius: 6,
    justifyContent: 'center',
    alignItems: 'center',
  },
  otherDetailsView: {
    width: 180,
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 10,
    marginRight: 82,
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    borderRadius: 30,
  },

  popularDishesScrollView: {
    top: -20,
  },

  popularDishesContainer: {
    margin: 12,
    marginBottom: 50,
    marginTop: 20,
  },

  popularDishText: {
    fontSize: 14,
    color: 'black',
    fontWeight: '900',
    top: -225,
    alignSelf: 'flex-start',
    marginLeft: 20,
  },

  popularDishesIcon: {
    resizeMode: 'contain',
  },

  recommendedContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 170,
  },

  ratingView: {
    width: 22,
    height: 10,
    flexDirection: 'row',
    backgroundColor: '#51C452',
    justifyContent: 'center',
    alignItems: 'center',
  },

  selectedCuisineButton: {
    borderColor: '#FF941A',
  },

  timeContainer: {
    display: 'flex',
    flexDirection: 'row',
  },

  viewList: {
    width: 60,
    height: 10,
    flexDirection: 'row',
  },
  viewListButton: {
    backgroundColor: '#FF8800',
    width: 50,
    height: 20,
    borderRadius: 3,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 2,
  },
});

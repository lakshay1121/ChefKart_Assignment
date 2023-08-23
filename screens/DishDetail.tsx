import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  ScrollView,
  ActivityIndicator,
} from 'react-native';
import axios from 'axios';
import {ONE_DETAIL} from '@env';

type Props = {};

const DishDetail = (props: Props) => {
  const [isLoading, setIsLoading] = useState(true);
  const [vegetables, setVegetables] = useState([]);
  const [spices, setSpices] = useState([]);
  const [appliances, setAppliances] = useState([]);

  useEffect(() => {
    axios
      .get(ONE_DETAIL)
      .then(response => {
        setVegetables(response?.data?.ingredients?.vegetables);
        setSpices(response?.data?.ingredients?.spices);
        setAppliances(response?.data?.ingredients?.appliances);
        setIsLoading(false);
      })
      .catch(error => {
        console.log('this is error', error);
        setIsLoading(false);
      });
  }, []);

  return (
    <View style={styles.mainContainer}>
      <View style={styles.dishHeaderContainer}>
        <View style={styles.dishNameContainer}>
          <Text
            style={{
              fontSize: 23,
              fontWeight: '900',
              color: 'black',
              marginRight: 10,
            }}>
            Mashala Muglai
          </Text>
          <View style={styles.ratingView}>
            <Text style={{color: 'white', fontSize: 6, marginRight: 1}}>
              4.2
            </Text>
            <Image
              source={require('../assets/icons/star.png')}
              style={{width: 4, height: 4}}
            />
          </View>
        </View>

        <View style={styles.descriptionContainer}>
          <Text style={{color: '#A3A3A3', fontSize: 8, letterSpacing: 0.16}}>
            Mughlai Masala is a style of cookery developed in the Indian
            Subcontinent by the imperial kitchens of the Mughal Empire.
          </Text>
        </View>

        <View style={styles.dishImageView}>
          <View style={styles.timeContainer}>
            <Image
              source={require('../assets/icons/clock.png')}
              style={{width: 12, height: 12, marginRight: 4}}
            />
            <Text style={{color: 'black', fontSize: 10, fontWeight: '900'}}>
              1 Hour
            </Text>
          </View>

          <View>
            <Image
              source={require('../assets/images/ingredients.png')}
              style={{width: 370, height: 150, left: 120}}
            />
            <Image
              source={require('../assets/images/ingredientsBasket.png')}
              style={{width: 350, height: 215, left: 200, top: -200}}
            />
          </View>
        </View>

        <View style={styles.horizontalLine}></View>
      </View>

      <View style={styles.ingredients}>
        <Text style={{color: 'black', fontSize: 16, fontWeight: '900'}}>
          Ingredients
        </Text>
        <Text style={{color: '#8A8A8A', fontSize: 8}}>For 3 people</Text>
      </View>
      <View
        style={{
          borderBottomColor: '#F2F2F2',
          borderBottomWidth: 3,
          marginVertical: 10,
          width: '100%',
          top: -10,
        }}></View>

      {isLoading ? (
        <ActivityIndicator
          style={styles.loadingIndicator}
          size="large"
          color="orange"
        />
      ) : (
        <View style={styles.loadingContainer}>
          <View style={styles.vegetablesContainer}>
            <Text
              style={{
                fontSize: 12,
                fontWeight: '900',
                color: 'black',
                marginRight: 10,
              }}>
              Vegetables (03)
            </Text>
            <Image source={require('../assets/icons/downArrow.png')} />
          </View>
          <View style={{marginBottom: 15}}>
            {vegetables.map((vegetable, index) => (
              <View style={styles.ingredientContainer} key={index}>
                <Text style={{color: 'black', fontSize: 10, marginRight: 250}}>
                  {vegetable.name}
                </Text>
                <Text style={{color: 'black', fontSize: 10}}>
                  {vegetable.quantity}
                </Text>
              </View>
            ))}
          </View>

          <View style={styles.vegetablesContainer}>
            <Text
              style={{
                fontSize: 12,
                fontWeight: '900',
                color: 'black',
                marginRight: 10,
              }}>
              Spices (02)
            </Text>
            <Image source={require('../assets/icons/downArrow.png')} />
          </View>

          <View style={{marginBottom: 15}}>
            {spices.map((spice, index) => (
              <View style={styles.spicesContainer} key={index}>
                <Text style={{color: 'black', fontSize: 10, marginRight: 250}}>
                  {spice.name}
                </Text>
                <Text style={{color: 'black', fontSize: 10}}>
                  {spice.quantity}
                </Text>
              </View>
            ))}
          </View>

          <View style={styles.vegetablesContainer}>
            <Text
              style={{
                fontSize: 12,
                fontWeight: '900',
                color: 'black',
                left: -18,
                marginBottom: 5,
              }}>
              Appliances
            </Text>
          </View>

          <View style={styles.fridgeContainer}>
            {appliances.map((appliance, index) => (
              <View style={styles.fridge} key={index}>
                <Image
                  source={require('../assets/images/fridge.png')}
                  style={styles.fridgeImage}
                />
                <Text style={{fontSize: 8, color: 'black'}}>
                  {appliance.name}
                </Text>
              </View>
            ))}
          </View>
        </View>
      )}
    </View>
  );
};

export default DishDetail;

const styles = StyleSheet.create({
  dishNameContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    width: 210,
    marginLeft: 10,
    top: 80,
  },
  dishHeaderContainer: {
    top: -10,
  },
  descriptionContainer: {
    width: 160,
    height: 82,
    marginLeft: 15,
    marginTop: 8,
    top: 80,
  },

  dishImageView: {
    height: 200,
  },

  fridgeContainer: {
    flexDirection: 'row',
    left: -45,
  },
  fridge: {
    width: 72,
    height: 95,
    backgroundColor: '#F5F5F5',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 7,
    marginRight: 10,
  },

  fridgeImage: {
    width: 30,
    height: 55,
  },
  horizontalLine: {
    borderBottomColor: '#F2F2F2',
    borderBottomWidth: 3,
    marginVertical: 10,
    top: -20,
  },

  ingredientContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    left: -6,
    marginBottom: 10,
  },
  ingredients: {
    alignSelf: 'flex-start',
    marginLeft: 20,
    top: -20,
  },

  loadingContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  mainContainer: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
    backgroundColor: 'white',
    display: 'flex',
  },

  spicesContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
  },

  ratingView: {
    width: 22,
    height: 10,
    flexDirection: 'row',
    backgroundColor: '#51C452',
    justifyContent: 'center',
    alignItems: 'center',
  },

  timeContainer: {
    flexDirection: 'row',
    top: 100,
    marginLeft: 30,
  },

  vegetablesContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    left: -118,
    marginBottom: 10,
  },
});

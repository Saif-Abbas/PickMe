import React from 'react';
import { View, Text, Image } from 'react-native';
import ModalHeader from '../components/ModalHeader';
import { gStyle } from '../constants';

const TripHistory = () => {
  const trips = [
    {
      id: 1,
      driver: {
        name: 'Ahmed AlGhamdi',
        rating: 4.8,
        car: 'Ford Expedition',
        picture: '../assets/icon.png'
      },
      from: 'University Of Jeddah',
      to: 'An Nuzhah',
      cost: '25ر.س'
    },
    {
      id: 2,
      driver: {
        name: 'Mohammed AlQahtani',
        rating: 4.2,
        car: 'Hyundai Elantra',
        picture: '../assets/icon.png'
      },
      from: 'Almarwah',
      to: 'Prince Abdul Majeed',
      cost: '15ر.س'
    }
    // Add more trips as needed
  ];
  return (
    <View style={gStyle.container}>
      <ModalHeader text={'Trip History'} />

      {trips.map((trip) => (
        <View style={gStyle.tripContainer} key={trip.id}>
          <Image
            source={require('../assets/icon.png')}
            style={gStyle.driverImage}
          />
          <View style={gStyle.tripDetails}>
            <View style={gStyle.driverInfo}>
              <Text style={gStyle.driverName}>{trip.driver.name}</Text>
              <Text style={gStyle.driverRating}>
                Rating: {trip.driver.rating}
              </Text>
              <Text style={gStyle.driverCar}>Car: {trip.driver.car}</Text>
            </View>
            <View style={gStyle.tripRoute}>
              <Text style={gStyle.routeText}>
                From: {trip.from} - To: {trip.to}
              </Text>
              <Text style={gStyle.tripCost}>{trip.cost}</Text>
            </View>
          </View>
        </View>
      ))}
    </View>
  );
};

export default TripHistory;

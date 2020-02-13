import * as Location from 'expo-location';

const tenMeterswithDegrees = 0.0001;

const getLocation = increment => {
  return{
    timestamp: 10000000,
    coords:{
      speed: 0,
      heading: 0,
      accuracy: 5,
      altitudeAccuracy: 5,
      altitude: 5,
      longitude: 100.469405 + increment *tenMeterswithDegrees,
      latitude: 13.658213 + increment *tenMeterswithDegrees
    }
  };
};

let counter =0;
setInterval(()=> {
  Location.EventEmitter.emit('Expo.locationChanged',{
      watchID: Location._getCurrentWatchId(),
      location: getLocation(counter)
  });
  counter++;
}, 1000);

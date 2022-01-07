import React, {useEffect, useRef, useState} from 'react';
import {View, Text, Image} from 'react-native';
import MapView, {Marker, Polyline, PROVIDER_GOOGLE} from 'react-native-maps';
import useLocation from '../hooks/useLocation';
import {mapDark, mapLigth} from '../mapTheme/mapTheme';
import LoadingScreen from '../pages/LoadingScreen';
import Fab from './Fab';

const Maps = () => {
  const {
    hasLocation,
    initialPosition,
    userLocation,
    getCurrentLocation,
    followUserLocation,
    stopFollowUserLocation,
    routeLine,
  } = useLocation();

  //vamos a crear un useRef para matener la referencia de la location del usuario y poder centralizarlo sin renderizar
  const mapViewRef = useRef<MapView>();
  const following = useRef<boolean>(true);
  const [showPolyLine, setShowPolyLine] = useState(true);
  const [fixAngle, setFixAngle] = useState(false);
  const [MapDark, setMapDark] = useState(false);

  useEffect(() => {
    followUserLocation();
    return () => {
      stopFollowUserLocation();
    };
  }, []);
  //cada vez que userLocation cambie llamamos al animateCamera
  useEffect(() => {
    const {latitude, longitude} = userLocation;
    if (!following.current) {
      return;
    }
    mapViewRef.current?.animateCamera({
      center: {latitude, longitude},
      zoom: 30,
    });
  }, [userLocation]);

  const centerPosition = async () => {
    const {latitude, longitude} = await getCurrentLocation();

    mapViewRef.current?.animateCamera({
      //con el animatedCamera en el centro vamos a hacer que camara vaya al centro de las coordenadas que le etsmaos pasando
      center: {latitude, longitude},
      zoom: 15,
      pitch: 50,

      // heading: 20,
    });
    following.current = true;
    // mapViewRef.current?.animateToNavigation(
    //   {latitude, longitude},
    //   50, //bearing
    //   45, //angulo
    //   5000,//duration
    // );
  };
  const fixPosition = async () => {
    const {latitude, longitude} = await getCurrentLocation();
    mapViewRef.current?.animateCamera({
      center: {latitude, longitude},
      zoom: 15,
      pitch: 0,
    });
    following.current = true;
  };

  //lanzmaos el loading si aun no obtenemos las coordenadas del usuario
  if (!hasLocation) {
    return <LoadingScreen />;
  }
  return (
    <>
      <Fab
        iconName="navigate-circle-outline"
        onPress={() => {
          centerPosition();
          setFixAngle(true);
        }}
        style={{position: 'absolute', bottom: 15, right: 15}}
        title="navigate"
      />
      {!MapDark ? (
        <Fab
          iconName="moon-outline"
          onPress={() => setMapDark(true)}
          style={{position: 'absolute', top: 60, right: 15}}
          title="navigate"
        />
      ) : (
        <Fab
          iconName="sunny-outline"
          onPress={() => setMapDark(false)}
          style={{position: 'absolute', top: 60, right: 15}}
          title="navigate"
        />
      )}

      <Fab
        iconName="analytics-outline"
        onPress={() => setShowPolyLine(false)}
        style={{position: 'absolute', bottom: 70, right: 15}}
        title="navigate"
      />
      {fixAngle && (
        <Fab
          iconName="shuffle-outline"
          onPress={() => fixPosition()}
          style={{position: 'absolute', bottom: 125, right: 15}}
          title="navigate"
        />
      )}
      <MapView
        provider={PROVIDER_GOOGLE}
        customMapStyle={MapDark ? mapDark : mapLigth}
        // showsPointsOfInterest
        ref={el => (mapViewRef.current = el!)} //y aqui usamos el ref
        showsUserLocation
        style={{flex: 1}}
        zoomEnabled
        //onTouchStart es cuando empezamos a mover el mapa a otro lado , entonces paralizamos el seguimiento con el Ref
        onTouchStart={() => {
          following.current = false;
          setFixAngle(false);
        }}
        initialRegion={{
          //si no quieres poner signos de admiracion aqui ve a initialState y agregale altitud: 0, longitude: 0 como valores inicales y ya
          latitude: initialPosition!.latitude,
          longitude: initialPosition!.longitude,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        }}>
        <Marker
          opacity={0.8}
          style={{
            flex: 1,
          }}
          image={require('../assets/custom-marker.png')}
          coordinate={{
            latitude: initialPosition!.latitude,
            longitude: initialPosition!.longitude,
          }}
          title="Position"
          description="do you want send this position a your friends?">
          <>
            <View
              style={{
                flex: 1,
                // backgroundColor: 'white',
                justifyContent: 'center',
                alignItems: 'center',
                borderRadius: 50,
              }}>
              <Image
                style={{
                  // backgroundColor: 'black',
                  width: 65,
                  height: 65,
                  borderRadius: 50,
                }}
                source={{
                  uri: 'https://w7.pngwing.com/pngs/914/159/png-transparent-emoji-smiley-iphone-text-messaging-man-emoji-men-face-head-smiley.png',
                }}
              />

              <Text
                style={{
                  backgroundColor: 'black',
                  color: 'white',
                  fontSize: 13,
                  fontWeight: 'bold',
                  borderRadius: 30,
                }}>
                Estas aqui
              </Text>
            </View>
          </>
        </Marker>
        {showPolyLine && (
          <Polyline
            coordinates={routeLine}
            strokeColor="black"
            strokeWidth={3}
          />
        )}
      </MapView>
    </>
  );
};

export default Maps;

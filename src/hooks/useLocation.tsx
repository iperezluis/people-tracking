import Geolocation from '@react-native-community/geolocation';
import React, {useEffect, useRef, useState} from 'react';

import {Location} from '../interfaces/appInterfaces';

const useLocation = () => {
  const [hasLocation, setHasLocation] = useState(false);
  const [initialPosition, setInitialPosition] = useState<Location>();
  const WatchId = useRef<number>();
  const isMounted = useRef(true);
  //este routeLine es un arreglo que usaremos para almacenar todas las coordenadas del polilyne
  const [routeLine, setRouteLine] = useState<Location[]>([]);
  //creamos el state para usarlo en el wacthPosition
  const [userLocation, setUserLocation] = useState<Location>({
    longitude: 0,
    latitude: 0,
  });

  useEffect(() => {
    isMounted.current = true;
    return () => {
      isMounted.current = false;
    };
  }, []);

  useEffect(() => {
    getCurrentLocation()
      .then(location => {
        if (!isMounted) {
          return;
        }
        setInitialPosition(location);
        setUserLocation(location);
        setRouteLine(routes => [...routeLine, location]);
        setHasLocation(true);
      })
      .catch(err => console.log(err));
  }, []);

  const getCurrentLocation = (): Promise<Location> => {
    //aseguremoinos de hacer el return de la promesa
    return new Promise((resolve, reject) => {
      Geolocation.getCurrentPosition(
        ({coords}) => {
          if (!isMounted) {
            return;
          }
          //extraermos las coordenadas del usuario y las almacenamos en las variables Props que creamos
          resolve({
            longitude: coords.longitude,
            latitude: coords.latitude,
          });
        },
        err => reject(console.log(err)),
        {
          enableHighAccuracy: true,
        },
      );
    });
  };

  const followUserLocation = () => {
    WatchId.current = Geolocation.watchPosition(
      ({coords}) => {
        const location: Location = {
          latitude: coords.latitude,
          longitude: coords.longitude,
        };

        setUserLocation(location);
        setRouteLine(routes => [...routeLine, location]);
        console.log(userLocation);
      },
      err => console.log(err),
      {
        enableHighAccuracy: true,
        distanceFilter: 10, // a cada 10 metros va a actualizar la camara a la posicion
      },
    );
  };
  //obtenemos el id del Wacth y lo almacenamos en el clearWatch para removerlo en el useEffect
  const stopFollowUserLocation = () => {
    if (WatchId.current) {
      Geolocation.clearWatch(WatchId.current);
    }
  };
  return {
    initialPosition,
    hasLocation,
    userLocation,
    getCurrentLocation,
    followUserLocation,
    stopFollowUserLocation,
    routeLine,
  };
};

export default useLocation;

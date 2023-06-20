import React from "react";
import MapView, { Marker } from "react-native-maps";
import { StyleSheet, View } from "react-native";
import { StatusBar } from "expo-status-bar";

let locationsOfInteres = [
  {
    title: "Primer",
    location: {
      latitude: 42.73,
      longitude: -1.74,
    },
    description: "Monte el Perdón Navarra",
  },
  {
    title: "Segundo",
    location: {
      latitude: 42.48,
      longitude: -1.5,
    },
    description: "Cabezon de Etxauri",
  },
  {
    title: "Tercero",
    location: {
      latitude: 43.1,
      longitude: -1.34,
    },
    description: "Monte Legate",
  },
  {
    title: "Cuarto",
    location: {
      latitude: 43.3,
      longitude: -1.33,
    },
    description: "Monte Legate",
  },
];
export default function Map() {
  const regionChange = (region) => {
    console.log(region);
  };
  const mapaDeInteres = () => {
    return locationsOfInteres.map((item, index) => {
      return (
        <Marker
          key={index}
          coordinate={item.location}
          title={item.title}
          description={item.description}
        />
      );
    });
  };
  return (
    <View style={styles.container}>
      <MapView
        style={styles.map}
        onRegionChange={regionChange}
        initialRegion={{
          latitude: 42.76600122671833,
          latitudeDelta: 1.1240035375714612,
          longitude: -1.6698580048978329,
          longitudeDelta: 1.0954104736447334,
        }}
      >
        {mapaDeInteres()}
      </MapView>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  map: {
    width: "100%",
    height: "100%",
  },
});

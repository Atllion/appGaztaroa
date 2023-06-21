import React, { useRef } from "react";
import { TouchableOpacity, StyleSheet, View } from "react-native";
import MapView, { Callout, Marker } from "react-native-maps";
import { StatusBar } from "expo-status-bar";
import { Text } from "react-native";
import * as FileSystem from "expo-file-system";
import { captureRef } from "react-native-view-shot";
import { useState } from "react";
import { Button } from "react-native";
import * as Sharing from "expo-sharing";

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
      longitude: -1.51,
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
  const [moveMarker, setMoveMarker] = useState({
    latitude: 42.76600122671833,
    longitude: -1.6698580048978329,
  });
  const regionChange = (region) => {
    // console.log(region);
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
  const mapReference = useRef();
  console.log("El componente se está renderizando correctamente");
  const takeCapture = async () => {
    console.log("Se ha presionado el botón de captura");
    const capture = await captureRef(mapReference, {
      format: "png",
      quality: 1,
    });

    console.log("Captura realizada:", capture);
  };

  return (
    <View style={styles.container}>
      <MapView
        ref={mapReference}
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
        <Marker
          draggable
          pinColor="#009DDF"
          coordinate={moveMarker}
          onDragEnd={(e) => setMoveMarker(e.nativeEvent.coordinate)}
        >
          <Callout>
            <Text>Localización del puntero</Text>
            <Button title="Capturar ubicación" onPress={takeCapture} />
          </Callout>
        </Marker>
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
  button: {
    padding: 10,
    margin: 10,
    backgroundColor: "blue",
    borderRadius: 5,
  },
  buttonText: {
    color: "white",
    textAlign: "center",
  },
});

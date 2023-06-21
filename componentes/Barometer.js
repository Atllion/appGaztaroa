import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Platform,
} from "react-native";
import { Barometer } from "expo-sensors";
import { Magnetometer } from "expo-sensors";
import { Image } from "react-native";

export default function Baarometro() {
  const [data, setData] = useState({ x: 0, y: 0, z: 0 });
  const [rotation, setRotation] = useState(0);
  useEffect(() => {
    const subscription = Magnetometer.addListener((result) => {
      const { x, y, z } = result;
      const angle = Math.atan2(y, x) * (180 / Math.PI);
      setRotation(angle);
    });

    return () => {
      subscription.remove();
    };
  }, []);

  return (
    <View style={styles.container}>
      <Image
        style={[
          styles.imagenBrujula,
          { transform: [{ rotate: `${rotation}deg` }] },
        ]}
        source={require("./imagenes/brujula.png")}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  text: {
    fontSize: 20,
    fontWeight: "bold",
  },
  imagenBrujula: {
    width: 300,
    height: 300,
  },
});

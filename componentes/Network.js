import React, { useState, useEffect } from "react";
import { StyleSheet, Text, View, Image } from "react-native";
import NetInfo from "@react-native-community/netinfo";
import * as Battery from "expo-battery";
import baja from "./bateria/baja.png";
import media from "./bateria/media.png";
import alta from "./bateria/alta.png";
import { Button } from "react-native-elements";
import { MailComposer } from "expo";
import { CheckBox } from "react-native-elements";

export default function RedInfo() {
  const [connectionType, setConnectionType] = useState(null);
  const [isConnected, setIsConnected] = useState(false);
  const [details, setDetails] = useState(null);
  const [batteryLevel, setBatteryLevel] = useState(null);
  const [batteryImage, setBatteryImage] = useState(null);
  const [isChecked, setIsChecked] = useState(false);

  const sendEmail = () => {
    // Configurar el objeto de correo
    const emailConfig = {
      recipients: ["destinatario@example.com"],
      subject: "Asunto del correo",
      body: "Cuerpo del correo",
      isHtml: false,
    };
    MailComposer.composeAsync(emailConfig);
  };

  useEffect(() => {
    const unsubscribe = NetInfo.addEventListener((state) => {
      setConnectionType(state.type);
      setIsConnected(state.isConnected);
      setDetails(state.details);
    });

    return () => {
      unsubscribe();
    };
  }, []);

  useEffect(() => {
    const getBatteryLevel = async () => {
      const batteryInfo = await Battery.getBatteryLevelAsync();
      setBatteryLevel(batteryInfo);
    };

    getBatteryLevel();
  }, []);

  useEffect(() => {
    const updateBatteryImage = () => {
      const image = getBatteryImage();
      setBatteryImage(image);
    };

    updateBatteryImage();
  }, [batteryLevel]);

  const getBatteryImage = () => {
    if (batteryLevel !== null) {
      if (batteryLevel < 0.3) {
        return baja;
      } else if (batteryLevel < 0.7) {
        return media;
      } else {
        return alta;
      }
    } else {
      return null;
    }
  };

  const handleCheckboxChange = () => {
    setIsChecked(!isChecked);
  };

  return (
    <View style={styles.container}>
      <CheckBox value={isChecked} onValueChange={handleCheckboxChange} />
      {details && (
        <View style={styles.detailsContainer}>
          <Button
            title="Enviar correo"
            onPress={sendEmail}
            color="#841584"
            accessibilityLabel="Learn more about this purple button"
          />

          <Text style={styles.detailsTextTitle}>Detalles de la conexión</Text>
          <Text style={styles.detailsText}>
            Tipo de conexión: {connectionType ? connectionType : "Desconocido"}
          </Text>
          <Text style={styles.detailsText}>BSSID: {details.bssid}</Text>
          <Text style={styles.detailsText}>
            Dirección IP: {details.ipAddress}
          </Text>
          <Text style={styles.detailsText}>
            Máscara de subred: {details.subnet}
          </Text>
        </View>
      )}
      {batteryImage && (
        <View style={styles.batteryContainer}>
          <Image source={batteryImage} style={styles.batteryImage} />
          <Text style={styles.batteryText}>
            {batteryLevel !== null ? (batteryLevel * 100).toFixed(2) : ""}%
          </Text>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#d0d8ea",
  },
  text: {
    fontSize: 18,
    marginBottom: 10,
  },
  detailsContainer: {
    borderRadius: 40,
    borderColor: "#000000",
    marginTop: 20,
    paddingHorizontal: 10,
    backgroundColor: "#d0eadd",
    borderRadius: 5,
  },
  detailsText: {
    fontSize: 16,
    marginBottom: 5,
  },
  detailsTextTitle: {
    fontSize: 25,
    marginBottom: 5,
    width: 300,
  },
  batteryContainer: {
    alignItems: "center",
    justifyContent: "center",
    marginTop: 20,
  },
  batteryImage: {
    width: 100,
    height: 100,
    resizeMode: "contain",
  },
  batteryText: {
    fontSize: 20,
    marginTop: 10,
    marginBottom: 100,
  },
});

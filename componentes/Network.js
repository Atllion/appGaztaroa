import React, { useState, useEffect } from "react";
import { StyleSheet, Text, View } from "react-native";
import NetInfo from "@react-native-community/netinfo";

export default function RedInfo() {
  const [connectionType, setConnectionType] = useState(null);
  const [isConnected, setIsConnected] = useState(false);
  const [details, setDetails] = useState(null);

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

  return (
    <View style={styles.container}>
      {details && (
        <View style={styles.detailsContainer}>
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
    borderColor: "#black",
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
});

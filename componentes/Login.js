import React, { useState, useEffect } from "react";
import { View, TextInput, Button, StyleSheet, Image, Text } from "react-native";
import axios from "axios";
import CampobaseComponent from "./CampobaseComponent";
import { createStackNavigator, Screen } from "@react-navigation/stack";

const Stack = createStackNavigator();

export const firebaseConfig = {
  apiKey: "AIzaSyCV_7td7QFI3Ex-zbiXJRYtFBYJlb0mv4g",
  authDomain: "appgaztaroa-a3165.firebaseapp.com",
  databaseURL:
    "https://appgaztaroa-a3165-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "appgaztaroa-a3165",
  storageBucket: "appgaztaroa-a3165.appspot.com",
  messagingSenderId: "349629502365",
  appId: "1:349629502365:web:c4c074686a960f233f1574",
  measurementId: "G-3E6EB8SQBW",
};

export default function Login(props) {
  const { isLogged, updateLogin } = props;
  const [nameUser, setnameUser] = useState("");
  const [email, setEmail] = useState("");
  const [inicioSesion, setInicioSesion] = useState(false);
  const [password, setPassword] = useState("");
  console.log(props.updateLogin);
  console.log("props.updateLogin");
  console.log("------------");
  const uri =
    "https://img.freepik.com/vector-gratis/vector-fondo-acuarela-floral-primavera-verde-ilustracion-hoja_53876-126350.jpg?w=996&t=st=1687263023~exp=1687263623~hmac=427bd272ae2bc7b9a63e97d62b53c3f71eaebd1e4911aeb598574cbc13e97377";

  const handleCreateAccount = () => {
    const url = `https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${firebaseConfig.apiKey}`;
    const data = {
      email: email,
      password: password,
      returnSecureToken: true,
    };
    useEffect(() => {
      if (inicioSesion) {
        console.log("La sesión está iniciada");
      } else {
        console.log("La sesión no está iniciada");
      }
    }, [inicioSesion]);
    console.log("Datos de creación de cuenta:", data);

    axios
      .post(url, data)
      .then((response) => {
        console.log("Cuenta creada");
        const user = response.data;
        console.log(user);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handleSignIn = () => {
    const url = `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${firebaseConfig.apiKey}`;
    const data = {
      email: email,
      password: password,
      returnSecureToken: true,
    };

    console.log("Datos de inicio de sesión:", data);

    axios
      .post(url, data)
      .then((response) => {
        console.log("Inicio de sesión exitoso");
        const user = response.data;
        console.log("--------------------------");
        console.log(user);
        console.log("--------------------------");
        // Actualizar la propiedad isLogged a true
        updateLogin(true);
        setnameUser(user.email);
        setInicioSesion(true);
      })
      .catch((error) => {
        console.log("//////////////////////////");
        console.log(error);
        console.log("error");
        console.log("//////////////////////////");
      });
  };

  return (
    <>
      {inicioSesion ? (
        <Text style={styles.nombre_login}>Bienvenid@ {nameUser}</Text>
      ) : (
        <View style={styles.container}>
          <Image
            source={{ uri }}
            style={[styles.image, StyleSheet.absoluteFill]}
          />
          <Text style={styles.nombre_login}>Login </Text>
          <Text style={styles.nombre_input}>
            Introduce el correo electrónico{" "}
          </Text>
          <TextInput
            style={styles.input}
            placeholder="Correo electrónico"
            onChangeText={(text) => setEmail(text)}
            value={email}
          />

          <Text style={styles.nombre_input}>Introduce la contraseña </Text>
          <TextInput
            style={styles.input}
            placeholder="Contraseña"
            onChangeText={(text) => setPassword(text)}
            value={password}
            secureTextEntry
          />
          <Button
            onPress={handleCreateAccount}
            style={styles.button}
            title="Crear cuenta"
          />
          <Text style={styles.nombre_input}> </Text>
          <Button
            onPress={handleSignIn}
            style={styles.button}
            title="Iniciar sesión"
          />
        </View>
      )}
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
    marginBottom: 20,
  },
  input: {
    fontSize: 25,
    width: "100%",
    height: 40,
    borderWidth: 1,
    borderColor: "#ccc",
    marginBottom: 12,
    paddingHorizontal: 10,
    alignItems: "center",
    marginBottom: 40,
  },
  nombre_input: {
    fontSize: 25,
    alignItems: "center",
    marginBottom: 20,
  },
  nombre_login: {
    fontSize: 50,
    fontWeight: "700",
    alignItems: "center",
    marginBottom: 20,
  },
  button: {
    marginBottom: 20,
    marginTop: 20,
    color: "red",
  },
});

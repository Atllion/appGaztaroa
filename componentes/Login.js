import React, { useState, useEffect } from "react";
import { View, TextInput, Button, StyleSheet, Image, Text } from "react-native";
import axios from "axios";
import CampobaseComponent from "./CampobaseComponent";
import { createStackNavigator, Screen } from "@react-navigation/stack";
import { Dimensions } from "react-native";
const screenWidth = Dimensions.get("window").width;
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
  const [nombre, setNombre] = useState();
  const [apellido, setApellido] = useState();
  const [avatar, setAvatar] = useState();
  const [pais, setPais] = useState();
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
        // console.log("--------------------------");
        // console.log(user);
        // console.log("--------------------------");
        // Actualizar la propiedad isLogged a true
        updateLogin(true);
        setEmail(user.email);
        setInicioSesion(true);
      })
      .catch((error) => {
        // console.log("//////////////////////////");
        console.log(error);
        // console.log("error");
        // console.log("//////////////////////////");
      });
  };

  useEffect(() => {
    if (inicioSesion === true) {
      console.log(
        "+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++"
      );
      axios
        .get(
          "https://appgaztaroa-a3165-default-rtdb.europe-west1.firebasedatabase.app/usuarios.json"
        )
        .then((response) => {
          const data = response.data;
          const dataArray = Object.values(data);
          const filteredData = dataArray.filter((item) => item !== null);

          const usuarioEncontrado = filteredData.find(
            (usuario) => usuario.mail === email
          );

          if (usuarioEncontrado) {
            setNombre(usuarioEncontrado.nombre);
            setApellido(usuarioEncontrado.apellido);
            setAvatar(usuarioEncontrado.avatar);
            setPais(usuarioEncontrado.pais);
            console.log(usuarioEncontrado);
          } else {
            setnameUser("");
            setApellido("");
          }
          //   console.log(filteredData);
        })
        .catch((error) => {
          console.error(error);
        });
    }
  }, [inicioSesion]);

  //   useEffect(() => {
  //     console.log(
  //       "+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++"
  //     );
  //     axios
  //       .get(
  //         "https://appgaztaroa-a3165-default-rtdb.europe-west1.firebasedatabase.app/cabeceras.json"
  //       )
  //       .then((response) => {
  //         const data = response.data;
  //         const filteredData = data.filter((item) => item !== null);
  //         console.log(filteredData);
  //       })
  //       .catch((error) => {
  //         console.error(error);
  //       });
  //   }, []);

  return (
    <View style={styles.container}>
      <Image
        source={{
          uri: "https://img.freepik.com/vector-gratis/vector-fondo-acuarela-floral-primavera-verde-ilustracion-hoja_53876-126350.jpg?w=996&t=st=1687263023~exp=1687263623~hmac=427bd272ae2bc7b9a63e97d62b53c3f71eaebd1e4911aeb598574cbc13e97377",
        }}
        style={styles.backgroundImage}
      />
      {inicioSesion ? (
        <View style={styles.content}>
          <Text style={styles.nombre_perfil}>Perfil</Text>
          <Image source={{ uri: avatar }} style={styles.imagen1} />
          <View style={styles.fieldContainer}>
            <Text style={styles.nombre_input}>Nombre:</Text>
            <TextInput style={styles.input} value={nombre} editable={false} />

            <Text style={styles.nombre_input}>Apellido:</Text>
            <TextInput style={styles.input} value={apellido} editable={false} />

            <Text style={styles.nombre_input}>País:</Text>
            <TextInput style={styles.input} value={pais} editable={false} />
          </View>
        </View>
      ) : (
        <View style={styles.content}>
          <Text style={styles.nombre_login}>Login</Text>
          <Text style={styles.nombre_input}>
            Introduce el correo electrónico
          </Text>
          <TextInput
            style={styles.input}
            placeholder="Correo electrónico"
            onChangeText={(text) => setEmail(text)}
            value={email}
          />

          <Text style={styles.nombre_input}>Introduce la contraseña</Text>
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
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    textAlign: "center",
  },
  backgroundImage: {
    ...StyleSheet.absoluteFill,
    opacity: 0.5,
  },
  content: {
    backgroundColor: "transparent",
    padding: 20,
    marginBottom: 20,
  },
  input: {
    textAlign: "center",
    fontSize: 25,
    width: "100%",
    height: 40,
    borderWidth: 1,
    borderColor: "#ccc",
    marginBottom: 12,
    paddingHorizontal: 10,
    alignItems: "center",
    marginBottom: 40,
    backgroundColor: "transparent",
  },
  nombre_input: {
    textAlign: "center",
    fontSize: 25,
    alignItems: "center",
    marginBottom: 20,
    backgroundColor: "transparent",
  },
  nombre_login: {
    textAlign: "center",
    fontSize: 50,
    fontWeight: "700",
    alignItems: "center",
    marginBottom: 20,
    backgroundColor: "transparent",
    textShadowColor: "#000",
    textShadowOffset: { width: 2, height: 2 },
    textShadowRadius: 5,
  },
  nombre_perfil: {
    textAlign: "center",
    fontSize: 50,
    fontWeight: "700",
    textAlign: "center",
    backgroundColor: "transparent",
    textShadowColor: "#000",
    textShadowOffset: { width: 2, height: 2 },
    textShadowRadius: 5,
  },
  button: {
    textAlign: "center",
    marginBottom: 20,
    marginTop: 20,
    color: "red",
  },
  imagen1: {
    width: screenWidth / 2,
    aspectRatio: 1,
  },
  fieldContainer: {
    width: "100%",
    paddingHorizontal: 20,
    marginTop: 20,
  },
});

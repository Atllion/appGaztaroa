import React, { useState, useEffect } from "react";
import { View, TextInput, Button, StyleSheet, Image, Text } from "react-native";
import axios from "axios";
import CampobaseComponent from "./CampobaseComponent";
import { createStackNavigator, Screen } from "@react-navigation/stack";
import { Dimensions } from "react-native";
import * as ImagePicker from "expo-image-picker";
import { TouchableOpacity } from "react-native";

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
  const [cuentaCreada, setCuentaCreada] = useState(false);
  const [nombre, setNombre] = useState();
  const [apellido, setApellido] = useState();
  const [avatar, setAvatar] = useState();
  const [pais, setPais] = useState();
  const { isLogged, updateLogin } = props;
  const [nameUser, setnameUser] = useState("");
  const [email, setEmail] = useState("");
  const [inicioSesion, setInicioSesion] = useState(false);
  const [password, setPassword] = useState("");
  const [selectedImage, setSelectedImage] = useState(null);

  console.log(props.updateLogin);
  console.log("props.updateLogin");
  console.log("------------");
  const uri =
    "https://img.freepik.com/vector-gratis/vector-fondo-acuarela-floral-primavera-verde-ilustracion-hoja_53876-126350.jpg?w=996&t=st=1687263023~exp=1687263623~hmac=427bd272ae2bc7b9a63e97d62b53c3f71eaebd1e4911aeb598574cbc13e97377";

  const handleSelectImage = async () => {
    try {
      const { status } =
        await ImagePicker.requestMediaLibraryPermissionsAsync();
      if (status !== "granted") {
        alert("Selecciona una foto.");
        return;
      }

      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [4, 3],
        quality: 1,
      });

      if (!result.cancelled) {
        setSelectedImage(result.uri);
      }
    } catch (error) {
      console.error("Error al seleccionar una imagen:", error);
    }
  };

  const handleCreateAccount = () => {
    const url = `https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${firebaseConfig.apiKey}`;
    const data = {
      email: email,
      password: password,
      returnSecureToken: true,
    };

    console.log("Datos de creación de cuenta:", data);

    axios
      .post(url, data)
      .then((response) => {
        console.log("Cuenta creada");
        setCuentaCreada(true);
        const user = response.data;
        console.log(user);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    if (inicioSesion || cuentaCreada) {
      console.log("La sesión está iniciada");
      handleRegister();
    } else {
      console.log("La sesión no está iniciada");
    }
  }, [inicioSesion, cuentaCreada]);

  const handleRegister = () => {
    return (
      <>
        <Text style={styles.nombre_login}>Resgitro Datos</Text>
        <Text style={styles.nombre_input}>Introduce el correo electrónico</Text>
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
      </>
    );
  };

  const handleCreatePerfil = async () => {
    const imagenModelo =
      "https://firebasestorage.googleapis.com/v0/b/appgaztaroa-a3165.appspot.com/o/ed.png?alt=media&token=e3397192-cf96-4fea-bb49-d2d60a432536";
    const data = {
      nombre: nombre,
      apellido: apellido,
      pais: pais,
      avatar: imagenModelo,
      mail: email,
    };

    const formData = new FormData();
    formData.append("imagen", {
      uri: selectedImage,
      type: "image/jpeg",
      name: "avatar.jpg",
    });

    Object.entries(data).forEach(([key, value]) => {
      formData.append(key, value);
    });

    try {
      await axios.post(
        "https://appgaztaroa-a3165-default-rtdb.europe-west1.firebasedatabase.app/usuarios.json",
        data
      );

      console.log("Perfil creado:", data);
      const storageRef = `https://firebasestorage.googleapis.com/v0/b/appgaztaroa-a3165.appspot.com/`;
      const imageUrl = `${storageRef}imagenes/ssd.jpg`;

      await fetch(
        `https://console.firebase.google.com/project/appgaztaroa-a3165/storage/appgaztaroa-a3165.appspot.com/files?hl=es`,
        {
          method: "PATCH",
          body: JSON.stringify({ imagenUrl: selectedImage }),
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      setCuentaCreada(false);
      handleSignIn();
      setInicioSesion(true);
    } catch (error) {
      console.error("Error al crear el perfil:", error);
    }
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

        updateLogin(true);
        setEmail(user.email);
        setInicioSesion(true);
      })
      .catch((error) => {
        console.log("//////////////////////////");
        console.log(error);
        console.log("error");
        console.log("//////////////////////////");
      });
  };

  const handleSignOut = () => {
    updateLogin(false);
    setInicioSesion(false);
    setEmail("");
    setPassword("");
    setNombre("");
    setApellido("");
    setAvatar("");
    setPais("");
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
          }
          //   console.log(filteredData);
        })
        .catch((error) => {
          console.error(error);
        });
    }
  }, [inicioSesion, email]);

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
      {cuentaCreada ? (
        <>
          {/* Mostrar todos los parámetros de registro */}
          <View style={styles.content}>
            <Text style={styles.nombre_login}>Registro</Text>
            <Text style={styles.nombre_input}>Introduce tu nombre</Text>
            <TextInput
              style={styles.input}
              placeholder="Nombre"
              onChangeText={(text) => setNombre(text)}
              value={nombre}
            />

            <Text style={styles.nombre_input}>Introduce tu apellido</Text>
            <TextInput
              style={styles.input}
              placeholder="Apellido"
              onChangeText={(text) => setApellido(text)}
              value={apellido}
            />
            <Text style={styles.nombre_input}>Introduce tu pais</Text>
            <TextInput
              style={styles.input}
              placeholder="Pais"
              onChangeText={(text) => setPais(text)}
              value={pais}
            />
            <TouchableOpacity onPress={handleSelectImage} style={styles.button}>
              <Text style={styles.buttonText}>Seleccionar foto</Text>
            </TouchableOpacity>
            {selectedImage && (
              <Image
                source={{ uri: selectedImage }}
                style={styles.selectedImage}
              />
            )}
            <Button
              onPress={handleCreatePerfil}
              style={styles.button}
              title="Crear cuenta"
            />
            <Text style={styles.nombre_input}> </Text>
          </View>
        </>
      ) : (
        <>
          {/* Mostrar formulario de inicio de sesión */}
          {inicioSesion ? (
            <View style={styles.content}>
              <Text style={styles.nombre_perfil}>Perfil</Text>
              <Image source={{ uri: avatar }} style={styles.imagen1} />
              <View style={styles.fieldContainer}>
                <Text style={styles.nombre_input}>Nombre:</Text>
                <TextInput
                  style={styles.input}
                  value={nombre}
                  editable={false}
                />

                <Text style={styles.nombre_input}>Apellido:</Text>
                <TextInput
                  style={styles.input}
                  value={apellido}
                  editable={false}
                />

                <Text style={styles.nombre_input}>País:</Text>
                <TextInput style={styles.input} value={pais} editable={false} />
                <Button
                  onPress={handleSignOut}
                  title="Cerrar sesión"
                  color="red"
                  style={styles.button}
                />
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
        </>
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

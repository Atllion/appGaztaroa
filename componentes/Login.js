// import React, { useState } from "react";
// import { View, TextInput, Button, StyleSheet } from "react-native";
// import { Card } from "@rneui/themed";
// import { Text, ScrollView } from "react-native";
// import { useEffect } from "react";
// import { Image } from "react-native";
// import {
//   getAuth,
//   createUserWithEmailAndPassword,
//   signInWithEmailAndPassword,
// } from "@react-native-firebase/auth";
// import { initializeApp } from "@react-native-firebase/app";
// import { firebaseConfig } from "../comun/configuracion";

// function Logueado() {
//   return (
//     <View style={styles.container}>
//       <Text>Logueado</Text>
//     </View>
//   );
// }

// const appp = initializeApp(firebaseConfig);
// const auth = getAuth(appp);

// const handleCreateAccount = () => {
//   createUserWithEmailAndPassword(auth, email, password)
//     .then(() => {
//       console.log("Cuenta creada");
//       const user = userCredential.user;
//       console.log(user);
//     })
//     .cath((error) => {
//       console.log(error);
//     });
// };

// const handleSingIn = () => {
//   signInWithEmailAndPassword(auth, email, password)
//     .then(() => {
//       console.log("Inicio de sesión");
//       const user = userCredential.user;
//       console.log(user);
//     })
//     .cath((error) => {
//       console.log(error);
//     });
// };

// function LoginScreen() {
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const uri =
//     "https://img.freepik.com/vector-gratis/vector-fondo-acuarela-floral-primavera-verde-ilustracion-hoja_53876-126350.jpg?w=996&t=st=1687263023~exp=1687263623~hmac=427bd272ae2bc7b9a63e97d62b53c3f71eaebd1e4911aeb598574cbc13e97377";

//   return (
//     <>
//       <View style={styles.container}>
//         <Image
//           source={{ uri }}
//           style={[styles.image, StyleSheet.absoluteFill]}
//         />
//         <Text style={styles.nombre_login}>Login </Text>
//         <Text style={styles.nombre_input}>
//           Introduce el correo electrónico{" "}
//         </Text>
//         <TextInput
//           style={styles.input}
//           placeholder="Correo electrónico"
//           onChangeText={(text) => setEmail(text)}
//           value={email}
//         />

//         <Text style={styles.nombre_input}>Introduce la contraseña </Text>
//         <TextInput
//           style={styles.input}
//           placeholder="Contraseña"
//           onChangeText={(text) => setPassword(text)}
//           value={password}
//           secureTextEntry
//         />
//         <Button
//           onPress={handleCreateAccount}
//           style="marginBottom: 10px"
//           title="Iniciar sesión"
//         />
//         <Text style={styles.nombre_input}> </Text>
//         <Button style={styles.boton} title="Crear  Cuenta" />
//       </View>
//     </>
//   );
// }

// export default function Login() {
//   return <LoginScreen />;
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     justifyContent: "center",
//     alignItems: "center",
//     padding: 20,
//     marginBottom: 20,
//   },
//   input: {
//     fontSize: 25,
//     width: "100%",
//     height: 40,
//     borderWidth: 1,
//     borderColor: "#ccc",
//     marginBottom: 12,
//     paddingHorizontal: 10,
//     alignItems: "center",
//     marginBottom: 40,
//   },
//   nombre_input: {
//     fontSize: 25,
//     alignItems: "center",
//     marginBottom: 20,
//   },
//   nombre_login: {
//     fontSize: 50,
//     fontWeight: 700,
//     alignItems: "center",
//     marginBottom: 20,
//   },
//   boton: {
//     marginBottom: 20,
//     marginTop: 20,
//     color: "red",
//   },
// });

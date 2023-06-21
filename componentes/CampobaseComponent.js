import React, { Component } from "react";
import Calendario from "./CalendarioComponent";
import DetalleExcursion from "./DetalleExcursionComponent";
import Home from "./HomeComponent";
import { NavigationContainer, DrawerActions } from "@react-navigation/native";
import Constants from "expo-constants";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import QuienesSomos from "./QuienesSomosComponent";
import Contact from "./ContactoComponent";
import { View, StyleSheet, Image, Text } from "react-native";
import {
  createDrawerNavigator,
  DrawerContentScrollView,
  DrawerItemList,
} from "@react-navigation/drawer";
import { Icon } from "@rneui/themed";
import { SafeAreaView } from "react-native-safe-area-context";
import { colorGaztaroaClaro } from "../comun/comun";
import { colorGaztaroaOscuro } from "../comun/comun";
import { connect } from "react-redux";
import {
  fetchExcursiones,
  fetchComentarios,
  fetchCabeceras,
  fetchActividades,
} from "../redux/ActionCreators";
import Login from "./Login";
import Map from "./Map";
import Barometro from "./Barometer";

const Stack = createNativeStackNavigator();
const Drawer = createDrawerNavigator();

const mapStateToProps = (state) => {
  return {
    excursiones: state.excursiones,
    comentarios: state.comentarios,
    cabeceras: state.cabeceras,
    actividades: state.actividades,
  };
};

const mapDispatchToProps = (dispatch) => ({
  fetchExcursiones: () => dispatch(fetchExcursiones()),
  fetchComentarios: () => dispatch(fetchComentarios()),
  fetchCabeceras: () => dispatch(fetchCabeceras()),
  fetchActividades: () => dispatch(fetchActividades()),
});

function CustomDrawerContent(props) {
  return (
    <DrawerContentScrollView {...props}>
      <SafeAreaView
        style={styles.container}
        forceInset={{ top: "always", horizontal: "never" }}
      >
        <View style={styles.drawerHeader}>
          <View style={{ flex: 1 }}>
            <Image
              source={require("./imagenes/logo.png")}
              style={styles.drawerImage}
            />
          </View>
          <View style={{ flex: 2 }}>
            <Text style={styles.drawerHeaderText}> Gaztaroa</Text>
          </View>
        </View>
        <DrawerItemList {...props} />
      </SafeAreaView>
    </DrawerContentScrollView>
  );
}

function CalendarioNavegador({ navigation }) {
  return (
    <Stack.Navigator
      initialRouteName="Calendario"
      screenOptions={{
        title: "Aligned Center",
        headerTitleAlign: "center",
        headerMode: "float",
        headerTintColor: "#fff",
        headerStyle: { backgroundColor: colorGaztaroaOscuro },
        headerTitleStyle: { color: "#fff" },
        headerLeft: () => (
          <Icon
            name="menu"
            size={28}
            color="white"
            onPress={() => navigation.dispatch(DrawerActions.toggleDrawer())}
          />
        ),
      }}
    >
      <Stack.Screen
        name="Login"
        component={Login}
        options={{
          title: "Calendario Gaztaroa",
        }}
      />
      <Stack.Screen
        name="Barometro"
        component={Barometro}
        options={{
          title: "Calendario Gaztaroa",
        }}
      />
      <Stack.Screen
        name="Calendario"
        component={Calendario}
        options={{
          title: "Calendario Gaztaroa",
        }}
      />
      <Stack.Screen
        name="DetalleExcursion"
        component={DetalleExcursion}
        options={{
          title: "Detalle Excursión",
        }}
      />
    </Stack.Navigator>
  );
}

function HomeNavegador({ navigation }) {
  return (
    <Stack.Navigator
      initialRouteName="Home"
      screenOptions={{
        title: "Aligned Center",
        headerTitleAlign: "center",
        headerMode: "screen",
        headerTintColor: "#fff",
        headerStyle: { backgroundColor: colorGaztaroaOscuro },
        headerTitleStyle: { color: "#fff" },
        headerLeft: () => (
          <Icon
            name="menu"
            size={28}
            color="white"
            onPress={() => navigation.dispatch(DrawerActions.toggleDrawer())}
          />
        ),
      }}
    >
      <Stack.Screen
        name="Etxea"
        component={Home}
        options={{
          title: "Campo Base",
        }}
      />
    </Stack.Navigator>
  );
}

function DrawerNavegador() {
  return (
    <Drawer.Navigator
      initialRouteName="Home"
      drawerContent={(props) => <CustomDrawerContent {...props} />}
      screenOptions={{
        headerShown: false,
        drawerStyle: {
          backgroundColor: colorGaztaroaClaro,
        },
      }}
    >
      <Drawer.Screen
        name="Campo base"
        component={HomeNavegador}
        options={{
          drawerIcon: ({ tintColor }) => (
            <Icon name="home" type="font-awesome" size={24} color={tintColor} />
          ),
        }}
      />
      <Drawer.Screen
        name="Quienes somos"
        component={QuienesSomosNavegador}
        options={{
          drawerIcon: ({ tintColor }) => (
            <Icon
              name="info-circle"
              type="font-awesome"
              size={24}
              color={tintColor}
            />
          ),
        }}
      />

      <Drawer.Screen
        name="Calendario"
        component={CalendarioNavegador}
        options={{
          drawerIcon: ({ tintColor }) => (
            <Icon
              name="calendar"
              type="font-awesome"
              size={24}
              color={tintColor}
            />
          ),
        }}
      />
      <Drawer.Screen
        name="Login"
        component={LoginNavegador}
        options={{
          drawerIcon: ({ tintColor }) => (
            <Icon name="gear" type="font-awesome" size={24} color={tintColor} />
          ),
        }}
      />
      <Drawer.Screen
        name="Maps"
        component={MapNavegador}
        options={{
          drawerIcon: ({ tintColor }) => (
            <Icon name="map" type="font-awesome" size={24} color={tintColor} />
          ),
        }}
      />
      <Drawer.Screen
        name="Brújula"
        component={BarometerNavegador}
        options={{
          drawerIcon: ({ tintColor }) => (
            <Icon
              name="compass"
              type="font-awesome"
              size={24}
              color={tintColor}
            />
          ),
        }}
      />
      <Drawer.Screen
        name="Contacto"
        component={ContactNavegador}
        options={{
          drawerIcon: ({ tintColor }) => (
            <Icon
              name="address-card"
              type="font-awesome"
              size={24}
              color={tintColor}
            />
          ),
        }}
      />
    </Drawer.Navigator>
  );
}

function ContactNavegador({ navigation }) {
  return (
    <Stack.Navigator
      initialRouteName="Contacto"
      screenOptions={{
        title: "Aligned Center",
        headerTitleAlign: "center",
        headerMode: "screen",
        headerTintColor: "#fff",
        headerStyle: { backgroundColor: colorGaztaroaOscuro },
        headerTitleStyle: { color: "#fff" },
        headerLeft: () => (
          <Icon
            name="menu"
            size={28}
            color="white"
            onPress={() => navigation.dispatch(DrawerActions.toggleDrawer())}
          />
        ),
      }}
    >
      <Stack.Screen
        name="Contact"
        component={Contact}
        options={{
          title: "Contacto",
        }}
      />
    </Stack.Navigator>
  );
}

function LoginNavegador({ navigation }) {
  return (
    <Stack.Navigator
      initialRouteName="Login"
      screenOptions={{
        title: "Aligned Center",
        headerTitleAlign: "center",
        headerMode: "screen",
        headerTintColor: "#fff",
        headerStyle: { backgroundColor: colorGaztaroaOscuro },
        headerTitleStyle: { color: "#fff" },
        headerLeft: () => (
          <Icon
            name="menu"
            size={28}
            color="white"
            onPress={() => navigation.dispatch(DrawerActions.toggleDrawer())}
          />
        ),
      }}
    >
      <Stack.Screen
        name="Login"
        component={Login}
        options={{
          title: "Login",
        }}
      />
    </Stack.Navigator>
  );
}

function BarometerNavegador({ navigation }) {
  return (
    <Stack.Navigator
      initialRouteName="Brújula"
      screenOptions={{
        title: "Aligned Center",
        headerTitleAlign: "center",
        headerMode: "screen",
        headerTintColor: "#fff",
        headerStyle: { backgroundColor: colorGaztaroaOscuro },
        headerTitleStyle: { color: "#fff" },
        headerLeft: () => (
          <Icon
            name="menu"
            size={28}
            color="white"
            onPress={() => navigation.dispatch(DrawerActions.toggleDrawer())}
          />
        ),
      }}
    >
      <Stack.Screen
        name="Brujula"
        component={Barometro}
        options={{
          title: "Brújula",
        }}
      />
    </Stack.Navigator>
  );
}

function MapNavegador({ navigation }) {
  return (
    <Stack.Navigator
      initialRouteName="Map"
      screenOptions={{
        title: "Aligned Center",
        headerTitleAlign: "center",
        headerMode: "screen",
        headerTintColor: "#fff",
        headerStyle: { backgroundColor: colorGaztaroaOscuro },
        headerTitleStyle: { color: "#fff" },
        headerLeft: () => (
          <Icon
            name="menu"
            size={28}
            color="white"
            onPress={() => navigation.dispatch(DrawerActions.toggleDrawer())}
          />
        ),
      }}
    >
      <Stack.Screen
        name="Map"
        component={Map}
        options={{
          title: "Map",
        }}
      />
    </Stack.Navigator>
  );
}

function QuienesSomosNavegador({ navigation }) {
  return (
    <Stack.Navigator
      initialRouteName="Quienes Somos"
      screenOptions={{
        title: "Aligned Center",
        headerTitleAlign: "center",
        headerMode: "screen",
        headerTintColor: "#fff",
        headerStyle: { backgroundColor: colorGaztaroaOscuro },
        headerTitleStyle: { color: "#fff" },
        headerLeft: () => (
          <Icon
            name="menu"
            size={28}
            color="white"
            onPress={() => navigation.dispatch(DrawerActions.toggleDrawer())}
          />
        ),
      }}
    >
      <Stack.Screen
        name="QuienesSomos"
        component={QuienesSomos}
        options={{
          title: "QuienesSomos",
        }}
      />
    </Stack.Navigator>
  );
}

class Campobase extends Component {
  componentDidMount() {
    this.props.fetchExcursiones();
    this.props.fetchComentarios();
    this.props.fetchCabeceras();
    this.props.fetchActividades();
  }
  render() {
    return (
      <NavigationContainer>
        <View
          style={{
            flex: 1,
            paddingTop: Platform.OS === "ios" ? 0 : Constants.statusBarHeight,
          }}
        >
          <DrawerNavegador />
        </View>
      </NavigationContainer>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  drawerHeader: {
    backgroundColor: colorGaztaroaOscuro,
    height: 100,
    alignItems: "center",
    justifyContent: "center",
    flex: 1,
    flexDirection: "row",
  },
  drawerHeaderText: {
    color: "white",
    fontSize: 24,
    fontWeight: "bold",
  },
  drawerImage: {
    margin: 10,
    width: 80,
    height: 60,
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(Campobase);

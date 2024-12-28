import React from "react";
import { View, Text, StyleSheet, Button } from "react-native";
import { useAuth } from "../context/AuthContext";
import { Image } from "expo-image";
import ProfileTabView from "../components/ProfileTabView";

const Profile = () => {
  const { authState, onLogout } = useAuth(); // Lekérdezzük a bejelentkezett felhasználót

  return (
    <View style={styles.container}>
      <Image
        source={authState?.image}
        style={styles.avatar} // Avatar kép
        contentFit="cover"
        transition={1000}
      />
      <Text style={styles.title}>Profil</Text>
      <Text style={styles.label}>Név: {authState?.firstName} {authState?.lastName}</Text>
      <Text style={styles.label}>Email: {authState?.email}</Text>

      {/* Beállítások, mint például jelszó változtatás, stb. */}
      <View style={styles.settings}>
        <Text style={styles.settingsTitle}>Beállítások:</Text>
        <Button title="Változtass jelszót" onPress={() => {}} />
        <Button title="Töröld fiók" onPress={() => {}} color="red" />
      </View>

      {/* Kijelentkezés gomb */}
      <Button title="Kijelentkezés" onPress={onLogout} color="tomato" />
      <ProfileTabView />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f5f5",
    padding: 16,
    justifyContent: "center",
    alignItems: "center",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 16,
  },
  label: {
    fontSize: 18,
    fontWeight: "600",
    marginVertical: 4,
  },
  value: {
    fontSize: 16,
    marginBottom: 16,
  },
  settings: {
    marginTop: 20,
    width: "100%",
    alignItems: "center",
  },
  settingsTitle: {
    fontSize: 20,
    fontWeight: "600",
    marginBottom: 8,
  },
  avatar: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginRight: 10,
},
});

export default Profile;

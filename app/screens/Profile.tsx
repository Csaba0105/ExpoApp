import React from "react";
import { View, Text, StyleSheet, Button, Image } from "react-native";
import { useAuth } from "../context/AuthContext";

const Profile = () => {
  const { authState, onLogout } = useAuth(); // Lekérdezzük a bejelentkezett felhasználót

  return (
    <View style={styles.container}>
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
});

export default Profile;

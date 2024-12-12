import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

interface SeparatorWithTextProps {
  text: string; // Itt definiáljuk a "text" prop típust
}

const SeparatorWithText = ({ text }: SeparatorWithTextProps) => {
  return (
    <View style={styles.container}>
      <View style={styles.line} />
      <Text style={styles.text}>{text}</Text>
      <View style={styles.line} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row', // Vízszintes elrendezés
    alignItems: 'center', // Függőleges középre igazítás
    marginVertical: 16, // Távolság a környező elemtől
  },
  line: {
    flex: 1, // Kitöltés, hogy azonos szélességűek legyenek a vonalak
    height: 1, // Vonal vastagsága
    width: 100,
    backgroundColor: 'black', // Vonal színe
  },
  text: {
    marginHorizontal: 8, // Hézag a vonalak és a szöveg között
    fontSize: 16, // Szöveg mérete
    color: 'black', // Szöveg színe
    fontWeight: 'bold', // Szöveg vastagsága
  },
});

export default SeparatorWithText;

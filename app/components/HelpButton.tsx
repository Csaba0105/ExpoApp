import React from 'react';
import { StyleSheet, TouchableOpacity, useColorScheme } from 'react-native';
import { IconButton } from 'react-native-paper';
import { Colors } from '../constants/Colors';

export default function HelpButton(props: { onPress: any; }) {  
    const { onPress } = props;
        const theme = useColorScheme();
        const themeColors = Colors[theme || 'light'];
    
        return (
            <TouchableOpacity
                style={styles.buttonContainer}
                onPress={onPress}
            >
                <IconButton
                    icon="help"
                    size={32}
                    iconColor="white"
                />
            </TouchableOpacity>
        );
  }

const styles = StyleSheet.create({
  buttonContainer: {
    position: 'absolute',
    bottom: 20,
    right: 20,
    backgroundColor: '#A1CEDC',
    borderRadius: 40,
    padding: 10,
    elevation: 5,
  },
  icon: {
    alignSelf: 'center',
  },
});

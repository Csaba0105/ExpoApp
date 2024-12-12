import React from 'react';
import { StyleSheet, TouchableOpacity, Text, useColorScheme } from 'react-native';
import { Colors } from '../constants/Colors';

export default function AuthButton(props: { onPress: any; title: any; color?: string; }) {
    const { onPress, title, color } = props;
    const theme = useColorScheme();
    const themeColors = Colors[theme || 'light'];

    return (
        <TouchableOpacity
            style={[
                styles.button,
                { backgroundColor: color || themeColors.tint }
            ]}
            onPress={onPress}
        >
            <Text style={[styles.text, { color: themeColors.text }]}>{title}</Text>
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    button: {
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 12,
        paddingHorizontal: 100,
        borderRadius: 4,
        elevation: 3,
    },
    text: {
        fontSize: 16,
        lineHeight: 21,
        fontWeight: 'bold',
        letterSpacing: 0.25,
    },
});

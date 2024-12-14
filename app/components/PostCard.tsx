import React from 'react';
import { StyleSheet, TouchableOpacity, Text, useColorScheme } from 'react-native';
import { Colors } from '../constants/Colors';
import PostCardHeader from './PostCardHeader';

export default function Post(props: any) {
    const { onPress, title, color } = props;
    const theme = useColorScheme();
    const themeColors = Colors[theme || 'light'];

    return (
        <PostCardHeader profileImage='asd' profileName='asd' />

    );
}

const styles = StyleSheet.create({
});

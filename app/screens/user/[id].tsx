import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useRoute } from '@react-navigation/native';

const UserDetailsScreen = () => {
    const route = useRoute();
    const { id } = route.params;

    return (
        <View style={styles.container}>
            <Text style={styles.title}>User Details</Text>
            <Text style={styles.userId}>User ID: {id}</Text>
            {/* Add more user details here */}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 16,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 16,
    },
    userId: {
        fontSize: 18,
    },
});

export default UserDetailsScreen;
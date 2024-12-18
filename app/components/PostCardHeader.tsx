import { useColorScheme, StyleSheet, TouchableOpacity, View, Modal } from "react-native";
import { ThemedView } from "./ThemedView";
import { Colors } from '../constants/Colors';
import { Image } from "expo-image";
import { ThemedText } from "./ThemedText";
import { IconButton } from "react-native-paper";
import { useState } from "react";


export default function PostCardHeader(props: any) {
    const { profileImage, profileName, profileUsername } = props;
    const theme = useColorScheme();
    const themeColors = Colors[theme || 'light'];
    const [modalVisible, setModalVisible] = useState(false);

    return (
        <ThemedView style={styles.container}>
            {/* Avatar Image */}
            <Image source={profileImage} style={styles.avatar} cachePolicy={'memory-disk'} />

            {/* Profile Info */}
            <View style={styles.textContainer}>
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                    <ThemedText style={styles.profileName}>{profileName}</ThemedText>
                    <IconButton icon="check-circle" size={16} iconColor={themeColors.icon} style={{ marginLeft: 1 }} />
                </View>
                <ThemedText style={styles.username}>@{profileUsername}</ThemedText>
            </View>

            {/* Three-dot Icon */}
            <TouchableOpacity style={styles.menuButton} onPress={() => setModalVisible(true)}>
                <IconButton icon="dots-vertical" size={24} />
            </TouchableOpacity>

            {/* Modal */}
            <Modal
                animationType="fade"
                transparent={true}
                visible={modalVisible}
                onRequestClose={() => setModalVisible(false)} // Android back gomb
            >
                <View style={styles.modalOverlay}>
                    <View style={styles.modalContent}>
                        {/* Bezáró gomb (X ikon) */}
                        <TouchableOpacity
                            style={styles.closeButton}
                            onPress={() => setModalVisible(false)}
                        >
                            <IconButton icon="close" size={24} iconColor="black" />
                        </TouchableOpacity>

                        {/* Modal tartalma */}
                        <ThemedText style={styles.modalOption}>Option 1</ThemedText>
                        <ThemedText style={styles.modalOption}>Option 2</ThemedText>
                        <ThemedText style={styles.modalOption}>Option 3</ThemedText>
                    </View>
                </View>
            </Modal>
        </ThemedView>
    );
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    avatar: {
        width: 50,
        height: 50,
        borderRadius: 25,
        marginRight: 10,
    },
    textContainer: {
        flex: 1,
        justifyContent: 'center',
    },
    profileName: {
        fontWeight: 'bold',
        fontSize: 16,
    },
    username: {
        color: 'gray',
        fontSize: 14,
        top: -15
    },
    menuButton: {
        marginLeft: 'auto',
    },
    icon: {
        marginLeft: 5, // Távolság a névtől
    },
    modalOverlay: {
        flex: 1,
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        justifyContent: 'center',
        alignItems: 'center',
    },
    modalContent: {
        width: '80%',
        backgroundColor: '#fff',
        borderRadius: 10,
        padding: 20,
        alignItems: 'center',
        elevation: 5,
        position: 'relative',
    },
    closeButton: {
        position: 'absolute',
        top: 10, // Fentebb tolja a gombot
        right: 10, // Jobbra igazítás
        zIndex: 10, // Gomb mindig felül legyen
    },
    modalOption: {
        fontSize: 18,
        marginVertical: 10,
    },
});

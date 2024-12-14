import { useColorScheme, StyleSheet, TouchableOpacity, View } from "react-native";
import { ThemedView } from "./ThemedView";
import { Colors } from '../constants/Colors';
import { Image } from "expo-image";
import { ThemedText } from "./ThemedText";
import { Icon, IconButton } from "react-native-paper";


export default function PostCardHeader(props: any) {
    const { profileImage, profileName, username } = props;
    const theme = useColorScheme();
    const themeColors = Colors[theme || 'light'];

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
                <ThemedText style={styles.username}>@{username}</ThemedText>
            </View>

            {/* Three-dot Icon */}
            <TouchableOpacity style={styles.menuButton}>
                <IconButton icon="dots-vertical" size={24} />
            </TouchableOpacity>
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
});

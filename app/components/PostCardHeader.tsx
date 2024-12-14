import { useColorScheme, StyleSheet } from "react-native";
import { ThemedView } from "./ThemedView";
import { Colors } from '../constants/Colors';

export default function Post(props: any) {
    const { profileImage, profileName } = props;
    const theme = useColorScheme();
    const themeColors = Colors[theme || 'light'];

    return (
        <ThemedView>
            
        </ThemedView>
    );
}

const styles = StyleSheet.create({
});
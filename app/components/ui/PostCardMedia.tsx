import { Image } from 'expo-image';
import { StyleSheet, View } from 'react-native';

const blurhash =
    '|rF?hV%2WCj[ayj[a|j[az_NaeWBj@ayfRayfQfQM{M|azj[azf6fQfQfQIpWXofj[ayj[j[fQayWCoeoeaya}j[ayfQa{oLj?j[WVj[ayayj[fQoff7azayj[ayj[j[ayofayayayj[fQj[ayayj[ayfjj[j[ayjuayj[';

export default function PostCardMedia(props: any) {
    const { image } = props;
    return (
        <View style={styles.container}>
            <Image
                style={styles.image}
                source={image}
                placeholder={{ blurhash }}
                contentFit="cover"
                transition={1000}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
    image: {
        height: 526,
        width: '100%',
        backgroundColor: '#0553',
    },
});
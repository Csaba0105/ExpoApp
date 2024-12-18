import { Image } from 'expo-image';
import { useState } from 'react';
import { Modal, StyleSheet, TouchableOpacity, View, Text } from 'react-native';

const blurhash =
    '|rF?hV%2WCj[ayj[a|j[az_NaeWBj@ayfRayfQfQM{M|azj[azf6fQfQfQIpWXofj[ayj[j[fQayWCoeoeaya}j[ayfQa{oLj?j[WVj[ayayj[fQoff7azayj[ayj[j[ayofayayayj[fQj[ayayj[ayfjj[j[ayjuayj[';

export default function PostCardMedia(props: any) {
    const { image } = props;
    const [isModalVisible, setIsModalVisible] = useState(false);

    const toggleModal = () => {
        console.log("clikc")
        setIsModalVisible(!isModalVisible);
    };
    
    return (
        <View style={styles.container}>
            <Image
                style={styles.image}
                source={image}
                placeholder={{ blurhash }}
                contentFit="cover"
                transition={1000}
            />

            {isModalVisible && (
                <Modal
                    transparent={true}
                    animationType="slide"
                    visible={isModalVisible}
                    onRequestClose={toggleModal}
                >
                    <View style={styles.modalContainer}>
                        <TouchableOpacity style={styles.closeButton} onPress={toggleModal}>
                            <Text style={styles.closeText}>X</Text>
                        </TouchableOpacity>
                        <Image style={styles.modalImage} source={image} />
                    </View>
                </Modal>
            )}
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
    modalContainer: {
        flex: 1,
        backgroundColor: 'rgba(0, 0, 0, 0.8)',
        alignItems: 'center',
        justifyContent: 'center',
    },
    modalImage: {
        width: '100%',
        height: '100%',
        resizeMode: 'contain',
    },
    closeButton: {
        position: 'absolute',
        top: 20,
        right: 20,
        backgroundColor: 'rgba(255, 255, 255, 0.7)',
        borderRadius: 15,
        padding: 5,
    },
    closeText: {
        fontSize: 24,
        color: '#000',
    },
});
import React from 'react';
import { View, StyleSheet } from 'react-native';
import { ThemedText } from './ThemedText';
import LikeButton from './LikeButton';
import { useRouter } from 'expo-router';
import PostCardHeader from './PostCardHeader';
import PostCardMedia from './ui/PostCardMedia';

const PostCard = ({ item }: { item: any }) => {
    const router = useRouter();

    return (
        <View style={styles.item}>
            {/* Post Header */}
            <PostCardHeader 
                profileImage={item.user.imageUrl}
                profileName={`${item.user.firstName} ${item.user.lastName}`} 
            >
            </PostCardHeader>
            {/* Post Title and Content */}
            <ThemedText type="title" onPress={() => router.push(`/post/${item.id}`)}>
                {item.title}
            </ThemedText>
            <ThemedText type="subtitle">{item.content}</ThemedText>

            {/* Post Title and Content */}
            <PostCardMedia image={item.imageUrls[0]}></PostCardMedia>

            {/* Tools Section */}
            <View style={styles.tools}>
                <LikeButton />
                <ThemedText type="default">99 likes</ThemedText>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    item: {
        backgroundColor: 'white',
        padding: 20,
        marginVertical: 8,
        marginHorizontal: 16,
        borderRadius: 8,
    },
    tools: {
        top: 15,
        alignItems: 'flex-start',
    },
});

export default PostCard;


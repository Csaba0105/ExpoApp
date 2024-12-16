import React, { useEffect, useState } from 'react';
import { View, StyleSheet, TouchableOpacity } from 'react-native';
import { ThemedText } from './ThemedText';
import LikeButton from './LikeButton';
import { useRouter } from 'expo-router';
import PostCardHeader from './PostCardHeader';
import PostCardMedia from './PostCardMedia';
import CommentSection from './PostCommentSection';
import FontAwesome5 from '@expo/vector-icons/FontAwesome5';
import { API_URL, useAuth } from '../context/AuthContext';

const PostCard = ({ item }: { item: any }) => {
    const router = useRouter();
      const { authState } = useAuth();

    const [isCommentsVisible, setCommentsVisible] = useState(false);

    const handleLike = async () => {
        console.log(item)
        try {
            const response = await fetch(`${API_URL}/post/${item.id}/like?userId=${item.user.id}`, {
                      method: 'POST',
                      headers: {
                        Authorization: `Bearer ${authState?.token}`,
                        'Content-Type': 'application/json',
                      },
                    });
                    const result = await response.json();
            console.log("OK")
        } catch (error) {
            console.error("Error while liking the post:", error);
        }
    };

    const comments = [
        { id: 1, user: 'User1', text: 'Nagyon jó poszt!' },
        { id: 2, user: 'User2', text: 'Szép munka! 😊' },
    ];

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
                <View style={styles.toolButtons}>
                        <LikeButton onPress={handleLike}/>
                    <TouchableOpacity
                        style={styles.commentButton}
                        onPress={() => setCommentsVisible(!isCommentsVisible)}
                    >
                        <FontAwesome5 name="comment" size={26} color="black" />
                    </TouchableOpacity>
                </View>
                <ThemedText type="default">
                    99 likes
                    {comments.length > 0 && (
                        comments.length === 1
                            ? ` - ${comments.length} comment`
                            : ` - ${comments.length} comments`
                    )}
                </ThemedText>
            </View>
            {/* Comment Section */}
            {isCommentsVisible && <CommentSection comments={comments} />}
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
    toolButtons: {
        flexDirection: 'row',
        marginBottom: 8,
    },
    commentButton: {
        marginLeft: 15,
    },
});

export default PostCard;


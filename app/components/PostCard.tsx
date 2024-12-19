import React, { useEffect, useState } from 'react';
import { View, StyleSheet, TouchableOpacity, ActivityIndicator } from 'react-native';
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
    const userId = authState?.id;
    const [liked, setLiked] = useState(false);
    const [likeCount, setLikeCount] = useState(0);
    const [commentCount, setCommentCount] = useState(0);
    const [isCommentsVisible, setCommentsVisible] = useState(false);
    const [comments, setComments] = useState([]);
    const [loadingComments, setLoadingComments] = useState(false);

    useEffect(() => {
        const fetchLikeStatus = async () => {
            try {
                const response = await fetch(`${API_URL}/post/${item.id}/likes/status?userId=${userId}`, {
                    headers: {
                        Authorization: `Bearer ${authState?.token}`,
                    },
                });
                const data = await response.json();
                setLiked(data.liked);
                setLikeCount(data.likeCount);
            } catch (error) {
                console.error("Error fetching like status:", error);
            }
        };
        fetchCommentCount();
        fetchLikeStatus();
    }, [item.id]);

    const handleLike = async () => {
        try {
            await fetch(`${API_URL}/post/${item.id}/like?userId=${userId}`, {
                method: "POST",
                headers: {
                    Authorization: `Bearer ${authState?.token}`,
                    "Content-Type": "application/json",
                },
            });

            // Helyi állapot frissítése
            setLiked(!liked);
            setLikeCount((prevCount) => (liked ? prevCount - 1 : prevCount + 1));
        } catch (error) {
            console.error("Error while liking the post:", error);
        }
    };

    const fetchCommentCount = async () => {
        try {
            const response = await fetch(`${API_URL}/post/${item.id}/comments/count`, {
                headers: {
                    Authorization: `Bearer ${authState?.token}`,
                },
            });
            const data = await response.json();
            setCommentCount(data.commentCount);
        } catch (error) {
            console.error("Error fetching comment count:", error);
        }
    };

    const fetchComments = async () => {
        setLoadingComments(true);
        try {
            const response = await fetch(`${API_URL}/post/${item.id}/comments`, {
                headers: {
                    Authorization: `Bearer ${authState?.token}`,
                },
            });
            const data = await response.json();
            setComments(data);
        } catch (error) {
            console.error("Error fetching comments:", error);
        } finally {
            setLoadingComments(false);
        }
    };

    const toggleCommentsVisibility = () => {
        if (!isCommentsVisible) {
            fetchComments();
        }
        setCommentsVisible(!isCommentsVisible);
    };

    return (
        <View style={styles.item}>
            {/* Post Header */}
            <PostCardHeader
                profileImage={item.user.imageUrl}
                profileName={`${item.user.firstName} ${item.user.lastName}`}
                profileUsername={item.user.userSortName}
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
                    <LikeButton liked={item.likedByCurrentUser} onPress={handleLike} />
                    <TouchableOpacity
                        style={styles.commentButton}
                        onPress={toggleCommentsVisibility}
                    >
                        <FontAwesome5 name="comment" size={26} color="black" />
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.bookmarkButton}>
                        <FontAwesome5 name="bookmark" size={26} color="black" />
                    </TouchableOpacity>
                </View>
                <ThemedText type="default">
                    {likeCount > 0 && (
                        likeCount === 1
                            ? `${likeCount} like`
                            : `${likeCount} likes`
                    )}
                    {likeCount > 0 && commentCount > 0 && (
                        <>
                            <View style={styles.spacer} />
                            <View style={styles.dot} />
                            <View style={styles.spacer} />
                        </>

                    )}
                    {commentCount > 0 && (
                        commentCount === 1
                            ? `${commentCount} comment`
                            : `${commentCount} comments`
                    )}
                </ThemedText>
            </View>
            {/* Comment Section */}
            {isCommentsVisible && (
                <>
                    {loadingComments ? (
                        <ActivityIndicator size="small" color="#000" />
                    ) : (
                        <CommentSection comments={comments} postId={item.id} fetchCommentCount={fetchCommentCount} />
                    )}
                </>
            )}
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
    bookmarkButton: {
        marginLeft: 15,
    },
    dot: {
        width: 4,
        height: 4,
        borderRadius: 2,
        backgroundColor: 'grey',
        transform: [{ translateY: -2 }],
    },
    spacer: {
        width: 4, // Szóköz szélessége
    },
});

export default PostCard;


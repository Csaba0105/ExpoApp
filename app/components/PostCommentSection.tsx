import React, { useState } from 'react';
import { View, StyleSheet, Text, TextInput, Button, FlatList, Image, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome'; // Szív ikonhoz
import { ThemedText } from './ThemedText';
import Feather from '@expo/vector-icons/Feather';
import axios from 'axios';
import { API_URL, useAuth } from '../context/AuthContext';

interface Comment {
    id: number;
    userId: number;
    userSortName: string;
    text: string;
    userImage: string;
}

interface CommentSectionProps {
    comments: Comment[];
    postId: number;
    fetchCommentCount: () => void; // Új függvény hozzáadva
}

const CommentSection: React.FC<CommentSectionProps> = ({ comments, postId, fetchCommentCount }) => {
    const { authState } = useAuth();
    const userId = authState?.id;
    const [commentList, setCommentList] = useState(comments);
    const [newComment, setNewComment] = useState('');

    // Like állapot kezelése (szív ikon)
    const [likedComments, setLikedComments] = useState<number[]>([]);

    // Komment like állapotának változtatása
    const toggleLike = (id: number) => {
        setLikedComments((prev) =>
            prev.includes(id) ? prev.filter((commentId) => commentId !== id) : [...prev, id]
        );
    };

    // Új komment hozzáadása
    const addComment = async () => {
        if (newComment.trim()) {
            try {
                const response = await axios.post(`${API_URL}/post/${postId}/comments`, {
                    userId,
                    text: newComment,
                });

                const addedComment: Comment = {
                    id: response.data.id,
                    userId: response.data.userId,
                    userSortName: response.data.userSortName,
                    text: response.data.text,
                    userImage: response.data.userImage || 'https://via.placeholder.com/40',
                };
                setCommentList((prev) => [...prev, addedComment]);
                setNewComment('');
                await fetchCommentCount();
            } catch (error) {
                console.error('Error adding comment:', error);
                alert("Failed to add comment. Please try again.");
            }
        }
    };

    const deleteComment = async (commentId: number) => {
        try {
            await axios.delete(`${API_URL}/post/${postId}/comments/${commentId}`, {
            });
            setCommentList((prev) => prev.filter((comment) => comment.id !== commentId));
            await fetchCommentCount();
        } catch (error) {
            console.error('Error deleting comment:', error);
            alert('Failed to delete comment. Please try again.');
        }
    };

    return (
        <View style={styles.commentSection}>
            <FlatList
                data={commentList}
                keyExtractor={(item) => item.id.toString()}
                renderItem={({ item }) => (
                    <View style={styles.commentContainer}>
                        {/* Profilkép */}
                        <Image source={{ uri: item.userImage }} style={styles.userImage} />
                        <View style={styles.commentContent}>
                            <ThemedText type='defaultSemiBold'>{item.userSortName}</ThemedText>
                            <ThemedText type='default'>{item.text}</ThemedText>
                        </View>
                        {/* Szív ikon */}
                        <TouchableOpacity onPress={() => toggleLike(item.id)}>
                            <Icon
                                name="heart"
                                size={20}
                                color={likedComments.includes(item.id) ? 'red' : '#888'}
                                style={styles.heartIcon}
                            />
                        </TouchableOpacity>
                        {/* Törlés gomb, csak saját kommenteknél */}
                        {item.userId === userId && ( // Feltételezve, hogy a comment tartalmazza a userId mezőt
                            <TouchableOpacity onPress={() => deleteComment(item.id)}>
                                <Feather name="trash-2" size={20} color="red" />
                            </TouchableOpacity>
                        )}
                    </View>
                )}
                ListEmptyComponent={<Text style={styles.noCommentsText}>No comments yet.</Text>}
            />

            {/* Új komment hozzáadása */}
            <View style={styles.addCommentSection}>
                <TextInput
                    style={styles.input}
                    placeholder="Add a comment..."
                    placeholderTextColor="#888"
                    value={newComment}
                    onChangeText={(text) => setNewComment(text)}
                />
                <TouchableOpacity onPress={addComment}>
                    <Feather name="send" size={26} color="black" />
                </TouchableOpacity>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    commentSection: {
        marginTop: 20,
        paddingTop: 10,
        borderTopWidth: 1,
        borderTopColor: '#ddd',
    },
    commentContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 12,
    },
    userImage: {
        width: 40,
        height: 40,
        borderRadius: 20,
        marginRight: 10,
    },
    commentContent: {
        flex: 1,
    },
    heartIcon: {
        marginLeft: 10,
    },
    noCommentsText: {
        color: '#777',
        fontStyle: 'italic',
        textAlign: 'center',
    },
    addCommentSection: {
        flexDirection: 'row',
        alignItems: 'center',
        borderTopWidth: 1,
        borderTopColor: '#ddd',
        paddingVertical: 10,
    },
    input: {
        flex: 1,
        borderWidth: 1,
        borderColor: '#555',
        borderRadius: 8,
        paddingHorizontal: 10,
        marginRight: 10,
        height: 40,
    },
});

export default CommentSection;

import React from 'react';
import { View, StyleSheet } from 'react-native';
import { ThemedText } from './ThemedText';

interface CommentSectionProps {
    comments: { id: number; user: string; text: string }[]; // Kommentek listája
}

const CommentSection: React.FC<CommentSectionProps> = ({ comments }) => {
    return (
        <View style={styles.commentSection}>
            <ThemedText type="default" style={styles.commentTitle}>
                Comments
            </ThemedText>
            {comments.length > 0 ? (
                comments.map((comment) => (
                    <View key={comment.id} style={styles.comment}>
                        <ThemedText type="default">
                            {comment.user}: {comment.text}
                        </ThemedText>
                    </View>
                ))
            ) : (
                <ThemedText type="default">No comments yet.</ThemedText>
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    commentSection: {
        marginTop: 10,
        paddingTop: 10,
        borderTopWidth: 1,
        borderTopColor: '#ddd',
    },
    commentTitle: {
        fontWeight: 'bold',
        marginBottom: 5,
    },
    comment: {
        marginBottom: 5,
    },
});

export default CommentSection;

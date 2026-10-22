import React from 'react';
import {
    StyleSheet,
    Text,
    View,
} from 'react-native';

interface Props {
    score: number;
    status: string;
    message: string;
}

export default function FinancialHealthCard({
    score,
    status,
    message,
}: Props) {
    return (
        <View style={styles.card}>
            <Text style={styles.title}>
                Financial Health Score
            </Text>

            <Text style={styles.score}>
                {score}/100
            </Text>

            <View style={styles.progressTrack}>
                <View
                    style={[
                        styles.progressFill,
                        {
                            width: `${score}%`,
                        },
                    ]}
                />
            </View>

            <Text style={styles.status}>
                {status}
            </Text>

            <Text style={styles.message}>
                {message}
            </Text>
        </View>
    );
}

const styles = StyleSheet.create({
    card: {
        backgroundColor: '#fff',
        padding: 20,
        borderRadius: 20,
        marginBottom: 20,
        alignItems: 'center',
    },

    title: {
        fontSize: 18,
        fontWeight: 'bold',
    },

    score: {
        fontSize: 40,
        fontWeight: 'bold',
        marginTop: 10,
    },

    status: {
        fontSize: 18,
        marginTop: 5,
        fontWeight: '600',
    },

    message: {
        textAlign: 'center',
        marginTop: 10,
    },
    progressTrack: {
        width: '100%',
        height: 10,
        backgroundColor: '#E5E7EB',
        borderRadius: 10,
        marginTop: 15,
      },
      
      progressFill: {
        height: 10,
        backgroundColor: '#10B981',
        borderRadius: 10,
      },
});
import React from 'react';

import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

interface ExpenseItemProps {
  item: any;
  onDelete: () => void;
}

const icons: any = {
  Food: '🍔',
  Travel: '🚕',
  Shopping: '🛒',
  Bills: '💡',
  Other: '📦',
};
export default function ExpenseItem({
  item,
  onDelete,
}: ExpenseItemProps) {
  return (
    <View style={itemStyles.card}>
      <View>
        <Text style={itemStyles.title}>
          {icons[item.category]} {item.title}
        </Text>

        <Text style={itemStyles.category}>
          {item.category}
        </Text>

        <Text style={itemStyles.date}>
          {item.date}
        </Text>
      </View>

      <View style={itemStyles.rightContainer}>
        <Text style={itemStyles.amount}>
          ₹{item.amount}
        </Text>

        <TouchableOpacity
          style={itemStyles.deleteButton}
          onPress={onDelete}
        >
          <Text style={itemStyles.deleteText}>
            Delete
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const itemStyles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#F9FAFB',
    padding: 15,
    borderRadius: 15,
    marginBottom: 12,
  },

  title: {
    fontSize: 16,
    fontWeight: 'bold',
  },

  category: {
    color: '#6B7280',
    marginTop: 5,
  },

  date: {
    color: '#9CA3AF',
    marginTop: 4,
    fontSize: 12,
  },

  rightContainer: {
    alignItems: 'flex-end',
  },

  amount: {
    fontWeight: 'bold',
    color: '#10B981',
    fontSize: 16,
  },

  deleteButton: {
    marginTop: 8,
    backgroundColor: '#EF4444',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 8,
  },

  deleteText: {
    color: '#FFFFFF',
    fontWeight: 'bold',
    fontSize: 12,
  },
});
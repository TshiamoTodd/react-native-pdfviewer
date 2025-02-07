import { router } from 'expo-router';
import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import AntDesign from '@expo/vector-icons/AntDesign';

const CustomAccordion = ({ title, content, onPressAction }: {title: string, content: string[], onPressAction?: (year:string) => void}) => {
  const [isOpen, setIsOpen] = useState(false);
  const moveToNextScreen = (year: string) => {
    console.log("Move to next screen with year: ", year)
    router.push({
      pathname: '/listPapers',
      params: {
        year: year,
        title: title
      }
    })
  }

  return (
    <View style={styles.container}>
      <TouchableOpacity style={[styles.card, isOpen && styles.cardOpen]} onPress={() => setIsOpen(!isOpen)} activeOpacity={0.8}>
        <Text style={styles.title}>{title}</Text>
        {isOpen 
          ? <AntDesign name="upcircleo" size={20} color="black" /> 
          : <AntDesign name="downcircleo" size={20} color="black" />
        }
      </TouchableOpacity>
      {isOpen && (
        <View style={styles.contentContainer}>
          {content.map((item, index) => (
            <TouchableOpacity key={index} style={styles.contentItemBtn} onPress={() => moveToNextScreen(item)}>
              <Text style={styles.content}>{item}</Text>
            </TouchableOpacity>
          ))}
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: 8,
  },
  card: {
    backgroundColor: '#fff',
    padding: 16,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
    display: 'flex',
    justifyContent: 'space-between',
    flexDirection: 'row',
    alignItems: 'center',
  },
  cardOpen: {
    borderBottomLeftRadius: 0,
    borderBottomRightRadius: 0,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  contentContainer: {
    width: '100%',
    overflow: 'hidden',
    backgroundColor: '#f9f9f9',
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10,
    padding: 10
  },
  contentItemBtn: {
    padding: 15,
    backgroundColor: 'gray',
    width: '100%',
    marginBottom: 2,
    borderRadius: 10,
  },
  content: {
    fontSize: 14,
    color: '#000',
    marginBottom: 4,
  },
});
export default CustomAccordion;

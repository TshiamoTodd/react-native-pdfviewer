import { View, Text, TouchableOpacity } from 'react-native'
import React from 'react'
import Accordion from 'react-native-collapsible/Accordion'
import { Avatar, ListItem } from '@rneui/themed';
import { Icon } from '@rneui/base';
import { router } from 'expo-router';
import CustomAccordion from '@/components/CustomAccordion';

const grades = [
  {
    grade: 'Grade 10',
    year: ['2019', '2020', '2021'],
  },
  {
    grade: 'Grade 11',
    year: ['2017', '20218', '2023'],
  },
  {
    grade: 'Grade 12',
    year: ['2022', '2023', '2024'],
  }
]

export default function index() {
  const [expanded, setExpanded] = React.useState(false);

  

  return (
    <View style={{flex: 1, backgroundColor: 'lightgray', padding: 10, marginTop: 25}}>
      {grades.map((grade, index) => (
        <CustomAccordion 
          key={index} 
          title={grade.grade} 
          content={grade.year} 
        />
      ))}
    </View>
  )
}




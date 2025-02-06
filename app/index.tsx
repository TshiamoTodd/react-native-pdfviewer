import { View, Text, TouchableOpacity } from 'react-native'
import React from 'react'
import Accordion from 'react-native-collapsible/Accordion'
import { Avatar, ListItem } from '@rneui/themed';
import { Icon } from '@rneui/base';
import { router } from 'expo-router';

const grades = [
  {
    grade: 'Grade 10',
    year: '2020',
  },
  {
    grade: 'Grade 10',
    year: '2021',
  },
  {
    grade: 'Grade 10',
    year: '2022',
  }
]

const list2 = [
  {
    name: 'First',
    subtitle: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Minima magni tempora tenetur beatae modi officia.',
    avatar_url: 'https://s3.amazonaws.com/uifaces/faces/twitter/ladylexy/128.jpg',
  },
  {
    name: 'Second',
    subtitle: 'Lorem ipsum dolor sit amet consectetur, adipisicing elit. Labore, repudiandae.',
    avatar_url: 'https://s3.amazonaws.com/uifaces/faces/twitter/adhamdannaway/128.jpg',
  },
]

export default function index() {
  const [expanded, setExpanded] = React.useState(false);

  const moveToNextScreen = (year: string) => {
    console.log("Move to next screen with year: ", year)
    router.push({
      pathname: '/listPapers',
      params: {
        year: year
      }
    })
  }

  return (
    <View style={{flex: 1, backgroundColor: 'grey', padding: 10, marginTop: 25}}>
      <ListItem.Accordion
        style={{width: "100%", padding: 0, borderRadius: 10}}
        content={
            <>
              <ListItem.Content>
                <ListItem.Title>{grades[0].grade}</ListItem.Title>
              </ListItem.Content>
            </>
        }
        isExpanded={expanded}
        onPress={() => {
          setExpanded(!expanded);
        }}
      >
        {grades.map((l, i) => (
          <ListItem key={i} onPress={() => {}} bottomDivider style={{width: "100%"}}>
            <ListItem.Content>
              <ListItem.Title>
                <TouchableOpacity 
                  style={{width: '100%'}}
                  onPress={() => moveToNextScreen(l.year)}
                >
                  <Text>
                    {l.year}
                  </Text>
                </TouchableOpacity>
              </ListItem.Title>
            </ListItem.Content>
            <ListItem.Chevron />
          </ListItem>
        ))}
      </ListItem.Accordion>
    </View>
  )
}


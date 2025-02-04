import { View, Text } from 'react-native'
import React from 'react'
import Accordion from 'react-native-collapsible/Accordion'


const SECTIONS = [
  {
    title: 'First',
    content: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Minima magni tempora tenetur beatae modi officia.',
  },
  {
    title: 'Second',
    content: 'Lorem ipsum dolor sit amet consectetur, adipisicing elit. Labore, repudiandae.',
  },
]

export default function index() {
  return (
    <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
      <Accordion
        sections={SECTIONS}
        activeSections={[0]}
        renderSectionTitle={section => {
          return (
            <View>
              <Text>{section.title}</Text>
            </View>
          )
        }}
        renderHeader={section => {
          return (
            <View>
              <Text>{section.content}</Text>
            </View>
          )
        }}
        renderContent={section => {
          return (
            <View>
              <Text>{section.title}</Text>
            </View>
          )
        }}
        onChange={activeSections => {
          console.log(activeSections)
        }}
      />
    </View>
  )
}


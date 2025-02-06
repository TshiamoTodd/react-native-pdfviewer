import { View, Text } from 'react-native'
import React from 'react'
import { useLocalSearchParams } from 'expo-router'

const listPapers = async () => {
    const {year} = useLocalSearchParams()

    return (
        <View style={{flex: 1, padding: 25}}>
        <Text>{year}</Text>
        </View>
    )
}

export default listPapers
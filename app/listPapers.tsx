import { View, Text, Alert, StyleSheet, TouchableOpacity } from 'react-native'
import React, { useEffect, useState } from 'react'
import { router, useLocalSearchParams } from 'expo-router'
import { supabase } from '@/lib/supabase'

const listPapers = () => {
    const {year, title} = useLocalSearchParams()
    console.log({title, year})
    const [files, setFiles] = useState<{filename:string, path:string, url:string}[]>([])
    
    useEffect(() => {
        const listFilesInFolder = async () => {
            try {
                const folderPath =  `${title}/Mathematics/${year}/`
    
                const {data, error} = await supabase.storage
                .from('pdfBucket')
                .list(folderPath)

                console.log('Data: ', data)
        
                if (error) {
                    console.log('Error listing files', error)
                    return []
                }
        
                const files = await Promise.all(data.map(async (file) => {
                    const filePath = `${folderPath}${file.name}`
                    const {data: urlData} = await supabase.storage
                    .from('pdfBucket')
                    .getPublicUrl(filePath)
        
                    return {
                        filename: file.name,
                        path: filePath,
                        url: urlData.publicUrl
                    }
                }))

                console.log('Files: ', files)
                setFiles(files)

            } catch (error: any) {
                Alert.alert('Error', error.message)
            }
    
        }

        listFilesInFolder()
    }, [])

    const openFile = (url: string) => {
        router.push({
            pathname: '/pdfViewer',
            params: {url: url},
        })
    }

    return (
        <View style={{flex: 1, padding: 25, backgroundColor: 'lightgray'}}>
            <Text style={{fontSize: 20, fontWeight: 'bold', marginBottom: 10}}>List of Papers</Text>
            {files.map((file, index) => (
                <TouchableOpacity key={index} style={styles.card} onPress={() => openFile(file.url)}>
                    <Text style={styles.title}>
                        {title} - Past Question Paper
                    </Text>
                    <Text style={styles.description}>
                        {file.filename}
                    </Text>
                </TouchableOpacity>
            ))}
        </View>
    )
}

export default listPapers

const styles = StyleSheet.create({
    card: {
      backgroundColor: '#fff',
      padding: 16,
      marginVertical: 8,
      borderRadius: 10,
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.1,
      shadowRadius: 4,
      elevation: 3,
    },
    title: {
      fontSize: 18,
      fontWeight: 'bold',
      marginBottom: 4,
    },
    description: {
      fontSize: 14,
      color: '#666',
    },
  });
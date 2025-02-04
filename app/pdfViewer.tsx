import { View, Text, StyleSheet, SafeAreaView, Button } from 'react-native'
import React, { useRef, useState } from 'react'
import Pdf from 'react-native-pdf'
import {MyPdf} from '@/app/myPdf'
import { printToFileAsync } from 'expo-print'

const PdfViewer = () => {
    const onlineSource = {uri: "https://ssirfvdyfsbjmhdhxemr.supabase.co/storage/v1/object/public/pdfBucket/Grade%2010%20-%20June/Gr10%20Math%20P2%20(English)%20June%202019%20Question%20Paper.pdf", cache: true}
    const [pdfSource, setPdfSource] = useState(onlineSource)
    const pdfRef = useRef<Pdf | null>(null)

    const generatePdf = async (generateBase64: any) => {
        const html = `
            <html>
                <body style="margin:32px;">
                    <h1>Hi YouTube</h1>
                    <h2>Base64: ${generateBase64.toString()}</h2>
                </body>
            </html>
        `

        const fileGenerated = await printToFileAsync({
            html: html,
            base64: generateBase64 
        })

        console.log(fileGenerated.base64)
        console.log(fileGenerated.uri)

        const newSource = {
            uri: generateBase64 ? `data:application/pdf;base64,${fileGenerated.base64}` : fileGenerated.uri,
            cache: true
        }

        setPdfSource(newSource)
    }

    return (
        <SafeAreaView style={styles.container}>
            <Button title="Change Page" onPress={() => pdfRef.current!.setPage(18)} />
            <Button title="Show Online PDF" onPress={() => setPdfSource(onlineSource)} />
            <Button title="Generate and Show" onPress={() => generatePdf(false)} />
            <Button title="Generate and Show Base64" onPress={() => generatePdf(true)} />
            <Button title="Show Base64 PDF" onPress={() => setPdfSource({ uri: `data:application/pdf;base64,${MyPdf}`, cache: true })} />
            <Pdf
                source={pdfSource}
                ref={pdfRef} 
                trustAllCerts={false}
                onLoadComplete={(numberOfPages,filePath)=>{
                    console.log(`number of pages: ${numberOfPages}`);
                }}
                onPageChanged={(page,numberOfPages)=>{
                    console.log(`current page: ${page}`);
                }}
                onError={(error)=>{
                    console.log(error);
                }}
                onPressLink={(uri)=>{
                    console.log(`Link pressed: ${uri}`)
                }}
                style={styles.pdf}
            />
        </SafeAreaView>
    )
}

export default PdfViewer

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
        margin: 32
      },
      pdf: {
        flex: 1,
        alignSelf: "stretch"
      }
})
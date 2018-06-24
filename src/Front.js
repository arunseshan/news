import React, { Component } from 'react'
import { Text, StyleSheet, View, StatusBar } from 'react-native'
import News from './News'
import Weather from './Weather'

const latitude = 0
const longitude = 0
const loc={}
export default class Front extends Component {
  constructor(props){
    super(props)
    this.state ={
      weather :[],
      news : '',
      location : 0,
        latitude: 0,
        longitude : 0
      }
    }
  

  
  
  render() {
    return (
      <View>
        <StatusBar
            barStyle="light-content"
            backgroundColor="#4F6D7A"
          />
        <View style={styles.mainPanel}>
          <Weather />
          <News />
        </View>
       
      </View>
    )
  }
}

const styles = StyleSheet.create({
  mainPanel:{
    
    backgroundColor: '#fff',
    flexDirection: 'column',
    justifyContent: 'space-between',
    padding:10,
    paddingTop: 30,
  }
})

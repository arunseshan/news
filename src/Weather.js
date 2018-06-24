import React, { Component } from 'react'
import { Text, StyleSheet, View , Image} from 'react-native'


var weatherURL = ''
const temperature = 0
const imgURL = ''
export default class Weather extends Component{
  constructor(){
    super()
    this.state={
      latitude:23.047004,
      longitude:72.523275,
      weather:[],
      icon : '',
      city:'',
      country:'',
      loc:{}
    }
  }

  componentWillReceiveProps(nextProps){
    this.setState({count:nextProps.location});
}
  

  getWeather=async()=>{
    console.log(this.props.latitude)
    // const lat = this.state.loc.latitude
    // const lon = this.state.loc.longitude
    console.log('Weather state lat :'+ this.state.loc.latitude 
                + ' Weather state lon: '+ this.state.loc.longitude)
    const lat = this.state.latitude
    const lon = this.state.longitude
    weatherURL = 'http://api.wunderground.com/api/bf2dd8bc49ed6a27/conditions/q/'+
                  lat+','+lon+'.json'
    const response = await fetch(weatherURL)
    const json = await response.json()
    const weather_conditions = json.current_observation
    this.setState({
      weather : weather_conditions,
      icon : weather_conditions.icon_url,
      city: weather_conditions.observation_location.city,
      country : weather_conditions.observation_location.country
    })

  }

  componentDidMount(){
    this.getWeather()
  }
  //UV

  render(){
    return (
      <View style={styles.weatherBox}>
        <View style={styles.firstContainer}>
          <Text style={styles.locationFont}>{this.state.city}, </Text>
          <Text style={styles.locationFont}>{this.state.country}</Text>
        </View>
        <View style={styles.secondContainer} >
          <View style={styles.wordBox}>
            <View style={styles.tempBox}>
              <Text style={styles.tempFont}>{this.state.weather.temp_c}°</Text>
              <Text style={styles.unitFont}>c</Text>
            </View>
          </View>
          <View style={styles.middleBox}>
              <View style={styles.humidityBox}>
                <Text style={styles.humidityFont}>Humidity {this.state.weather.relative_humidity}</Text>
                <Text style={styles.humidityFont}>Feels Like {this.state.weather.feelslike_c}°c</Text>
                <Text style={styles.humidityFont}>Visibility {this.state.weather.visibility_km} km</Text>
              </View>
          </View>
          <View style={styles.middleBox}>
             <View style={styles.humidityBox}>
              <Text style={styles.humidityFont}>UV Level {this.state.weather.UV}</Text>
              <Text style={styles.humidityFont}>Wind {this.state.weather.wind_kph} kph</Text>
              <Text style={styles.humidityFont}>{this.state.weather.weather}</Text>
             </View>
          </View>
          <View style={styles.imageBox}>
            <Image
              style={{width: 50, height: 50, shadowColor: '#fff',}}
              source={{uri: this.state.icon}}
            />
          </View>
        </View>
      </View>
    )
  }
}


const styles = StyleSheet.create({
    weatherBox :{
      padding : 10,
      paddingTop : 5,
      flexDirection: 'column',
      //borderRadius: 10,
      //borderWidth: 0.8,
      //borderColor: '#aaa',
      justifyContent:'space-between',

    },
    firstContainer:{
      flexDirection :'row',
      justifyContent:'center'
    },
    locationFont:{
      color:'#5f5f5f',
      fontWeight: 'bold',
      fontSize:15,
    },
    secondContainer:{
      flexDirection :'row',
      justifyContent:'space-between'
    },
    line:{
      borderColor: '#666',
      borderBottomWidth: 1,
    },
    wordBox:{
      flexDirection:'column'
    },
    imageBox:{
      flexDirection: 'column',
      alignItems: 'flex-end'
    },
    tempBox:{
      flexDirection: 'row',
      //alignItems: 'flex-end',

    },
    tempFont:{
      fontSize: 30,
      color:'#5f6fff'
    },
    unitFont:{
      fontSize: 30,
      color:'#5f6fff'
    },
    humidityBox:{
      padding: 5
    },
    humidityFont:{
      fontStyle: 'italic',
      fontSize:12,
      color:'#666'
    },
    weatherFont:{
      fontStyle: 'italic',
      fontSize:17,
      color:'#666'
    }
})

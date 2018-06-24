import React, { Component } from 'react';
import {  View, Text, FlatList, Image, StyleSheet, Dimensions,Alert, Linking, TouchableHighlight} from 'react-native';
import img from './img/placeholder.jpg'

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;
const defaultImg = img
export default class NewsCards extends Component {
  constructor(props){
    super(props)
    this.state={
      articles:[]
    }
  }

  componentDidMount(){
    //this.getWeather()
    this.getNews()
  }

  getNews= async()=>{
    let url='https://newsapi.org/v2/top-headlines?country='+'in'+'&apiKey=df569d9cffab49ba9ed5b252c1962ab5'
    const response = await fetch(url);
    const json = await response.json();
    this.setState({ articles: json.articles });
  }

  _keyExtractor(item, index) {
    return index;
  }

  imageLoadFail=()=>{

  }

  articleRenderer=(articleString)=>{
    const aString = articleString.substr(0,140)
    if(aString==''){
      return
    }else{
      return(aString+'...')
    }
  }

  publishedAtFormat=(publishedAt)=>{
    const unfDate = publishedAt
    const year = unfDate.substr(0,4)
    const month = unfDate.substr(5,2)
    const date = unfDate.substr(8,2)
    var dayUpper = ''
    var strdate = date.substr(1,1)
    var dateInInt = parseInt(strdate)
    if(dateInInt == 1 ){
      dayUpper = 'st'
    }else if(dateInInt == 2) {
      dayUpper = 'nd'
    }else if(dateInInt == 3) {
      dayUpper = 'rd'
    }else{
      dayUpper = 'th'
    }
    const monthInDigit = parseInt(month)
    var monthInAlphabet = ''
    switch(monthInDigit){
      case 1:
        monthInAlphabet = 'January'
        break
      case 2:
        monthInAlphabet = 'February'
        break
      case 3:
        monthInAlphabet = 'March'
        break
      case 4:
        monthInAlphabet = 'April'
        break
      case 5:
        monthInAlphabet = 'May'
        break
      case 6:
        monthInAlphabet = 'June'
        break
      case 7:
        monthInAlphabet = 'July'
        break
      case 8:
        monthInAlphabet = 'August'
        break
      case 9:
        monthInAlphabet = 'September'
        break
      case 10:
        monthInAlphabet = 'October'
        break
      case 11:
        monthInAlphabet = 'November'
        break
      case 12:
        monthInAlphabet = 'December'
        break
    }
    return(date+dayUpper+' of '+monthInAlphabet+', '+year)
  }

  onItemPress=(url)=>{
    Linking.canOpenURL(url)
    .then(supported =>{
      if(!supported){
        console.log('cant handle url'+url)
      }else{
        return Linking.openURL(url)
      }
    }).catch(err => console.log('Error Occured: '+err))
  }

  onButtonPressTest=()=>{
    Alert.alert("Hello")
  }

  renderItems=(data)=> {
    let { item, index } = data;

    return (
      <View style={styles.reportCard}>
        <TouchableHighlight onPress={()=>this.onItemPress(item.url)} style={styles.imageBox}>
          <Image style={styles.imageStyle} source={{uri: item.urlToImage}} defaultSource={defaultImg} />
        </TouchableHighlight>
        <View style={styles.detailBox}>
          <Text style={styles.author}>from {item.source.name}, </Text>
          <Text style={styles.author}>published on {this.publishedAtFormat(item.publishedAt)}</Text>
        </View>
        <TouchableHighlight onPress={()=>this.onItemPress(item.url)}>
          <View >
            <Text style={styles.headLine} /*onPress={this.onItemPress(item.url)}*/>{item.title}</Text>
          </View>
        </TouchableHighlight>

        <View style={styles.line}></View>
      </View>
    )
  }

  render() {
    ////console.log(this.state.articles)
    return (
      <View>
        <View>
          <FlatList
            data={this.state.articles}
            renderItem={this.renderItems}
            keyExtractor={this._keyExtractor}
          />
        </View>
      </View>
    );
  }
}


let styles= StyleSheet.create({
  container:{
    flex:1,
    backgroundColor:'white'
  },
  reportCard:{
    //borderRadius: 10,
    //borderColor: '#bbb',
    //borderWidth: 0.9,
    marginTop: 1,
    paddingTop : 5,
    paddingLeft : 5,
    paddingRight: 5,
    paddingBottom: 5
  },
  theList:{
    padding: 10,
    backgroundColor:'white'
  },
  imageStyle:{
    flex: 1,
    alignSelf: 'stretch',
    width: undefined,
    height: undefined,
    borderRadius: 10
  },
  headLine:{
    fontWeight: 'bold',
  },
  author:{
    color:'#555',
    fontStyle: 'italic',
    fontSize: 10,
  },
  article:{
    color:'#555',
    fontSize: 14,
    textAlign :'justify',
    display: 'none',
  },
  imageBox:{
    height: 150,
    justifyContent : 'center',
    marginBottom: 5,
  },
  detailBox:{
    flexDirection: 'row',
  },
  line:{
    marginTop: 3,
    borderColor:'#ccc',
    borderWidth:0.4,
  }

})

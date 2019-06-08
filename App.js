//FINAL FULL STACK
import React, {Component} from 'react';
import { createStackNavigator } from 'react-navigation';
import {Platform, StyleSheet,Button, Text, View,ImageBackground,TextInput,Dimensions,TouchableOpacity,ListView,AsyncStorage,TouchableHighlight,StatusBar,Linking,FlatList,WebView} from 'react-native';
import { getNews } from './news.js';
// We'll get to this one later
import Article from './Article';
import { Container, Content, Header, Form, Input, Item,Button as ButtonBase, Label, Icon, List, ListItem } from 'native-base'
import * as firebase from 'firebase';
import bgImage from './bglogin2.jpg'
import bgImage2 from './mainbg.jpg'
import bgImage3 from './loginbg.jpg'
import bgImage4 from './newgenre.jpg'
const { width:WIDTH}=Dimensions.get('window');
var data = []

const constants = {
  actionColor: '#24CE84'
};
type Props = {};
firebase.initializeApp(
  {
   apiKey: "AIzaSyBNM9nuBwvHwr40VLdHWYBy6jvgXjZmSaU",
    authDomain: "awesomeproject-477a8.firebaseapp.com",
    databaseURL: "https://awesomeproject-477a8.firebaseio.com",
    projectId: "awesomeproject-477a8",
    storageBucket: "awesomeproject-477a8.appspot.com",
    messagingSenderId: "919654047312"
  });
class Home extends Component{
  constructor(props) {
    super(props);
    this.state={ login: '',password: ''};
  }
static navigationOptions={
    header: null,
  };

onSubmitButton()
{
 
    const{login,password} = this.state;
    firebase.auth().signInWithEmailAndPassword(login,password)
    .then(() =>
    {
      this.props.navigation.navigate('firstpage');
    })
    .catch(()=>{
      alert('Error In Login Try Again');
    });
}
  render(){
    return (
              <ImageBackground source={bgImage2} style={styles.backgroundContainer}>
              <View>
                <TextInput
                  style={styles.input2}
                   placeholder={'Username'}
                   placeholderTextColor={'rgba(255,255,255,0.7)'}
                   underlineColorAndroid='transparent'
                   onChangeText={(login) => this.setState({login})}
                      value={this.state.login}/>
              </View>
              <View>
                <TextInput
                  style={styles.namepassspace}
                   placeholder={'Password'}
                   secureTextEntry={true}
                   placeholderTextColor={'rgba(255,255,255,0.7)'}
                   underlineColorAndroid='transparent'
                   onChangeText={(password) => this.setState({password})}
                      value={this.state.password} 
                   />
              </View>
              <TouchableOpacity style={styles.loginbtn}>
                <Button title="Login" color="#32CD32" onPress={this.onSubmitButton.bind(this)}/>
              </TouchableOpacity>
              <TouchableOpacity style={styles.signupbtn}>
                <Button title="Register" color="#32CD32" onPress={() => this.props.navigation.navigate('register1')} />
              </TouchableOpacity>
              </ImageBackground>
              );
      }
}
class Register1 extends Component{
  constructor(props) {
    super(props);
    this.state={ login: '',password: ''};
  }
onSignupButton()
{
    const{login,password} = this.state;
    firebase.auth().createUserWithEmailAndPassword(login,password)
    .then(() =>
    {
      alert('Registered Successfully');
      this.props.navigation.navigate('firstpage');
      //alert("called mainpage");
    })
    .catch(()=>{
      alert('Error In SignUp Try Again');
    });
}
  render(){
    return (
              <ImageBackground source={bgImage3} style={styles.backgroundContainer1}>
              <View>
                <TextInput
                  style={styles.input2}
                   placeholder={'Username'}
                   placeholderTextColor={'rgba(255,255,255,0.7)'}
                   underlineColorAndroid='transparent'
                   onChangeText={(login) => this.setState({login})}
                      value={this.state.login}/>
              </View>
              <View>
                <TextInput
                  style={styles.namepassspace}
                   placeholder={'Password'}
                   secureTextEntry={true}
                   placeholderTextColor={'rgba(255,255,255,0.7)'}
                   underlineColorAndroid='transparent'
                   onChangeText={(password) => this.setState({password})}
                      value={this.state.password} 
                   />
              </View>
              <TouchableOpacity style={styles.signupbtn}>
                <Button title="Register" color="#7DC3D3" onPress={this.onSignupButton.bind(this)}/>
              </TouchableOpacity>
              </ImageBackground>
              );
      }
}
class Firstpage extends Component<Props>
{
  render(){
    return(
            <ImageBackground source={bgImage4} style={styles.backgroundContainer}>
            <View>
            <TouchableOpacity style={styles.loginbtn1}>
            <Button title="Rap" color='red'  height='50' onPress={ ()=>{ Linking.openURL('https://pcgetyhpwswpddysi5d8tg-on.drv.tw/Rap/')}}/></TouchableOpacity>
            <TouchableOpacity style={styles.loginbtn1}>
            <Button title ="Melody" color='pink' onPress={() => Linking.openURL('https://pcgetyhpwswpddysi5d8tg-on.drv.tw/Melody/')}/></TouchableOpacity>
            <TouchableOpacity style={styles.loginbtn1}>
            <Button title ="Pop" color='blue'  height='100' onPress={() => Linking.openURL('https://pcgetyhpwswpddysi5d8tg-on.drv.tw/Rap/')}/></TouchableOpacity>
            <TouchableOpacity style={styles.loginbtn1}>

            <Button title ="Rock" color='green'  onPress={() => Linking.openURL('https://pcgetyhpwswpddysi5d8tg-on.drv.tw/Melody/')}/></TouchableOpacity>
            <TouchableOpacity style={styles.loginbtn1}>

            <Button title ="Jazz" color='brown'  onPress={() => Linking.openURL('https://pcgetyhpwswpddysi5d8tg-on.drv.tw/Rap/')}/></TouchableOpacity>
            <TouchableOpacity style={styles.loginbtn1}>

            <Button title ="classical" color='grey'  onPress={() => Linking.openURL('https://pcgetyhpwswpddysi5d8tg-on.drv.tw/Melody/')}/></TouchableOpacity>
            <TouchableOpacity style={styles.loginbtn1}>

            <Button title ="News Feed" color='black'  onPress={() => this.props.navigation.navigate('news')}/></TouchableOpacity>

            </View>
            </ImageBackground>
    );
  }
}
class News extends Component<Props>
{
  constructor(props) {
    super(props);
    this.state = { articles: [], refreshing: true };
    this.fetchNews = this.fetchNews.bind(this);
  }
  componentDidMount() {
    this.fetchNews();
   }

  fetchNews() {
    getNews()
      .then(articles => this.setState({ articles, refreshing: false }))
      .catch(() => this.setState({ refreshing: false }));
  }

  handleRefresh() {
    this.setState(
      {
        refreshing: true
    },
      () => this.fetchNews()
    );
  }

  render() {
    return (
      <View style={{backgroundColor: '#D1F2EB'}}>
      <FlatList
        data={this.state.articles}
        renderItem={({ item }) => <Article article={item} />}
        keyExtractor={item => item.url}
        refreshing={this.state.refreshing}
        onRefresh={this.handleRefresh.bind(this)}
      />
      </View>
  );
  }
}
export default class App extends React.Component {
  render() {
    return <RootStack />;
  }
}
const RootStack = createStackNavigator(
  {
   home:{
    screen: Home,
    navigationOptions: {
      title:'MusiConnect',

    }
   },
   register1:{
    screen: Register1,
    navigationOptions: {
      title:'Register',
    }
   },
   firstpage:{
    screen:Firstpage,
    navigationOptions: {
      gesturesEnabled: false,
      headerBackTitleVisible: false,
      headerBackTitle:null,
      headerLeft:null,
      title:'Select a Genre'
    }
   },
   news:{
    screen:News,
    navigationOptions: {
      title:'NewsFeed'
    }
   },
  },
  {
    initialRouteName: 'home',
  }
);
const styles = StyleSheet.create({
  backgroundContainer:{
    flex:1,
    width:null,
    height:null,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#000000',
  },
  backgroundContainer1:{
   // width:null,
   // height:null,
   // justifyContent: 'center',
   // alignItems: 'center',
   // backgroundColor: '#000000',
  },
  input:
  {
    width: WIDTH -55,
    height: 45,
    borderRadius:5,
    //fontSize: 16,
    paddingLeft:45,
    backgroundColor: 'rgba(0,0,0,0.35)',
    color: 'rgba(255,255,255,0.7)',
    marginHorizontal:25,
    marginTop:100,
      marginBottom:5,
  },
  input2:
  {
    width: WIDTH -55,
    height: 45,
    borderRadius:5,
    //fontSize: 16,
    paddingLeft:45,
    backgroundColor: 'rgba(0,0,0,0.35)',
    color: 'rgba(255,255,255,0.7)',
    marginHorizontal:25,
    marginTop:15,
      marginBottom:10,
  },
  inputIcon:
  {
    position: 'absolute',
    top: 8,
    left: 37,

  },
  namepassspace:{
    width: WIDTH-55,
    height: 45,
    borderRadius:5,
   // fontSize: 16,
    paddingLeft:45,
    backgroundColor: 'rgba(0,0,0,0.35)',
    color: 'rgba(255,255,255,0.7)',
    marginHorizontal:25,
      marginTop:15,
      marginBottom:15,
  },
  input1:
  {
    width: WIDTH -55,
    height: 45,
    borderRadius:5,
    fontSize: 16,
    paddingLeft:45,
    backgroundColor: 'rgba(0,0,0,0.35)',
    color: 'rgba(255,255,255,0.7)',
    marginHorizontal:25,
  },
  loginbtn:{
    width: WIDTH -55,
    height: 45,
    borderRadius:5,
   // fontSize: 16,
        justifyContent: 'center',
        backgroundColor: 'rgba(0,0,0,0)',
    marginTop:15
  },
  bt2:{
    width: WIDTH -55,
    height: 70,
    borderRadius:5,
   // fontSize: 16,
        justifyContent: 'center',
        backgroundColor: 'rgba(0,0,0,0)',
    marginTop:15,
    marginBottom:10,
  },
  loginbtn1:{
   // width: WIDTH -55,
    height: 70,
    //borderRadius:5,
   // fontSize: 16,
        justifyContent: 'center',
        backgroundColor: '#000000',
    marginTop:15,
    //marginBottom:10,
  },
  text1:{
      color: 'rgba(255,255,255,0.7)',
      fontSize:16,
      textAlign:'center'
  },
  signbtn:{
    marginHorizontal:25,
    width: WIDTH -55,
    height: 60,
    borderRadius:10,
   // fontSize: 16,
        justifyContent: 'center',
        backgroundColor: 'rgba(0,0,0,0)',
    marginTop:150,
    marginBottom:10,
  },
   instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 15,
    marginTop: 10,
  },
   signupbtn:{
    marginHorizontal:25,
    width: WIDTH -55,
    height: 100,
    borderRadius:5,
   // fontSize: 16,
    justifyContent: 'center',
        backgroundColor: 'rgba(0,0,0,0)',
    marginTop:250,
    marginBottom:10,
  },
   bt1:{
    width: 5,
    height: 105,
   // borderRadius:5,
   // fontSize: 16,
        justifyContent: 'center',
        backgroundColor: 'rgba(0,0,0,35)',
    marginTop:15,
    marginBottom:10,
  },
});

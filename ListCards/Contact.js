import React from 'react';
import { View, Text, TextInput, StyleSheet,Alert, Modal, Image, Button, TouchableHighlight} from 'react-native';
import DatePick from './DatePick'

export default class Contact extends React.Component{
    constructor(props){
        super(props)
        this.state={
          dateModalVisible: false
        }
    }

    onPress = () => this.setState( () =>({dateModalVisible: true}) )
    onClick = () => {
      this.setState( () =>({dateModalVisible: false}))
    }
    render(){
        const { mainImageUrl, name, score } = this.props.seller
        return(
          <View style={{flex:1}}>
            <View>
              <Modal
              animationType="slide" transparent={false}
              visible={this.state.dateModalVisible}>
                <DatePick onClick={this.onClick}/>
              </Modal>
            </View>
            <View style={{flex: 0.5,alignItems: 'center', justifyContent: 'center'}}>
              <Image style={{height: 68, width: 80, borderRadius: 30}} 
              source = {{uri: mainImageUrl}} resizeMode='contain'/>

              <View style={{flexDirection: 'row', margin: 10}}>
                <Text style={{margin: 5,fontSize: 18, fontWeight: 'bold'}}>
                  {name}   
                </Text>
                <View style={{margin: 5, height: 25, width: 1, backgroundColor: '#BBBBBB'}}/>
                <View style={{margin: 5, height: 30, width: 30, backgroundColor: 'lightgreen', alignContent:'center', justifyContent: 'center'}}>
                  <Text style={{color: 'black', textAlign: 'center'}}>{score}</Text>
                </View>
              </View>

              <TextInput style={styles.input} 
              placeholder={'Mobile Number'}/>
              <View style={{height:1, width: 200, backgroundColor: '#BBBBBB'}}/>

              <Button onPress={this.onPress} title='Select Meeting Date'>
              </Button>

              <View style={{margin: 10, justifyContent: 'center',alignContent:'center'}}>
                <TouchableHighlight style={{width: 75,height: 30, borderRadius:20, backgroundColor: '#EB0000', justifyContent: 'center'}} onPress={this.props.onClose}>
                  <Text style={{color: 'white',fontWeight:'bold', fontSize: 12, textAlign: 'center'}}>
                    Close
                  </Text>
                </TouchableHighlight>
              </View>
            </View>
            </View>
        );
    }
}
const styles=StyleSheet.create({
  input: {
    textAlign: 'center', 
    height:50,
    width: 200
  },
})

import React from 'react';
import { View, Text, StyleSheet, ScrollView, Image, Modal, TouchableOpacity} from 'react-native';
import Contact from './Contact'

export default class DetailsScreen extends React.Component{
    constructor(props){
        super(props)
        this.state={
            modalVisible: false
        }
    }

    onPress = () => this.setState( () =>({modalVisible: true}) )

    onClose = () => this.setState( () =>({modalVisible: false}) )

    render(){
        const { detail, seller } = this.props.navigation.state.params
        const { description, propImgUrl, price, propType, status, listScore } = detail
        return(
            <View style={{flex:1}}>
                    <View>
                        <Modal animationType="slide"
                        transparent={false}
                        visible={this.state.modalVisible}>
                            <Contact seller={seller} onClose={this.onClose}/>
                        </Modal>
                    </View>

                    <Image style={{height: 250}} source={{uri: propImgUrl}} resizeMode='cover'></Image>
                    <View style={styles.listScore} >
                        <Text style={{fontSize: 17, color:'white'}} title={'Listing Score'}>
                            {Math.round(listScore*10)/10}
                        </Text>
                    </View>
                    <Text style={{margin: 5, fontSize:20, fontWeight: 'bold'}}>
                        {propType}
                    </Text>
                    <Text style={{margin: 5, fontSize:20, fontWeight: 'bold'}}>
                        {'\u20B9'}  {price}
                    </Text>
                    <View style={{margin: 5, height: 2, backgroundColor: '#BBBBBB'}}/>
                    <ScrollView style={{height: 50}}>
                        <Text style={styles.description}>{description}</Text>
                    </ScrollView>
                    <View style={{margin: 5, height: 2, backgroundColor: '#BBBBBB'}}/>
                    <Text style={{margin: 5, fontSize: 18}}> Status: {status}</Text>
                <View style={{flex: 1, justifyContent: 'flex-end', alignItems: 'center', marginBottom: 3}}>
                    <TouchableOpacity style={styles.button} onPress={this.onPress}>
                        <Text style={{color: 'white', fontSize: 15, justifyContent:'center', textAlign: 'center'}}>CONNECT NOW</Text>
                    </TouchableOpacity> 
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    listScore: {
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor:'#00BB00',
        borderRadius: 40,
        height: 40,
        width: 40,
        marginTop: 10,
        alignSelf: 'flex-end',
        position: 'absolute'
    },
    description: {
        margin:5,
        justifyContent: 'center',
        fontSize: 13,
        color: '#090909'
    },
    button: {
        flex:1,
        backgroundColor: '#EB0000',
        height: 40,
        position: 'absolute',
        alignContent: 'center',
        justifyContent:'center',
        bottom: 0,
        width: 320,
        color: 'white',
        borderRadius: 15
    }
})
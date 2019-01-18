import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, Modal} from 'react-native';
import PropTypes from 'prop-types';
import Contact from './Contact'
import R from 'ramda';

export default class Card extends React.Component{
    constructor(props){
        super(props)
        this.state = {
            modalVisible: false
        }
    }
    onPressCard = () => {
        const detail=this.props.detail
        this.props.navigation.navigate('Details',{detail, seller: this.props.sellerObj})
    }

    onPressButton = () => {
        this.setState(() => ({modalVisible: true}))
    }

    onClose = () => this.setState( () =>({modalVisible: false}) )

    render() {
        return(
            <View>

                <View>
                    <Modal animationType="slide"
                    transparent={false}
                    visible={this.state.modalVisible}>
                        <Contact seller={this.props.sellerObj} onClose={this.onClose}/>
                    </Modal>
                </View>

                <TouchableOpacity style={{marginTop: 20, marginLeft: 7}} onPress={this.onPressCard}>

                    <View>
                        <View style={{flexDirection: 'row'}}>
                            <Image style={styles.sellerImg} source={{uri: this.props.sellerImgUrl}}></Image>
                            <Text style={{fontSize: 15, fontWeight: 'bold', justifyContent: 'flex-end', marginLeft: 15}}>
                                {this.props.company}
                            </Text>
                        </View>
                        <Image style={styles.propImg} source={{uri: this.props.imgURL}} resizeMode='cover' />
                        <View style={styles.listScore} >
                            <Text style={{fontSize: 17, color:'white'}} title={'Listing Score'}>
                                {Math.round(this.props.listScore*10)/10}
                            </Text>
                        </View>
                        <Text style={{fontSize:20, fontWeight: 'bold'}}>
                            {'\u20B9'}  {R.concat(this.props.price.overallPriceValue,` ${this.props.price.overallPriceUnit}`)}
                        </Text>
                        <Text style={{fontSize:17, fontWeight: 'bold'}}>
                            {this.props.rooms.bed} BHK Appt - {this.props.size}
                        </Text>
                        <View style={{marginTop: 5,flexDirection: 'row'}}>
                            <Text>{this.props.seller}  </Text>
                            <View style={{height: 15, width: 1, backgroundColor: '#BBBBBB'}}/>
                            <Text>  {this.props.locality} , {this.props.city}</Text>
                        </View>
                        <TouchableOpacity style={styles.button} onPress={this.onPressButton}>
                            <Text style={{color: 'white', fontSize: 15, padding: 5}}>Call Now</Text>
                        </TouchableOpacity>
                    </View>
                </TouchableOpacity>
                </View>
        )
    }
}

const styles = StyleSheet.create({
    propImg: {
      height: 200,
      width: 360,
      borderRadius: 15,
      marginTop: 10
    },
    sellerImg: {
        height: 30,
        width: 30
    },
    button: {
        backgroundColor:'#EB0000',
        left: 280,
        width: 75,
        height: 30,
        alignItems: 'center',
        borderRadius: 20,
        marginTop: 5
    },
    listScore: {
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor:'#00BB00',
        borderRadius: 40,
        height: 40,
        width: 40,
        top: 180,
        left: 310,
        position: 'absolute'
    }
})


Card.propTypes = {
    imgURL: PropTypes.string.isRequired,
    rooms: PropTypes.object.isRequired,
    size: PropTypes.string,
    price: PropTypes.object.isRequired,
    city: PropTypes.string.isRequired,
    locality: PropTypes.string,
    listScore: PropTypes.number,
    seller: PropTypes.string,
    company: PropTypes.string,
    sellerImgUrl: PropTypes.string,
    detail: PropTypes.object.isRequired,
    sellerObj: PropTypes.object
}
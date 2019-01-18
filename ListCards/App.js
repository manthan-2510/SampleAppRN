
import React from 'react';
import { View, Text, FlatList } from 'react-native';
import { StackNavigator } from 'react-navigation';
import Card from './Card'
import DetailsScreen from './DetailsScreen'

class HomeScreen extends React.Component {
constructor(props){
  super(props)
  this.state={
    list: []
  }
}
componentDidMount() {
  fetch('https://www.makaan.com/shade/app/v1/serp/buy?paging=1,20')
  .then((response) => response.json())
  .then( responseJson => this.setState(() => ({list: responseJson.data.listings})))
  .catch((error) => {
    return(
      <View style={{alignContent: 'center'}}>
        <Text>{error}</Text>
      </View>
    )
  });
}

renderItem = ({item}) => {
  const { mainImageUrl, sizeText, rooms, cityName, localityName, pricing, listingScore } = item
  const { name, companyName } = item.seller
  const { description, unitTypeText, constructionStatus } = item
  const details ={
    description: description,
    propImgUrl: mainImageUrl,
    price: pricing.actualPrice,
    propType: unitTypeText,
    status: constructionStatus,
    listScore: listingScore
  }
  return (
      <Card imgURL={mainImageUrl} rooms={rooms} size={sizeText} 
      price={pricing} city={cityName} locality={localityName}
      listScore={listingScore} seller={name} company={companyName}
      sellerImgUrl={item.seller.mainImageUrl} sellerObj = {item.seller}
      detail={details} navigation={this.props.navigation}/>
  )
}

  render() {
    if(this.state.list){    
        return (
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center'}}>
          <FlatList
          data={this.state.list}
          renderItem={this.renderItem}
          keyExtractor={ (item,index) => (item.listingId+'') }
          />
        </View>
      );
    }
    else{
      return(
        <View>
          <Text>error</Text>
        </View>
      );
    }
  }
}



export default StackNavigator({
  Home: {
    screen: HomeScreen,
  },
  Details: {
    screen: DetailsScreen
  }
});
import React, { Component } from 'react';
import { View, Text, ScrollView } from 'react-native';
import { Card } from 'react-native-elements';
import { CAMPSITES } from '../shared/campsites';
import { PROMOTIONS } from '../shared/promotions';
import { PARTNERS } from '../shared/partners';


/* RenderItem component will be rendered in the HomeComponents ScrollView. 
It is being passed an item that will de-structure from the props object. If the
items value is valid then it will render a Card (a Promotional card containing 
Title, Image, and Description) */

function RenderItem({item}) {
    if (item) {
        return (
            <Card
                featuredTitle={item.name}
                image={require('./images/react-lake.jpg')}>
                <Text
                    style={{ margin: 10 }}>
                    {item.description}
                </Text>
            </Card>
        );
    }
    return <View />;
}

class Home extends Component {
    constructor(props) {
        super(props); 
        this.state = {
            campsites: CAMPSITES,
            promotions: PROMOTIONS,
            partners: PARTNERS
        };
    }

    static navigationOptions = {
        title: 'Home'
    }
    /* ScrollView is used to render groups or lists. ScrollView loads all of its child components 
    at once (where as FlatList uses Lazy Loading, which only renders parts of a list that are
    on screen or about to be. Parts far off screen are removed from memory. This improves performance 
    for longer lists.). Because this is a fixed small list, ScrollView is being used. In addition 
    ScrollView can hold any type of container but FlatList can only render arrays. FlatList also has
    many out of the box features.  */
    render() {
        return (
            <ScrollView>
                <RenderItem
                    item={this.state.campsites.filter(campsite => campsite.featured)[0]} />
                <RenderItem
                    item={this.state.promotions.filter(promotion => promotion.featured)[0]} />
                <RenderItem
                    item={this.state.partners.filter(partner => partner.featured)[0]} />
            </ScrollView>
        );
    }
}

export default Home;

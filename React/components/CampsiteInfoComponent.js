import React, { Component } from 'react';
import { Text, View, ScrollView, FlatList } from 'react-native';
import { Card, Icon } from 'react-native-elements';
import { CAMPSITES } from '../shared/campsites';
import { COMMENTS } from '../shared/comments';

function RenderCampsite(props) {

    const { campsite } = props;

    if (campsite) {
        return (
            <Card
                featuredTitle={campsite.name}
                image={require('./images/react-lake.jpg')}>
                <Text style={{margin:10}}>
                    {campsite.description}
                </Text>
                <Icon
                    name={props.favorite ? 'heart' : 'heart-o'}
                    type='font-awesome'
                    color='#213A1B'
                    reverseColor='#ffd700'
                    size={20}
                    raised
                    reverse
                    onPress={() => props.favorite ? 
                        console.log('Already set as a favorite') : props.markFavorite()}
                    />
            </Card>
        );
    }
    return <View />;
}

/* RenderComments receives the Comments array via comments props object. We are using FlatList because it expects it data
in the form of an array. renderCommentItem automatically gets an item prop which is being destructured out via arrow function
 */


function RenderComments({comments}) {
    
    const renderCommentItem = ({ item }) => {
        return (
            <View style={{ margin: 10 }}>
                <Text style={{ fontSize: 14}}>{item.text}</Text>
                <Text style={{ fontSize: 12}}>{item.rating} Stars</Text>
                <Text style={{fontSize: 12}}>{`-- ${item.author}, ${item.date}`}</Text>
            </View>
        )
    }

    return (
        <Card title='Comments'>
            <FlatList
                data={comments}
                renderItem={renderCommentItem}
                keyExtractor={item => item.id.toString()}
            />
        </Card>
    )
}

class CampsiteInfo extends Component {
    
    constructor(props) {
        super(props);
        this.state = {
            campsites: CAMPSITES,
            comments: COMMENTS,
            favorite: false
        };
    }

    markFavorite() {
        this.setState({ favorite: true });
    }

    // Sets title of Screen 
    static navigationOptions = {
        title: 'Campsite Information'
    }

    /* In DirectoryComponent, the Navigate Function was used to navigate to the CampsiteInfo Screen. 
    A parameter was set to hold the id of the campsite being passed. That can access be accessed through here using
    the Navigation prop which is passed automatically to all objects being passed as Screens. const campsiteId will receive
    the variable then access it by passing this.props.navigation.getParam('campsiteId'). Now the needed campsite can be pulled
    from the array using filter and an index of [0].
    In CampsiteInfoComponent we have brought the COMMENTS array into the state and below is a statement to filter all comments
    the share the same id that we wish to display (This can be used for the Product Promotions and Product Selection in
    Portfolio Project) */

    render() {
        const campsiteId = this.props.navigation.getParam('campsiteId');
        const campsite = this.state.campsites.filter(campsite => campsite.id === campsiteId)[0];
        const comments = this.state.comments.filter(comment => comment.campsiteId === campsiteId);
        return (
            <ScrollView>
                <RenderCampsite campsite={campsite}
                    favorite={this.state.favorite}
                    markFavorite={() => this.markFavorite()}
                />
                <RenderComments comments={comments} />
            </ScrollView>
        );
    }
}

export default CampsiteInfo;
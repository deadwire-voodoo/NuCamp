import React, { Component } from 'react';
import { FlatList } from 'react-native';
import { ListItem } from 'react-native-elements';
import { CAMPSITES } from '../shared/campsites';
import CampsiteInfo from './CampsiteInfoComponent';

/* CAMPSITES data has been moved into this Components State. */

class Directory extends Component {
    constructor(props) {
        super(props);
        this.state = {
            campsites: CAMPSITES
        };
    }

    /* In the Directory Navigator Screen there is a Header with a title. Here you can configure the text for that 
    title using the Static Keyword. The Static Keyword is a JS keyword that sets a Method on the Class itself rather
    than the object that is instantiated from the class. React Native is using it to communicate the title to the 
    DirectoryNavigator's navigationOptions. */
    
    static navigationOptions = {
        title: 'Directory'
    };

    /* Each Screen Component in App is provided with the navigation prop automatically. The prop contains
    various functions that dispatch navigation actions. https://reactnavigation.org/docs/navigation-prop 
    The navigation prop is only passed to Screen components only. To access the navigation prop in other 
    non-screen components use the useNavigation Hook.  */

    render() {
        const { navigate } = this.props.navigation;
        const renderDirectoryItem = ({ item }) => {
            return (

            /* onPress navigate function holds 2 arguments. The 1st, CampsiteInfo, the screen to navigate too. 
            2nd (optional) argument, campsiteId: item.id, provides extra parameters to the route. When a campsite
            in the directory is pressed it will call the navigate function and then display the correct campsite 
            that was selected.   */
                
                <ListItem
                    title={item.name}
                    subtitle={item.description}
                    onPress={() => navigate('CampsiteInfo', {campsiteId: item.id })}
                    leftAvatar={{ source: require('./images/react-lake.jpg') }}
                />
            );
        };

        return (
            <FlatList
                data={this.state.campsites}
                renderItem={renderDirectoryItem}
                keyExtractor={item => item.id.toString()}
            />
        );
    }
}
export default Directory;
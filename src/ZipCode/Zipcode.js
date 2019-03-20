// Junjie Lu's API
import React from 'react';
import axios from 'axios';
import {Button, Icon, Input, List, Image} from 'semantic-ui-react';

import Loading from './ZipcodeIMG/Loading.gif';
import Denied from './ZipcodeIMG/Denied.jpg';
import Gotit from './ZipcodeIMG/Gotit.jpg';

class Zipcode extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            zipCode: "",
            cityName: "",
            stateName: "",
            searchCode: null,
            searchingState: null,

            // city weater endpoint
            cityWeatherFound: null,
            cityWeather: "Not Found",
            cityWeatherState: null,
        };
    }

    authenticate = () => {
        this.setState({
            searchingState: 'LOADING',
            cityWeather: null,
            cityWeatherState: null,
        });
        setTimeout(() => {
            axios.get('https://api.zippopotam.us/us/'+this.state.searchCode)
                .then((networkResponse) => {
                    const data = networkResponse.data;
                    this.setState({
                        zipCode: data["post code"],
                        cityName: data.places[0]["place name"],
                        stateName: data.places[0]["state"],
                        searchingState: 'AUTHENTICATED',
                    });
                    this.callEndpoint();
                })
                .catch((e) => {
                    this.setState({
                        searchingState: 'DENIED',
                        zipCode: "",
                        cityName: "",
                        stateName: "",
                    })
                })
        }, 3000);
        
    }

    callEndpoint = () => {
        const endpoint = '/weather?city=' + this.state.cityName;
            axios.get(endpoint)
                .then((res) => {
                    console.log(res);
                    this.setState({
                        cityWeatherFound: res.data["params"]["city"],
                        cityWeather: res.data["description"],
                        cityWeatherState: "Today temperature from " + res.data["response"]["minTemp"] 
                                            + " to " + res.data["response"]["maxTemp"] + ".",
                    })
                })
                .catch((e) => {
                    console.log(e);
                });
    }
    
    render(){
        const LoadingIMG = <Image src={Loading} alt="Loading" size='small' circular verticalAlign='middle'/>
        const DeniedIMG = <Image src={Denied} alt="Denied" size='small' circular verticalAlign='middle'/>
        const GotitIMG = <Image src={Gotit} alt="Gotit" size='small' circular verticalAlign='middle'/>

        return(
            <div>
                <div>
                    <Input 
                        value={this.state.searchCode}
                        onChange={(e) => { this.setState({ searchCode: e.target.value})}}
                        placeholder='Search Zip Code Info ...'
                    />
                    
                    <Button animated onClick={this.authenticate} size='massive'>
                        <Button.Content visible>Search</Button.Content>
                        <Button.Content hidden>
                            <Icon name='arrow right' />
                        </Button.Content>
                    </Button>
                    
                    {this.state.searchingState === 'LOADING' && LoadingIMG}
                    {this.state.searchingState === 'DENIED' && DeniedIMG}
                    {this.state.searchingState === 'AUTHENTICATED' && GotitIMG}
                    {this.state.searchingState === 'AUTHENTICATED' &&
                        <ul>
                        <List>
                        <List.Item>
                            <List.Icon name='marker' />
                                <List.Content>
                                    <List.Header as='a'>City:</List.Header>
                                        <List.Description>
                                            {this.state.cityName}
                                        </List.Description>
                                </List.Content>
                        </List.Item>

                        <List.Item>
                            <List.Icon name='marker' />
                                <List.Content>
                                    <List.Header as='a'>State:</List.Header>
                                        <List.Description>
                                            {this.state.stateName}
                                        </List.Description>
                                </List.Content>
                        </List.Item>

                        <List.Item>
                            <List.Icon name='marker' />
                                <List.Content>
                                    <List.Header as='a'>Zip Code:</List.Header>
                                        <List.Description>
                                            {this.state.zipCode}
                                        </List.Description>
                                </List.Content>
                        </List.Item>
                        </List>
                        </ul>
                    }
                </div>
                
                {/* Print out output from endpoint */}
                <div>
                    {this.state.searchingState === 'AUTHENTICATED' &&
                        this.state.cityName === this.state.cityWeatherFound  &&
                            <ul>
                                <List>
                                    <List.Item>
                                        <List.Icon name='location arrow' />
                                        <List.Content>
                                                <List.Description>
                                                    {this.state.cityWeather}
                                                </List.Description>
                                        </List.Content>
                                    </List.Item>
                                </List>
                            </ul>
                    }
                </div>

                <div>
                    {this.state.searchingState === 'AUTHENTICATED' &&
                        this.state.cityName === this.state.cityWeatherFound  &&
                        <List>
                            <List.Item>
                                <List.Icon name='cloud' />
                                <List.Content>
                                    <List.Description>
                                        {this.state.cityWeatherState}
                                    </List.Description>
                                </List.Content>
                            </List.Item>
                        </List>
                    }
                </div>

            </div>
        );
    }
}

export default Zipcode;
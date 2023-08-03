import React, { useEffect, useState } from 'react';
import { CssBaseline, Grid } from '@material-ui/core'; //component from ui automatically fix padding margin e.t.c

import Header from './components/Header/Header';
import List from './components/List/List';
import Map from './components/Map/Map';
import { getData } from './api';
//import PlaceDetails from './components/PlaceDetails/PlaceDetails';

const App = () => {
    const [places, setPlaces] = useState([]);
    const [coordinates, setCoordinates] = useState({});
    const [bounds, setBounds] = useState([]);
    const [childClick, setChildClick] = useState(null);

    const [isLoading, setIsLoading] = useState(false);
    const [filterPlaces, setFilterPlaces] = useState([])

    const [type, setType] = useState('restaurants');
    const [rating, setRating] = useState('');
    

    useEffect(() =>{ //this effect happens when coordinate or bounds changes
        navigator.geolocation.getCurrentPosition(({coords: {latitude, longitude}}) =>{
            setCoordinates({lat: latitude, lng: longitude});
        })
    }, []);

    useEffect(() => {//this efect happens when type/bounds changes
        //console.log(coordinates, bounds);
        if (bounds.sw && bounds.ne){ //if no coordinate don't stop the request
        setIsLoading(true);
        getData(type, bounds.sw, bounds.ne)
            .then((data) => {
                //console.log(data);
                setPlaces(data?.filter((place) => place.name && place.num_reviews > 0));//filter data 
                setFilterPlaces([]);//set to empty array everytime we get new data
                setIsLoading(false);
            })
        }
    }, [type, bounds]); //dependency array

    useEffect(() =>{
        const filterPlaces = places.filter((place) => place.rating > rating );//function to check if place.rating is greater than current rating
        setFilterPlaces(filterPlaces);
    }, [rating]); //this effect happens when rating changes

    useEffect(() => {

    }, []);

    return (
        <>
           <CssBaseline/> 
           <Header setCoordinates={setCoordinates}/>
           <Grid container spacing={3} style={{width: '100%'}}>
                 <Grid item xs={12} md={4}>     {/*screen size small and medium */}
                    <List 
                    //props
                    childClick = {childClick}
                    places={filterPlaces.length ? filterPlaces : places}//check if there is filter places  
                    isLoading = {isLoading}
                    type={type}
                    setType={setType}
                    rating={rating}
                    setRating={setRating}
                    />
                </Grid>
                <Grid item xs={12} md={8}>
                    <Map
                        setCoordinates = {setCoordinates}
                        setBounds= {setBounds}
                        coordinates = {coordinates}
                        places ={filterPlaces.length ? filterPlaces : places}//check if there is filter places
                        setChildClick={setChildClick}
                    />
                </Grid>

            </Grid>
        </>
    );
}

export default App;
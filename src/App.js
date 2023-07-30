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

    useEffect(() =>{
        navigator.geolocation.getCurrentPosition(({coords: {latitude, longitude}}) =>{
            setCoordinates({lat: latitude, lng: longitude});
        })
    }, []);

    useEffect(() => {
        //console.log(coordinates, bounds);
        setIsLoading(true);
        getData(bounds.sw, bounds.ne)
            .then((data) => {
                console.log(data);
                setPlaces(data);
                setIsLoading(false);
            })
    }, [coordinates, bounds]);

    return (
        <>
           {/* <CssBaseline/> is used to apply a baseline set of styles to normalize the rendering across different browsers. */}
           <Header/>
           <Grid container spacing={3} style={{width: '100%'}}>
                 <Grid item xs={12} md={4}>     {/*screen size small and medium */}
                    <List 
                    places={places} 
                    childClick = {childClick}
                    isLoading = {isLoading}
                    />
                </Grid>
                <Grid item xs={12} md={8}>
                    <Map
                        setCoordinates = {setCoordinates}
                        setBounds= {setBounds}
                        coordinates = {coordinates}
                        places ={places}
                        setChildClick={setChildClick}
                    />
                </Grid>

            </Grid>
        </>
    );
}

export default App;
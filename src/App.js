import React from 'react';
import { CssBaseline, Grid } from '@material-ui/core'; //component from ui automatically fix padding margin e.t.c

import Header from './components/Header/Header';
import List from './components/List/List';
import Map from './components/Map/Map';
//import PlaceDetails from './components/PlaceDetails/PlaceDetails';

const App = () => {
    return (
        <>
           {/* <CssBaseline/> is used to apply a baseline set of styles to normalize the rendering across different browsers. */}
           <Header/>
           <Grid container spacing={3} style={{width: '100%'}}>
                 <Grid item xs={12} md={4}>     {/*screen size small and medium */}
                    <List/>
                </Grid>
                <Grid item xs={12} md={8}>
                    <Map />
                </Grid>

            </Grid>
        </>
    );
}

export default App;
import axios from 'axios'; //library for api calls


export const getData = async (type,sw, ne) => {
    try{
        const { data: { data} } = await axios.get(`https://travel-advisor.p.rapidapi.com/${type}/list-in-boundary`, {
        
            params: {
              bl_latitude: sw.lat,
              tr_latitude: ne.lat,
              bl_longitude: sw.lng,
              tr_longitude: ne.lng,
            },
            headers: {
              'X-RapidAPI-Key': '349e2153d4msh1cbf84fbbd43c6ep18d706jsn27f11fbca664',
              'X-RapidAPI-Host': 'travel-advisor.p.rapidapi.com'
            }
          });

        return data;
        }catch (error){
            console.log('Error:', error)

    }
}
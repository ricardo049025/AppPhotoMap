import { useIsFocused } from "@react-navigation/native";
import PlaceList from "../component/Places/PlaceList";
import { useEffect, useState } from "react";
import { fetchPlaces } from "../util/database";

const AllPlaces = ({route}) =>{
    const [loadedPlaces, setLoadedPlaces] = useState([]);
    const isFocused = useIsFocused();

    useEffect(() =>{

        const loadedPlaces = async () =>{
            const places = await fetchPlaces();
            setLoadedPlaces(places);
        }
        if(isFocused) loadedPlaces();

    },[isFocused]);

    return(
        <PlaceList places={loadedPlaces}/>
    )
}

export default AllPlaces;
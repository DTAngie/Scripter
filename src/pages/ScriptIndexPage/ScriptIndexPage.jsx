import React,{ useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { Grid } from 'semantic-ui-react';
import BrowseScripts from '../../components/BrowseScripts/BrowseScripts';
import ScriptList from '../../components/ScriptList/ScriptList';
import * as scriptsAPI from '../../utils/scriptService';

export default function ScriptIndexPage(){
    const [scripts, setScripts] = useState([]);
    const location = useLocation();

    
    
    useEffect(()=> {
        async function getScripts(){
            const data = await scriptsAPI.populateScripts(location.search);
            setScripts([...data.scripts]);
        } 
        getScripts();
    }, [location])

    return(
        <>
            <Grid>
                <Grid.Column width={4}>
                    {/* <LeftNavigation /> */}
                </Grid.Column>
                <Grid.Column width={8}>
                <ScriptList scripts={scripts}/>
                </Grid.Column>
                <Grid.Column width={4}>
                    <BrowseScripts />
                </Grid.Column>
            </Grid>
        </>
    )
}
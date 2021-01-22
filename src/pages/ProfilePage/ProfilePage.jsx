import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Grid } from 'semantic-ui-react';
import LeftNavigation from '../../components/LeftNavigation/LeftNavigation';
import ScriptList from '../../components/ScriptList/ScriptList';
import BrowseScripts from '../../components/BrowseScripts/BrowseScripts';
import * as scriptsAPI from '../../utils/scriptService';
import { useLocation } from 'react-router-dom';

export default function ProfilePage({user, isProfile}){
    const [scripts, setScripts] = useState([]);
    const [isOwner, setOwner] = useState(false);
    const location = useLocation();
    const params = useParams();
    const authorID = params.id ? params.id : user._id;
    
    useEffect(()=> {
        function checkOwner(){
            if (user._id.toString() === authorID.toString()) {
                setOwner(true);
            } else {
                setOwner(false);
            }
        }
        checkOwner();
    }, [location, user._id, authorID]);
    
    useEffect(()=> {
        async function getScripts(){
            if(isOwner) {
                try {
                    const data = await scriptsAPI.getOwnScripts();
                    //TODO: //versus...getUsersScripts for others
                    setScripts([...data.scripts]);
                } catch (err) {
                    console.log(err);
                }
            } else {
                try {
                    const data = await scriptsAPI.getUserScripts(authorID);
                    setScripts([...data.scripts]);
                } catch (err) {
                    console.log(err);
                }
            }
        }
        getScripts();
    }, [isOwner, authorID]);

    return (
        <>
            <Grid>
                <Grid.Column width={4}>
                    <LeftNavigation />
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
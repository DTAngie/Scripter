import React, { useState, useEffect } from 'react';
import { Grid } from 'semantic-ui-react';
import PageHeader from '../../components/Header/Header';
import LeftNavigation from '../../components/LeftNavigation/LeftNavigation';
import ScriptList from '../../components/ScriptList/ScriptList';
import * as scriptsAPI from '../../utils/scriptService';

export default function ProfilePage({user, isProfile, handleLogout}){
    const [scripts, setScripts] = useState([]);

    async function getScripts(user){
        //TODO: maybe need a ternary statement here in case profile
        //TODO: does not belong to user
        try {
            const data = await scriptsAPI.getOwnScripts();
            //TODO: //versus...getUsersScripts for others
            setScripts([...data.scripts]);
        } catch (err) {
            console.log(err);
        }
    }

    useEffect(()=> {
        getScripts(user);
    }, [])

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
                    Side Content
                </Grid.Column>
            </Grid>
        </>
    )
}
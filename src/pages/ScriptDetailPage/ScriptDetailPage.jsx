import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { Grid } from 'semantic-ui-react';
import LeftNavigation from '../../components/LeftNavigation/LeftNavigation';
import ScriptDetail from '../../components/ScriptDetail/ScriptDetail';
import * as scriptAPI from '../../utils/scriptService';

export default function ScriptPage(){
    const [script, setScript] = useState({});

    const location = useLocation();

    async function getScript(){
        const scriptID = location.state.id;
        try {
            const data = await scriptAPI.getOne(scriptID);
            setScript(data.script);
        } catch(err) {
            console.log(err);
        }
    }

    useEffect(() => {
        getScript()
    }, []);

    return (
        <>
            <Grid>
                <Grid.Column width={4}>
                    <LeftNavigation />
                </Grid.Column>
                <Grid.Column width={8}>
                <ScriptDetail script={script} />
                </Grid.Column>
                <Grid.Column width={4}>
                    Side Content
                </Grid.Column>
            </Grid>
        </>
    );
}
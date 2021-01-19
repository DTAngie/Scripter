import React, { useState, useEffect } from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import { Grid } from 'semantic-ui-react';
import LeftNavigation from '../../components/LeftNavigation/LeftNavigation';
import NewScriptForm from '../../components/NewScriptForm/NewScriptForm';
import * as ScriptAPI from '../../utils/scriptService.js';

export default function ScriptFormPage({formType}){
    const [script, setScript] = useState({})
    const history = useHistory();
    const location = useLocation();

    async function getScript(){
        const pathName = location.pathname;
        const editPath = '/edit';
        if (pathName.includes(editPath)) {
            //If it's an edit page, get the script info
            try {
                const basePath = '/script/';
                const scriptID = pathName.substring(pathName.indexOf(basePath)+basePath.length, pathName.indexOf(editPath));
                console.log(scriptID);
                //TODO change this to a different function that checks owner
                // BEFORE sending
                const data = await ScriptAPI.getOne(scriptID);
                setScript({...data.script});
            } catch (err){

            }
        }
        
    }

    async function handleAddScript(data) {
        try {
            const newScript = await ScriptAPI.create(data);
            history.push(`/script/${newScript.script._id}`);
        } catch (err) {
            console.log(err);
        }
    }

    useEffect(()=> {
        getScript();
    }, []);

    return (
        <>
            <Grid>
                <Grid.Column width={4}>
                    <LeftNavigation />
                </Grid.Column>
                <Grid.Column width={8}>
                    {/* { formType === "create" ? */}
                    <NewScriptForm script={script} handleAddScript={handleAddScript}/>
                    {/* :  */}
                
                    {/* } */}
                </Grid.Column>
                <Grid.Column width={4}>
                    Side Content
                </Grid.Column>
            </Grid>
            
        </>
    );
}
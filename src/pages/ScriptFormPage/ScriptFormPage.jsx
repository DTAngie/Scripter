import React, { useState, useEffect } from 'react';
import { useHistory, useLocation, useParams } from 'react-router-dom';
import { Grid } from 'semantic-ui-react';
import LeftNavigation from '../../components/LeftNavigation/LeftNavigation';
import ScriptForm from '../../components/ScriptForm/ScriptForm';
import * as ScriptAPI from '../../utils/scriptService.js';

export default function ScriptFormPage({formType}){
    const [script, setScript] = useState({})
    const history = useHistory();
    const location = useLocation();
    const params = useParams();

    

    async function handleAddScript(data, id) {
        if (id) {
            const editedScript = await ScriptAPI.update(data, id);
            history.push(`/scripts/${editedScript.scriptID}`)
        } else  {
            try {
                const newScript = await ScriptAPI.create(data);
                //TODO:: Does response have to be whole object or just id?
                //If API is being called again, maybe streamline this one
                //Same for the edit function above
                history.push(`/scripts/${newScript.scriptID}`);
            } catch (err) {
                console.log(err);
            }
        }
    }

    useEffect(()=> {
        async function getScript(){
            const pathName = location.pathname;
            const editPath = '/edit';
            if (pathName.includes(editPath)) {
                //If it's an edit page, get the script info
                try {
                    const scriptID = params.id;
                    //TODO change this to a different function that checks owner
                    // BEFORE sending
                    const data = await ScriptAPI.getOne(scriptID);
                    setScript({...data.script});
                } catch (err){

                }
            } else {
                setScript({});
            }
            
        }
        getScript();
    }, [location, params.id]);

    return (
        <>
            <Grid>
                <Grid.Column width={4}>
                    <LeftNavigation />
                </Grid.Column>
                <Grid.Column width={8}>
                    <ScriptForm script={script} handleAddScript={handleAddScript}/>
                </Grid.Column>
                <Grid.Column width={4}>
                    Side Content
                </Grid.Column>
            </Grid>
            
        </>
    );
}
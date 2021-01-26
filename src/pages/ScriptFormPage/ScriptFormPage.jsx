import React, { useState, useEffect } from 'react';
import { useHistory, useLocation, useParams } from 'react-router-dom';
import { Grid } from 'semantic-ui-react';
import LeftNavigation from '../../components/LeftNavigation/LeftNavigation';
import ScriptForm from '../../components/ScriptForm/ScriptForm';
import ErrorMessage from '../../components/ErrorMessage/ErrorMessage';
import * as ScriptAPI from '../../utils/scriptService.js';

export default function ScriptFormPage(){
    const [script, setScript] = useState({})
    const history = useHistory();
    const location = useLocation();
    const params = useParams();
    const [error, setError] = useState('');

    

    async function handleAddScript(data, id) {
        setError('');
        if (id) {
            const editedScript = await ScriptAPI.update(data, id);
            if (editedScript['404']){
                setError('Something went wrong. Please try again.');
            } else {
                history.push(`/scripts/${editedScript.scriptID}`);
            }
        } else  {
            try {
                const newScript = await ScriptAPI.create(data);
                if (newScript['404']){
                    setError('Something went wrong. Please try again.');
                } else {
                    history.push(`/scripts/${newScript.scriptID}`);
                }
            } catch (err) {
                setError('Something went wrong. Please try again.');
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
                    const data = await ScriptAPI.getOneForEdit(scriptID);
                    if (data['404']){
                        history.push('/dashboard');
                    } else {
                        setScript({...data.script});
                    }
                } catch (err){
                    history.push('/dashboard');
                }
            } else {
                setScript({});
            }
            
        }
        getScript();
    }, [location, params.id, history]);

    return (
        <>
            <Grid>
                <Grid.Column width={4}>
                    <LeftNavigation ownerIndex={null}/>
                </Grid.Column>
                <Grid.Column width={8}>
                    <ErrorMessage error={error} />
                    <ScriptForm script={script} handleAddScript={handleAddScript}/>
                </Grid.Column>
                <Grid.Column width={4}>
                </Grid.Column>
            </Grid>
            
        </>
    );
}
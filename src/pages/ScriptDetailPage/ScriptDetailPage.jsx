import React, { useState, useEffect } from 'react';
import { useLocation, useHistory, Redirect } from 'react-router-dom';
import { Grid } from 'semantic-ui-react';
import LeftNavigation from '../../components/LeftNavigation/LeftNavigation';
import ScriptDetail from '../../components/ScriptDetail/ScriptDetail';
import * as scriptAPI from '../../utils/scriptService';

export default function ScriptDetailPage(){
    const [script, setScript] = useState({});
    const [displayBudget, setDisplayBudget] = useState('');
    //TODO: Ternary statement to determine if owner or not
    const isOwner = true;
    
    const budgets = {
        '0': 'Under $100K',
        '1': '$100K - $250K',
        '2': '$250K - $500K',
        '3': '$500K - $1M',
        '4': '$1M - $5M',
        '5': '$5M - $10M',
        '6': 'Above $10M'
    }
       
    const location = useLocation();
    const history = useHistory();

    async function getScript(){
        const pathName = location.pathname;
        const basePath = '/scripts/';
        const scriptID = pathName.substring(pathName.indexOf(basePath)+basePath.length);
        try {
            const data = await scriptAPI.getOne(scriptID);
            setScript(data.script);
        } catch(err) {
            console.log(err);
        }
    }
    
    async function handleDeleteScript(scriptID) {
        try {
            await scriptAPI.deleteOne(scriptID);
            history.push('/dashboard');
        } catch(err) {
            console.log(err);
        }
    }
    
    function getBudget(){
        setDisplayBudget(budgets[script.budget]);
    }

    useEffect(() => {
        getScript()
    }, []);

    useEffect(()=> {
        getBudget();
    }, [script]);

    return (
        <>
            <Grid>
                <Grid.Column width={4}>
                    <LeftNavigation ownerIndex={script.author}/>
                </Grid.Column>
                <Grid.Column width={8}>
                <ScriptDetail
                    isOwner={isOwner}
                    script={script}
                    displayBudget={displayBudget}
                    handleDeleteScript={handleDeleteScript}
                />
                </Grid.Column>
                <Grid.Column width={4}>
                    Side Content
                </Grid.Column>
            </Grid>
        </>
    );
}
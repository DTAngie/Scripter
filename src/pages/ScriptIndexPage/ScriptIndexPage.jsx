import React,{ useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { Grid, Header } from 'semantic-ui-react';
import BrowseScripts from '../../components/BrowseScripts/BrowseScripts';
import ScriptList from '../../components/ScriptList/ScriptList';
import LeftNavigation from '../../components/LeftNavigation/LeftNavigation';
import ErrorMessage from '../../components/ErrorMessage/ErrorMessage';
import * as scriptsAPI from '../../utils/scriptService';

export default function ScriptIndexPage({user}){
    const [scripts, setScripts] = useState([]);
    const location = useLocation();
    const [searchHeader, setSearchHeader] = useState();
    const [error, setError] = useState('');
    
    useEffect(()=> {
        async function getScripts(){
            const data = await scriptsAPI.populateScripts(location.search);
            if (data['404']){
                setError('Something went wrong. Please try again.');
            } else {
                setScripts([...data.scripts]);
                setError('');
            }
        } 

        function getHeading(){
            const budgets = {
                '0': 'Under $100K',
                '1': '$100K - $250K',
                '2': '$250K - $500K',
                '3': '$500K - $1M',
                '4': '$1M - $5M',
                '5': '$5M - $10M',
                '6': 'Above $10M'
            }

            let query = location.search.substring(1).split('=');
            if (query[0] === 'budget'){
                setSearchHeader(`Budget: ${budgets[query[1]]}`);
            } else {
                setSearchHeader(query[1]);
            }
        }

        getScripts();
        getHeading();
    }, [location])

    return(
        <>
            <Grid>
                <Grid.Column width={4}>
                    <LeftNavigation ownerIndex={null}/>
                </Grid.Column>
                <Grid.Column width={8}>
                    <Header style={{marginBottom: '40px'}}>{searchHeader}</Header>
                    <ErrorMessage error={error} />
                    <ScriptList scripts={scripts}/>
                </Grid.Column>
                <Grid.Column width={4}>
                    <BrowseScripts />
                </Grid.Column>
            </Grid>
        </>
    )
}
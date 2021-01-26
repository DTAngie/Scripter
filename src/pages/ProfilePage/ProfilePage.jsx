import React, { useState, useEffect } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import { Grid, Header } from 'semantic-ui-react';
import LeftNavigation from '../../components/LeftNavigation/LeftNavigation';
import ScriptList from '../../components/ScriptList/ScriptList';
import BrowseScripts from '../../components/BrowseScripts/BrowseScripts';
import ErrorMessage from '../../components/ErrorMessage/ErrorMessage';
import * as scriptsAPI from '../../utils/scriptService';
import { useLocation } from 'react-router-dom';

export default function ProfilePage({user}){
    const [scripts, setScripts] = useState([]);
    const [isOwner, setOwner] = useState(null); 
    const [author, setAuthor] = useState('');
    const [error, setError] = useState('');
    const location = useLocation();
    const params = useParams();
    const authorID = params.id ? params.id : user._id;
    const history = useHistory();
    
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
            if(isOwner !== null && isOwner) {
                try {
                    const data = await scriptsAPI.getOwnScripts();
                    if (data['404']){
                        setError('Something went wrong. Please try again.');
                    } else {
                        setScripts([...data.scripts]);
                        setAuthor(user.username);
                        setError('');
                    }
                } catch (err) {
                   history.push('/');
                }
            } else if (!isOwner && isOwner !== null) {
                try {
                    const data = await scriptsAPI.getUserScripts(authorID);
                    if (data['404']){
                        setError('Something went wrong. Please try again.');
                    } else {
                        setScripts([...data.scripts]);
                        setAuthor(data.author);
                        setError('');
                    }
                } catch (err) {
                    history.push('/dashboard');
                }
            }
        }
        getScripts();
    }, [isOwner, authorID, user.username]);

    return (
        <>
            <Grid>
                <Grid.Column width={4}>
                    <LeftNavigation ownerIndex={null} />
                </Grid.Column>
                <Grid.Column width={8}>
                    <Header style={{marginBottom: '40px', textAlign: 'left'}}>{author ? author : ''}'s Scripts</Header>
                    <ErrorMessage error={error} />
                    {scripts.length > 0 ?
                    <ScriptList scripts={scripts}/>
                    :
                    ''
                }
                </Grid.Column>
                <Grid.Column width={4}>
                    <BrowseScripts />
                </Grid.Column>
            </Grid>
        </>
    )
}
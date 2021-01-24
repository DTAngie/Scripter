import React from 'react';
import { Link } from 'react-router-dom';
import { Segment, Header, Divider, Button, Modal, Grid, Label } from 'semantic-ui-react';
import DeleteConfirmModal from '../DeleteConfirmModal/DeleteConfirmModal';
import ScriptRating from '../ScriptRating/ScriptRating';
import './ScriptDetail.css';

export default function ScriptDetail({isOwner, script, userRating, displayBudget, handleDeleteScript, handleRate}) {
    const averageRatingDisplay = convertScoreToText();
    
    function convertScoreToText() {
        switch(script.averageRating) {
            case 1:
                return "Pass";
            case 2:
                return "Consider";
            case 3:
                return "Purchase";
            default:
                return "Unrated";
        }
    }

    return (       
        <Segment className="ScriptDetail">
            <Header>
                {script.title}
            </Header>
            <p>User Rating: {averageRatingDisplay}</p>
            <p className='logline'>{script.logline}</p>
            <Divider></Divider>
            <h3>Synopsis</h3>
            <p>{script.synopsis}</p>
            <Divider style={{marginTop: '40px'}}></Divider>
            <Grid style={{marginTop: '20px', marginBottom: '60px'}}>
                <Grid.Row columns={2}>
                    <Grid.Column >
                    <Label>Medium</Label> {script.mediaType}
                    </Grid.Column>
                    <Grid.Column>
                    <Label>Genre</Label> {script.genre}
                    </Grid.Column>
                </Grid.Row>
                <Grid.Row columns={2}>
                    <Grid.Column>
                    <Label>Stage</Label> {script.stage}
                    </Grid.Column>
                    <Grid.Column>
                    <Label>Budget</Label> {displayBudget}
                    </Grid.Column>
                </Grid.Row>
            </Grid>
            { isOwner ?
                <>
                    <Button as={Link} to={`/scripts/${script._id}/edit`} floated='left' content='Edit' labelPosition='left' icon='pencil' />
                    <DeleteConfirmModal handleDeleteScript={handleDeleteScript} scriptID={script._id} />
                    {/* <Modal 
                        trigger= {
                            <Button color='red' floated='right' content='Delete' labelPosition='left' icon='delete' />
                        }
                    >
                        <Modal.Header>Delete Script</Modal.Header>
                        <Modal.Content>Are you sure you want to delete this script? This action cannot be undone.</Modal.Content>
                        <Modal.Actions>
                            <Button>No</Button>
                            <Button color='red' onClick={()=> handleDeleteScript(script._id)}>Yes, Delete</Button>
                        </Modal.Actions>
                    </Modal> */}
                    <div style={{clear:"both"}}></div>
                </>
                :
                <>
                <Grid>
                    <Grid.Column width={8}>
                        <ScriptRating userRating={userRating} handleRate={handleRate} convertScore={convertScoreToText}/>
                    </Grid.Column>
                    <Grid.Column width={8}>
                        <p>Script by <Link to={`/author/${script.author._id}`}>{script.author.username}</Link></p>
                    </Grid.Column>
                </Grid>
                </>
            }
        </Segment>
    )
}
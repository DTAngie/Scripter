import React from 'react';
import { Segment, Header, Divider, Button, Modal } from 'semantic-ui-react';


export default function ScriptDetail({script, displayBudget, handleDeleteScript}) {
    return (       
        <Segment>
            <Header>
                {script.title}
            </Header>
            <p>{script.logline}</p>
            <Divider></Divider>
            <p>{script.synopsis}</p>
            <Divider></Divider>
            <Segment.Group horizontal>
                <Segment>Medium: {script.mediaType}</Segment>
                <Segment>Genre: {script.genre}</Segment>
            </Segment.Group>
            <Segment.Group horizontal>
                <Segment>Stage: {script.stage}</Segment>
                <Segment>Budget: {displayBudget}</Segment>
            </Segment.Group>

            <Button floated='left' content='Edit' labelPosition='left' icon='pencil' />
            <Modal 
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
            </Modal>
            <div style={{clear:"both"}}></div>
        </Segment>
    )
}
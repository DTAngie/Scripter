import React, { useState } from 'react';
import { Modal, Button } from 'semantic-ui-react';

export default function DeleteConfirmModal({handleDeleteScript, scriptID }){
    const [open, setOpen] = useState(false);

    return (
        <Modal
            onClose = {()=> setOpen(false)}
            onOpen = {()=> setOpen(true)}
            open={open}
            trigger= {
                <Button color='red' floated='right' content='Delete' labelPosition='left' icon='delete' />
            }
        >
            <Modal.Header>Delete Script</Modal.Header>
            <Modal.Content>Are you sure you want to delete this script? This action cannot be undone.</Modal.Content>
            <Modal.Actions>
                <Button onClick={()=> setOpen(false)}>No</Button>
                <Button color='red' onClick={()=> handleDeleteScript(scriptID)}>Yes, Delete</Button>
            </Modal.Actions>
        </Modal>
    )
}
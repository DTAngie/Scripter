import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { Button, Form, Segment } from 'semantic-ui-react';

export default function  NewScriptForm(){
    const [form, setForm] = useState({});
    const history = useHistory();
    const genres = [
        { key: '0', text: 'Action', value: 'Action' },
        { key: '1', text: 'Adventure', value: 'Adventure' },
        { key: '2', text: 'Animation', value: 'Animation' },
        { key: '3', text: 'Biography', value: 'Biography' },
        { key: '4', text: 'Comedy', value: 'Comedy' },
        { key: '5', text: 'Crime', value: 'Crime' },
        { key: '6', text: 'Drama', value: 'Drama' },
        { key: '7', text: 'Family', value: 'Family' },
        { key: '8', text: 'Fantasy', value: 'Fantasy' },
        { key: '9', text: 'Film Noir', value: 'Film Noir' },
        { key: '10', text: 'History', value: 'History' },
        { key: '11', text: 'Horror', value: 'Horror' },
        { key: '12', text: 'Musical', value: 'Musical' },
        { key: '13', text: 'Mystery', value: 'Mystery' },
        { key: '14', text: 'Romance', value: 'Romance' },
        { key: '15', text: 'Sci-Fi', value: 'Sci-Fi' },
        { key: '16', text: 'Sport', value: 'Sport' },
        { key: '17', text: 'Superhero', value: 'Superhero' },
        { key: '18', text: 'Thriller', value: 'Thriller' },
        { key: '19', text: 'War', value: 'War' },
        { key: '20', text: 'Western', value: 'Western' }
    ];

    function handleChange(e){
        setForm({
            ...form,
            [e.target.name]: e.target.value
        });
    }

    function handleSubmit(e){
        e.preventDefault();
    }

    return (
        <Form autoComplete='off' onSubmit={handleSubmit}>
            <Segment>
                <Form.Input
                    name="title"
                    id="title"
                    onChange={handleChange}
                    placeholder="title"
                    value={form.title}
                    label="Title"
                    required
                />
                <Form.Input
                    name="logline"
                    id="logline"
                    onChange={handleChange}
                    placeholder="title"
                    value={form.logline}
                    label="Logline"
                />
                <Form.Input
                    name="synopsis"
                    id="synopsis"
                    onChange={handleChange}
                    placeholder="synopsis"
                    value={form.synopsis}
                    label="Synopsis"
                />


                       <Form.Select
                            options={genres}
                            label="Genre"                
                        />

            

            
            <Button>Add Script</Button>
            </Segment>
        </Form>
    );
}

// genre: String,
// mediaType: String,
// stage: String,
// budget: Number,
// author: {
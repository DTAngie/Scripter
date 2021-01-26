import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import './LoginPage.css';
import ErrorMessage from '../../components/ErrorMessage/ErrorMessage';
import userService from '../../utils/userService';
import { Grid, Header, Form, Button, Segment } from 'semantic-ui-react';

export default function LoginPage(props){
  const [form, setForm] = useState({
    username: '',
    password: ''
  });
  const [invalidForm, setInvalidForm] = useState(true);
  const [error, setError] = useState('');
  const history = useHistory();

  function handleChange(e) {
    setForm({
      ...form,
      [e.target.name]: e.target.value
    });
    if (form.username && form.password){
      setInvalidForm(false)
    } else {
      setInvalidForm(true);
    }
  }

  async function handleSubmit(e) {
    e.preventDefault();

    try {
      await userService.login(form);
      props.handleSignUpOrLogin();
      history.push('/dashboard');
    } catch (err) {
      setError(err.message);
    }
  }

  return (
    <>
      <Grid textAlign='center' style={{ height: '85vh', marginTop:'-60px'}} verticalAlign='middle'>
        <Grid.Column width={4}>
          <Header as="h2">Log In</Header>
          <ErrorMessage error={error} />
          <Form autoComplete='off' onSubmit={handleSubmit}>
            <Segment>
              <Form.Input
                id="username"
                name="username"
                placeholder="username"
                label="Username"
                value={form.username}
                onChange={handleChange}
                required
              />
              <Form.Input
                id="password"
                name="password"
                placeholder="password"
                label="Password"
                value={form.password}
                onChange={handleChange}
                type="password"
                required
              />
              <Button type='submit' className='btn' disabled={invalidForm}>Log In</Button>
            </Segment>
          </Form>
        </Grid.Column>
      </Grid>
    </>
  )
    
}


import React, {useState } from 'react';
import './SignupPage.css';
import ErrorMessage from '../../components/ErrorMessage/ErrorMessage';
import userService from '../../utils/userService';
import { Grid, Header, Form, Button, Segment } from 'semantic-ui-react';
import { useHistory } from 'react-router-dom';

export default function SignUpPage(props){
  const [form, setForm] = useState({
    username: '',
    email: '',
    password: '',
    passwordConf: ''
  });
  const [invalidForm, setInvalidForm] = useState(true);
  const [error, setError] = useState('');
  const history = useHistory();

  function handleChange(e) {
    setForm({
      ...form,
      [e.target.name]: e.target.value
    });
    if (form.username && form.password && form.passwordConf && form.email){
      setInvalidForm(false)
    } else {
      setInvalidForm(true);
    }
  }

  async function handleSubmit(e) {
    e.preventDefault();
    const formData = new FormData();

    for (let val in form) {
      formData.append(val, form[val])
    }
    try {
      await userService.signup(form);
      props.handleSignUpOrLogin();
      history.push('/dashboard');
    } catch (err) {
      setError(err.message);
    }
  }

  return (
      <Grid textAlign='center' style={{ height: '85vh', marginTop:'-60px'}} verticalAlign='middle'>
        <Grid.Column width={4}>
          <Header as="h2">Sign up</Header>
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
                id="email"
                name="email"
                placeholder="email"
                label="E-mail"
                value={form.email}
                onChange={handleChange}
                type="email"
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
              <Form.Input
                id="passwordConf"
                name="passwordConf"
                placeholder="password"
                label="Enter Password Again"
                value={form.passwordConf}
                onChange={handleChange}
                type="password"
                required
              />
              <Button type='submit' className='btn' disabled={invalidForm}>Get Started</Button>
            </Segment>
          </Form>
        </Grid.Column>
      </Grid>
  );
}

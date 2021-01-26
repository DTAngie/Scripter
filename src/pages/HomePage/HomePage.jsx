import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Image, Container, Card, Grid, Header, Button } from 'semantic-ui-react';
import './HomePage.css';
import HeroImage from '../../assets/images/HeroImage.jpg';
import * as scriptsAPI from '../../utils/scriptService'; 

export default function HomePage() {
    const [featuredScripts, setFeaturedScripts] = useState(null);

    useEffect(()=> {
        async function getScripts(){
            const data = await scriptsAPI.getFeatured();
            if (data['404']){
                setFeaturedScripts(null);
            } else {
                setFeaturedScripts([...data.scripts]);
            }
        }
        getScripts();
    }, [])

    return (
        <div className="HomePage">
            <div className="hero-image">
              <Image src={HeroImage}/>
            </div>
            <Container id='black-box'>
                <h3>Do you have a winning idea?</h3>
                <p>Get feedback from your peers and turn your script from pass to purchased.</p>
            </Container>
            <Container id="featured">
                <Header as='h2' style={{marginBottom: '60px'}}>Some of our featured scripts</Header>
                <Grid columns='equal' padded='horizontally'>
                    {featuredScripts ? 
                        featuredScripts.map((script, index)=>{
                            return (
                                <Grid.Column key={index}>
                                    <Card style={{margin: '0 auto'}}>
                                        <Card.Content>
                                            <Card.Header>{script.title}</Card.Header>
                                            <Card.Description>{script.logline}</Card.Description>
                                        </Card.Content>
                                    </Card>
                                </Grid.Column>);
                        })
                        :
                        ''
                    }
                </Grid>
            </Container>
            <Container id='cta'>
                <Button as={Link} to='/signup' size='huge'>Sign Up</Button>
            </Container>
        </div>
    )
}

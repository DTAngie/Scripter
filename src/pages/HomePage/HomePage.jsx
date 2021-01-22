import React from 'react';
import { Image, Container } from 'semantic-ui-react';
import './HomePage.css';
import HeroImage from '../../assets/images/HeroImage.jpg';

export default function HomePage({user, handleLogout}) {
    return (
        <div className="HomePage">
            <div className="hero-image">
              <Image src={HeroImage}/>
            </div>
            <Container id='black-box'>
                <h3>Do you have a winning idea?</h3>
                <p>Get feedback from your peers and turn your script from pass to purchased.</p>
            </Container>
        </div>
    )
}

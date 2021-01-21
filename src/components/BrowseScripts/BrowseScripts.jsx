import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { List, Accordion, Icon } from 'semantic-ui-react';
import './BrowseScripts.css';

export default function BrowseScripts(){
    const [activeIndex, setActiveIndex] = useState([]);
    const genres = [
        'Action',
        'Adventure',
        'Animation',
        'Biography',
        'Comedy',
        'Crime',
        'Drama',
        'Family',
        'Fantasy',
        'Film Noir',
        'History',
        'Horror',
        'Musical',
        'Mystery',
        'Romance',
        'Sci-Fi',	
        'Sport',
        'Superhero',
        'Thriller',
        'War',
        'Western'
    ];
    
    const mediaTypes = [
        'Feature',
        'New Media',
        'Short',
        'Television',
        'Web'
    ];

    const stages = [
        'Draft',
        'Pitch',
        'Optioned',
        'Produced',
    ];

    const budgets = [
        { text: 'Under $100K', value: '0' },
        { text: '$100K - $250K', value: '1' },
        { text: '$250K - $500K', value: '2' },
        { text: '$500K - $1M', value: '3' },
        { text: '$1M - $5M', value: '4' },
        { text: '$5M - $10M', value: '5' },
        { text: 'Above $10M', value: '6' }
    ];

    function handleAccordionClick(e, titleProps){
        const elemIndex = titleProps.index;
        if (activeIndex.indexOf(elemIndex) === -1){
            setActiveIndex([...activeIndex, elemIndex]);
        } else {
            setActiveIndex(
                activeIndex.filter((element)=> {
                    return element !== elemIndex;
                })
            )
        }
    }

    return(
        <List className="BrowseScripts">
            <List.Item as={Link} to='/scripts/all'>Browse All</List.Item>
            <List.Item>
                <Accordion>
                    <Accordion.Title
                        active={activeIndex.indexOf('0') !== -1}
                        index={'0'}
                        onClick={handleAccordionClick}
                    >
                        <Icon name='dropdown' />
                        Genre
                    </Accordion.Title>
                    <Accordion.Content active={activeIndex.indexOf('0') !== -1}>
                        <List.List>
                            { genres.map((item, index)=> {
                                return (<List.Item as={Link} to={`/scripts/all?genre=${item}`} key={index}>{item}</List.Item>)
                            })}
                        </List.List>
                    </Accordion.Content>
                </Accordion>
            </List.Item>
            <List.Item>
                <Accordion>
                    <Accordion.Title
                        active={activeIndex.indexOf('1') !== -1}
                        index={'1'}
                        onClick={handleAccordionClick}
                    >
                        <Icon name='dropdown' />
                        Medium
                    </Accordion.Title>
                    <Accordion.Content active={activeIndex.indexOf('1') !== -1}>
                        <List.List>
                            { mediaTypes.map((item, index)=> {
                                return (<List.Item as={Link} to={`/scripts/all?mediaType=${item}`} key={index}>{item}</List.Item>)
                            })}
                        </List.List>
                    </Accordion.Content>
                </Accordion>
            </List.Item>
            <List.Item>
                <Accordion>
                    <Accordion.Title
                        active={activeIndex.indexOf('2') !== -1}
                        index={'2'}
                        onClick={handleAccordionClick}
                    >
                        <Icon name='dropdown' />
                        Stage
                    </Accordion.Title>
                    <Accordion.Content active={activeIndex.indexOf('2') !== -1}>
                        <List.List>
                            { stages.map((item, index)=> {
                                return (<List.Item as={Link} to={`/scripts/all?stage=${item}`} key={index}>{item}</List.Item>)
                            })}
                        </List.List>
                    </Accordion.Content>
                </Accordion>
            </List.Item>
            <List.Item>
                <Accordion>
                    <Accordion.Title
                        active={activeIndex.indexOf('3') !== -1}
                        index={'3'}
                        onClick={handleAccordionClick}
                    >
                        <Icon name='dropdown' />
                        Budget
                    </Accordion.Title>
                    <Accordion.Content active={activeIndex.indexOf('3') !== -1}>
                        <List.List>
                            { budgets.map((item, index)=> {
                                return (<List.Item as={Link} to={`/scripts/all?budget=${item.value}`} key={index}>{item.text}</List.Item>)
                            })}
                        </List.List>
                    </Accordion.Content>
                </Accordion>
            </List.Item>
        </List>
    )
}
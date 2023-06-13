import React from 'react';
import Form from 'react-bootstrap/Form';
import Container from 'react-bootstrap/Container';
import { Spinner, Row, Col } from 'react-bootstrap';
import InputGroup from 'react-bootstrap/InputGroup';
import Toast from 'react-bootstrap/Toast';
import Placeholder from 'react-bootstrap/Placeholder';
import Card from 'react-bootstrap/Card';
import {useQuery} from '@tanstack/react-query';
import { HeroCard } from './components/HeroCard';

export interface AppProps {
  apiURL: string;
  env: string;
}

export function App(props: AppProps) {

  const [decklistIdInput, setDecklistIdInput] = React.useState("");
  const [decklistId, setDecklistId] = React.useState("");

  const {data, isLoading, isError} = useQuery({
    queryKey: ['deckList', decklistId],
    queryFn: () => fetchDecklist(decklistId),
    retry: false 
  });

  const handleDecklistIdInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setDecklistIdInput(event.target.value);
  }

  const fetchDecklist = async (decklistId: string) => {
    if(decklistId != "" && decklistId != null ) {
      const response = await fetch(props.apiURL + `/public/decklist/${decklistId}.json?_format=json`, {
        mode: 'cors'
      });

      if(!response.ok) {

        throw new Error("Failed to fetch decklist");
      }

      const data = await response.json();

      return data

    }

    return null;

  }
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    console.log("submitting decklist id: " + decklistIdInput);
    setDecklistId(decklistIdInput);

  }

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      const form = event.currentTarget.form;
    

      if (form) {
        form.dispatchEvent(new Event('submit', { cancelable: true, bubbles: false }));
      }
    }
  }

  const heroIds = data ? Object.keys(data.heroes) : [];


  return (
    <div className="App">
      <Container>
        <Row>
          <h1>Yet another ringsdb client</h1>
 
          { props.env == 'development' && <span>API URL: {props.apiURL}</span>}
        </Row>
        <Row>
          <Col>
            <Form onSubmit={handleSubmit}>

              <Form.Label htmlFor="decklistId">Search for a decklist here</Form.Label>
              <InputGroup className='mb-3'>
                <Form.Control
                  id="decklistId"
                  type="text"
                  placeholder="decklist id"
                  value={decklistIdInput}
                  onChange={handleDecklistIdInputChange}
                  onKeyDown={handleKeyDown}
                />
                {/* {isLoading && <Spinner className="ms-4" animation="border" variant="primary" />} */}
              </InputGroup>
            </Form>
            {isLoading &&
              <Toast>
                <Toast.Header>
                  <img src="holder.js/20x20?text=%20" className="rounded me-2" alt="" />
                  <strong className="me-auto">RingsDB client</strong>

                </Toast.Header>
                <Toast.Body>Loading deck list</Toast.Body>
              </Toast>}

            {isError && 
              <Toast>
              <Toast.Header>
                <img src="holder.js/20x20?text=%20" className="rounded me-2" alt="" />
                <strong className="me-auto">RingsDB client</strong>

              </Toast.Header>
              <Toast.Body>Failed to load data</Toast.Body>
            </Toast>}
          </Col>
        </Row>
        <Row>
            {data && heroIds.map((heroId) => 
            <HeroCard key={heroId} Id={heroId} ApiUrl={props.apiURL} /> 
            )}
        </Row>
      </Container>
    </div>
  );
}


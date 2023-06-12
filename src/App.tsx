import React from 'react';
import Form from 'react-bootstrap/Form';
import Container from 'react-bootstrap/Container';
import { Spinner, Row, Col } from 'react-bootstrap';
import InputGroup from 'react-bootstrap/InputGroup';




export interface AppProps {
  apiURL: string;
}

export function App(props: AppProps ) {

  const [isLoading, setIsLoading] = React.useState(false);
  const [decklistId, setDecklistId] = React.useState("");

  const handleDecklistIdChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setDecklistId(event.target.value);
  }
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsLoading(true);
    console.log("submitting decklist id: " + decklistId);
  }
  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      const form = event.currentTarget.form;

      if (form) {
        form.dispatchEvent(new Event('submit', {cancelable: true, bubbles: false}));
      }
    }
  }

  return (
    <div className="App">
      <Container>
       <Row>
          <h1>Yet another ringsdb client</h1>
          <span>API URL: {props.apiURL}</span>
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
              value={decklistId} 
              onChange={handleDecklistIdChange}
              onKeyDown={handleKeyDown}
            />
             {isLoading && <Spinner  className="ms-4" animation="border" variant="primary" />}
            </InputGroup>
          </Form>
          </Col>
        </Row>
        </Container>
    </div>
  );
}


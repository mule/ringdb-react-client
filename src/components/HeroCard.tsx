import { Card, Col } from "react-bootstrap";

export interface HeroCardProps {
    Id: string;
}

export  function HeroCard(props: HeroCardProps) {

    return (<Col key={props.Id}>
    <Card style={{ width: '18rem' }}>
      <Card.Body>
        <Card.Title>{props.Id}</Card.Title>
        <Card.Text>
          {props.Id}
        </Card.Text>
      </Card.Body>
    </Card>
  </Col>);
}

/*

{
    "pack_code": "Core",
    "pack_name": "Core Set",
    "type_code": "hero",
    "type_name": "Hero",
    "sphere_code": "lore",
    "sphere_name": "Lore",
    "position": 2,
    "code": "001002",
    "name": "Arwen",
    "traits": "Noldor",
    "text": "<b>Upkeep<\/b>: Restore 1 [health] to 1 Character",
    "flavor": "...thought and knowledge were in her glance, as of one who has known many things that the years bring.\n\u2014The Fellowship of the Ring",
    "is_unique": true,
    "threat": 9,
    "willpower": 3,
    "attack": 1,
    "health": 9,
    "quantity": 1,
    "deck_limit": 1,
    "rarity": "Core",
    "level": 0,
    "illustrator": "Magali Viilleneuve; Magali Viilleneuve (alt)",
    "has_errata": false,
    "url": "http:\/\/digital.ringsdb.com\/card\/001002",
    "imagesrc": "\/bundles\/cards\/001002.png"
}
*/

import { Button, Col, Row } from "react-bootstrap";
import Container from "react-bootstrap/esm/Container";
import Modal, { ModalProps } from "react-bootstrap/esm/Modal";

export interface HeroCardDetailsProps extends ModalProps {
    name?: string;
    traits?: string;
    text?: string;
    flavor?: string;

    threat?: number;
    willpower?: number;
    attack?: number;
    health?: number;
    imagesrc?: string;

}

export function HeroCardDetails(props: HeroCardDetailsProps)  {

    return (
        <Modal {...props} aria-labelledby="contained-modal-title-vcenter">
          <Modal.Header closeButton>
            <Modal.Title id="contained-modal-title-vcenter">
                {props?.name}
            </Modal.Title>
          </Modal.Header>
          <Modal.Body className="show-grid">
            <Container>
              <Row>
                <Col>
                    <img src={`https://digital.ringsdb.com/${props?.imagesrc}`} alt={props?.name} />
                </Col>
                <Col>
                  {props?.traits}
                </Col>
              </Row>
    
              <Row>
                <Col>
                  {props?.text}
                </Col>
                <Col>
         
                </Col>
                <Col>
           
                </Col>
              </Row>
            </Container>
          </Modal.Body>
          <Modal.Footer>
            <Button onClick={props.onHide}>Close</Button>
          </Modal.Footer>
        </Modal>
      );
}
import { Card, Col, Toast } from "react-bootstrap";
import { useQuery } from "@tanstack/react-query";
import { HeroCardDetails } from "./HeroCardDetails";
import { useState } from "react";

export interface HeroCardProps {
    Id: string;
    ApiUrl: string;
}

export function HeroCard(props: HeroCardProps) {

    const [show, setShow] = useState(false);

    const { data, isLoading, isError } = useQuery({
        queryKey: ['deckList', props.Id],
        queryFn: () => fetchCardData(props.Id),
        retry: false
    });

    const fetchCardData = async (cardId: string) => {
        if (cardId != "" && cardId != null) {
            const response = await fetch(props.ApiUrl + `/public/card/${cardId}.json?_format=json`, {
                mode: 'cors'
            });

            if (!response.ok) {

                throw new Error("Failed to fetch card");
            }

            const data = await response.json();

            return data

        }

        return null;

    }

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

  

    return (
    <Col key={props.Id}>
        <Card style={{ width: '18rem' }} onClick={handleShow}>
            <Card.Body>
                {isLoading &&
                    <Toast>
                        <Toast.Header>
                            <img src="holder.js/20x20?text=%20" className="rounded me-2" alt="" />
                            <strong className="me-auto">RingsDB client</strong>

                        </Toast.Header>
                        <Toast.Body>Loading hero card</Toast.Body>
                    </Toast>}
                {data && <>
                    <Card.Img variant="top" src={`https://digital.ringsdb.com/${data.imagesrc}`} alt={data.name} />
                </>}
                {isError &&
                    <Toast>
                        <Toast.Header>
                            <img src="holder.js/20x20?text=%20" className="rounded me-2" alt="" />
                            <strong className="me-auto">RingsDB client</strong>

                        </Toast.Header>
                        <Toast.Body>Failed to load data</Toast.Body>
                    </Toast>}
            </Card.Body>
        </Card>
        <HeroCardDetails {...data}  show={show} onHide={handleClose} />
    </Col>);
}

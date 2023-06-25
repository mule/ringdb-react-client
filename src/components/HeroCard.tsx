import { Card, Col, OverlayTrigger, Toast, Tooltip, TooltipProps } from "react-bootstrap";
import { useQuery } from "@tanstack/react-query";
import { HeroCardDetails } from "./HeroCardDetails";
import { RefAttributes, useRef, useState } from "react";
import { JSX } from "react/jsx-runtime";

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

    const renderTooltip = (props: JSX.IntrinsicAttributes & TooltipProps & RefAttributes<HTMLDivElement>) => (
        <Tooltip id="tooltip" {...props}>Click card for details</Tooltip>
    );



    return (
        <Col key={props.Id}>

            <Card style={{ width: '18rem' }} onClick={handleShow}>
                <OverlayTrigger
                    placement="bottom"
                    delay={{ show: 250, hide: 400 }}
                    overlay={renderTooltip}
                    
                >
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
                </OverlayTrigger>   
            </Card>

            <HeroCardDetails {...data} show={show} onHide={handleClose} />
        </Col>);
}

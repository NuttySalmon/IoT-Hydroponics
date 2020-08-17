import React, { Component } from "react";
import { 
  Container, 
  Row,
  Col,
  Image
} from "react-bootstrap";

class MeetTheTeam extends Component {
    render () {
        return (
            <div className="mt-5 mb-5">
                <Row>
                    <Container>
                        <Row >
                            <span className="title col">Meet The Team</span>
                        </Row>
                        <Row>
                            <Col>
                                <Row className="mb-5">
                                    <Col >
                                        <Image className="col head" src={require('./img/head2.jpg')} />
                                        <Row><span className="col head-name">Thomas Chan</span></Row>
                                    </Col>
                                    <Col >
                                        <Image className="col head" src={require('./img/head1.jpg')} />
                                        <Row><span className="col head-name">Jackson Truong</span></Row>
                                    </Col>
                                    <Col >
                                        <Image className="col head" src={require('./img/head4.png')} />
                                        <Row><span className="col head-name">Jason Chong</span></Row>
                                    </Col>
                                    <Col >
                                        <Image className="col head" src={require('./img/head3.jpg')} />
                                        <Row><span className="col head-name">Jonathan Naraja</span></Row>
                                    </Col>
                                </Row>
                            </Col>
                        </Row>
                    </Container>
                </Row>
            </div>
        );
    }
}

export default MeetTheTeam;
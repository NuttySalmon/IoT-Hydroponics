import React, { Component } from "react";
import { 
  Container, 
  Row,
  Col,
  Image
} from "react-bootstrap";
import ebbflowDiagram from '../img/ebbflow.png'

class EbbAndFlow extends Component {
    render () {
        return (
            <Container fluid>
                <Row className="title-box3">
                    <div className="col-sm-6 half-left">
<<<<<<< HEAD:mockup/landing-page/landing-page-react/src/EbbAndFlow.js
                        <Image className="justify-content-md-center" src={require('./img/ebbflow.png')} alt=""/>
=======
                        <Image src={ebbflowDiagram} alt=""/>
>>>>>>> af3349b38cc5abc5febe7ffbf6c1f21cf0566cda:react-app/src/Landing/archive/EbbAndFlow.js
                    </div>
                    <div className="col-sm-6 half-right  mt-5">
                        <Container fluid>
                            <Row>
                                <Container className="title-box-container2">
                                    <Col>
                                    <Row>
                                <Col>
                                    <span class="logo-title" style={{fontSize: 50}}>What is "Ebb and Flow?</span>
                                </Col>
                            </Row>
                            <Row justify-content-md-left>
                                <Col className="mb-4"> 
                                    <p style={{color: "black"}}>HydroGarden implements an ebb and flow method, also known as flood and drain. There are 2 pumps used to handle the water within the reservoir: one to fill the flood tray and another to agitate the water in the bottom reservoir to prevent algae from growing.
                                    </p>
                                </Col>
                            </Row>
                                    </Col>
                                </Container>
                            </Row> 
                        </Container>
                    </div>
                </Row>
            </Container>
        );
    }
}

export default EbbAndFlow;
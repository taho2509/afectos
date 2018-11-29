import React, {Component} from "react";
import {Button, Grid, Row, Col, Panel} from "react-bootstrap";

export class InfoPanel extends Component {
    render() {
        return (
            <Panel>
                <Panel.Body>
                    <Grid>
                        <Row>
                            <Col sm={3} className={"morning"}>
                                {/*console.log(this.props.content)*/}
                                {this.props.content.morning} &nbsp;
                                <img
                                    alt={""}
                                    src={ this.props.content.morning === ""?
                                    require('./images/unknow.png') :
                                    require('./images/' + this.props.content.morning + '.png')
                                } />
                            </Col>
                            <Col sm={3} className={"afternoon"}>
                                {this.props.content.afternoon} &nbsp;
                                <img
                                    alt={""}
                                    src={ this.props.content.afternoon === ""?
                                    require('./images/unknow.png') :
                                    require('./images/' + this.props.content.afternoon + '.png')
                                } />
                            </Col>
                            <Col sm={3} className={"evening"}>
                                {this.props.content.evening} &nbsp;
                                <img
                                    alt={""}
                                    src={ this.props.content.evening === ""?
                                    require('./images/unknow.png') :
                                    require('./images/' + this.props.content.evening + '.png')
                                } />
                            </Col>
                            <Col sm={3}>
                                {<Button
                                    bsSize="xsmall"
                                    bsStyle={"danger"}
                                    onClick={() => this.props.handleClick()}
                                >
                                    X
                                </Button>
                                }
                            </Col>
                        </Row>
                    </Grid>
                </Panel.Body>
            </Panel>);
    }
}

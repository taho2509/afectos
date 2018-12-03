import React, {Component} from "react";
import { MDBRow, MDBCol, MDBBtn, MDBCard, MDBCardBody } from "mdbreact";

export class InfoPanel extends Component {
    render() {
        return (
            <MDBCol md="12">
                <MDBCard>
                    <MDBCardBody>
                        <MDBRow>
                            <MDBCol sm={3} className={"morning"}>
                                {this.props.content.morning} &nbsp;
                                <img
                                    alt={""}
                                    src={ this.props.content.morning === ""?
                                        require('./images/unknow.png') :
                                        require('./images/' + this.props.content.morning + '.png')
                                    } />
                            </MDBCol>
                            <MDBCol sm={3} className={"afternoon"}>
                                {this.props.content.afternoon} &nbsp;
                                <img
                                    alt={""}
                                    src={ this.props.content.afternoon === ""?
                                        require('./images/unknow.png') :
                                        require('./images/' + this.props.content.afternoon + '.png')
                                    } />
                            </MDBCol>
                            <MDBCol sm={3} className={"evening"}>
                                {this.props.content.evening} &nbsp;
                                <img
                                    alt={""}
                                    src={ this.props.content.evening === ""?
                                        require('./images/unknow.png') :
                                        require('./images/' + this.props.content.evening + '.png')
                                    } />
                            </MDBCol>
                            <MDBCol sm={3}>
                                {<MDBBtn
                                    color="danger"
                                    size="sm"
                                    className="rounded"
                                    onClick={() => this.props.handleClick()}
                                >
                                    <i className="fa fa-trash"></i>
                                </MDBBtn>
                                }
                            </MDBCol>
                        </MDBRow>
                    </MDBCardBody>
                </MDBCard>
            </MDBCol>
        );
    }
}

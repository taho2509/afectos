import React, {Component} from "react";
import {Button, Panel} from "react-bootstrap";
import * as PropTypes from "prop-types";

export class InfoPanel extends Component {
    render() {
        return (
            <Panel>
                <Panel.Body>
                    {this.props.content}
                    {this.props.content ?
                        <Button
                            className="pull-right"
                            bsSize="xsmall"
                            bsStyle={"danger"}
                            onClick={() => this.props.handleClick()}
                        >
                            X
                        </Button>
                        : null
                    }
                </Panel.Body>
            </Panel>);
    }
}

InfoPanel.propTypes = {content: PropTypes.string};
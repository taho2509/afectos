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
                            bsSize="xsmall"
                            bsStyle={"danger pull-right"}
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
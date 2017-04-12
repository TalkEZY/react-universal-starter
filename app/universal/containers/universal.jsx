/** @flow */
import { connect } from "react-redux";
import { withRouter } from "react-router";
import Segment from "backpack-ui/dist/components/segment";
import Container from "backpack-ui/dist/components/container";
import React from "react";
import {
  Heading,
} from "backpack-ui";

/**
 * Renders a list of pois
 */
export default class UniversalContainer extends React.Component {
  render() {
    return (
      <Segment halfSpace>
        <Container>
          <Heading>Universal render like a bawss...</Heading>
        </Container>
      </Segment>
    );
  }
}

const mapStateToProps = () => ({
  //
});

const connected = withRouter(connect(mapStateToProps)(UniversalContainer));

export { connected };

/** @flow */
import { connect } from "react-redux";
import { Route } from "react-router-dom";
import { withRouter } from "react-router";
import React from "react";
import { StyleRoot } from "radium";
import settings from "rizzo-next/sass/settings.json";
import * as actions from "./shared/actions/layoutMobile";
import DevTools from "./shared/containers/devTools";
import Home from "./home/containers/home";
import { connected as Universal } from "./universal/containers/universal";

export type AppComponentProps = {
  dispatch: Function,
};

/**
 * Renders a list of pois
 */
export default class AppComponent extends React.Component {
  handleLayoutChange: () => void;
  mql: Object;

  constructor() {
    super();

    this.handleLayoutChange = this.handleLayoutChange.bind(this);
  }

  componentDidMount() {
    this.mql = window.matchMedia(`(max-width: ${settings.media.max["768"]})`);

    this.mql.addListener(this.handleLayoutChange);

    this.props.dispatch(actions.layoutMobile(this.mql.matches));
  }

  componentWillUnmount() {
    this.mql.removeListener(this.handleLayoutChange);
  }

  handleLayoutChange() {
    this.props.dispatch(actions.layoutMobile(this.mql.matches));
  }

  render() {
    const { userAgent } = this.props;
    const isDev = process.env.NODE_ENV === "development";

    return (
      <StyleRoot radiumConfig={{ userAgent }}>
        <Route path="/" exact component={Home} />
        <Route path="/universal" component={Universal} />
        {isDev && <DevTools />}
      </StyleRoot>
    );
  }
}

AppComponent.propTypes = {
  userAgent: React.PropTypes.string,
  children: React.PropTypes.object,
  dispatch: React.PropTypes.func,
};

const mapStateToProps = state => ({
  userAgent: state.userAgent,
});

const connected = withRouter(connect(mapStateToProps)(AppComponent));
export { connected };

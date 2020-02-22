import React from "react";
import PropTypes from "prop-types";

const cTheme = {
  js: theme => import(`./styles/codeThemes/${theme}.less`)
};

const mTheme = {
  js: theme => import(`./styles/mdThemes/${theme}.less`)
};

class Markdown extends React.Component {
  constructor() {
    super();
    this.createMarkup = this.createMarkup.bind(this);
  }

  static propTypes = {
    codeTheme: PropTypes.string,
    mdTheme: PropTypes.string
  };

  static defaultProps = {
    codeTheme: "github",
    mdTheme: "misty-light"
  };

  componentDidMount() {
    const { codeTheme, mdTheme } = this.props;
    cTheme.js(codeTheme);
    mTheme.js(mdTheme);
  }
  createMarkup() {
    return { __html: this.props.children };
  }
  render() {
    return (
      <div
        dangerouslySetInnerHTML={this.createMarkup()}
        className={this.props.className || "markdown"}
      />
    );
  }
}

export default Markdown;

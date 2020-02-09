import "codemirror/mode/javascript/javascript";
import "codemirror/mode/jsx/jsx";
import "codemirror/addon/runmode/runmode";

import CodeEditor from "./CodeEditor";
import parseHTML from "./parseHTML";
import Preview from "./Preview";

const React = require("react");
const PropTypes = require("prop-types");
const ReactDOM = require("react-dom");
const { Markdown } = require("react-markdown-reader");
const classNames = require("classnames");

class CodeView extends React.Component {
  static propTypes = {
    theme: PropTypes.oneOf(["light", "dark"]),
    classPrefix: PropTypes.string,
    delay: PropTypes.number,
    showCode: PropTypes.bool,
    source: PropTypes.string,
    children: PropTypes.string,
    dependencies: PropTypes.object,
    babelTransformOptions: PropTypes.object,
    buttonClassName: PropTypes.string,
    showCodeIcon: PropTypes.node,
    renderToolbar: PropTypes.func
  };

  static defaultProps = {
    theme: "light",
    delay: 0,
    babelTransformOptions: {
      presets: ["stage-0", "react", "es2015"]
    }
  };

  static getDerivedStateFromProps(nextProps, preState) {
    if (nextProps.code && nextProps.code !== preState.code) {
      return {
        code: nextProps.code
      };
    }
    return null;
  }
  constructor(props) {
    super(props);

    const { code, beforeHTML, afterHTML } = parseHTML(props.children || props.source);
    this.state = {
      beforeHTML,
      afterHTML,
      code,
      showCode: props.showCode,
      hasError: false,
      errorMessage: null
    };
    this.executeCode = this.executeCode.bind(this);

    this.timer = setTimeout(() => {
      this.executeCode();
    }, props.delay);
  }

  componentWillUnmount() {
    if (this.timer) {
      clearTimeout(this.timer);
    }
  }

  executeCode(nextCode) {
    const { babelTransformOptions, dependencies } = this.props;
    const originalRender = ReactDOM.render;
    let hasError = false;
    ReactDOM.render = element => {
      this.initialExample = element;
    };
    try {
      const code = window.Babel.transform(nextCode || this.state.code, babelTransformOptions).code;
      let statement = "";

      if (dependencies) {
        Object.keys(dependencies).forEach(key => {
          statement += `var ${key}= dependencies.${key};\n `;
        });
      }

      /* eslint-disable */
      eval(`${statement} ${code}`);
      /* eslint-enable */
    } catch (err) {
      hasError = true;
      console.error(err);
    } finally {
      ReactDOM.render = originalRender;
      if (!hasError) {
        this.forceUpdate();
      }
    }
  }

  handleCodeChange = val => {
    this.setState({
      hasError: false,
      errorMessage: null
    });
    this.executeCode(val);
  };

  handleShowCode = () => {
    const showCode = !this.state.showCode;
    this.setState({ showCode });
  };

  handleError = error => {
    this.setState({
      hasError: true,
      errorMessage: error.message
    });
  };

  addPrefix = name => {
    const { classPrefix } = this.props;
    if (classPrefix) {
      return `${classPrefix}${name}`;
    }
    return name;
  };

  renderExample() {
    const { hasError, errorMessage } = this.state;
    return (
      <Preview hasError={hasError} errorMessage={errorMessage} onError={this.handleError}>
        <div>{this.initialExample ? this.initialExample : <div>Loading...</div>}</div>
      </Preview>
    );
  }

  render() {
    const {
      className = "",
      style,
      showCodeIcon,
      buttonClassName,
      renderToolbar,
      theme
    } = this.props;
    const { showCode, beforeHTML, afterHTML } = this.state;
    const icon = (
      // <span>
      //   <i className={classNames(this.addPrefix("icon"), this.addPrefix("icon-code"))} />
      // </span>
      <span class="code-expand-icon">
        <img
          alt="expand code"
          src="https://gw.alipayobjects.com/zos/rmsportal/wSAkBuJFbdxsosKKpqyq.svg"
          class="code-expand-icon-show"
        />
        <img
          alt="expand code"
          src="https://gw.alipayobjects.com/zos/rmsportal/OpROPHYqWmrMDBFMZtKF.svg"
          class="code-expand-icon-hide"
        />
        >
      </span>
    );

    const showCodeButton = (
      // <button
      //   className={classNames(this.addPrefix("btn"), this.addPrefix("btn-xs"), buttonClassName)}
      //   onClick={this.handleShowCode}
      // >
      //   {typeof showCodeIcon !== "undefined" ? showCodeIcon : icon}
      // </button>
      <span class="code-expand-icon" onClick={this.handleShowCode}>
        <img
          alt="expand code"
          src={
            this.state.showCode
              ? "https://gw.alipayobjects.com/zos/rmsportal/OpROPHYqWmrMDBFMZtKF.svg"
              : "https://gw.alipayobjects.com/zos/rmsportal/wSAkBuJFbdxsosKKpqyq.svg"
          }
          class="code-expand-icon-show"
        />
      </span>
    );

    return (
      <div className={`${className} markdown-table`} style={style}>
        <Markdown>{beforeHTML}</Markdown>
        <div className="code-view-wrapper">
          {this.renderExample()}
          <div className="code-view-toolbar">
            {renderToolbar ? renderToolbar(showCodeButton) : showCodeButton}
          </div>
          <CodeEditor
            lineNumbers
            key="jsx"
            onChange={this.handleCodeChange}
            className={`doc-code ${showCode ? "show" : ""}`}
            theme={`base16-${theme}`}
            code={this.state.code}
          />
        </div>
        <Markdown>{afterHTML}</Markdown>
      </div>
    );
  }
}

export default CodeView;

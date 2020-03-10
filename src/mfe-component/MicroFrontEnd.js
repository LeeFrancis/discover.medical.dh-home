import React, { Component } from "react";
import PropTypes from "prop-types";
import ReactDOM from "react-dom";
import { MFEContext } from "./context";

export default class MicroFrontEnd extends Component {
  static propTypes = {
    id: PropTypes.string.isRequired,
    mfeHost: PropTypes.object.isRequired,
    target: PropTypes.string.isRequired
  };
  static contextType = MFEContext;

  constructor(props, context) {
    super(props, context);
    this.mfeManager = context.mfeManager;
    this.mfeContainerDiv = document.getElementById(props.target);
    this.el = document.createElement("div");
    this.el.setAttribute("id", props.id);
  }
  componentDidMount() {
    try {
      this.mfeContainerDiv.appendChild(this.el);
    } catch (e) {
      console.log(`MicroFrontEnd: - Problem trying to mount : ${e}`);
    }
    this.mfeManager.getMountNode(this.props.id, this.props.mfeHost).then(
      mountNode => {
        const { id } = this.props;
        this.mountNode = this.mfeManager.setMountNode(id, mountNode);
        this.mfeManager.setScriptHost(this.props.mfeHost);
        this.forceUpdate();
      },
      error => {
        this.error = error.message;
        this.forceUpdate();
      }
    );
  }

  componentWillUnmount() {
    console.log("componentWillUnmount : unmounting", this.props.id);
    this.mfeManager.removeMountNode(this.props.id);
  }

  render() {
    console.log("rendering");
    if (typeof this.error !== "undefined" && this.error) {
      return ReactDOM.createPortal(<div>{this.error}</div>, this.el);
    }
    return ReactDOM.createPortal(
      this.mountNode ? (
        <MFEContext.Provider value={{ mfeManager: this.context.mfeManager }}>
          {this.mountNode}
        </MFEContext.Provider>
      ) : (
        loadingChild()
      ),
      this.el
    );
  }
}

const loadingChild = props => {
  return <div>Loading....</div>;
};

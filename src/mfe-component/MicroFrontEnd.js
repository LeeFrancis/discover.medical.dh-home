import React, { Component } from "react";
import PropTypes from "prop-types";
import ReactDOM from "react-dom";
import { MFEContext } from "./context";

const loadMfe = ({ name, host, path = "" }, newMountNode, resolve, reject) => {
  const scriptId = `micro-frontend-script-${name}`;
  const renderMicroFrontEnd = () => {
    try {
      resolve(window[`render${name}`]());
    } catch (err) {
      reject(new Error(`Problem mounting Microi - ${err}`));
    }
  };
  fetch(`${host}${path}/asset-manifest.json`)
    .then(res => res.json())
    .then(manifest => {
      // Setup to work with webpack dev server
      const isLive = manifest.files;
      const script = document.createElement("script");
      const src = isLive ? manifest.files["main.js"] : manifest["main.js"];
      script.id = scriptId;
      script.src = `${host}${isLive ? path : ""}${src}`;
      script.onload = renderMicroFrontEnd;
      document.head.appendChild(script);
    });
};

const storeKeys = (store, label) => {
  for (let [key, value] of Object.entries(store)) {
    console.log(label, `${key}: ${value}`);
  }
};

const getMountNode = (store, id, mfeHost) => {
  console.log("getMountNode :", `Looking for ${id} in store`);
  storeKeys(store, "MFE Store Entry: ");
  if (store[id]) {
    console.log("getMountNode :", `Found ${id} in store`);
    store[id].inUse = true;
    return Promise.resolve(store[id].mountNode);
  } else {
    console.log("getMountNode :", `Did Not find ${id} in store`);
    const newMountNode = document.createElement("div");
    newMountNode.setAttribute("id", mfeHost.name);
    store[id] = {
      inUse: true,
      container: newMountNode
    };
    console.log("getMountNode :", `Added ${id} in store`);
    console.log("getMountNode", "Store Now looks like this");
    storeKeys(store, "MFE Store Entry After Adding: ");
    console.log("getMountNode", "End Store Dump!!");
    return new Promise((resolve, reject) => {
      loadMfe(mfeHost, newMountNode, resolve, reject);
    });
  }
};

const removeMountNode = (store, id) => {
  const record = store[id];

  record.inUse = false;

  setTimeout(() => {
    if (!store[id].inUse) {
      ReactDOM.unmountComponentAtNode(store[id].container);
    }
  }, 0);
};

export default class MicroFrontEnd extends Component {
  static propTypes = {
    id: PropTypes.string.isRequired,
    mfeHost: PropTypes.object.isRequired,
    target: PropTypes.string.isRequired
  };
  static contextType = MFEContext;

  constructor(props) {
    super(props);
    this.mfeContainerDiv = document.getElementById(props.target);
    this.el = document.createElement("div");
    this.el.setAttribute("id", props.id);
  }
  componentDidMount() {
    this.mfeContainerDiv.appendChild(this.el);

    getMountNode(this.context.store, this.props.id, this.props.mfeHost).then(
      mountNode => {
        const { store } = this.context;
        const { id } = this.props;
        store[id].mountNode = store[id].mountNode || mountNode;
        this.mountNode = mountNode;
        this.forceUpdate();
      },
      error => {
        this.error(error);
        this.forceUpdate();
      }
    );
  }

  componentWillUnmount() {
    console.log("componentWillUnmount : unmounting", this.props.id);
    removeMountNode(this.context.store, this.props.id);
  }

  render() {
    console.log("rendering");
    if (this.error)
      return ReactDOM.createPortal(<div>${this.error}</div>, this.el);
    else
      return ReactDOM.createPortal(this.mountNode || loadingChild(), this.el);
  }
}

const loadingChild = props => {
  return <div>Loading....</div>;
};

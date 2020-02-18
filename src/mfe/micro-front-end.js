import React from "react";

class MicroFrontEnd extends React.Component {
  componentDidMount() {
    const { name, host, path = "" } = this.props;
    const scriptId = `micro-frontend-script-${name}`;

    if (typeof document !== "undefined") {
      if (document.getElementById(scriptId)) {
        // Because we want unique id's but singular script - name(scriptId)
        this.renderMicroFrontEnd();
        return;
      }

      fetch(`${host}${path}/asset-manifest.json`)
        .then(res => res.json())
        .then(manifest => {
          // Setup to work with webpack dev server
          const isLive = manifest.files;
          const script = document.createElement("script");
          const src = isLive ? manifest.files["main.js"] : manifest["main.js"];
          script.id = scriptId;
          script.src = `${host}${isLive ? path : ""}${src}`;
          script.onload = this.renderMicroFrontEnd;
          document.head.appendChild(script);
        });
    }
  }

  componentWillUnmount() {
    const { id, name } = this.props;

    if (typeof window !== "undefined")
      window[`unmount${name}`](`${id}-container`);
  }

  renderMicroFrontEnd = () => {
    const { id, name, history } = this.props;
    if (typeof window !== "undefined") {
      console.log(`Calling Unmount on ${id}-container`);
      window[`render${name}`](`${id}-container`, history);
    }
  };

  render() {
    const { id } = this.props;
    const container = <main id={`${id}-container`} />;

    return container;
  }
}

export default MicroFrontEnd;

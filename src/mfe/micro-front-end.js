import React, { useEffect } from "react";

function MicroFrontEnd(props) {
  const { id, history } = props;

  const container = <main id={`${id}-container`} />;

  const renderMicroFrontEnd = () => {
    const { id, name, data } = props;
    if (typeof window !== "undefined") {
      window[`render${name}`](`${id}-container`, history, data);
    }
  };

  useEffect(() => {
    const { name, host, path = "" } = props;
    const scriptId = `micro-frontend-script-${name}`;

    if (typeof document !== "undefined") {
      if (document.getElementById(scriptId)) {
        // Because we want unique id's but singular script - name(scriptId)
        renderMicroFrontEnd();
      } else {
        fetch(`${host}${path}/asset-manifest.json`)
          .then(res => res.json())
          .then(manifest => {
            // Setup to work with webpack dev server
            const isLive = manifest.files;
            const script = document.createElement("script");
            const src = isLive
              ? manifest.files["main.js"]
              : manifest["main.js"];
            script.id = scriptId;
            script.src = `${host}${isLive ? path : ""}${src}`;
            script.onload = renderMicroFrontEnd;
            document.head.appendChild(script);
          });
      }
    }
    return () => {
      const { id, name } = props;

      if (typeof window !== "undefined") {
        console.log(`Calling Unmount on ${id}-container`);
        window[`unmount${name}`](`${id}-container`);
      }
    };
  });

  return container;
}

export default MicroFrontEnd;

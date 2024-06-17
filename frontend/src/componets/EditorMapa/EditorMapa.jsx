import React from 'react';
import SplitPane from 'react-split-pane';
import Map from '../Map/Map.jsx';
import './EditorMapa.css';

const EditorMapa = () => {
  return (
    <SplitPane split="vertical" defaultSize="50%" className="split-pane">
      <div className="pane-left">
        <Map />
      </div>
      <div className="pane-right">
        <h1>Panel derecho</h1>
      </div>
    </SplitPane>
  );
};

export default EditorMapa;
import React, { Component } from 'react';
import CodeMirror from 'react-codemirror2';
import io from 'socket.io-client/dist/socket.io.js';
import { throttle } from 'lodash';

import Button from '../globals/Button';
import StdOut from './StdOut';
import EditorHeader from './EditorHeader';
import axios from 'axios';

import 'codemirror/mode/javascript/javascript.js';
import 'codemirror/lib/codemirror.css';
import 'codemirror/theme/base16-dark.css';
import './Sling.css';

class Sling extends Component {
  state = {
    text: '',
    stdout: '',
    commits: ['A', 'B', 'C']
  }

  handleCommitClick = () => {
    console.log('WASSUP');
  }

  saveCode = () => {
    console.log('SAVE BUTTON HIT');

    let headers = {
      Authorization: `Bearer ${localStorage.token}`
    }

    axios.post(`${process.env.REACT_APP_REST_SERVER_URL}/api/commit-sling/:slingId`, {
      commit: {
        slingId: '123',
        commitName: 'test',
        commitText: this.state.text
      }
    }, headers)
      .then( data => {
        console.log('YISSSS ');
      })
      .catch( err => {
        console.log('ERR', err);
      })

    console.log('STATE: ', this.state.text);
  }

  runCode = () => {
    this.socket.emit('client.run');
  }

  componentWillMount() {
    axios.get(`${process.env.REACT_APP_REST_SERVER_URL}/api/new-sling`, {
      headers: {
        Authorization: `Bearer ${localStorage.token}`,
      }
    })
      .then( data => {
        this.setState({
          text: data.data.sling.text,
          commits: data.data.sling.commits
        })
      })
      .catch( err => {
        console.log('ERR', err);
      })
  }

  componentDidMount() {
    this.socket = io(process.env.REACT_APP_SOCKET_SERVER_URL, {
      query: {
        roomId: this.props.slingId,
      }
    });

    this.socket.on('connect', () => {
      this.socket.emit('client.ready');
    });

    this.socket.on('server.initialState', ({ id, text }) => {
      this.setState({ id, text });
    });

    this.socket.on('server.changed', ({ text }) => {
      this.setState({ text });
    });

    this.socket.on('server.run', ({ stdout }) => {
      this.setState({ stdout });
    });

    window.addEventListener('resize', this.setEditorSize);
  }
  
  componentWillUnmount() {
    window.removeEventListener('resize', this.setEditorSize);
  }

  handleChange = throttle((editor, metadata, value) => {
    this.socket.emit('client.update', { text: value });
  }, 250)

  setEditorSize = throttle(() => {
    this.editor.setSize(null, `${window.innerHeight - 80}px`);
  }, 100);

  initializeEditor = (editor) => {
    // give the component a reference to the CodeMirror instance
    this.editor = editor;
    this.setEditorSize();
  }

  render() {
    return (
      <div className="sling-container">
        <EditorHeader />
        <div className="code-editor-container">
          <CodeMirror
            editorDidMount={this.initializeEditor}
            value={this.state.text}
            options={{
              mode: 'javascript',
              lineNumbers: true,
              theme: 'base16-dark',
            }}
            onChange={this.handleChange}
          />
        </div>
        <div className="stdout-container">
          <Button
            className="run-btn"
            text="Run Code"
            backgroundColor="red"
            color="white"
            onClick={this.runCode}
          />
          <StdOut 
            text={this.state.stdout}
          />
        </div>
        <div>
          Commit History:

          { this.state.commits.map( (element, index) => {
            return <div key={index} onClick={this.handleCommitClick}> {element.name} </div>;

          }) }

          <Button
            className="run-btn"
            text="Save Code"
            backgroundColor="red"
            color="white"
            onClick={this.saveCode}
          />
        </div>
      </div>
    );
  }
}

export default Sling;

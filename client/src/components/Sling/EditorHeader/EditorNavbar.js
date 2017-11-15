import React from 'react';

const EditorNavbar = () => (
  <nav className="editor-navbar">
    <ul>
      <li>Item 1</li>
      <li>Item 2</li>
      <li onClick={() => localStorage.removeItem('token')}>Log out</li>
    </ul>
  </nav>
);

export default EditorNavbar;

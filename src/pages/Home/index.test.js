import React from 'react';
import ReactDOM from 'react-dom';
import { act } from 'react-dom/test-utils';
import Stories from '../../components/Stories';

let container;

beforeEach(() => {
  container = document.createElement('div');
  document.body.appendChild(container);
});

afterEach(() => {
  document.body.removeChild(container);
  container = null;
});

it('Check if page can be rendered', () => {
  act(() => {
    ReactDOM.render(<Stories />, container);
  });
});

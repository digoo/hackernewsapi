import styled from 'styled-components';

import { darken } from 'polished';

export const Container = styled.ul`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 300px;
  margin: 50px auto;
  border: 1px solid #111;
  background: #fff;

  img {
    width: 300px;
    height: 80px;
  }
  hr {
    border: 2px solid #333;
    width: 300px;
    /* margin-bottom: 5px; */
  }

  div.stories {
    width: 290px;
    margin: 0 auto 5px;
    border-top: 1px solid #999;
    border-bottom: 1px solid #999;
    font-size: 16px;
    font-weight: bold;

    &:first-child {
      margin-top: 2px;
      border-top: none;
    }

    &:last-child {
      margin-bottom: 2px;
      border-bottom: none;
    }
  }

  div.comments {
    font-size: 12px;
    font-weight: normal;
    border-top: 1px solid #777;
    border-bottom: 1px solid #777;
    width: 290px;
    margin: 10px auto;
    word-wrap: break-word;

    /* &:first-child {
      border-top: none;
    } */

    &:last-child {
      border-bottom: none;
    }
  }

  div.buttons {
    display: flex;
    width: auto;
    margin: 5px auto;
    justify-content: space-evenly;

    input {
      width: 140px;
      height: 20px;
      border: none;
      background: #777;
      color: #fff;

      &:hover {
        background: ${darken(0.03, '#ff7418')};
      }

      &:active {
        background: ${darken(0.09, '#ff7418')};
      }
    }
  }

  input {
    display: flex;
    justify-content: center;
    width: 140px;
    height: 20px;
    border: none;
    background: #ff7418;
    color: #fff;
    align-items: center;
    margin: 5px auto;

    &:hover {
      background: ${darken(0.03, '#ff7418')};
    }

    &:active {
      background: ${darken(0.09, '#ff7418')};
    }
  }
`;

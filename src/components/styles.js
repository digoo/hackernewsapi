import styled, { keyframes } from 'styled-components';

import { darken } from 'polished';

const rotate = keyframes`
  from {
    transform: rotate(0deg);
  }

  to {
    transform: rotate(360deg);
  }
`;

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 0 auto;
  background: #fff;

  div.logo {
    height: 120px;
    width: 100%;
    background: #ff6b08;
    display: flex;
    justify-content: center;

    div.frame {
      width: 100%;
      max-width: 900px;
      display: flex;
      align-items: center;

      img {
        width: 100%;
        max-width: 300px;
        height: 90px;
        background: #fff;
        border-radius: 4px;
        margin-right: 1rem;
      }
    }
  }

  div.mainContent {
    display: flex;
    flex-direction: column;
    /* Width below will decrease to become responsive */
    width: 100%;
    max-width: 900px;

    div.content {
      display: flex;
      flex-direction: column;

      &:first-child {
        margin-top: 30px;
      }

      &:last-child {
        margin-bottom: 40px;
      }

      div.headline {
        display: flex;
        flex-direction: row;
        justify-content: space-between;

        div.count {
          margin-right: 4rem;
          margin-left: 3rem;
          color: #fff;
          background: #555;
          height: 100%;
          max-height: 20px;
          width: 100%;
          max-width: 20px;
          font-size: 1.6rem;
          text-align: center;
          align-self: center;
          border-radius: 4px;
        }

        div.story {
          display: flex;
          flex-direction: column;
          flex: 1;

          div.titlelink {
            display: flex;
            flex-direction: row;

            div.title {
              display: flex;
              flex-direction: row;
              font-size: 1.6rem;
              font-weight: bold;
              color: #ea5b0c;
            }

            div.link a img {
              width: 100%;
              height: 100%;
              max-width: 15px;
              max-height: 15px;
              margin-right: 3rem;

              @media (max-width: 480px) {
                max-width: 14px;
                max-height: 14px;
              }

              @media (max-width: 400px) {
                max-width: 12px;
                max-height: 12px;
              }
            }
          }

          div.author {
            display: flex;
            flex-direction: row;

            p.time {
              font-size: 1.2rem;
              color: #777;
            }

            p.author {
              font-size: 1.2rem;
              font-weight: normal;
              color: #ff6b08;
            }
          }
        }

        div.storyStatus {
          display: flex;
          flex-direction: row;

          div.rate {
            display: flex;
            align-items: baseline;
            font-size: 1.2rem;
            img {
              width: 100%;
              height: 100%;
              max-width: 10px;
              max-height: 10px;
              margin-top: 5px;
              margin-right: 5px;

              @media (max-width: 480px) {
                max-width: 9px;
                max-height: 9px;
              }

              @media (max-width: 400px) {
                max-width: 8px;
                max-height: 8px;
              }
            }
          }

          div.totalComments {
            display: flex;
            align-items: baseline;
            font-size: 1.2rem;
            margin-right: 3rem;

            img {
              width: 100%;
              height: 100%;
              max-width: 10px;
              max-height: 10px;
              margin-top: 5px;
              margin-right: 5px;

              @media (max-width: 480px) {
                max-width: 9px;
                max-height: 9px;
              }

              @media (max-width: 400px) {
                max-width: 8px;
                max-height: 8px;
              }
            }
          }
        }
      }
      hr {
        margin: 10px 20px 15px 80px;
        border: 1px solid #eee;
        background: #eee;
        height: 1px;
      }

      div.comments {
        display: flex;
        flex-direction: row;
        justify-content: flex-start;
        margin-bottom: 15px;
        margin-left: 4.5rem;
        margin-right: 3rem;

        &:last-child {
          margin-bottom: 0;
        }

        div.autinfo {
          display: flex;
          flex-direction: column;
          margin-left: -25px;
          width: 100%;
          max-width: 50px;

          div.commentby {
            display: flex;
            flex-direction: row;
            width: 60px;

            p.by {
              color: #111;
              font-size: 1.2rem;
              font-weight: bold;
            }

            p.commauthor {
              color: #ea5b0c;
              font-size: 1.2rem;
              font-weight: bold;
            }
          }

          div.othercomments {
            font-size: 1rem;
            color: #999;
            width: 60px;
          }
        }

        hr {
          border: 2px solid #111;
          background: #111;
          width: 2px;
          height: 80px;
          border-radius: 2px;
          margin-right: 20px;
          margin-left: 55px;
        }

        div.commenttext {
          font-size: 1.2rem;
          text-align: justify;
          display: flex;
          word-wrap: break-word;
          word-break: break-all;
        }
      }
      input {
        display: flex;
        justify-content: center;
        width: 100%;
        height: 100%;
        max-width: 140px;
        max-height: 20px;
        border: none;
        background: #ff7418;
        color: #fff;
        align-items: center;
        margin: 20px auto 25px;

        &:hover {
          background: ${darken(0.03, '#ff7418')};
        }

        &:active {
          background: ${darken(0.09, '#ff7418')};
        }
      }
    }
    div.loading {
      display: flex;
      justify-content: center;
      margin-top: 100px;
      font-size: 1.6rem;

      svg {
        animation: ${rotate} 2s linear infinite;
        margin-right: 2rem;
      }
    }
  }
`;

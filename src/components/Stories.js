import React, { useEffect, useState } from 'react';
import axios from 'axios';

import { FaSpinner } from 'react-icons/fa';
import hnLogo from '../assets/images/hacker-news-logo-png-15-transparent.png';
import score from '../assets/images/score.svg';
import commentImg from '../assets/images/comment.svg';
import link from '../assets/images/link.svg';

import { Container } from './styles';

export default function Stories() {
  const [topStories, setTopStories] = useState([]);
  const [stories, setStories] = useState([]);
  const [comments, setComments] = useState({});

  // This test was a real challenge, I could learn few things and improve others
  // but I should assume that I would love to use https://hn.algolia.com/api instead of this one
  // one single api call per story that comes with all commentaries

  // Fetch topstories only
  // I have used fetch here to show that I can work with .then().then().etc to show results, instead the async/await
  // Since I prefer to use async/await, the sugar option, I have only used fetch here
  useEffect(() => {
    // Fetching the first topstories from hackernews
    fetch('https://hacker-news.firebaseio.com/v0/topstories.json').then(
      response =>
        response.json().then(data => {
          const ids = data.slice(0, 10); // Slicing the first 10 stories right here to avoid more code lines
          const storiesUrl = [];
          // Already transforming the topstories ids into usable urls
          ids.forEach(id =>
            storiesUrl.push(
              `https://hacker-news.firebaseio.com/v0/item/${id}.json`
            )
          );

          // setting Top url stories to be used later
          setTopStories(storiesUrl);
        })
    );
  }, []);

  // the functions below uses async/await to get comments and stories and I kept using it
  // to follow a pattern.
  useEffect(() => {
    // Function to get hackernews stories comments.
    const fetchComments = async comment => {
      // console.log(`Fetching comment ${comment}`); // left it here for future testing purpose
      const CommentInfo = await axios(comment); // Used axios here to do API call to get story's comments from hackernews.
      // const ctype = CommentInfo.headers['content-type'];

      if (!CommentInfo.data) {
        return {
          by: 'Deleted',
          id: 'Deleted',
          commentOfComment: {},
          parent: 'Deleted',
          text: 'Deleted',
        };
      }

      return {
        by: CommentInfo.data.by || 'Deleted',
        id: CommentInfo.data.id || '',
        commentOfComment: CommentInfo.data.kids || '',
        parent: CommentInfo.data.parent || '',
        text: CommentInfo.data.text || '',
      };
    };

    // Function to fetch hackernews stories.
    const fetchStories = async story => {
      // console.log(`Fetching story ${story}`); // left it here for future testing purpose
      const storiesInfo = await axios(story); // Used axios here to do API call to get stories info from hackernews.

      // Transform the comments ids into real urls
      // Same thing as previous, since it is an array of ids I have to turn them into an url and I have used array.forEach instead of ForOf/ForEach itself.
      const commentsIds = storiesInfo.data.kids;
      const commentsUrl = [];
      // Sometimes we don't have comments on stories, that is why I check before if commentIds exists and if it's really an Array
      if (commentsIds && commentsIds.constructor === Array) {
        commentsIds.forEach(id =>
          commentsUrl.push(
            `https://hacker-news.firebaseio.com/v0/item/${id}.json`
          )
        );
      }

      const request = commentsUrl.map(comment =>
        fetchComments(comment).then(comment2 => {
          return comment2;
        })
      );

      // Collecting all comments and slice it in max 20 as requested
      const realComments = await Promise.all(request.slice(0, 20));

      return {
        by: storiesInfo.data.by,
        id: storiesInfo.data.id,
        comments: realComments || '', // append real comments or empty value
        score: storiesInfo.data.score,
        time: storiesInfo.data.time,
        title: storiesInfo.data.title,
        type: storiesInfo.data.type,
        url: storiesInfo.data.url,
      };
    };

    // Iterates all stories and returns all stories.
    const getStories = async getStory => {
      const requests = getStory.map(story =>
        fetchStories(story).then(story2 => {
          return story2; // Returns the story info.
        })
      );
      // normally we are supposed to use await here before the promise but since it's a return it become redundant
      return Promise.all(requests); // Waiting for all the requests to get resolved.
    };

    getStories(topStories).then(a => {
      setStories(a);
    });
  }, [topStories]);

  // function to count stories number
  let count = 0;
  const counter = () => {
    count += 1;
    return count;
  };

  // function to open and close comments on screen individually
  const toggleComment = id => {
    setComments(prev =>
      !prev[id] ? { ...prev, [id]: true } : { ...prev, [id]: false }
    );
  };

  return (
    <>
      <Container>
        <div className="logo">
          <div className="frame">
            <img src={hnLogo} alt="HnLogo" />
          </div>
        </div>
        <div className="mainContent">
          {stories && stories.length > 0 ? (
            stories.map(story => (
              <div className="content" key={`${story.id}a`}>
                <div className="headline">
                  <div className="count">{counter()}</div>
                  <div className="story">
                    <div className="titlelink">
                      <div
                        tabIndex="0"
                        role="button"
                        className="title"
                        onClick={() => toggleComment(story.id)}
                        onKeyDown={() => toggleComment(story.id)}
                      >
                        {story.title}
                      </div>
                      <div className="link">
                        <a
                          href={story.url}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          &nbsp; <img src={link} alt={story.url} />
                        </a>
                      </div>
                    </div>
                    <div className="author">
                      <p className="time">Some time ago - by&nbsp;</p>
                      <p className="author">{story.by}</p>
                    </div>
                  </div>
                  <div className="storyStatus">
                    <div className="rate">
                      <img src={score} alt="" /> {story.score}&nbsp;
                    </div>
                    <div className="totalComments">
                      <img src={commentImg} alt="" /> {story.comments.length}
                    </div>
                  </div>
                </div>
                <hr />
                {comments[story.id]
                  ? story.comments &&
                    story.comments.length > 0 &&
                    story.comments.map(comment => (
                      <div className="comments" key={comment.id}>
                        <div className="autinfo">
                          <div className="commentby">
                            <p className="by">by&nbsp;</p>
                            <p className="commauthor">{comment.by}</p>
                          </div>
                          <div className="othercomments">
                            Comments:
                            {comment && comment.commentOfComment === Array
                              ? comment.commentOfComment.length
                              : 0}
                          </div>
                        </div>
                        <hr />
                        <div className="commenttext">{comment.text}</div>
                      </div>
                    ))
                  : null}
                {comments[story.id] ? (
                  // This button is only shown when we open the comments
                  <input
                    name="Comment"
                    type="button"
                    value="Close Comments"
                    onClick={() => toggleComment(story.id)}
                  />
                ) : null}
              </div>
            ))
          ) : (
            // add some sort of loading img that spin
            <div className="loading">
              <FaSpinner color="#333" size={20} /> Loading...
            </div>
          )}
        </div>
      </Container>
    </>
  );
}

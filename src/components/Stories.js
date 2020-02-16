import React, { useEffect, useState } from 'react';
import axios from 'axios';

// import Comments from './Comments';

// import { Container } from './styles';

export default function Stories() {
  const [topStories, setTopStories] = useState([]);
  const [stories, setStories] = useState([]);

  // useEffect to fetch topstories only
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

  // this second useEffect is to GET top Stories
  useEffect(() => {
    // Function to fetch hackernews stories comments. (thanks god I made it)
    const fetchComments = async comment => {
      console.log(`Fetching comment ${comment}`);
      const CommentInfo = await axios(comment); // API call to get stories info from hackernews.
      return {
        by: CommentInfo.data.by,
        id: CommentInfo.data.id,
        commentOfComment: CommentInfo.data.kids || '',
        parent: CommentInfo.data.parent,
        text: CommentInfo.data.text,
      };
    };

    // Function to fetch hackernews stories. (thanks god I made it)
    const fetchStories = async story => {
      console.log(`Fetching story ${story}`);
      const storiesInfo = await axios(story); // API call to get stories info from hackernews.

      // Transform the comments ids into real urls
      const commentsIds = storiesInfo.data.kids;
      const commentsUrl = [];
      if (commentsIds && commentsIds.constructor === Array) {
        commentsIds.forEach(id =>
          commentsUrl.push(
            `https://hacker-news.firebaseio.com/v0/item/${id}.json`
          )
        );
      }
      console.log(commentsUrl);

      const request = commentsUrl.map(comment =>
        fetchComments(comment).then(comment2 => {
          return comment2;
        })
      );

      const promises = await Promise.all(request.slice(0, 20));
      const realComments = promises;
      console.log(realComments);

      return {
        by: storiesInfo.data.by,
        id: storiesInfo.data.id,
        comments: realComments || '', // append real urls instead just ids (next step is to append real comments)
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
      return Promise.all(requests); // Waiting for all the requests to get resolved.
    };

    getStories(topStories).then(a => {
      setStories(a);
    });
  }, [topStories]);

  return (
    <>
      <ul>
        {console.log(stories)}
        {stories &&
          stories.length > 0 &&
          stories.map(story => (
            <div key={story.id}>
              {story.title}
              {story.comments &&
                story.comments.length > 0 &&
                story.comments.map(comment => (
                  <div key={comment.id}>{comment.text}</div>
                ))}
            </div>
          ))}
      </ul>
    </>
  );
}

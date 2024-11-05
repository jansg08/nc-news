import { useEffect, useState } from "react";
import { apiClient } from "../utils/apiClient";

export const CommentCard = ({ comment }) => {
  const { body, author, votes } = comment;
  const [commenter, setCommenter] = useState({});
  useEffect(() => {
    apiClient
      .get(`/users/${author}`)
      .then(({ data }) => setCommenter(data.user));
  }, []);
  return (
    <li>
      <div>
        <img src={commenter.avatar_url} className="avatar avatar-small" />
        <span>{author}</span>
        <span>Votes: {votes}</span>
      </div>
      {body}
    </li>
  );
};

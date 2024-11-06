import { commentCard, commentHeader } from "../styles/CommentCard.module.css";

export const CommentCard = ({ comment, author }) => {
  const { body, votes } = comment;
  return (
    <li className={commentCard}>
      <div className={commentHeader}>
        <img src={author?.avatar_url} className="avatar avatar-small" />
        <span>{author?.username}</span>
        <span>Votes: {votes}</span>
      </div>
      {body}
    </li>
  );
};

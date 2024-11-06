import { commentCard, commentHeader } from "../styles/CommentCard.module.css";

export const CommentCard = ({ comment, author, authorAvatar }) => {
  const { body, votes } = comment;
  return (
    <li className={commentCard}>
      <div className={commentHeader}>
        <img src={authorAvatar} className="avatar avatar-small" />
        <span>{author}</span>
        <span>Votes: {votes}</span>
      </div>
      {body}
    </li>
  );
};

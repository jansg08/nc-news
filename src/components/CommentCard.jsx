import { commentCard, commentHeader } from "../styles/CommentCard.module.css";
import { submitButton } from "../styles/AddComment.module.css";
import { useState } from "react";
import { apiClient } from "../utils/apiClient";

export const CommentCard = ({ comment, author, authorAvatar }) => {
  const [deletedStatus, setDeletedStatus] = useState(2);
  const { body, votes } = comment;
  const handleDelete = () => {
    setDeletedStatus(1);
    apiClient.delete(`/comments/${comment.comment_id}`).then(() => {
      setDeletedStatus(0);
      setTimeout(() => setDeletedStatus(-1), 5000);
    });
  };

  if (deletedStatus > 0) {
    return (
      <li className={commentCard}>
        <div className={commentHeader}>
          <img src={authorAvatar} className="avatar avatar-small" />
          <span>{author}</span>
          {author === "You" && (
            <button
              disabled={deletedStatus === -1}
              onClick={handleDelete}
              className={submitButton}
            >
              {deletedStatus === 2 ? "Delete" : "Deleting"}
            </button>
          )}
          <span>Votes: {votes}</span>
        </div>
        {body}
      </li>
    );
  } else if (!deletedStatus) {
    return (
      <li className="commentCard">
        <p>Comment deleted. This message will disappear automatically</p>
      </li>
    );
  }
};

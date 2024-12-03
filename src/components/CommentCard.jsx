import {
  commentCard,
  commentHeader,
  commentCard_deleted,
  commentHeader_deleted,
} from "../styles/CommentCard.module.css";
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
      setTimeout(() => setDeletedStatus(-1), 4000);
    });
  };

  if (deletedStatus > -1) {
    return (
      <li
        className={`${commentCard} ${deletedStatus < 1 && commentCard_deleted}`}
      >
        <div
          className={`${commentHeader} ${
            deletedStatus < 2 && commentHeader_deleted
          }`}
        >
          <img src={authorAvatar} className="avatar avatar-small" />
          <span>{author}</span>
          {author === "You" && (
            <button
              disabled={deletedStatus < 2}
              onClick={handleDelete}
              className={submitButton}
            >
              {deletedStatus === 2 ? "Delete" : "Deleting"}
            </button>
          )}
          <span>Votes: {votes}</span>
        </div>
        {deletedStatus > 0
          ? body
          : "Comment deleted. This message will disappear shortly."}
      </li>
    );
  }
};

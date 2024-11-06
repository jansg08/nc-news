import { useState } from "react";
import { commentCard, commentHeader } from "../styles/CommentCard.module.css";
import { apiClient } from "../utils/apiClient";

export const AddComment = ({
  user,
  handleSubmit,
  commentInput,
  setCommentInput,
  posting,
}) => {
  return (
    <li>
      <form onSubmit={handleSubmit} className={commentCard}>
        <div className={commentHeader}>
          <img src={user.avatar_url} className="avatar avatar-small" />
          <span>You</span>
          <button disabled={posting} type="submit">
            Post
          </button>
        </div>
        <textarea
          value={commentInput}
          onChange={(e) => setCommentInput(e.target.value)}
          placeholder="Have your say..."
        />
      </form>
    </li>
  );
};

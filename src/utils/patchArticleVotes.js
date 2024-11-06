import { apiClient } from "./apiClient";

export const patchArticleVotes = (id, inc_votes, setHasVoted, setVotes) => {
  return apiClient.patch(`/articles/${id}`, { inc_votes }).catch(() => {
    setHasVoted((currHasVoted) => {
      return currHasVoted - inc_votes;
    });
    setVotes((currVotes) => currVotes - inc_votes);
  });
};

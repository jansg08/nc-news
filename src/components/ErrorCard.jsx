import { container } from "../styles/Loading.module.css";
import { errorCode } from "../styles/ErrorCard.module.css";

export const ErrorCard = ({ error = "Sorry!", problem }) => {
  let gif;
  let msg;
  switch (error) {
    case "404":
      gif = (
        <iframe
          src="https://giphy.com/embed/sU511xfb7ORqw"
          style={{ border: "none", height: "160px" }}
        ></iframe>
      );
      msg = `Sorry, the requested ${problem} could not be found, please double check the url or search parameters.`;
      break;
    case "400":
      gif = (
        <iframe
          src="https://giphy.com/embed/pKBZfGcYcgzrG"
          style={{ border: "none", height: "160px" }}
        ></iframe>
      );
      msg =
        "Sorry, there was an issue with this request, if you just filled in a form, please double check the details and retry the request.";
      break;
    case "Timeout":
      gif = (
        <iframe
          src="https://giphy.com/embed/CZGcUfnAy3ayJw2eZX"
          style={{ border: "none", height: "160px" }}
        ></iframe>
      );
      msg =
        "Sorry, the server was unable to respond in time. This issue can usually be fixed by making the request again in 30s to a minute.";
      break;
  }
  return (
    <div className={container}>
      <h2 className={errorCode}>{error}</h2>
      <div>{gif}</div>
      <p>{msg}</p>
    </div>
  );
};

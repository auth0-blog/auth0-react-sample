import React, { useState } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import { callApi, callSecureApi } from "../utils/http-calls.utils";

interface Message {
  id: number;
  subject: string;
  body: string;
}

interface MessageBoxProps {
  message: Message;
}

const MessageBox: React.FC<MessageBoxProps> = ({ message }) => {
  return (
    <div>
      <h4>{message.subject}</h4>
      <p>{message.body}</p>
    </div>
  );
};

interface MessageCallConfig {
  url: string;
  token?: string;
  secure?: boolean;
}

const ExternalApi: React.FC = () => {
  const [messages, setMessages] = useState<Message[] | undefined>(undefined);
  const [message, setMessage] = useState<Message | undefined>(undefined);
  const [error, setError] = useState<string | undefined>(undefined);
  const [messageId, setMessageId] = useState<string | undefined>(undefined);

  const serverUrl = process.env.REACT_APP_SERVER_URL;

  const { getAccessTokenSilently } = useAuth0();

  const onMessageIdChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setMessageId(event.target.value);
  };

  const getAllMessagesHelper = async (config: MessageCallConfig) => {
    const { url, secure, token } = config;

    if (secure && !token) {
      setMessages(undefined);
      setError("access token not defined");
      return;
    }

    try {
      let data;

      if (secure && token) {
        data = await callSecureApi(url, token);
      }

      if (!secure) {
        data = await callApi(url);
      }

      console.log(data);

      setError(undefined);
      setMessages(data);
    } catch (e) {
      setMessages([]);
      setError(e.message);
    }
  };

  const getMessageHelper = async (config: MessageCallConfig) => {
    const { url, secure, token } = config;

    if (secure && !token) {
      setMessage(undefined);
      setError("access token not defined");
      return;
    }

    try {
      let data;

      if (secure && token) {
        data = await callSecureApi(url, token);
      }

      if (!secure) {
        data = await callApi(url);
      }

      console.log(data);

      setError(undefined);
      setMessage(data);
    } catch (e) {
      setMessage(undefined);
      setError(e.message);
    }
  };

  const getAllPublicMessages = async () => {
    const url = `${serverUrl}/api/messages/public`;
    await getAllMessagesHelper({ url });
  };

  const getPublicMessage = async () => {
    const url = `${serverUrl}/api/messages/public/${messageId || undefined}`;
    await getMessageHelper({ url });
  };

  const getAllPrivateMessages = async () => {
    const url = `${serverUrl}/api/messages/private`;
    const token = await getAccessTokenSilently();

    await getAllMessagesHelper({ url, secure: true, token });
  };

  const getPrivateMessage = async () => {
    const url = `${serverUrl}/api/messages/private/${messageId}`;
    const token = await getAccessTokenSilently();

    await getMessageHelper({ url, secure: true, token });
  };

  if (!serverUrl) {
    return null;
  }

  return (
    <div className="container">
      <h1>External API</h1>
      <p>
        Use these buttons to call an external API. The protected API call has an
        access token in its authorization header. The API server will validate
        the access token using the Auth0 Audience value.
      </p>
      <h2>Get All Messages</h2>
      <div
        className="btn-group mt-3"
        role="group"
        aria-label="External API Requests Examples"
      >
        <button
          type="button"
          className="btn btn-primary"
          onClick={getAllPublicMessages}
        >
          Get Public Messages
        </button>
        <button
          type="button"
          className="btn btn-primary"
          onClick={getAllPrivateMessages}
        >
          Get Protected Messages
        </button>
      </div>
      <div className="mt-5 mb-5">
        <div className="container-fluid">
          <div className="column">
            {messages &&
              messages.map((message) => (
                <MessageBox key={message.id} message={message} />
              ))}
          </div>
        </div>
      </div>
      <div className="mb-5">
        <h2>Get Message by ID</h2>
        <div className="form-group mt-3">
          <label htmlFor="exampleInputEmail1">Message ID</label>
          <input
            type="text"
            className="form-control"
            id="message-id"
            aria-describedby="getMessage"
            placeholder="Enter message ID"
            onChange={onMessageIdChange}
          />
        </div>
        <div
          className="btn-group mt-3"
          role="group"
          aria-label="External API Requests Examples"
        >
          <button
            type="button"
            className="btn btn-primary"
            onClick={getPublicMessage}
          >
            Get Public Message
          </button>
          <button
            type="button"
            className="btn btn-primary"
            onClick={getPrivateMessage}
          >
            Get Protected Message
          </button>
        </div>
        {
          <div className="mt-5">
            <div className="container-fluid">
              <div className="column">
                {message && <MessageBox key={message.id} message={message} />}
                {error}
              </div>
            </div>
          </div>
        }
      </div>
    </div>
  );
};

export default ExternalApi;

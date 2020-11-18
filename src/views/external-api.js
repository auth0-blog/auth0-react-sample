import React, { useState } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import { HasAccessRole } from "../auth/has-access-role";

const ExternalApi = () => {
  const [message, setMessage] = useState("");
  const serverUrl = process.env.REACT_APP_SERVER_URL;

  const { getAccessTokenSilently } = useAuth0();

  const callApiHelper = async (config) => {
    const { url, secure, options } = config;

    let fetchOptions = { ...options };

    if (secure) {
      const token = await getAccessTokenSilently();

      fetchOptions = {
        ...fetchOptions,
        headers: {
          ...fetchOptions.headers,
          Authorization: `Bearer ${token}`,
        },
      };
    }
    const response = await fetch(url, fetchOptions);

    const responseData = await response.json();

    if (response.ok) {
      return responseData;
    }

    if (!response.ok) {
      return null;
    }
  };

  const callApi = async (config) => {
    try {
      const response = await callApiHelper(config);

      if (!response) {
        setMessage(response);
      }

      if (response.message) {
        setMessage(response.message);
      }
    } catch (error) {
      setMessage(error.message);
    }
  };

  return (
    <div className="container">
      <h1>External API</h1>
      <p>
        Use these buttons to call an external API. The protected API call has an
        access token in its authorization header. The API server will validate
        the access token using the Auth0 Audience value.
      </p>
      <div
        className="btn-group mt-5"
        role="group"
        aria-label="External API Requests Examples"
      >
        <button
          type="button"
          className="btn btn-primary"
          onClick={() =>
            callApi({
              url: `${serverUrl}/api/messages/public-message`,
            })
          }
        >
          Get Public Message
        </button>
        <button
          type="button"
          className="btn btn-primary"
          onClick={() =>
            callApi({
              url: `${serverUrl}/api/messages/protected-message`,
              secure: true,
            })
          }
        >
          Get Protected Message
        </button>
        <HasAccessRole
          requiredRoles={["messages-admin"]}
          grantComponent={
            <button
              type="button"
              className="btn btn-success"
              onClick={() =>
                callApi({
                  url: `${serverUrl}/api/messages/admin-message`,
                  secure: true,
                })
              }
            >
              Get Admin Message
            </button>
          }
        />
      </div>
      {message && (
        <div className="mt-5">
          <h6 className="muted">Result</h6>
          <div className="container-fluid">
            <div className="row">
              <code className="col-12 text-light bg-dark p-4">{message}</code>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ExternalApi;

import React, { ComponentClass, FunctionComponent } from "react";
import { Route, RouteProps } from "react-router-dom";
import { withAuthenticationRequired } from "@auth0/auth0-react";
import { Loader } from "../components";

interface ProtectedRouteProps extends RouteProps {
  component: ComponentClass<any, any> | FunctionComponent<any>;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({
  component,
  ...args
}) => (
  <Route
    component={withAuthenticationRequired(component, {
      onRedirecting: () => <Loader />,
    })}
    {...args}
  />
);

export default ProtectedRoute;

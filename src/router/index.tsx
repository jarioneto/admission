import { HashRouter, Redirect, Route, Switch } from "react-router-dom";
import routes from "./routes";
import DashboardPage from "~/pages/Dashboard";
import CreateAdmission from "~/pages/CreateAdmission";

const Router = () => {
  return (
    <div style={{ marginTop: 64 }}>
      <HashRouter>
        <Switch>
          <Route exact path={routes.dashboard} component={DashboardPage} />
          <Route exact path={routes.createAdmission} component={CreateAdmission} />

          <Route exact path="*">
            <Redirect to={routes.dashboard} />
          </Route>
        </Switch>
      </HashRouter>
    </div>
  );
};

export default Router;

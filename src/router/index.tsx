import React, { Suspense } from 'react';
import { HashRouter, Redirect, Route, Switch } from 'react-router-dom';
import routes from './routes';
import { PageLoader } from '~/components/Loader';

const DashboardPage = React.lazy(() => import('~/pages/Dashboard'));
const CreateAdmissionPage = React.lazy(() => import('~/pages/CreateAdmission'));

/* -------------------------------------------------------------------------------------------------
 * LazyRoute
 * -----------------------------------------------------------------------------------------------*/
interface LazyRouteProps {
  children?: React.ReactNode;
}

const LazyRoute = ({ children }: LazyRouteProps): JSX.Element => {
  return <Suspense fallback={<PageLoader />}>{children}</Suspense>;
};

/* -------------------------------------------------------------------------------------------------
 * Router
 * -----------------------------------------------------------------------------------------------*/

const Router = (): JSX.Element => {
  return (
    <div style={{ marginTop: 64 }}>
      <HashRouter>
        <Switch>
          <Route
            exact
            path={routes.dashboard}
            component={() => (
              <LazyRoute>
                <DashboardPage />
              </LazyRoute>
            )}
          />
          <Route
            exact
            path={routes.createAdmission}
            component={() => (
              <LazyRoute>
                <CreateAdmissionPage />
              </LazyRoute>
            )}
          />

          <Route exact path="*">
            <Redirect to={routes.dashboard} />
          </Route>
        </Switch>
      </HashRouter>
    </div>
  );
};

export default Router;

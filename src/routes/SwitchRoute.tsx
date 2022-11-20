import { Suspense } from "react";
import { Route, Routes } from "react-router";

import WithRedirect from "HOC/withRedirect";
import routeList from "./routeList";
import Loading from "components/common/Loading";

function SwitchRoute() {
  return (
    <Suspense fallback={<Loading />}>
      <Routes>
        {routeList.map((item) => (
          <Route key={item.path} path={item.path} element={item.element}>
            {!!item.subRoute &&
              item.subRoute.map((subItem) => (
                <Route
                  key={subItem.path}
                  path={subItem.path}
                  element={subItem.element}
                >
                  {!!subItem.subRoute &&
                    subItem.subRoute.map((endItem) => (
                      <Route
                        key={endItem.path}
                        path={endItem.path}
                        element={endItem.element}
                      />
                    ))}
                </Route>
              ))}
          </Route>
        ))}
      </Routes>
    </Suspense>
  );
}

// export default SwitchRoute;
export default WithRedirect(SwitchRoute);

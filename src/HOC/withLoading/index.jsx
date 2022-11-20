import React from "react";

import Loading from "components/common/Loading";
import { useAppSelector } from "redux/hooks";

const WithLoading = (WrappedComponent) => {
  const Component = (props) => {
    const isLoading = useAppSelector((state) => state.Common.loading);

    return (
      <React.Fragment>
        {isLoading && <Loading />}
        <WrappedComponent {...props} />
      </React.Fragment>
    );
  };
  return Component;
};

export default WithLoading;

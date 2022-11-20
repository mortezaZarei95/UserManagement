import React from "react";
import { useNavigate } from "react-router";

import { setRedirect } from "redux/Common/slice";
import { useAppDispatch, useAppSelector } from "redux/hooks";

const WithRedirect = (WrappedComponent) => {
  const Component = (props) => {
    const navigate = useNavigate();

    const dispatch = useAppDispatch();
    const redirectStateStore = useAppSelector(
      (state) => state.Common.redirectState
    );
    const redirectURLStore = useAppSelector(
      (state) => state.Common.redirectURL
    );

    React.useEffect(() => {
      if (redirectStateStore) {
        navigate(redirectURLStore);
        setTimeout(() => {
          dispatch(setRedirect(false, ""));
        }, 500);
      }
    }, [redirectStateStore, redirectURLStore]);
    return <WrappedComponent {...props} />;
  };
  return Component;
};

export default WithRedirect;

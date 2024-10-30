import {$t} from "locale/index";
import React, { useEffect } from "react";
import Container from "./Container";
import type { RouteComponentProps } from "react-router-dom";
import { Spinner } from "@appsmith/ads";
import * as Sentry from "@sentry/react";
import { EMAIL_VERIFICATION_PATH } from "ee/constants/ApiConstants";
import { Redirect } from "react-router-dom";
import { VerificationErrorType } from "./VerificationError";

const VerifyUser = (
  props: RouteComponentProps<{
    email: string;
    token: string;
    redirectUrl: string;
  }>,
) => {
  const queryParams = new URLSearchParams(props.location.search);

  const token = queryParams.get("token");
  const email = queryParams.get("email");

  useEffect(() => {
    if (!token || !email) {
      Sentry.captureMessage($t('VerifyUser.dd2ce6ef087f2a9d'));
    }

    const formElement: HTMLFormElement = document.getElementById(
      "verification-form",
    ) as HTMLFormElement;

    formElement && formElement.submit();
  }, [token, email]);

  const submitUrl = new URL(
    `/api/v1/` + EMAIL_VERIFICATION_PATH,
    window.location.origin,
  ).toString();

  if (!token || !email) {
    return (
      <Redirect
        to={`/user/verify-error?code=${VerificationErrorType.MISMATCH}`}
      />
    );
  }

  return (
    <Container title={$t('VerifyUser.d1f57bb87913e87d')}>
      <form action={submitUrl} id="verification-form" method="POST">
        {Array.from(queryParams.entries()).map((param) => {
          return (
            <input
              key={param[0]}
              name={param[0]}
              type="hidden"
              value={param[1]}
            />
          );
        })}
      </form>
      <Spinner size="lg" />
    </Container>
  );
};

export default VerifyUser;

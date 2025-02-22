import {$t} from "locale/index";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import DebuggerTabs from "./DebuggerTabs";
import { setErrorCount } from "actions/debuggerActions";
import { getMessageCount, showDebuggerFlag } from "selectors/debuggerSelectors";
import { Button, Tooltip } from "@appsmith/ads";
import useDebuggerTriggerClick from "./hooks/useDebuggerTriggerClick";

function Debugger() {
  // Debugger render flag
  const showDebugger = useSelector(showDebuggerFlag);

  return showDebugger ? <DebuggerTabs /> : null;
}

export function DebuggerTrigger() {
  const dispatch = useDispatch();
  const messageCounters = useSelector(getMessageCount);

  useEffect(() => {
    dispatch(setErrorCount(messageCounters.errors));
  });

  const onClick = useDebuggerTriggerClick();

  //tooltip will always show error count as we are opening error tab on click of debugger.
  const tooltipContent =
    messageCounters.errors !== 0
      ? `View details for ${messageCounters.errors} ${
          messageCounters.errors > 1 ? "errors" : "error"
        }`
      : $t('index.017ff7f4c3f03d06');

  return (
    <Tooltip content={tooltipContent}>
      <Button
        className="t--debugger-count"
        kind={messageCounters.errors > 0 ? "error" : "tertiary"}
        onClick={onClick}
        size="md"
        startIcon={
          messageCounters.errors ? "close-circle" : "close-circle-line"
        }
      >
        {messageCounters.errors > 99 ? "99+" : messageCounters.errors}
      </Button>
    </Tooltip>
  );
}

export default Debugger;

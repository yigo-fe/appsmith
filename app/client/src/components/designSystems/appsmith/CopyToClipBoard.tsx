import {$t} from "locale/index";
import React, { createRef, useState } from "react";
import styled from "styled-components";
import copy from "copy-to-clipboard";
import { BaseTextInput } from "components/designSystems/appsmith/TextInputComponent";
import { BaseButton } from "./BaseButton";

const Wrapper = styled.div`
  display: flex;

  div {
    flex-basis: calc(100% - 90px);
  }
  input:disabled {
    color: #555;
  }
  button {
    flex-basis: 80px;
    margin-left: 10px;
  }
`;

// TODO: Fix this the next time the file is edited
// eslint-disable-next-line @typescript-eslint/no-explicit-any
function CopyToClipboard(props: any) {
  const { copyText } = props;
  const copyURLInput = createRef<HTMLInputElement>();
  const [isCopied, setIsCopied] = useState(false);

  const copyToClipboard = (url: string) => {
    copy(url);
    setIsCopied(true);
    setTimeout(() => {
      setIsCopied(false);
    }, 3000);
  };

  const selectText = () => {
    if (copyURLInput.current) {
      copyURLInput.current.setSelectionRange(0, copyText.length);
    }
  };

  return (
    <Wrapper>
      <BaseTextInput
        defaultValue={copyText}
        disabled
        fill
        onChange={() => {
          selectText();
        }}
      />

      <BaseButton
        onClick={() => {
          copyToClipboard(copyText);
        }}
        text={isCopied ? $t('CopyToClipBoard.6aa1a263517ebe2c') : $t('CopyToClipBoard.f26accae17d38afa')}
      />
    </Wrapper>
  );
}

export default CopyToClipboard;

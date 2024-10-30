import {$t} from "locale/index";
import React from "react";
import styled from "styled-components";
import PageContent from "./components/PageContent";
import { Text } from "@appsmith/ads";
import { BackButton } from "components/utils/helperComponents";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  overflow-y: auto;
  height: 100%;
  padding: var(--ads-v2-spaces-7);
`;

const HeadingContainer = styled.div`
  display: flex;
  padding-top: var(--ads-v2-spaces-4);
`;

const Header = styled.div`
  width: 100%;

  > a {
    margin: 0;
  }
`;

function GeneratePage() {
  const isGenerateFormPage = window.location.pathname.includes("/form");
  const heading = isGenerateFormPage ? $t('index.b56339660426855d') : $t('index.1f71671ca775eb60');

  return (
    <Container>
      {isGenerateFormPage ? (
        <Header>
          <BackButton />
        </Header>
      ) : null}

      <HeadingContainer>
        <Text kind="heading-l">{heading}</Text>
      </HeadingContainer>
      {isGenerateFormPage ? (
        <Text renderAs="p">
          Auto create a simple CRUD interface on top of your data
        </Text>
      ) : null}

      <PageContent />
    </Container>
  );
}

export default GeneratePage;

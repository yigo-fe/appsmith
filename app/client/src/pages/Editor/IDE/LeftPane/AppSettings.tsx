import {$t} from "locale/index";
import React from "react";
import AppSettingsPane from "../../AppSettingsPane/AppSettings";
import EditorSettingsPaneContainer from "pages/Editor/commons/EditorSettingsPaneContainer";
const SettingsPane = () => {
  return (
    <EditorSettingsPaneContainer title={$t('AppSettings.7d6fd50166c03fbc')}>
      <AppSettingsPane />
    </EditorSettingsPaneContainer>
  );
};

export default SettingsPane;

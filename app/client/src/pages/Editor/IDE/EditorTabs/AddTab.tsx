import {$t} from "locale/index";
import React from "react";

import { FileTab } from "IDE/Components/FileTab";
import { useCurrentEditorState } from "../hooks";
import {
  EditorEntityTab,
  EditorEntityTabState,
} from "ee/entities/IDE/constants";

const AddTab = ({
  isListActive,
  newTabClickCallback,
  onClose,
}: {
  newTabClickCallback: () => void;
  onClose: (actionId?: string) => void;
  isListActive: boolean;
}) => {
  const { segment, segmentMode } = useCurrentEditorState();

  if (segmentMode !== EditorEntityTabState.Add) return null;

  const onCloseClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    onClose();
  };

  const content = `New ${segment === EditorEntityTab.JS ? "JS" : $t('AddTab.66a19f7a4c3fe8f3')}`;

  return (
    <FileTab
      isActive={segmentMode === EditorEntityTabState.Add && !isListActive}
      onClick={newTabClickCallback}
      onClose={(e) => onCloseClick(e)}
      title={content}
    >
      {content}
    </FileTab>
  );
};

export { AddTab };

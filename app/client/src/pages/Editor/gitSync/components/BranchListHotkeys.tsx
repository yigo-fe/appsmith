import {$t} from "locale/index";
import React from "react";
import { Hotkey, Hotkeys, HotkeysTarget } from "@blueprintjs/core";

interface Props {
  handleUpKey: () => void;
  handleDownKey: () => void;
  handleSubmitKey: () => void;
  handleEscKey: () => void;
  children: React.ReactNode;
}

@HotkeysTarget
class GlobalSearchHotKeys extends React.Component<Props> {
  get hotKeysConfig() {
    return [
      {
        combo: "up",
        onKeyDown: () => {
          this.props.handleUpKey();
        },
        allowInInput: true,
        group: "Branches",
        label: $t('BranchListHotkeys.7f620b6b2321b684'),
      },
      {
        combo: "down",
        onKeyDown: this.props.handleDownKey,
        allowInInput: true,
        group: "Branches",
        label: $t('BranchListHotkeys.27586100323ad36c'),
      },
      {
        combo: "return",
        onKeyDown: this.props.handleSubmitKey,
        allowInInput: true,
        group: "Branches",
        label: $t('BranchListHotkeys.17d6290e88b6800d'),
      },
      {
        combo: "ESC",
        onKeyDown: this.props.handleEscKey,
        allowInInput: true,
        group: "Branches",
        label: "ESC",
      },
    ];
  }

  renderHotkeys() {
    return (
      <Hotkeys>
        {this.hotKeysConfig.map(
          ({ allowInInput, combo, group, label, onKeyDown }, index) => (
            <Hotkey
              allowInInput={allowInInput}
              combo={combo}
              global={false}
              group={group}
              key={index}
              label={label}
              onKeyDown={onKeyDown}
            />
          ),
        )}
      </Hotkeys>
    );
  }

  render() {
    return (
      <div
        style={{
          display: "flex",
          flex: 1,
          flexDirection: "column",
          minHeight: 0,
          overflow: "auto",
        }}
      >
        {this.props.children}
      </div>
    );
  }
}

export default GlobalSearchHotKeys;

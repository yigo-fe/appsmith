import {$t} from "locale/index";
import { Button } from "@appsmith/ads";
import React from "react";

interface Props {
  showSeeLess: boolean;
  hidden: boolean;
  toggleSeeMore: () => void;
}

const SeeMoreButton = (props: Props) => {
  const SEE_MORE_LESS_TEXT = !props.showSeeLess ? $t('SeeMoreButton.1face8aa1cba235a') : $t('SeeMoreButton.2249066fab783391');
  const SEE_MORE_ARROW = !props.showSeeLess ? "down-arrow-2" : "arrow-up-line";

  return (
    <Button
      className="mt-4"
      data-testid="t--explorer-ui-entity-tag-see-more"
      hidden={props.hidden}
      kind="tertiary"
      onClick={() => props.toggleSeeMore()}
      size="md"
      startIcon={SEE_MORE_ARROW}
    >
      {SEE_MORE_LESS_TEXT}
    </Button>
  );
};

export default SeeMoreButton;

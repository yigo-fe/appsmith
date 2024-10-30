import {$t} from "locale/index";
import React from "react";
import styled from "styled-components";

import NoDataImage from "assets/images/no_data.png";

const TableColumnEmptyWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  img {
    width: 156px;
    margin-top: 16px;
  }
  .no-data-title {
    font-weight: 500;
    font-size: 14px;
    line-height: 16px;
    letter-spacing: 0.04em;
    color: #ffffff;
    margin-top: 23px;
  }
`;

function EmptyDataState() {
  return (
    <TableColumnEmptyWrapper>
      <img alt={$t('EmptyDataState.112900fcec2200b6')} src={NoDataImage} />
      <div className="no-data-title">No data found</div>
    </TableColumnEmptyWrapper>
  );
}

export default EmptyDataState;

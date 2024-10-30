import {$t} from "locale/index";
import { CurrencyTypeOptions } from "constants/Currency";
import { countryToFlag } from "./widget/helpers";

const getCurrencyOptions = () => {
  return CurrencyTypeOptions.map((item) => {
    return {
      leftElement: countryToFlag(item.code),
      searchText: item.label,
      label: `${item.currency} - ${item.currency_name}`,
      value: item.currency,
      id: item.symbol_native,
    };
  });
};

export const CurrencyDropdownOptions = getCurrencyOptions();

export const getDefaultCurrency = () => {
  return {
    code: "US",
    currency: "USD",
    currency_name: $t('constants.71f5c09dda04e839'),
    label: $t('constants.3b16f2841dfdce03'),
    phone: "1",
    symbol_native: "$",
  };
};

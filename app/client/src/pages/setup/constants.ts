import {$t} from "locale/index";
export interface OptionType {
  label?: string;
  value?: string;
}

type OptionTypeWithSubtext = OptionType & {
  subtext?: string;
};

export const proficiencyOptions: OptionTypeWithSubtext[] = [
  {
    label: "Brand New",
    subtext: $t('constants.31bf436d093c7418'),
    value: "Brand New",
  },
  {
    label: $t('constants.5daf3403e771f73b'),
    subtext: $t('constants.85647b9dab780e09'),
    value: $t('constants.5daf3403e771f73b'),
  },
  {
    label: $t('constants.fb3a3dfb179860d6'),
    subtext: $t('constants.b42671f5e4373266'),
    value: $t('constants.fb3a3dfb179860d6'),
  },
  {
    label: $t('constants.a482405a59c4c28b'),
    subtext: $t('constants.66c59ba70e68474c'),
    value: $t('constants.a482405a59c4c28b'),
  },
];

export const useCaseOptions: OptionTypeWithSubtext[] = [
  {
    label: $t('constants.3ea6eaa6149a12f4'),
    value: "work project",
  },
  {
    label: $t('constants.cf33bdf272bc0722'),
    value: "personal project",
  },
];

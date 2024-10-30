import {$t} from "locale/index";
import { MapTypes } from "widgets/MapChartWidget/constants";

/*
 * Map of country/region code to the details (short_label, full name).
 *
 * Why we need this?
 *  - We need this data to populate the label and tooltip. These values are not part of the underlying map.
 */
export default {
  [MapTypes.WORLD]: {
    AF: {
      short_label: "AF",
      label: $t('countryDetails.3c8bb7353947fe0d'),
    },
    AS: {
      short_label: "AS",
      label: $t('countryDetails.5039e479311de049'),
    },
    AU: {
      short_label: "AU",
      label: $t('countryDetails.c017cd67f0615acf'),
    },
    EU: {
      short_label: "EU",
      label: $t('countryDetails.437427d93e3ac13a'),
    },
    NA: {
      short_label: "NA",
      label: $t('countryDetails.08d6969fafdb7853'),
    },
    SA: {
      short_label: "SA",
      label: $t('countryDetails.4ee40d86703487af'),
    },
  },
  [MapTypes.WORLD_WITH_ANTARCTICA]: {
    AF: {
      short_label: "AF",
      label: $t('countryDetails.3c8bb7353947fe0d'),
    },
    AT: {
      short_label: "AT",
      label: $t('countryDetails.40e66b3c7a7e91f1'),
    },
    AS: {
      short_label: "AS",
      label: $t('countryDetails.5039e479311de049'),
    },
    AU: {
      short_label: "AU",
      label: $t('countryDetails.c017cd67f0615acf'),
    },
    EU: {
      short_label: "EU",
      label: $t('countryDetails.437427d93e3ac13a'),
    },
    NA: {
      short_label: "NA",
      label: $t('countryDetails.08d6969fafdb7853'),
    },
    SA: {
      short_label: "SA",
      label: $t('countryDetails.4ee40d86703487af'),
    },
  },
  [MapTypes.EUROPE]: {
    "001": {
      short_label: "AL",
      label: $t('countryDetails.9c07c091cbfa3a29'),
    },
    "002": {
      short_label: "AD",
      label: $t('countryDetails.25441a9c7282bb15'),
    },
    "003": {
      short_label: "AT",
      label: $t('countryDetails.4e880f293d3188a7'),
    },
    "004": {
      short_label: "BY",
      label: $t('countryDetails.8bd43ce41efff3a9'),
    },
    "005": {
      short_label: "BE",
      label: $t('countryDetails.79e36f7c37da03ff'),
    },
    "006": {
      short_label: "BA",
      label: $t('countryDetails.fbc4050255d4ecf1'),
    },
    "007": {
      short_label: "BG",
      label: $t('countryDetails.831e5c833c16b006'),
    },
    "008": {
      short_label: "HY",
      label: $t('countryDetails.741796dd5577a242'),
    },
    "044": {
      short_label: "CY",
      label: $t('countryDetails.052d407e4a90a020'),
    },
    "009": {
      short_label: "CZ",
      label: $t('countryDetails.6f57294a72158fe9'),
    },
    "010": {
      short_label: "DK",
      label: $t('countryDetails.1c9240dc04b53554'),
    },
    "011": {
      short_label: "EE",
      label: $t('countryDetails.86f4856e936e54ed'),
    },
    "012": {
      short_label: "FI",
      label: $t('countryDetails.9c51d7bb93e498e9'),
    },
    "013": {
      short_label: "FR",
      label: $t('countryDetails.6bfeab0343b0d630'),
    },
    "014": {
      short_label: "DE",
      label: $t('countryDetails.4a0295ed96b4762d'),
    },
    "015": {
      short_label: "GR",
      label: $t('countryDetails.56a989b5502fab3d'),
    },
    "016": {
      short_label: "HU",
      label: $t('countryDetails.27a3aa47079f0a63'),
    },
    "017": {
      short_label: "IS",
      label: $t('countryDetails.695bdbec4c8c1672'),
    },
    "018": {
      short_label: "IE",
      label: $t('countryDetails.362fa14aa8e483f3'),
    },
    "019": {
      short_label: "IT",
      label: $t('countryDetails.ee55af81065df227'),
    },
    "047": {
      short_label: "KO",
      label: $t('countryDetails.a44490be7a15ea64'),
    },
    "020": {
      short_label: "LV",
      label: $t('countryDetails.698c7c67b41a80f2'),
    },
    "021": {
      short_label: "LI",
      label: "Liechtenstein",
    },
    "022": {
      short_label: "LT",
      label: $t('countryDetails.64a16764db4136c3'),
    },
    "023": {
      short_label: "LU",
      label: $t('countryDetails.8fb57b26f9b46ed8'),
    },
    "024": {
      short_label: "MK",
      label: $t('countryDetails.a9e221b55fd2c2d7'),
    },
    "025": {
      short_label: "MT",
      label: $t('countryDetails.52a3e9951c7986de'),
    },
    "026": {
      short_label: "MD",
      label: $t('countryDetails.c029346dd1f6a2bd'),
    },
    "027": {
      short_label: "MC",
      label: $t('countryDetails.ff1c5e521d54a574'),
    },
    "028": {
      short_label: "MO",
      label: $t('countryDetails.c5fe05427109e15d'),
    },
    "029": {
      short_label: "NL",
      label: $t('countryDetails.35be9ccb67d567a0'),
    },
    "030": {
      short_label: "NO",
      label: $t('countryDetails.acf4f04546d9d68e'),
    },
    "031": {
      short_label: "PL",
      label: $t('countryDetails.6f21cdedb65f4a08'),
    },
    "032": {
      short_label: "PT",
      label: $t('countryDetails.0fca00c192028b97'),
    },
    "033": {
      short_label: "RO",
      label: $t('countryDetails.df42c390be55877f'),
    },
    "046": {
      short_label: "RU",
      label: $t('countryDetails.04bda6d372d29d50'),
    },
    "034": {
      short_label: "SM",
      label: $t('countryDetails.074defea354c5c7d'),
    },
    "035": {
      short_label: "CS",
      label: $t('countryDetails.7c1e899888dddbf5'),
    },
    "036": {
      short_label: "SK",
      label: $t('countryDetails.7355b62a0dcd5e06'),
    },
    "037": {
      short_label: "SL",
      label: $t('countryDetails.81fd3880e20e1090'),
    },
    "038": {
      short_label: "ES",
      label: $t('countryDetails.77621958c59e390a'),
    },
    "039": {
      short_label: "SE",
      label: $t('countryDetails.aaaf141376664b3b'),
    },
    "040": {
      short_label: "CH",
      label: $t('countryDetails.9e904e0a4297ce71'),
    },
    "045": {
      short_label: "TK",
      label: $t('countryDetails.7bdc76e82e8df659'),
    },
    "041": {
      short_label: "UA",
      label: $t('countryDetails.7e0fc2737c855025'),
    },
    "042": {
      short_label: "UK",
      label: $t('countryDetails.ae7ff656b97e962e'),
    },
    "043": {
      short_label: "VA",
      label: $t('countryDetails.709e109f489a6608'),
    },
  },
  [MapTypes.NORTH_AMERICA]: {
    "001": {
      short_label: "AG",
      label: $t('countryDetails.3d3e0402229441d5'),
    },
    "002": {
      short_label: "BS",
      label: $t('countryDetails.34dac33a16a79d84'),
    },
    "003": {
      short_label: "BB",
      label: $t('countryDetails.a6797056f11c9687'),
    },
    "004": {
      short_label: "BZ",
      label: $t('countryDetails.ab9c82d470a20b28'),
    },
    "005": {
      short_label: "CA",
      label: $t('countryDetails.010352bebbf0518a'),
    },
    "026": {
      short_label: "KY",
      label: $t('countryDetails.9180895f18652f9d'),
    },
    "006": {
      short_label: "CR",
      label: $t('countryDetails.2a70f0b7ad473219'),
    },
    "007": {
      short_label: "CU",
      label: $t('countryDetails.d0def81fde9ac0fa'),
    },
    "008": {
      short_label: "DM",
      label: $t('countryDetails.7d29712ef51fc24c'),
    },
    "009": {
      short_label: "DO",
      label: $t('countryDetails.36dfe6bca3adeae8'),
    },
    "010": {
      short_label: "SV",
      label: $t('countryDetails.1ec4c233294e6e72'),
    },
    "024": {
      short_label: "GL",
      label: $t('countryDetails.74148c66a6284ccc'),
    },
    "011": {
      short_label: "GD",
      label: $t('countryDetails.0beb17abc3e18eb7'),
    },
    "012": {
      short_label: "GT",
      label: $t('countryDetails.19d8b8f590ba70be'),
    },
    "013": {
      short_label: "HT",
      label: $t('countryDetails.1b4b79a722201187'),
    },
    "014": {
      short_label: "HN",
      label: $t('countryDetails.d8f89da6ea08ba81'),
    },
    "015": {
      short_label: "JM",
      label: $t('countryDetails.ad9b991dfbf5cbcc'),
    },
    "016": {
      short_label: "MX",
      label: $t('countryDetails.d39dceab813f891c'),
    },
    "017": {
      short_label: "NI",
      label: $t('countryDetails.5c1b7b5a8c06c98c'),
    },
    "018": {
      short_label: "PA",
      label: $t('countryDetails.2ea5d88dca8e06da'),
    },
    "025": {
      short_label: "PR",
      label: $t('countryDetails.cb71543959204723'),
    },
    "019": {
      short_label: "KN",
      label: $t('countryDetails.4e00381a4f90f8e3'),
    },
    "020": {
      short_label: "LC",
      label: $t('countryDetails.edbbad58c06829a5'),
    },
    "021": {
      short_label: "VC",
      label: $t('countryDetails.4bc4f065ffdc5599'),
    },
    "022": {
      short_label: "TT",
      label: $t('countryDetails.69488d856d7acada'),
    },
    "023": {
      short_label: "US",
      label: $t('countryDetails.87b5466548c774bf'),
    },
  },
  [MapTypes.SOURTH_AMERICA]: {
    "001": {
      short_label: "AR",
      label: $t('countryDetails.e48b8965b9c80c74'),
    },
    "002": {
      short_label: "BO",
      label: $t('countryDetails.440340a31d7a2b28'),
    },
    "003": {
      short_label: "BR",
      label: "Brazil",
    },
    "004": {
      short_label: "CL",
      label: $t('countryDetails.a2cf79c00cecec61'),
    },
    "005": {
      short_label: "CO",
      label: $t('countryDetails.d70ed7ce02fff23c'),
    },
    "006": {
      short_label: "EC",
      label: $t('countryDetails.1fbaa3a291868145'),
    },
    "007": {
      short_label: "FK",
      label: $t('countryDetails.8fc0366ac62615b7'),
    },
    "008": {
      short_label: "GF",
      label: $t('countryDetails.d2988ac26c6d8842'),
    },
    "015": {
      short_label: "GI",
      label: $t('countryDetails.5748c5e5e717520e'),
    },
    "009": {
      short_label: "GY",
      label: $t('countryDetails.327f04cc65e97b5b'),
    },
    "010": {
      short_label: "PY",
      label: $t('countryDetails.aecb38d330acd1b6'),
    },
    "011": {
      short_label: "PE",
      label: $t('countryDetails.1f4ff78d74ab0bb3'),
    },
    "016": {
      short_label: "SG",
      label: $t('countryDetails.5a5e9f866baaf79b'),
    },
    "012": {
      short_label: "SR",
      label: $t('countryDetails.4546028fb8e7d0be'),
    },
    "013": {
      short_label: "UY",
      label: $t('countryDetails.97d9ec95ddddd38e'),
    },
    "014": {
      short_label: "VE",
      label: $t('countryDetails.f8c5863cef11eab4'),
    },
  },
  [MapTypes.ASIA]: {
    "001": {
      short_label: "AF",
      label: $t('countryDetails.a8b3a1756d13cd97'),
    },
    "002": {
      short_label: "AM",
      label: $t('countryDetails.2531e278be6dc220'),
    },
    "003": {
      short_label: "AZ",
      label: $t('countryDetails.5fec17b49f62ec9a'),
    },
    "060": {
      short_label: "BA",
      label: $t('countryDetails.c11107734f7bfe5f'),
    },
    "005": {
      short_label: "BD",
      label: $t('countryDetails.e7dd56e4c1ea9ade'),
    },
    "006": {
      short_label: "BT",
      label: $t('countryDetails.cebe2133c37c4dae'),
    },
    "007": {
      short_label: "BN",
      label: "Brunei",
    },
    "008": {
      short_label: "MM",
      label: $t('countryDetails.e0e709b556314293'),
    },
    "009": {
      short_label: "KH",
      label: $t('countryDetails.323b81efbeb56001'),
    },
    "010": {
      short_label: "CN",
      label: $t('countryDetails.3b4f6e046b139863'),
    },
    "012": {
      short_label: "TP",
      label: $t('countryDetails.b9d3f3d80de7c5b0'),
    },
    "013": {
      short_label: "GE",
      label: $t('countryDetails.e986186bbe265596'),
    },
    "050": {
      short_label: "HK",
      label: $t('countryDetails.423d8b80a9aa8ee2'),
    },
    "014": {
      short_label: "IN",
      label: $t('countryDetails.24051e4bec3a17c8'),
    },
    "015": {
      short_label: "ID",
      label: $t('countryDetails.a895510b22edc243'),
    },
    "016": {
      short_label: "IR",
      label: $t('countryDetails.8332fe1c34c8ecfa'),
    },
    "054": {
      short_label: "IZ",
      label: $t('countryDetails.d14ec227ffcd1026'),
    },
    "063": {
      short_label: "IS",
      label: $t('countryDetails.2c92d2b7f20ff5a9'),
    },
    "019": {
      short_label: "JP",
      label: $t('countryDetails.8a6c8d2d79f80dd5'),
    },
    "062": {
      short_label: "JO",
      label: $t('countryDetails.477e21e4d3ba7563'),
    },
    "021": {
      short_label: "KZ",
      label: $t('countryDetails.411b67b34d0c4d02'),
    },
    "022": {
      short_label: "KP",
      label: $t('countryDetails.f510189c23aa1e33'),
    },
    "023": {
      short_label: "KR",
      label: $t('countryDetails.7b43724a603d7aad'),
    },
    "061": {
      short_label: "KU",
      label: $t('countryDetails.500d6d8a81f09196'),
    },
    "025": {
      short_label: "KG",
      label: $t('countryDetails.ab11c0454722aff0'),
    },
    "026": {
      short_label: "LA",
      label: $t('countryDetails.9b8ae74cfeab3d06'),
    },
    "064": {
      short_label: "LE",
      label: $t('countryDetails.23842cfc1f7df2b2'),
    },
    "051": {
      short_label: "MO",
      label: $t('countryDetails.1bb982e49cc6c47b'),
    },
    "028": {
      short_label: "MY",
      label: $t('countryDetails.24722244d0e46bb5'),
    },
    "030": {
      short_label: "MN",
      label: $t('countryDetails.593b5915399d8731'),
    },
    "031": {
      short_label: "NP",
      label: $t('countryDetails.23358236b0cad948'),
    },
    "057": {
      short_label: "MU",
      label: $t('countryDetails.8398940a1987c13c'),
    },
    "033": {
      short_label: "PK",
      label: $t('countryDetails.cf471d91f6a4cc02'),
    },
    "034": {
      short_label: "PH",
      label: $t('countryDetails.e3260ec7c02d80a9'),
    },
    "059": {
      short_label: "QA",
      label: $t('countryDetails.3d78fc42c3aaca24'),
    },
    "036": {
      short_label: "RU",
      label: $t('countryDetails.87fbb8ac11a1960e'),
    },
    "055": {
      short_label: "SA",
      label: $t('countryDetails.bd232652160c6c15'),
    },
    "038": {
      short_label: "SG",
      label: $t('countryDetails.6e1721ebb8258a51'),
    },
    "039": {
      short_label: "LK",
      label: $t('countryDetails.b644ab8f5191e957'),
    },
    "053": {
      short_label: "SY",
      label: $t('countryDetails.57934ce2656d5457'),
    },
    "049": {
      short_label: "TW",
      label: $t('countryDetails.be5f663acf3b15aa'),
    },
    "041": {
      short_label: "TJ",
      label: $t('countryDetails.c11146ba7abdcf9a'),
    },
    "042": {
      short_label: "TH",
      label: $t('countryDetails.32afb9d3ca475d37'),
    },
    "052": {
      short_label: "TU",
      label: $t('countryDetails.7bdc76e82e8df659'),
    },
    "044": {
      short_label: "TM",
      label: "Turkmenistan",
    },
    "058": {
      short_label: "AE",
      label: $t('countryDetails.7c9b097e39a9d025'),
    },
    "046": {
      short_label: "UZ",
      label: $t('countryDetails.0522d7406b6808ab'),
    },
    "047": {
      short_label: "VN",
      label: $t('countryDetails.bccb9969b4735557'),
    },
    "056": {
      short_label: "YM",
      label: $t('countryDetails.48ba7de94e88783e'),
    },
  },
  [MapTypes.OCEANIA]: {
    "001": {
      short_label: "AU",
      label: $t('countryDetails.c017cd67f0615acf'),
    },
    "002": {
      short_label: "FJ",
      label: $t('countryDetails.8d204eabc0f49cf6'),
    },
    "003": {
      short_label: "KI",
      label: $t('countryDetails.e0fd6e30c0dc831a'),
    },
    "004": {
      short_label: "MH",
      label: $t('countryDetails.9ff6740515d9169c'),
    },
    "005": {
      short_label: "FM",
      label: $t('countryDetails.e51fb816962522bb'),
    },
    "006": {
      short_label: "NR",
      label: $t('countryDetails.86ed2ed72ce30eab'),
    },
    "015": {
      short_label: "NC",
      label: $t('countryDetails.0b4c0da80e15019f'),
    },
    "007": {
      short_label: "NZ",
      label: $t('countryDetails.6c37472aa6341bdc'),
    },
    "008": {
      short_label: "PW",
      label: $t('countryDetails.312c75b68884e187'),
    },
    "009": {
      short_label: "PG",
      label: $t('countryDetails.f289d669043f48f5'),
    },
    "010": {
      short_label: "WS",
      label: $t('countryDetails.f66ba3746f1fe7ad'),
    },
    "011": {
      short_label: "SB",
      label: $t('countryDetails.98d9814d8faa94e9'),
    },
    "012": {
      short_label: "TO",
      label: $t('countryDetails.5057fbde351e7b06'),
    },
    "013": {
      short_label: "TV",
      label: $t('countryDetails.f3e7afc0e9270cb5'),
    },
    "014": {
      short_label: "VU",
      label: $t('countryDetails.7f12970a29372e93'),
    },
    "016": {
      short_label: "PC",
      label: $t('countryDetails.c7cacd8d4889f852'),
    },
    "017": {
      short_label: "FP",
      label: $t('countryDetails.27ae1fe71451aac1'),
    },

    "022": {
      short_label: "CO",
      label: $t('countryDetails.1b3483e04cad1447'),
    },
    "018": {
      short_label: "NI",
      label: $t('countryDetails.5069aecac777c432'),
    },
    "019": {
      short_label: "AS",
      label: $t('countryDetails.a992c5058b0f8128'),
    },
    "020": {
      short_label: "GU",
      label: $t('countryDetails.442cbf4cbdf4c2f1'),
    },
    "021": {
      short_label: "NM",
      label: $t('countryDetails.dbee1d2e652186d6'),
    },
  },
  [MapTypes.AFRICA]: {
    "001": {
      short_label: "DZ",
      label: $t('countryDetails.57515e11970c040f'),
    },
    "002": {
      short_label: "AO",
      label: $t('countryDetails.cf24002b8ef3eea9'),
    },
    "003": {
      short_label: "BJ",
      label: $t('countryDetails.cff14f7b2b63f0d3'),
    },
    "004": {
      short_label: "BW",
      label: $t('countryDetails.9f7404e4b5ec5ffd'),
    },
    "005": {
      short_label: "BF",
      label: $t('countryDetails.08afb968e68dbca8'),
    },
    "006": {
      short_label: "BI",
      label: $t('countryDetails.324f0002b1c6422a'),
    },
    "007": {
      short_label: "CM",
      label: $t('countryDetails.d2bfb55f31c0d66b'),
    },
    "059": {
      short_label: "CA",
      label: $t('countryDetails.966c5ba6dcbd0418'),
    },
    "008": {
      short_label: "CV",
      label: "Cape Verde",
    },
    "009": {
      short_label: "CR",
      label: $t('countryDetails.6f802656af8d4db1'),
    },
    "010": {
      short_label: "TD",
      label: $t('countryDetails.902debb12ad4aa41'),
    },
    "057": {
      short_label: "CG",
      label: $t('countryDetails.e4d6145a5af84141'),
    },
    "012": {
      short_label: "CI",
      label: $t('countryDetails.50863c9ee1d8386c'),
    },
    "013": {
      short_label: "CD",
      label: $t('countryDetails.f4d6098834110c7e'),
    },
    "014": {
      short_label: "DJ",
      label: $t('countryDetails.10b0203a2067a236'),
    },
    "015": {
      short_label: "EG",
      label: $t('countryDetails.7ee8c5c9f8226069'),
    },
    "016": {
      short_label: "GQ",
      label: $t('countryDetails.07ba74ef97473833'),
    },
    "017": {
      short_label: "ER",
      label: $t('countryDetails.f1a3b311d4205bb6'),
    },
    "018": {
      short_label: "ET",
      label: $t('countryDetails.8298a97d0948d5b5'),
    },
    "019": {
      short_label: "GA",
      label: $t('countryDetails.1b470de66ef4d689'),
    },
    "056": {
      short_label: "GM",
      label: $t('countryDetails.dc1ce9e31cc5ba79'),
    },
    "020": {
      short_label: "GH",
      label: $t('countryDetails.c3335842fbbdc67c'),
    },
    "021": {
      short_label: "GN",
      label: $t('countryDetails.0c0182616fadc166'),
    },
    "022": {
      short_label: "GW",
      label: "Guinea-Bissau",
    },
    "023": {
      short_label: "KE",
      label: $t('countryDetails.89d9287de25769f7'),
    },
    "024": {
      short_label: "LS",
      label: $t('countryDetails.94dcbe09397fccea'),
    },
    "025": {
      short_label: "LI",
      label: $t('countryDetails.1c72ae62fd7ef89a'),
    },
    "026": {
      short_label: "LR",
      label: $t('countryDetails.ca257dd7cce08a43'),
    },
    "027": {
      short_label: "MG",
      label: $t('countryDetails.649ad0830916c68e'),
    },
    "028": {
      short_label: "MW",
      label: $t('countryDetails.d9f7ece02f93fd6d'),
    },
    "029": {
      short_label: "ML",
      label: $t('countryDetails.aae49e5bf7bac5f3'),
    },
    "030": {
      short_label: "MR",
      label: $t('countryDetails.caaa13485b594b42'),
    },
    "058": {
      short_label: "MU",
      label: $t('countryDetails.adcdba80465b8870'),
    },
    "032": {
      short_label: "MA",
      label: $t('countryDetails.25bcbd4b30081fd2'),
    },
    "033": {
      short_label: "MZ",
      label: $t('countryDetails.67af6c369c0218ef'),
    },
    "034": {
      short_label: "NA",
      label: $t('countryDetails.0072fe29ad8af160'),
    },
    "035": {
      short_label: "NE",
      label: $t('countryDetails.27e1293c2e93eeb2'),
    },
    "036": {
      short_label: "NG",
      label: $t('countryDetails.a39f648157148765'),
    },
    "038": {
      short_label: "RW",
      label: $t('countryDetails.c0f8e5c1a08cb247'),
    },
    "040": {
      short_label: "ST",
      label: $t('countryDetails.864a6434541eece7'),
    },
    "041": {
      short_label: "SN",
      label: $t('countryDetails.4cb271439e148734'),
    },
    "042": {
      short_label: "SY",
      label: $t('countryDetails.5d9850fb098d2811'),
    },
    "043": {
      short_label: "SL",
      label: $t('countryDetails.f1bf8144928d1710'),
    },
    "044": {
      short_label: "SO",
      label: $t('countryDetails.67abad3f9f85ce4f'),
    },
    "045": {
      short_label: "ZA",
      label: $t('countryDetails.bf260b2db3b3bd3b'),
    },
    "060": {
      short_label: "SS",
      label: $t('countryDetails.e549393a2991be20'),
    },
    "046": {
      short_label: "SD",
      label: $t('countryDetails.c2c4c492276f8e90'),
    },
    "047": {
      short_label: "SZ",
      label: $t('countryDetails.61043cb826813a2a'),
    },
    "048": {
      short_label: "TZ",
      label: $t('countryDetails.8391107f95daa4ee'),
    },
    "049": {
      short_label: "TG",
      label: $t('countryDetails.039d569db618c30b'),
    },
    "051": {
      short_label: "TN",
      label: $t('countryDetails.40f8e97e2e69218d'),
    },
    "052": {
      short_label: "UG",
      label: $t('countryDetails.f1e7f10f0b8a4f5a'),
    },
    "011": {
      short_label: "KM",
      label: $t('countryDetails.70651f4b5358002b'),
    },
    "053": {
      short_label: "WS",
      label: $t('countryDetails.40b5cb603bf351b8'),
    },
    "054": {
      short_label: "ZM",
      label: $t('countryDetails.0146e49df2c5bcf5'),
    },
    "055": {
      short_label: "ZW",
      label: $t('countryDetails.9e5e27632f335fe5'),
    },
    "061": {
      short_label: "SL",
      label: $t('countryDetails.e673450ab5b54804'),
    },
    "062": {
      short_label: "BT",
      label: $t('countryDetails.b6507f44810779d5'),
    },
  },
  [MapTypes.USA]: {
    AL: {
      short_label: "AL",
      label: $t('countryDetails.cd638ba26608d3a3'),
    },
    AK: {
      short_label: "AK",
      label: $t('countryDetails.dd390a1abe3fa74c'),
    },
    AZ: {
      short_label: "AZ",
      label: $t('countryDetails.5e3b1c064a641aff'),
    },
    AR: {
      short_label: "AR",
      label: $t('countryDetails.e953df8b3d9d8d2b'),
    },
    CA: {
      short_label: "CA",
      label: $t('countryDetails.65ff931c77bd1de4'),
    },
    CO: {
      short_label: "CO",
      label: $t('countryDetails.3b151972e5710246'),
    },
    CT: {
      short_label: "CT",
      label: $t('countryDetails.a9d76184748756f3'),
    },
    DE: {
      short_label: "DE",
      label: $t('countryDetails.6870503f6899e7a5'),
    },
    DC: {
      short_label: "DC",
      label: $t('countryDetails.35fc9a07254a7700'),
    },
    FL: {
      short_label: "FL",
      label: $t('countryDetails.6edb11c5b7e2bb20'),
    },
    GA: {
      short_label: "GA",
      label: $t('countryDetails.e986186bbe265596'),
    },
    HI: {
      short_label: "HI",
      label: $t('countryDetails.dbdac51e144f32e2'),
    },
    ID: {
      short_label: "ID",
      label: $t('countryDetails.10d138d2198322ed'),
    },
    IL: {
      short_label: "IL",
      label: $t('countryDetails.840669692fc48c7a'),
    },
    IN: {
      short_label: "IN",
      label: $t('countryDetails.325ef05b1f31b125'),
    },
    IA: {
      short_label: "IA",
      label: $t('countryDetails.f3317503898d2196'),
    },
    KS: {
      short_label: "KS",
      label: $t('countryDetails.6d4b042695ef2783'),
    },
    KY: {
      short_label: "KY",
      label: $t('countryDetails.2f17986dbe55985f'),
    },
    LA: {
      short_label: "LA",
      label: $t('countryDetails.7207a3db5e166757'),
    },
    ME: {
      short_label: "ME",
      label: $t('countryDetails.476114a7548c8d2f'),
    },
    MD: {
      short_label: "MD",
      label: $t('countryDetails.a54dd74f53e1c37f'),
    },
    MA: {
      short_label: "MA",
      label: "Massachusetts",
    },
    MI: {
      short_label: "MI",
      label: $t('countryDetails.3312af04f395e526'),
    },
    MN: {
      short_label: "MN",
      label: $t('countryDetails.e7ef90be25c9f5c3'),
    },
    MS: {
      short_label: "MS",
      label: $t('countryDetails.e0321401e99daa36'),
    },
    MO: {
      short_label: "MO",
      label: $t('countryDetails.7423ad9857c8d5e8'),
    },
    MT: {
      short_label: "MT",
      label: $t('countryDetails.20ffd0d8908426a9'),
    },
    NE: {
      short_label: "NE",
      label: $t('countryDetails.18ed48914904d171'),
    },
    NV: {
      short_label: "NV",
      label: $t('countryDetails.da5b025e9d3fa4be'),
    },
    NH: {
      short_label: "NH",
      label: $t('countryDetails.22ab71c6ca06700f'),
    },
    NJ: {
      short_label: "NJ",
      label: $t('countryDetails.0bbccc25fd65ab91'),
    },
    NM: {
      short_label: "NM",
      label: $t('countryDetails.454e94ff2c2e471b'),
    },
    NY: {
      short_label: "NY",
      label: $t('countryDetails.6733824f53746679'),
    },
    NC: {
      short_label: "NC",
      label: $t('countryDetails.eab50da0f5579ff1'),
    },
    ND: {
      short_label: "ND",
      label: $t('countryDetails.e16c9c1e73940f7f'),
    },
    OH: {
      short_label: "OH",
      label: $t('countryDetails.7ee589450db059bf'),
    },
    OK: {
      short_label: "OK",
      label: $t('countryDetails.4ae79de9e8bf0ed3'),
    },
    OR: {
      short_label: "OR",
      label: $t('countryDetails.a653b26c7549aaa4'),
    },
    PA: {
      short_label: "PA",
      label: "Pennsylvania",
    },
    RI: {
      short_label: "RI",
      label: $t('countryDetails.a9ab62b1986326ff'),
    },
    SC: {
      short_label: "SC",
      label: $t('countryDetails.3468c5459ea0fe72'),
    },
    SD: {
      short_label: "SD",
      label: $t('countryDetails.a76969ea73094569'),
    },
    TN: {
      short_label: "TN",
      label: $t('countryDetails.7e4e63c5f7cdd460'),
    },
    TX: {
      short_label: "TX",
      label: $t('countryDetails.ba844f8d528723d3'),
    },
    UT: {
      short_label: "UT",
      label: $t('countryDetails.a186b427c7893539'),
    },
    VT: {
      short_label: "VT",
      label: $t('countryDetails.f2fe64041f32f18a'),
    },
    VA: {
      short_label: "VA",
      label: $t('countryDetails.1b802cfee7eff792'),
    },
    WA: {
      short_label: "WA",
      label: $t('countryDetails.703b0a3146bd40f0'),
    },
    WV: {
      short_label: "WV",
      label: $t('countryDetails.b53f16a67e3256d6'),
    },
    WI: {
      short_label: "WI",
      label: $t('countryDetails.647b50b76eb88c4e'),
    },
    WY: {
      short_label: "WY",
      label: $t('countryDetails.6fb981b240789116'),
    },
    PR: {
      short_label: "PR",
      label: $t('countryDetails.cb71543959204723'),
    },
  },
} as Record<MapTypes, Record<string, { short_label: string; label: string }>>;

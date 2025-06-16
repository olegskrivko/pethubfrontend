const STATUS_CHOICES = [
  { value: 1, label: 'Pazudis' },
  { value: 2, label: 'Atrasts' },
  { value: 3, label: 'Redzēts' },
];

const SPECIES_CHOICES = [
  { value: 1, label: 'Suns' },
  { value: 2, label: 'Kaķis' },
  { value: 3, label: 'Cits' },
];

const AGE_CHOICES = [
  { value: '', label: '-' },
  { value: 1, label: 'Mazulis' },
  { value: 2, label: 'Pieaugušais' },
  { value: 3, label: 'Seniors' },
];

const AGE_CHOICES_BY_SPECIES = {
  1: [
    // Dog (Suns)
    { value: '', label: '-' },
    { value: 1, label: 'Kucēns' },
    { value: 2, label: 'Pieaugušais' },
    { value: 3, label: 'Seniors' },
  ],
  2: [
    // Cat (Kaķis)
    { value: '', label: '-' },
    { value: 1, label: 'Kaķēns' },
    { value: 2, label: 'Pieaugušais' },
    { value: 3, label: 'Seniors' },
  ],
  3: [
    // Other (Cits)
    { value: '', label: '-' },
    { value: 1, label: 'Mazulis' },
    { value: 2, label: 'Pieaugušais' },
    { value: 3, label: 'Seniors' },
  ],
};

const SIZE_CHOICES = [
  { value: '', label: '-' },
  { value: 1, label: 'Mazs' },
  { value: 2, label: 'Vidējs' },
  { value: 3, label: 'Liels' },
];

const GENDER_CHOICES = [
  { value: '', label: '-' },
  { value: 1, label: 'Tēviņš' },
  { value: 2, label: 'Mātīte' },
];

const BEHAVIOR_CHOICES = [
  { value: '', label: '-' },
  { value: 1, label: 'Draudzīgs' },
  { value: 2, label: 'Agresīvs' },
  { value: 3, label: 'Mierīgs' },
  { value: 4, label: 'Bailīgs' },
  { value: 5, label: 'Paklausīgs' },
];

const PHONE_CODE_CHOICES = [
  { value: '', label: '-' },
  { value: '371', label: 'LV (+371)' },
  { value: '370', label: 'LT (+370)' },
  { value: '372', label: 'EE (+372)' },
];

const COLOR_CHOICES = [
  { value: '', hex: '', label: '' },
  { value: 1, hex: '#000000', label: 'Melns' },
  { value: 2, hex: '#BEBEBE', label: 'Pelēks' },
  { value: 3, hex: '#f7f7f7', label: 'Balts' },
  { value: 4, hex: '#FFF1B9', label: 'Krēmīgs' },
  { value: 5, hex: '#FCDC5C', label: 'Dzeltens' },
  { value: 6, hex: '#FFA500', label: 'Zeltains' },
  { value: 7, hex: '#C37C4D', label: 'Brūns' },
  { value: 8, hex: '#A71A20', label: 'Sarkans' },
  { value: 9, hex: '#BA97AA', label: 'Lillīgs' },
  { value: 10, hex: '#1A355E', label: 'Zils' },
  { value: 11, hex: '#5F6F52', label: 'Zaļš' },
  { value: 12, hex: '#BDB76B', label: 'Haki' },
  { value: 13, hex: '#E5DECA', label: 'Bēšīgs' },
  { value: 14, hex: '#D2B48C', label: 'Dzeltenbrūns' },
  { value: 15, hex: '#954535', label: 'Kaštanbrūns' },
];

const PATTERN_CHOICES = [
  { value: '', label: '-' },
  { value: 1, label: 'Vienkrāsains' },
  { value: 2, label: 'Strīpains' },
  { value: 3, label: 'Punktveida' },
  { value: 4, label: 'Plankumains' },
  { value: 5, label: 'Raibs' },
];

const SERVICE_CATEGORIES = [
  { value: 1, label: 'Dzīvnieku pieskatīšana' },
  { value: 2, label: 'Suņu pastaigas' },
  { value: 3, label: 'Kopšana' },
  { value: 4, label: 'Apmācība' },
  { value: 5, label: 'Izmitināšana' },
  { value: 6, label: 'Veterinārārsts' },
  { value: 7, label: 'Foto sesijas' },
  { value: 8, label: 'Glābšana un meklēšana' },
  { value: 9, label: 'Piederumi un aksesuāri' },
  { value: 10, label: 'Māksla' },
  { value: 11, label: 'Apbedīšana' },
  { value: 12, label: 'Transports' },
  { value: 13, label: 'Audzētavas' },
  { value: 14, label: 'Apdrošināšana' },
  { value: 15, label: 'Citi pakalpojumi' },
];

const SHELTER_CATEGORIES = [
  { value: 1, label: 'Pašvaldības patversme' },
  { value: 2, label: 'Dzīvnieku glābšana' },
  { value: 3, label: 'Patvērums (Sanctuary)' },
  { value: 4, label: 'Privāta patversme' },
  { value: 5, label: 'Cits' },
];

const PROVIDER_TYPES = [
  { value: 1, label: 'Fiziska persona' },
  { value: 2, label: 'Juridiska persona' },
];

const PRICE_TYPE_CHOICES = [
  { value: 1, label: 'Stundā' },
  { value: 2, label: 'Vienībā' },
  { value: 3, label: 'Dienā' },
  { value: 4, label: 'Pēc vienošanās' },
];

export {
  PRICE_TYPE_CHOICES,
  PROVIDER_TYPES,
  SHELTER_CATEGORIES,
  SERVICE_CATEGORIES,
  STATUS_CHOICES,
  SPECIES_CHOICES,
  AGE_CHOICES_BY_SPECIES,
  SIZE_CHOICES,
  GENDER_CHOICES,
  BEHAVIOR_CHOICES,
  AGE_CHOICES,
  PHONE_CODE_CHOICES,
  COLOR_CHOICES,
  PATTERN_CHOICES,
};

export const GENDER_CHOICES = [
  { label: 'Tēviņš', value: '1' },
  { label: 'Mātīte', value: '2' },
];

export const SIZE_CHOICES = [
  { label: 'Mazs', value: '1' },
  { label: 'Vidējs', value: '2' },
  { label: 'Liels', value: '3' },
];

export const SPECIES_CHOICES = [
  { label: 'Suns', value: '1' },
  { label: 'Kaķis', value: '2' },
  { label: 'Cits', value: '3' },
];

export const AGE_CHOICES = [
  { label: 'Mazulis', value: '1' },
  { label: 'Pieaugušais', value: '2' },
  { label: 'Seniors', value: '3' },
];

export const STATUS_CHOICES = [
  { label: 'Pazudis', value: '1' },
  { label: 'Atrasts', value: '2' },
  { label: 'Redzēts', value: '3' },
];

export const PATTERN_CHOICES = [
  { label: 'Vienkrāsains', value: '1' },
  { label: 'Strīpains', value: '2' },
  { label: 'Punktveida', value: '3' },
  { label: 'Plankumains', value: '4' },
  { label: 'Raibs', value: '5' },
];

export const COLOR_CHOICES = [
  { label: 'Melns', value: '1' },
  { label: 'Pelēks', value: '2' },
  { label: 'Balts', value: '3' },
  { label: 'Krēmīgs', value: '4' },
  { label: 'Dzeltens', value: '5' },
  { label: 'Zeltains', value: '6' },
  { label: 'Brūns', value: '7' },
  { label: 'Sarkans', value: '8' },
  { label: 'Lillīgs', value: '9' },
  { label: 'Zils', value: '10' },
  { label: 'Zaļš', value: '11' },
  { label: 'Haki', value: '12' },
  { label: 'Bēšīgs', value: '13' },
  { label: 'Dzeltenbrūns', value: '14' },
  { label: 'Kaštanbrūns', value: '15' },
];

export const CATEGORY_CHOICES = [
  { label: 'Dzīvnieku pieskatīšana', value: '1' },
  { label: 'Suņu pastaigas', value: '2' },
  { label: 'Kopšana', value: '3' },
  { label: 'Apmācība', value: '4' },
  { label: 'Izmitināšana', value: '5' },
  { label: 'Veterinārārsts', value: '6' },
  { label: 'Foto sesijas', value: '7' },
  { label: 'Glābšana un meklēšana', value: '8' },
  { label: 'Piederumi un aksesuāri', value: '9' },
  { label: 'Māksla', value: '10' },
  { label: 'Apbedīšana', value: '11' },
  { label: 'Transports', value: '12' },
  { label: 'Audzētavas', value: '13' },
  { label: 'Apdrošināšana', value: '14' },
  { label: 'Citi pakalpojumi', value: '15' },
];

export const SHELTER_CATEGORIES = [
  { value: '1', label: 'Pašvaldības patversme' },
  { value: '2', label: 'Dzīvnieku glābšana' },
  { value: '3', label: 'Patvērums (Sanctuary)' },
  { value: '4', label: 'Privāta patversme' },
  { value: '5', label: 'Cits' },
];

export const PROVIDER_TYPES = [
  { value: '1', label: 'Fiziska persona' },
  { value: '2', label: 'Juridiska persona' },
];

export const PRICE_TYPE_CHOICES = [
  { value: 1, label: 'Stundā' },
  { value: 2, label: 'Vienībā' },
  { value: 3, label: 'Dienā' },
  { value: 4, label: 'Pēc vienošanās' },
];

export const SUBJECT_CHOICES = {
  lv: [
    { value: 1, label: 'Kļūdu ziņojums' },
    { value: 2, label: 'Vispārīgs jautājums' },
    { value: 3, label: 'Funkciju pieprasījums' },
    { value: 4, label: 'Sadarbības pieprasījums' },
    { value: 5, label: 'Cits' },
  ],
  en: [
    { value: 1, label: 'Bug Report' },
    { value: 2, label: 'General Question' },
    { value: 3, label: 'Feature Request' },
    { value: 4, label: 'Collaboration Request' },
    { value: 5, label: 'Other' },
  ],
  ru: [
    { value: 1, label: 'Сообщение об ошибке' },
    { value: 2, label: 'Общий вопрос' },
    { value: 3, label: 'Запрос функции' },
    { value: 4, label: 'Запрос о сотрудничестве' },
    { value: 5, label: 'Другое' },
  ],
};
const finalStatusOptions = {
  1: [
    // lost
    { value: 1, label: 'Nav atrisināts' },
    { value: 8, label: 'Atradies' },
    { value: 7, label: 'Miris' },
    { value: 9, label: 'Cits' },
  ],

  2: [
    // found
    { value: 1, label: 'Nav atrisināts' },
    { value: 2, label: 'Atgriezts saimniekam' },
    { value: 3, label: 'Nodots patversmei' },
    { value: 4, label: 'Paturēts sev' },
    { value: 9, label: 'Cits' },
  ],
  3: [
    // seen
    { value: 1, label: 'Nav atrisināts' },
    { value: 5, label: 'Klaiņojošs' },
    { value: 6, label: 'Brīvā pastaigā' },
    { value: 7, label: 'Miris' },
    { value: 9, label: 'Cits' },
  ],
};
// Helper function to get choices for current language
export const getSubjectChoices = (language = 'lv') => {
  return SUBJECT_CHOICES[language] || SUBJECT_CHOICES.lv;
};

// Helper function to get translated choice value
export const getTranslatedChoice = (choiceType, value, t) => {
  if (!value) return '';
  
  const choiceKey = `choices.${choiceType}.${value}`;
  return t(choiceKey);
};

// Helper functions for specific choice types
export const getGenderLabel = (value, t) => getTranslatedChoice('gender', value, t);
export const getSizeLabel = (value, t) => getTranslatedChoice('size', value, t);
export const getSpeciesLabel = (value, t) => getTranslatedChoice('species', value, t);
export const getAgeLabel = (value, t) => getTranslatedChoice('age', value, t);
export const getStatusLabel = (value, t) => getTranslatedChoice('status', value, t);
export const getFinalStatusLabel = (value, t) => getTranslatedChoice('finalStatus', value, t);
export const getPatternLabel = (value, t) => getTranslatedChoice('pattern', value, t);
export const getColorLabel = (value, t) => getTranslatedChoice('color', value, t);
export const getCategoryLabel = (value, t) => getTranslatedChoice('category', value, t);
export const getShelterCategoryLabel = (value, t) => getTranslatedChoice('shelterCategory', value, t);
export const getProviderTypeLabel = (value, t) => getTranslatedChoice('providerType', value, t);
export const getPriceTypeLabel = (value, t) => getTranslatedChoice('priceType', value, t);

import {
  INSTANCES_FETCH_SUCCESS,
  SEARCH_VALUE_CHANGE,
  LOCALE_CHANGE,
  INSTANCES_LOCALE_CHANGE,
} from './actions';

const supportedLocales = ['en', 'fr', 'pl', 'es', 'ja', 'de','pt-BR'];

const initialLocale = () => {
  const lang = navigator.language.split('-')[0];

  if (supportedLocales.indexOf(lang) !== -1) {
    return lang;
  } else {
    return 'en';
  }
};

const initialState = {
  instances: [],
  searchValue: '',
  locale: initialLocale(),
  instancesLocale: null,
};

const createSearchable = item => {
  let searchable = [];

  searchable.push(item.name);

  if (item.info) {
    searchable.push(item.info.theme || 'general');
  }

  return { ...item, searchable: searchable.join(' ').toLowerCase() };
};

export default function reducer(state = initialState, action) {
  switch(action.type) {
  case INSTANCES_FETCH_SUCCESS:
    return { ...state, instances: action.data.filter(item => !item.dead || !item.open_registrations).map(createSearchable) };
  case SEARCH_VALUE_CHANGE:
    return { ...state, searchValue: action.data };
  case LOCALE_CHANGE:
    return { ...state, locale: action.data };
  case INSTANCES_LOCALE_CHANGE:
    return { ...state, instancesLocale: action.data };
  default:
    return state;
  }
};

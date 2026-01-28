import { useState } from 'react';

const LANGUAGES = ['None', 'English', 'Pidgin', 'Hausa', 'Yoruba', 'Igbo', 'Nigerian'];

export default function useLanguageSelection() {
  const [primaryLanguage, setPrimaryLanguage] = useState('English');
  const [altLanguage, setAltLanguage] = useState('None');

  // Filter alternative language options to exclude primary language
  const altLanguageOptions = LANGUAGES.filter((lang) => lang !== primaryLanguage);

  // Filter primary language options to exclude alternative language
  const primaryLanguageOptions = LANGUAGES.filter((lang) => lang !== altLanguage && lang !== 'None');

  return {
    primaryLanguage,
    setPrimaryLanguage,
    altLanguage,
    setAltLanguage,
    altLanguageOptions,
    primaryLanguageOptions,
    LANGUAGES,
  };
}

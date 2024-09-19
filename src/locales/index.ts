import i18n from 'i18next';
import en from '@/locales/en.json'
import pt from '@/locales/pt.json'

i18n.init({
    lng: 'pt', // if you're using a language detector, do not define the lng option
    debug: true,
    resources: {
        en,
        pt
    }
});

export default i18n;
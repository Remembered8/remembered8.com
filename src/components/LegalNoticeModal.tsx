import React, { useState } from 'react';
import { X } from 'lucide-react';
import { Language } from '../lib/i18n';
import { openConsentPreferences } from './CookieConsent';

type LegalTab = 'privacy' | 'cookies';

interface LegalNoticeModalProps {
  isOpen: boolean;
  onClose: () => void;
  language: Language;
  initialTab?: LegalTab;
}

/**
 * Contact details of the controller. Fill these in before going live: a privacy
 * notice without an identifiable controller does not satisfy GDPR Art. 13 or
 * KVKK Art. 10.
 */
const CONTROLLER = {
  legalName: 'Remembered8',
  email: 'privacy@remembered8.com',
  site: 'remembered8.com',
};

interface Section {
  heading: string;
  paragraphs: string[];
}

interface LegalCopy {
  title: string;
  tabs: Record<LegalTab, string>;
  updated: string;
  managePreferences: string;
  close: string;
  privacy: Section[];
  cookies: Section[];
  cookieTable: {
    columns: [string, string, string, string];
    rows: [string, string, string, string][];
  };
}

const COPY: Record<Language, LegalCopy> = {
  en: {
    title: 'Privacy & cookie policy',
    tabs: { privacy: 'Privacy notice', cookies: 'Cookie policy' },
    updated: 'Last updated',
    managePreferences: 'Change cookie preferences',
    close: 'Close',
    privacy: [
      {
        heading: 'Who is responsible',
        paragraphs: [
          `${CONTROLLER.legalName} operates ${CONTROLLER.site} and is the data controller for the personal data described here. For any question about this notice, or to exercise the rights below, write to ${CONTROLLER.email}.`,
        ],
      },
      {
        heading: 'What we collect',
        paragraphs: [
          'Memorial content you create: names, dates, biographies, photographs, audio recordings, family relationships and memory letters. You choose what to enter, and you may be entering information about other people, including deceased persons and living relatives.',
          'Technical data: IP address, browser and device type, referring page, and the pages you view. This is collected by our measurement tools only after you consent to analytics.',
          'Contact data: anything you send us by email, kept only as long as needed to answer you.',
        ],
      },
      {
        heading: 'Why we use it',
        paragraphs: [
          'To operate the archive and show the memorial pages you and others create (performance of the service you asked for).',
          'To understand how the archive is used and improve it, and to measure our campaigns. This happens on the basis of your consent, and only for the categories you switch on.',
          'To keep the service secure and to meet legal obligations (our legitimate interest and legal duties).',
        ],
      },
      {
        heading: 'Who we share it with',
        paragraphs: [
          'Google (Analytics 4), Microsoft (Clarity) and Meta (Pixel) act as our measurement providers and receive technical data only when you have consented to the matching category. Google AI (Gemini) processes the text you submit to the optional AI writing helpers in order to return a draft.',
          'We do not sell personal data. We do not share memorial content with advertisers.',
        ],
      },
      {
        heading: 'International transfers',
        paragraphs: [
          'Our measurement and AI providers process data outside the EEA and Turkey, including in the United States. Those transfers rely on the European Commission Standard Contractual Clauses and, where applicable, the EU-US Data Privacy Framework.',
        ],
      },
      {
        heading: 'How long we keep it',
        paragraphs: [
          'Memorial content is kept until you ask us to remove it, because the point of the archive is permanence. Analytics data is retained for at most 14 months. Consent records are kept for as long as the consent is valid plus the period needed to evidence it.',
        ],
      },
      {
        heading: 'Your rights',
        paragraphs: [
          'You may request access, correction, deletion, restriction, portability, and object to processing. Where processing rests on consent, you may withdraw it at any time without affecting what happened before. Under KVKK Art. 11 you also have the right to learn whether your data is processed and to request that any harm be remedied.',
          `Contact ${CONTROLLER.email}. You may also complain to your local supervisory authority, or in Turkey to the Kişisel Verileri Koruma Kurumu (KVKK).`,
        ],
      },
      {
        heading: 'Children',
        paragraphs: [
          'The service is not directed at children under 16. If you believe a child has provided us with personal data, contact us and we will remove it.',
        ],
      },
    ],
    cookies: [
      {
        heading: 'What we use',
        paragraphs: [
          'Cookies and equivalent browser storage (localStorage) fall into three groups on this site. Strictly necessary storage is always active. Analytics and marketing tags load only after you switch the matching category on, and no third-party script is requested before that.',
        ],
      },
      {
        heading: 'Changing your mind',
        paragraphs: [
          'Use the button below, or the "cookie preferences" link in the footer, to change or withdraw your choices at any time. Withdrawing consent stops further collection; scripts already loaded in the current page are removed on your next page load.',
        ],
      },
      {
        heading: 'Blocking cookies in your browser',
        paragraphs: [
          'Every major browser lets you block or delete cookies from its settings. Blocking strictly necessary storage will stop the archive from remembering your language and your consent decision.',
        ],
      },
    ],
    cookieTable: {
      columns: ['Name / provider', 'Category', 'Purpose', 'Retention'],
      rows: [
        ['remembered_consent (this site)', 'Necessary', 'Stores your cookie decision so we do not ask again', '12 months'],
        ['remembered_memorials_v4 (this site)', 'Necessary', 'Keeps the memorial data you enter on this device', 'Until cleared'],
        ['_ga, _ga_* (Google Analytics 4)', 'Analytics', 'Distinguishes visitors and sessions, aggregated reporting', 'Up to 24 months'],
        ['_clck, _clsk (Microsoft Clarity)', 'Analytics', 'Session replay and interaction heatmaps', 'Up to 12 months'],
        ['_fbp (Meta Pixel)', 'Marketing', 'Campaign attribution and audience building', 'Up to 3 months'],
      ],
    },
  },
  tr: {
    title: 'Gizlilik ve cerez politikasi',
    tabs: { privacy: 'Aydinlatma metni', cookies: 'Cerez politikasi' },
    updated: 'Son guncelleme',
    managePreferences: 'Cerez tercihlerini degistir',
    close: 'Kapat',
    privacy: [
      {
        heading: 'Veri sorumlusu',
        paragraphs: [
          `${CONTROLLER.site} adresini ${CONTROLLER.legalName} isletmektedir ve burada anlatilan kisisel veriler bakimindan veri sorumlusudur. Bu metinle ilgili her soru ve asagidaki haklarin kullanimi icin ${CONTROLLER.email} adresine yazabilirsiniz.`,
        ],
      },
      {
        heading: 'Hangi verileri isliyoruz',
        paragraphs: [
          'Olusturdugunuz kutuk icerigi: isimler, tarihler, biyografiler, fotograflar, ses kayitlari, akrabalik baglari ve hatira mektuplari. Neyi girecegine siz karar verirsiniz ve bu bilgiler baskalarina, vefat etmis kisilere ya da yasayan yakinlara ait olabilir.',
          'Teknik veriler: IP adresi, tarayici ve cihaz turu, yonlendiren sayfa ve goruntuledigin sayfalar. Bunlar yalnizca analitik cerezlere onay verdikten sonra toplanir.',
          'Iletisim verileri: bize e-posta ile ilettiginiz her sey, yalnizca size cevap vermek icin gereken sure boyunca saklanir.',
        ],
      },
      {
        heading: 'Isleme amaclari ve hukuki sebep',
        paragraphs: [
          'Arsivi calistirmak ve olusturulan kutuk sayfalarini gostermek icin (sozlesmenin ifasi).',
          'Arsivin nasil kullanildigini anlayip gelistirmek ve kampanyalarimizi olcmek icin. Bu isleme acik rizaniza dayanir ve yalnizca actiginiz kategoriler icin gerceklesir.',
          'Hizmetin guvenligini saglamak ve hukuki yukumluluklerimizi yerine getirmek icin (mesru menfaat ve hukuki yukumluluk).',
        ],
      },
      {
        heading: 'Kimlerle paylasiyoruz',
        paragraphs: [
          'Google (Analytics 4), Microsoft (Clarity) ve Meta (Pixel) olcumleme saglayicilarimizdir ve yalnizca ilgili kategoriye onay verdiyseniz teknik veri alirlar. Google AI (Gemini), istege bagli yapay zeka yazim yardimcilarina gonderdiginiz metni taslak uretmek icin isler.',
          'Kisisel verileri satmiyoruz. Kutuk iceriklerini reklam verenlerle paylasmiyoruz.',
        ],
      },
      {
        heading: 'Yurt disina aktarim',
        paragraphs: [
          'Olcumleme ve yapay zeka saglayicilarimiz verileri AEA ve Turkiye disinda, Amerika Birlesik Devletleri dahil, isler. Bu aktarimlar Avrupa Komisyonu Standart Sozlesme Hukumlerine ve uygulanabildigi olcude AB-ABD Veri Gizliligi Cercevesine dayanir.',
        ],
      },
      {
        heading: 'Saklama sureleri',
        paragraphs: [
          'Kutuk icerigi, arsivin amaci kaliciligi oldugu icin siz silinmesini isteyene kadar saklanir. Analitik veriler en fazla 14 ay tutulur. Riza kayitlari, rizanin gecerli oldugu sure ve ispat icin gereken ek sure boyunca saklanir.',
        ],
      },
      {
        heading: 'Haklariniz',
        paragraphs: [
          'Erisim, duzeltme, silme, islemeyi sinirlandirma, veri tasinabilirligi ve itiraz haklarina sahipsiniz. Isleme acik rizaya dayaniyorsa rizanizi diledigin an geri alabilirsiniz; bu, geri alma anina kadarki islemeleri etkilemez. KVKK madde 11 uyarinca verilerinizin islenip islenmedigini ogrenme ve dogan zararin giderilmesini talep etme hakkiniz da vardir.',
          `Bize ${CONTROLLER.email} adresinden ulasin. Ayrica bulundugunuz ulkedeki denetim makamina, Turkiye'de ise Kişisel Verileri Koruma Kurumu'na (KVKK) sikayette bulunabilirsiniz.`,
        ],
      },
      {
        heading: 'Cocuklar',
        paragraphs: [
          'Hizmet 16 yasin altindaki cocuklara yonelik degildir. Bir cocugun bize kisisel veri ilettigini dusunuyorsaniz bize bildirin, veriyi kaldiralim.',
        ],
      },
    ],
    cookies: [
      {
        heading: 'Neleri kullaniyoruz',
        paragraphs: [
          'Bu sitede cerezler ve esdeger tarayici depolamasi (localStorage) uc gruba ayrilir. Zorunlu depolama her zaman aktiftir. Analitik ve pazarlama etiketleri yalnizca ilgili kategoriyi actiktan sonra yuklenir; oncesinde hicbir ucuncu taraf betigi istenmez.',
        ],
      },
      {
        heading: 'Kararinizi degistirmek',
        paragraphs: [
          'Asagidaki dugmeyi ya da alt bilgideki "cerez tercihleri" baglantisini kullanarak secimlerinizi diledigin an degistirebilir veya geri alabilirsiniz. Rizayi geri almak sonraki toplamayi durdurur; acik sayfada halihazirda yuklenmis betikler bir sonraki sayfa yuklemesinde kaldirilir.',
        ],
      },
      {
        heading: 'Tarayicidan engellemek',
        paragraphs: [
          'Butun yaygin tarayicilar ayarlarindan cerezleri engellemenize veya silmenize izin verir. Zorunlu depolamayi engellemek, arsivin dil tercihinizi ve cerez kararinizi hatirlamasini durdurur.',
        ],
      },
    ],
    cookieTable: {
      columns: ['Ad / saglayici', 'Kategori', 'Amac', 'Saklama'],
      rows: [
        ['remembered_consent (bu site)', 'Zorunlu', 'Cerez kararinizi saklar, tekrar sormamizi onler', '12 ay'],
        ['remembered_memorials_v4 (bu site)', 'Zorunlu', 'Bu cihazda girdiginiz kutuk verilerini tutar', 'Silinene kadar'],
        ['_ga, _ga_* (Google Analytics 4)', 'Analitik', 'Ziyaretci ve oturumlari ayirt eder, toplu raporlama', '24 aya kadar'],
        ['_clck, _clsk (Microsoft Clarity)', 'Analitik', 'Oturum tekrari ve etkilesim isi haritalari', '12 aya kadar'],
        ['_fbp (Meta Pixel)', 'Pazarlama', 'Kampanya atifi ve kitle olusturma', '3 aya kadar'],
      ],
    },
  },
};

/** Date the policy text last changed. Update it whenever the copy above changes. */
const LAST_UPDATED = '2026-08-28';

/** Privacy notice and cookie policy, shown as a modal from the footer. */
export const LegalNoticeModal: React.FC<LegalNoticeModalProps> = ({
  isOpen,
  onClose,
  language,
  initialTab = 'privacy',
}) => {
  const [tab, setTab] = useState<LegalTab>(initialTab);
  const t = COPY[language];

  if (!isOpen) return null;

  const sections = tab === 'privacy' ? t.privacy : t.cookies;

  return (
    <div className="fixed inset-0 z-[110] flex items-start justify-center overflow-y-auto bg-black/60 p-3 sm:p-6">
      <div className="w-full max-w-3xl border border-[#111111] bg-[#FAF8F5]">
        <div className="sticky top-0 flex items-center justify-between gap-4 border-b border-[#111111] bg-[#FAF8F5] px-4 py-3">
          <h2 className="font-serif-display text-lg font-black tracking-tight text-[#111111]">
            {t.title}
          </h2>
          <button
            type="button"
            onClick={onClose}
            aria-label={t.close}
            className="text-[#777777] hover:text-[#111111] cursor-pointer"
          >
            <X size={18} />
          </button>
        </div>

        <div className="flex gap-4 border-b border-[#111111]/15 px-4 pt-3">
          {(['privacy', 'cookies'] as LegalTab[]).map((key) => (
            <button
              key={key}
              type="button"
              onClick={() => setTab(key)}
              className={`-mb-px border-b-2 pb-2 font-mono text-[11px] font-bold uppercase tracking-wider cursor-pointer ${
                tab === key
                  ? 'border-[#111111] text-[#111111]'
                  : 'border-transparent text-[#777777] hover:text-[#111111]'
              }`}
            >
              {t.tabs[key]}
            </button>
          ))}
        </div>

        <div className="space-y-5 px-4 py-4">
          <p className="font-mono text-[10px] uppercase tracking-wider text-[#777777]">
            {t.updated}: {LAST_UPDATED}
          </p>

          {sections.map((section) => (
            <section key={section.heading} className="space-y-2">
              <h3 className="font-serif-display text-sm font-bold tracking-tight text-[#111111]">
                {section.heading}
              </h3>
              {section.paragraphs.map((paragraph, index) => (
                <p key={index} className="font-serif text-sm leading-relaxed text-[#444444]">
                  {paragraph}
                </p>
              ))}
            </section>
          ))}

          {tab === 'cookies' && (
            <div className="overflow-x-auto border border-[#E5E5DF] bg-white">
              <table className="w-full min-w-[640px] border-collapse text-left">
                <thead>
                  <tr className="border-b border-[#111111]/20">
                    {t.cookieTable.columns.map((column) => (
                      <th
                        key={column}
                        className="px-3 py-2 font-mono text-[10px] font-bold uppercase tracking-wider text-[#111111]"
                      >
                        {column}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {t.cookieTable.rows.map((row) => (
                    <tr key={row[0]} className="border-b border-[#E5E5DF] last:border-b-0">
                      {row.map((cell, index) => (
                        <td
                          key={index}
                          className="px-3 py-2 align-top font-serif text-xs leading-relaxed text-[#444444]"
                        >
                          {cell}
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}

          <button
            type="button"
            onClick={() => {
              onClose();
              openConsentPreferences();
            }}
            className="border border-[#111111] px-4 py-2 font-mono text-[11px] font-bold uppercase tracking-wider text-[#111111] transition-colors hover:bg-[#111111] hover:text-white cursor-pointer"
          >
            {t.managePreferences}
          </button>
        </div>
      </div>
    </div>
  );
};

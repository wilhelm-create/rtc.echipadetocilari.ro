export const site = {
  name: "Clubul de Tenis RTC",
  shortName: "RTC Tenis",
  domain: "https://rtc.echipadetocilari.ro",
  description:
    "Descoperă-ți potențialul în tenis. Programe pentru copii, juniori și adulți la Clubul de Tenis RTC din București.",
  email: "contact@tenisclubrtc.com",
  phone: "+40 774 680 337",
  phoneHref: "tel:+40774680337",
  address: "Bulevardul Basarabia 73 - 79, București",
  hours: "07:00 – 21:00",
  booksport: "https://www.booksport.ro/rtc",
  social: {
    facebook: "https://www.facebook.com/people/MAGIA-Tenisului/61567592652921/",
    instagram: "https://www.instagram.com/rtctenisclub/",
    tiktok: "https://www.tiktok.com/@magiatenisului",
  },
  agency: {
    name: "Echipa de Tocilari",
    url: "https://www.echipadetocilari.ro",
  },
} as const;

export const nav = [
  { href: "/", label: "Acasă" },
  { href: "/programe", label: "Programe" },
  { href: "/rezerva-teren", label: "Rezervă teren" },
  { href: "/despre-noi", label: "Despre noi" },
  { href: "/tabere", label: "Tabere" },
  { href: "/contact", label: "Contact" },
] as const;

export const programs = [
  {
    slug: "academia-copii-junior",
    title: "Academia de Tenis pentru Copii și Junior",
    tagline: "Pentru cei mai tineri campioni",
    short:
      "Am creat programe pentru copii și juniori adaptate pentru diferite niveluri de joc.",
    description:
      "Descoperim tenisul prin jocuri distractive, activități interactive și metode adaptate vârstei. Programul nostru pentru juniori pune accent pe formarea abilităților, îmbunătățirea coordonării și creșterea încrederii.",
    image: "/images/programs/programs01.jpg",
    features: [
      "Grupe de vârstă: 4-6 ani, 7-14 ani și 15-18 ani",
      "Abordări educaționale progresive adaptate fiecărei etape",
      "Antrenori certificați specializați în dezvoltarea juniorilor",
      "Mediu sigur, motivant și plin de bucurie",
    ],
  },
  {
    slug: "competitiv-avansat",
    title: "Program Competitiv Avansat",
    tagline: "Pentru performanță de elită",
    short:
      "Customizăm programul de antrenament pentru sportivii de performanță care se pregătesc pentru turnee naționale și internaționale.",
    description:
      "Pregătiți-vă pentru competiții de top prin antrenamente intensive și strategice. Programul avansat se concentrează pe perfecționarea tehnicilor, rezistență mentală și pregătire pentru turnee.",
    image: "/images/programs/programs02.jpg",
    features: [
      "Grupe de nivel: jucători cu experiență competitivă",
      "Sesiuni intensive: tactici avansate, analiză video și simulări de turnee",
      "Antrenori de elită cu experiență națională și internațională",
      "Suport complet: nutriție, fitness și coaching mental integrat",
    ],
  },
  {
    slug: "lectii-private",
    title: "Lecții Private Personalizate",
    tagline: "Antrenament adaptat nevoilor tale",
    short:
      "Lecții individuale pentru îmbunătățirea tehnicii de lovire, deplasare și joc tehnico-tactic.",
    description:
      "Beneficiați de sesiuni individuale concepute special pentru obiectivele dumneavoastră. Lecțiile private pun accent pe tehnică personalizată, corecturi rapide și dezvoltare accelerată a abilităților.",
    image: "/images/programs/programs04.jpg",
    features: [
      "Flexibilitate: orar adaptat programului personal, pentru orice nivel",
      "Planuri personalizate: focus pe zone specifice de îmbunătățire",
      "Antrenori dedicați: sesiuni unu-la-unu cu experți certificați",
      "Rezultate vizibile: monitorizare progres și feedback continuu",
    ],
  },
  {
    slug: "lectii-adulti",
    title: "Lecții pentru Adulți",
    tagline: "Pentru noii pasionați de tenis",
    short:
      "Lecții private pentru pasionații de tenis — de la începători la intermediari.",
    description:
      "Oferim lecții private pentru pasionații de tenis. Fie că ești începător sau intermediar, antrenorii noștri te vor învăța bazele tehnicii corecte și îți vor îndruma pașii spre primul tău turneu de tenis de amator.",
    image: "/images/programs/competitiv.webp",
    features: [
      "Grupe de vârstă: adulți peste 18 ani, fără experiență prealabilă",
      "Lecții introductive cu echipament furnizat gratuit",
      "Antrenori experimentați, orientați spre motivație",
      "Atmosferă prietenoasă, axată pe progres individual",
    ],
  },
  {
    slug: "cardio-tenis",
    title: "Cardio Tenis",
    tagline: "Antrenament colectiv și vitalitate",
    short:
      "Antrenamente colective combinate cu pregătire fizică, pe ritm de muzică — ideal pentru adulți.",
    description:
      "Participați la sesiuni de grup dinamice care combină tenisul cu exerciții de fitness. Programul nostru promovează colaborarea, îmbunătățirea condiției fizice și dezvoltarea abilităților într-un mediu energizant.",
    image: "/images/programs/programs03.jpg",
    features: [
      "Grupe mixte: adulți și juniori cu niveluri similare",
      "Exerciții integrate: tenis + forță și rezistență",
      "Antrenori multidisciplinari: tenis și fitness certificat",
      "Beneficii sociale: networking, motivație de grup și monitorizare progres",
    ],
  },
  {
    slug: "clinici-grup",
    title: "Clinici de Grup și Fitness",
    tagline: "Mișcare în echipă",
    short: "Antrenamente colective combinate cu condiționare fizică.",
    description:
      "Sesiuni de grup care îmbină tehnica de tenis cu pregătirea fizică generală, într-un format dinamic și social.",
    image: "/images/programs/girl-coach.jpg",
    features: [
      "Antrenamente colective pe grupe de nivel",
      "Condiționare fizică specifică tenisului",
      "Atmosferă motivantă și prietenoasă",
      "Potrivit pentru toate vârstele",
    ],
  },
] as const;

export const whyUs = [
  {
    title: "Antrenori cu certificare națională și internațională",
    image: "/images/why/player.jpg",
  },
  {
    title:
      "Planuri personalizate de dezvoltare a jocului în raport cu planul competițional",
    image: "/images/why/serve.jpg",
  },
  {
    title: "Terenuri moderne și echipamente performante",
    image: "/images/why/court.jpg",
  },
  {
    title: "Sparring partener – foști jucători de performanță",
    image: "/images/why/backhand.jpg",
  },
] as const;

export const testimonials = [
  {
    quote:
      "Clubul de tenis RTC l-a transformat pe fiul meu într-un competitor încrezător.",
    text: "L-am înscris pe fiul meu de 12 ani doar pentru fitness, dar în câteva luni, el concura deja în turnee. Antrenorii sunt incredibil de susținători și profesioniști.",
    author: "Ilinca M.",
    role: "Părinte",
  },
  {
    quote: "Un loc de antrenament pentru campioni.",
    text: "M-am antrenat la Clubul de Tenis RTC de peste 3 ani, iar îmbunătățirea jocului meu a fost uriașă. Ei m-au ajutat să câștig primul meu titlu regional!",
    author: "David V.",
    role: "Sportiv Junior",
  },
  {
    quote: "Comunitate, antrenori și timp pe teren – toate excelente.",
    text: "Ca adult începător, eram emoționat, dar Clubul de tenis RTC a făcut totul ușor și distractiv. Mi-am făcut prieteni, am învățat rapid și mă simt mai sănătos ca niciodată.",
    author: "Radu R.",
    role: "Sportiv Adult",
  },
] as const;

export const stats = [
  {
    value: 350,
    suffix: "+",
    label: "Rezultate",
    description:
      "Elevii noștri au obținut victorii în competiții regionale, naționale și internaționale.",
  },
  {
    value: 7,
    suffix: "+",
    label: "Instructori certificați",
    description:
      "Instructori experimentați, pasionați, cu acreditări internaționale.",
  },
  {
    value: 95,
    suffix: "%",
    label: "Rata de îmbunătățire",
    description:
      "Jucătorii raportează progrese vizibile în primele 3 luni de antrenament.",
  },
  {
    value: 8,
    suffix: "+",
    label: "Ore gratuite pentru copii",
    description:
      "Atleții Clubului de Tenis RTC au obținut burse la universități de top și academii de tenis.",
  },
] as const;

export const coaches = [
  {
    name: "Mohănescu Roxana",
    role: "Antrenor coordinator",
    bio: "Fostă jucătoare de performanță, absolventă a Universității Naționale de Educație Fizică și Sport București, fost antrenor federal, licențiată internațional PTR – nivel profesional, peste 20 de ani de experiență.",
    image: "/images/coaches/roxana.png",
  },
  {
    name: "Traian Rădulescu",
    role: "Antrenor de tenis",
    bio: "Peste 15 ani de experiență națională și internațională, fost jucător de performanță, deținător al certificatului de antrenor – nivel național.",
    image: "/images/coaches/traian.jpg",
  },
  {
    name: "Septimiu Stoica",
    role: "Antrenor de tenis",
    bio: "Certificat de Școala Națională de Formare și Instruire Antrenori, București 2024, fost jucător de performanță la nivel național, 5 ani de experiență.",
    image: "/images/coaches/septimiu.webp",
  },
  {
    name: "Victor Slăvescu",
    role: "Sparring partener",
    bio: "Fost jucător de performanță, nivel național și internațional.",
    image: "/images/coaches/victor.webp",
  },
  {
    name: "Chitic Valentin",
    role: "Antrenor începător și sparring partener",
    bio: "Fost sportiv de performanță.",
    image: "/images/coaches/placeholder.png",
  },
  {
    name: "Chitic Victor",
    role: "Preparator fizic",
    bio: "Peste 10 ani de experiență, fost atlet de performanță, licențiat internațional și național.",
    image: "/images/coaches/placeholder.png",
  },
] as const;

export const camps = [
  {
    title: "Tabăra Furnicuțelor",
    tagline: "Aventură distractivă și educativă pentru copii",
    description:
      "O tabără captivantă pentru copii, care îmbină tenisul, lecții de spaniolă, jocuri interactive și înot. Programul nostru promovează dezvoltarea fizică, lingvistică și socială într-un mediu plin de energie și bucurie.",
    image: "/images/camps/furnicute.jpg",
    features: [
      "Grupe de vârstă: copii între 6-12 ani, cu activități adaptate",
      "Program zilnic variat: sesiuni de tenis, spaniolă, jocuri de echipă și înot",
      "Educatori calificați: profesori specializați în dezvoltarea infantilă",
      "Beneficii: prieteni noi, abilități lingvistice și fizice, supraveghere sigură",
    ],
  },
  {
    title: "Tabăra Artiștilor Sportivi",
    tagline: "Creativitate și mișcare în armonie",
    description:
      "O tabără inovatoare pentru copii, care unește tenisul cu pictură, muzică și teatru. Programul nostru încurajează expresia artistică, coordonarea și echilibrul între corp și minte într-un cadru distractiv.",
    image: "/images/programs/girl-coach.jpg",
    features: [
      "Grupe de vârstă: copii între 7-13 ani, cu ateliere adaptate intereselor",
      "Program variat: sesiuni de tenis, creație artistică și spectacole de grup",
      "Artiști și antrenori experți: profesioniști în arte și sport pentru copii",
      "Beneficii: abilități creative, fitness îmbunătățit și încredere personală",
    ],
  },
] as const;

export const facilities = [
  {
    title: "Disponibilitatea terenurilor",
    description: "Sloturi de rezervare ample chiar și în orele de vârf.",
    image: "/images/why/court.jpg",
  },
  {
    title: "Curat și sigur",
    description: "Sanitizare zilnică și incintă securizată.",
    image: "/images/why/ace.jpg",
  },
  {
    title: "Orientat către membri",
    description: "Conceput pe baza feedback-ului comunității.",
    image: "/images/why/headband.jpg",
  },
  {
    title: "Dotat cu tehnologie",
    description: "Teren climatizat cu aer condiționat eficient.",
    image: "/images/why/serve.jpg",
  },
] as const;

export const gallery = [
  "/images/gallery/gallery01.jpg",
  "/images/gallery/gallery02.jpg",
  "/images/gallery/gallery03.jpg",
  "/images/gallery/gallery04.jpg",
  "/images/gallery/gallery05.jpg",
  "/images/gallery/gallery06.jpg",
] as const;

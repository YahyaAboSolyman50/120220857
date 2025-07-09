window.onload = () => {
  // Get DOM elements
  const scrollTopBtn = document.getElementById("id-btn-back");
  const article = document.getElementById("id-article");
  const menu = document.getElementById("id-btn-menu");
  const closeBtn = document.getElementById("id-btn-close");
  const nav = document.getElementById("id-aside");
  const btn = document.getElementById("id-btn");

  // Screen width checks
  const isMobile = window.innerWidth <= 768;
  const isTablet = window.innerWidth <= 1024;

  // Handle sidebar close button
  closeBtn.addEventListener("click", () => {
    nav.classList.toggle("active");
    menu.style.display = "flex";
    closeBtn.style.display = "none";
  });

  // Check current section on load
  checkPage();

  // Handle scroll events
  window.addEventListener("scroll", () => {
    checkPage();

    // Show or hide "scroll to top" button
    if (isMobile) {
      scrollTopBtn.style.display = window.scrollY > 250 ? "flex" : "none";
    } else if (isTablet) {
      // Add tablet-specific logic here if needed
    } else {
      scrollTopBtn.style.display = window.scrollY > 500 ? "block" : "none";
    }
  });

  // Handle sidebar open button
  menu.addEventListener("click", () => {
    nav.classList.toggle("active");
    menu.style.display = "none";
    closeBtn.style.display = "flex";
  });

  // Scroll to top smoothly when button is clicked
  scrollTopBtn.addEventListener("click", () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  });

  // Apply saved theme from localStorage
  if (localStorage.getItem("theme") === "dark") {
    document.body.classList.add("dark-mode");
  }

  // Handle dark/light mode toggle
  const modeBtn = document.getElementById("id-mode");
  if (modeBtn) {
    modeBtn.addEventListener("click", () => {
      document.body.classList.toggle("dark-mode");
      localStorage.setItem(
        "theme",
        document.body.classList.contains("dark-mode") ? "dark" : "light"
      );
    });
  }

  // Handle language toggle
  const langBtn = document.getElementById("id-language");
  let currentLang = localStorage.getItem("language") || "en";

  document.documentElement.setAttribute("dir", currentLang === "ar" ? "rtl" : "ltr");
  changeLanguage(currentLang);

  langBtn.addEventListener("click", () => {
    currentLang = currentLang === "en" ? "ar" : "en";
    localStorage.setItem("language", currentLang);
    document.documentElement.setAttribute("dir", currentLang === "ar" ? "rtl" : "ltr");
    changeLanguage(currentLang);
  });
};

  
  function checkPage() {
  const article = document.getElementById("id-article");
  const sections = article.querySelectorAll("section");
  const navLinks = document.querySelectorAll(".pages a");

  let maxVisibleHeight = 0;
  let currentId = "";

  sections.forEach(section => {
    const rect = section.getBoundingClientRect();
    const visibleHeight = Math.max(0, Math.min(rect.bottom, window.innerHeight) - Math.max(rect.top, 0));

    if (visibleHeight > maxVisibleHeight) {
      maxVisibleHeight = visibleHeight;
      currentId = section.id;
    }
  });

  // Remove "active" class from all navigation links
  navLinks.forEach(link => link.classList.remove("active"));

  // Highlight the current section in navigation
  subCheckPage(currentId);
}
function subCheckPage(currentId) {
  const navMap = {
    "page-id-home": "id-home",
    "page-id-about": "id-about",
    "page-id-service": "id-service",
    "page-id-work": "id-work",
    "page-id-blog": "id-blog",
    "page-id-contact": "id-contact",
  };

  const targetLink = document.getElementById(navMap[currentId]);

  if (targetLink) {
    targetLink.classList.add("active");
  } else {
    console.log("not found");
  }
}

function changeLanguage(lang) {
  const elements = document.querySelectorAll("[data-key]");

  elements.forEach(el => {
    const keyPath = el.getAttribute("data-key").split(".");
    let value = translations[lang];

    // Traverse nested keys to get the translated value
    for (let key of keyPath) {
      if (value && value.hasOwnProperty(key)) {
        value = value[key];
      } else {
        value = null;
        break;
      }
    }

    // Apply the translation to the element
    if (value !== null && value !== undefined) {
      if (el.tagName === "INPUT") {
        if (el.type === "submit" || el.type === "button") {
          el.value = value;
        } else {
          el.placeholder = value;
        }
      } else if (el.tagName === "TEXTAREA") {
        el.placeholder = value;
      } else {
        el.textContent = value;
      }
    }
  });

  // Set direction (LTR or RTL)
  document.body.dir = lang === "ar" ? "rtl" : "ltr";
}

const translations = {
  en:{
   copyrightText: {
      pr: "Copyright",
      year: "2025",
      myName: "Yahya Abosolyman",
      rights:"All Rights Reserved."
  },
  subTitle:"Front-End Developer",
  title:"Blog",
  home: "Home",
  about: "About",
  service: "Service",
  work: "Work",
  blog: "Blog",
  contact: "Contact",
  downloadCV: "Download CV",
  getInTouch: "Get In Touch",
  contactMe: "Contact Me",
  sendMessage: "Send Message",
  aboutTitle: "About Me",
  aboutName: "Yahya Abosolyman",
  aboutDetails: "I'm a frontend developer with more than 4 years of experience. If you need to receive responsive, pixel-perfect, and cross-browser websites, I'm the developer you're looking for.",
  dataAbout:[
    {
      key: "Birthday: ",
      value: "30 Mar 2003",
    },
    {
      key: "Degree: ",
      value: "Bachelor's",
    },
    {
        key:"Website: ",
        value: "www.yabosolyman.com",
    },
    {
        key:"Email: ",
        value: "yabosolyman@gmail.com",
    },
    {
        key:"Phone: ",
        value: "+970 59 324 1570",
    },
    {
      key: "Linkedin: ",
      value: "@yabosolyman",
    },
    {
        key: "Study: ",
        value: "Islamic University of Gaza",
    },
    {
      key: "Freelance: ",
      value: "Available",
    }
    
  ],
  whatIDo: "What I Do",
  serviceTitle: "Service",
  services: [
    {
      name: "Website",
      description: "Viamus ravida surna eveti semeni conse convallis. Tristique busio the nivite dianne one nivami",
    },
    {
      name: "Seo Marketing",
      description: "Viamus ravida surna eveti semeni conse convallis. Tristique busio the nivite dianne one nivami",
    },
    {
      name: "Ecommerce",
      description: "Viamus ravida surna eveti semeni conse convallis. Tristique busio the nivite dianne one nivami",
    },
    {
      name: "Graphic design",
      description: "Viamus ravida surna eveti semeni conse convallis. Tristique busio the nivite dianne one nivami",
    },
    {
      name: "Digital Marketing",
      description: "Viamus ravida surna eveti semeni conse convallis. Tristique busio the nivite dianne one nivami",
    },
    {
      name: "Social Media",
      description: "Viamus ravida surna eveti semeni conse convallis. Tristique busio the nivite dianne one nivami",
    },
  ],
  recentWork: "Recent Work Completed",
  workShowcase: "Work Showcase",
  "works": [
    {
      "title": "Work P.01",
      "description": "Book Design, Adobe XD, Photoshop, Figma"
    },
    {
      "title": "Work P.02",
      "description": "Book Design, Adobe XD, Photoshop, Figma"
    },
    {
      "title": "Work P.03",
      "description": "Book Design, Adobe XD, Photoshop, Figma"
    },
    {
      "title": "Work P.04",
      "description": "Book Design, Adobe XD, Photoshop, Figma"
    },
    {
      "title": "Work P.05",
      "description": "Book Design, Adobe XD, Photoshop, Figma"
    },
    {
      "title": "Work P.06",
      "description": "Book Design, Adobe XD, Photoshop, Figma"
    } 
  ],
  myBlog: "My Blog",
  currentNews: "Current News",
  blogItems: [
    {
      category: "Web Design",
      date: "18 Dec, 2021",
      title: "Developer Watch Out For These Burnout Symptoms",
    },
    {
      category: "Social Media",
      date: "18 Dec, 2021",
      title: "From Perfect To Positive",
    },
    {
      category: "Mobile Design",
      date: "18 Dec, 2021",
      title: "Developer Watch Out For These Burnout Symptoms",
    },
    {
      category: "Desktop Design",
      date: "18 Dec, 2021",
      title: "From Perfect To Positive",
    },
  ],
  getInTouchTitle: "Get In Touch",
  contactMeTitle: "Contact Me",
  createFuture: "Let's Create The Future",
  availableFor: "I'm available for commissions and collaborations. and I'am excited to hear from you about new project",
  contactInfo: {
    phone: "+970 59 324 1570",
    email: "yabosolyman@gmail.com",
    username: "@yabosolyman",
    address: "Palestine, Gaza, Elnaser Street",
  },
  nameInput:"Name",
  emailInput:"Email",
  messageInput:"Message",
  btnMessage:"Send Message",
  footerData:"© 2021, Yahya Abosolyman. All Right Reserved.",
},
ar:{
 copyrightText: {
      pr:"حقوق النشر",
      year: "٢٠٢٥",
      myName: "يحيى أبوسليمان",
      rights:"جميع الحقوق محفوظة.",
  },
  subTitle:"مطور واجهة امامية",
  title:"تدوينة",
  home: "الرئيسية",
  about: "حول",
  service: "خدمات",
  work: "أعمال",
  blog: "مدونة",
  contact: "اتصال",
  downloadCV: "تحميل السيرة الذاتية",
  getInTouch: "تواصل معنا",
  contactMe: "اتصل بي",
  sendMessage: "إرسال الرسالة",
  aboutTitle: "حولني",
  aboutName: "يحيى أبو سليمان",
  aboutDetails: "أنا مطور واجهات أمامية مع أكثر من 4 سنوات خبرة. إذا كنت تريد مواقع متجاوبة، دقيقة ومتوافقة مع جميع المتصفحات، فأنا المطور الذي تبحث عنه.",
  dataAbout: [
    {
      key: "تاريخ الميلاد: ",
      value: "٣٠ مارس ٢٠٠٣",
    },
    {
      key: "الدرجة العلمية: ",
      value: "بكالوريوس",
    },
    {
      key: "الموقع الإلكتروني: ",
      value: "www.yabosolyman.com",
    },
    {
      key: "البريد الإلكتروني: ",
      value: "yabosolyman@gmail.com",
    },
    {
      key: "رقم الهاتف: ",
      value: "+٩٧٠ ٥٩ ٣٢٤ ١٥٧",
    },
    {
      key: "لينكد إن: ",
      value: "@yabosolyman",
    },
    {
      key: "الدراسة: ",
      value: "الجامعة الإسلامية – غزة",
    },
    {
      key: "العمل الحر: ",
      value: "متاح",
    }
  ],
  whatIDo: "ما الذي أفعله",
  serviceTitle: "الخدمات",
  services: [
    {
      name: "مواقع إلكترونية",
      description: "فياموسرافي دا سورنا إفيتي سيميني كونس كونفاليس. تريستيك بوسيو ذي نيفيتي ديان وان نيفامي",
    },
    {
      name: "تسويق محركات البحث",
      description: "فياموسرافي دا سورنا إفيتي سيميني كونس كونفاليس. تريستيك بوسيو ذي نيفيتي ديان وان نيفامي",
    },
    {
      name: "تجارة إلكترونية",
      description: "فياموسرافي دا سورنا إفيتي سيميني كونس كونفاليس. تريستيك بوسيو ذي نيفيتي ديان وان نيفامي",
    },
    {
      name: "تصميم جرافيكي",
      description: "فياموسرافي دا سورنا إفيتي سيميني كونس كونفاليس. تريستيك بوسيو ذي نيفيتي ديان وان نيفامي",
    },
    {
      name: "التسويق الرقمي",
      description: "فياموسرافي دا سورنا إفيتي سيميني كونس كونفاليس. تريستيك بوسيو ذي نيفيتي ديان وان نيفامي",
    },
    {
      name: "وسائل التواصل الاجتماعي",
      description: "فياموسرافي دا سورنا إفيتي سيميني كونس كونفاليس. تريستيك بوسيو ذي نيفيتي ديان وان نيفامي",
    },
  ],
  recentWork: "الأعمال الحديثة المنجزة",
  workShowcase: "عرض الأعمال",
  "works": [
    {
      "title": "العمل ٠١",
      "description": "تصميم كتب، أدوبي XD، فوتوشوب، فيغما"
    },
    {
      "title": "العمل ٠٢",
      "description": "تصميم كتب، أدوبي XD، فوتوشوب، فيغما"
    },
    {
      "title": "العمل ٠٣",
      "description": "تصميم كتب، أدوبي XD، فوتوشوب، فيغما"
    },
    {
      "title": "العمل ٠٤",
      "description": "تصميم كتب، أدوبي XD، فوتوشوب، فيغما"
    },
    {
      "title": "العمل ٠٥",
      "description": "تصميم كتب، أدوبي XD، فوتوشوب، فيغما"
    },
    {
      "title": "العمل ٠٦",
      "description": "تصميم كتب، أدوبي XD، فوتوشوب، فيغما"
    }
  ],
  myBlog: "مدونتي",
  currentNews: "الأخبار الحالية",
  blogItems: [
    {
      category: "تصميم ويب",
      date: "١٨ ديسمبر ٢٠٢١",
      title: "المطورون احذروا أعراض الإرهاق",
    },
    {
      category: "وسائل التواصل",
      date: "١٨ ديسمبر ٢٠٢١",
      title: "من الكمال إلى الإيجابية",
    },
    {
      category: "تصميم الجوال",
      date: "١٨ ديسمبر ٢٠٢١",
      title: "المطورون احذروا أعراض الإرهاق",
    },
    {
      category: "تصميم سطح المكتب",
      date: "١٨ ديسمبر ٢٠٢١",
      title: "من الكمال إلى الإيجابية",
    },
  ],
  getInTouchTitle: "تواصل معنا",
  contactMeTitle: "اتصل بي",
  createFuture: "لنصنع المستقبل",
  availableFor: "أنا متاح للطلبات والتعاونات، ويسعدني سماع أخبار مشاريعك الجديدة.",
  contactInfo: {
    phone: "+٩٧٠ ٥٩ ٣٢٤ ١٥٧",
    email: "yabosolyman@gmail.com",
    username: "@yabosolyman",
    address: "فلسطين، غزة، شارع النصر",
  },
  nameInput:"إسم",
  emailInput:"إيميل",
  messageInput:"رسالة",
  btnMessage:"إرسال رسالة",
  footerData:"٢٠٢٥©, يحيى ابوسليمان. جميع حقوق النشر محفوظة"
  },
  
};



// Language Switcher Module
class LanguageSwitcher {
  constructor() {
    this.currentLang = localStorage.getItem('preferredLang') || 'en';
    this.translations = {};
    this.init();
  }

  async init() {
    await this.loadTranslations(this.currentLang);
    this.applyTranslations();
    this.setupEventListeners();
    this.updateLanguageUI();
  }

  async loadTranslations(lang) {
    try {
      const response = await fetch(`./frontend/asset/lang/${lang}.json`);
      this.translations = await response.json();
    } catch (error) {
      console.error('Failed to load translations:', error);
    }
  }

  applyTranslations() {
    const elements = document.querySelectorAll('[data-key]');
    elements.forEach(element => {
      const key = element.getAttribute('data-key');
      if (this.translations[key]) {
        element.textContent = this.translations[key];
      }
    });
  }

  async switchLanguage(lang) {
    if (lang === this.currentLang) return;
    
    this.currentLang = lang;
    localStorage.setItem('preferredLang', lang);
    
    await this.loadTranslations(lang);
    this.applyTranslations();
    this.updateLanguageUI();
    this.updateDocumentDirection();
  }

  updateDocumentDirection() {
    const html = document.documentElement;
    if (this.currentLang === 'ar') {
      html.setAttribute('dir', 'rtl');
      html.setAttribute('lang', 'ar');
    } else {
      html.setAttribute('dir', 'ltr');
      html.setAttribute('lang', 'en');
    }
  }

  updateLanguageUI() {
    const enButton = document.querySelector('[data-key="lang-en"]');
    const arButton = document.querySelector('[data-key="lang-ar"]');
    
    if (enButton && arButton) {
      if (this.currentLang === 'en') {
        enButton.classList.add('bg-surface-elevated', 'text-accent', 'font-semibold');
        enButton.classList.remove('hover:text-white');
        arButton.classList.remove('bg-surface-elevated', 'text-accent', 'font-semibold');
        arButton.classList.add('hover:text-white');
      } else {
        arButton.classList.add('bg-surface-elevated', 'text-accent', 'font-semibold');
        arButton.classList.remove('hover:text-white');
        enButton.classList.remove('bg-surface-elevated', 'text-accent', 'font-semibold');
        enButton.classList.add('hover:text-white');
      }
    }
  }

  setupEventListeners() {
    const enButton = document.querySelector('[data-key="lang-en"]');
    const arButton = document.querySelector('[data-key="lang-ar"]');
    
    if (enButton) {
      enButton.addEventListener('click', (e) => {
        e.preventDefault();
        this.switchLanguage('en');
      });
    }
    
    if (arButton) {
      arButton.addEventListener('click', (e) => {
        e.preventDefault();
        this.switchLanguage('ar');
      });
    }
  }
}

// Initialize language switcher when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
  window.languageSwitcher = new LanguageSwitcher();
});

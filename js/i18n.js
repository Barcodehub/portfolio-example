class I18nManager {
    constructor() {
      this.translations = {
        'es': ES_TRANSLATIONS,
        'en': EN_TRANSLATIONS
      };
      this.currentLanguage = 'es';
    }
  
    // Inicializa el sistema de internacionalización
    init() {
      this.loadPreferredLanguage();
      this.registerEventListeners();
      this.updateContent();
    }
  
    // Carga el idioma preferido del usuario
    loadPreferredLanguage() {
      const savedLang = localStorage.getItem('preferred-language');
      const browserLang = navigator.language.split('-')[0];
      const defaultLang = 'es';
  
      this.currentLanguage = savedLang || 
                            (this.translations[browserLang] ? browserLang : defaultLang);
      
      document.documentElement.lang = this.currentLanguage;
    }
  
    // Registra los event listeners necesarios
    registerEventListeners() {
      window.addEventListener('DOMContentLoaded', () => this.updateContent());
    }
  
    // Cambia el idioma actual
    changeLanguage(lang) {
      if (this.translations[lang]) {
        this.currentLanguage = lang;
        document.documentElement.lang = lang;
        localStorage.setItem('preferred-language', lang);
        this.updateContent();
        this.updateLanguageButtons();
      }
    }
  
    // Actualiza el contenido de la página con las traducciones
    updateContent() {
      document.querySelectorAll('[data-i18n]').forEach(element => {
        const key = element.getAttribute('data-i18n');
        const translation = this.translations[this.currentLanguage][key];
  
        if (translation) {
          // Si el elemento es una lista y la traducción es un array
          if (element.tagName === 'UL' && Array.isArray(translation)) {
            element.innerHTML = translation
              .map(item => `<li>${item}</li>`)
              .join('');
          } else {
            // Para elementos normales, actualizar el innerHTML para permitir iconos
            element.innerHTML = translation;
          }
        }
      });
    }
  
    // Actualiza los botones de selección de idioma
    updateLanguageButtons() {
      document.querySelectorAll('.lang-btn').forEach(btn => {
        const btnLang = btn.getAttribute('data-lang');
        btn.classList.toggle('active', btnLang === this.currentLanguage);
      });
    }
  
    // Obtiene una traducción específica
    translate(key) {
      return this.translations[this.currentLanguage][key] || key;
    }
  }
  
  // Crear instancia global del manejador de internacionalización
  const i18n = new I18nManager();
  
  // Función global para cambiar el idioma
  function changeLanguage(lang) {
    i18n.changeLanguage(lang);
  }
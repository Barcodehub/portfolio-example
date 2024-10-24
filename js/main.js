// Inicialización cuando el DOM está listo
document.addEventListener('DOMContentLoaded', () => {
    // Inicializar el sistema de internacionalización
    i18n.init();
  
    // Función para mostrar contenido de pestañas
    window.showContent = function(tab) {
      document.querySelectorAll('.tab-content').forEach(content => {
        content.style.display = 'none';
      });
      
      document.querySelectorAll('.tab').forEach(tabElem => {
        tabElem.classList.remove('active-tab');
      });
      
      document.getElementById(tab).style.display = 'block';
      event.currentTarget.classList.add('active-tab');
    };
  });
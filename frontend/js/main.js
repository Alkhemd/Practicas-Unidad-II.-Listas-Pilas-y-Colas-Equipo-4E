// ============================================
// Main JavaScript - Prácticas Unidad II
// ============================================

document.addEventListener('DOMContentLoaded', function() {
    console.log('🚀 Aplicación cargada correctamente');
    
    // Animación suave al hacer scroll
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
    
    // Efecto hover en las cards
    const cards = document.querySelectorAll('.card');
    cards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-8px) scale(1.02)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
    });
});

// Función para mostrar notificaciones
function showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.textContent = message;
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.remove();
    }, 3000);
}

// Función para validar formularios
function validateForm(formData) {
    const errors = [];
    
    for (const [key, value] of Object.entries(formData)) {
        if (!value || value.trim() === '') {
            errors.push(`El campo ${key} es requerido`);
        }
    }
    
    return {
        isValid: errors.length === 0,
        errors: errors
    };
}

// Exportar funciones para uso global
window.appUtils = {
    showNotification,
    validateForm
};

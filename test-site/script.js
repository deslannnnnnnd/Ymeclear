// Configuration EmailJS
const EMAILJS_PUBLIC_KEY = 'zI5oeRtCieNNcSjsu';
const EMAILJS_SERVICE_ID = 'service_19lh6ma';
const EMAILJS_TEMPLATE_ID = 'template_zbrqpue';

// Initialisation EmailJS
emailjs.init(EMAILJS_PUBLIC_KEY);

// Éléments du DOM
const form = document.getElementById('reservationForm');
const submitButton = document.querySelector('.submit-button');
const formStatus = document.getElementById('form-status');

// Données de test
const testData = {
    valid: {
        name: 'Jean Dupont',
        email: 'jean.dupont@example.com',
        phone: '514-577-6953',
        type: 'particulier',
        service: 'residentiel',
        address: '123 Rue Principale, Montréal',
        date: getNextMonday(),
        time: '10:00',
        message: 'Demande de nettoyage complet',
        firstTime: true
    },
    'invalid-date': {
        ...testData.valid,
        date: getNextSaturday()
    },
    'invalid-time': {
        ...testData.valid,
        time: '19:00'
    },
    empty: {
        name: '',
        email: '',
        phone: '',
        type: '',
        service: '',
        address: '',
        date: '',
        time: '',
        message: '',
        firstTime: false
    }
};

// Fonctions utilitaires
function getNextMonday() {
    const today = new Date();
    const nextMonday = new Date(today);
    nextMonday.setDate(today.getDate() + ((8 - today.getDay()) % 7));
    return nextMonday.toISOString().split('T')[0];
}

function getNextSaturday() {
    const today = new Date();
    const nextSaturday = new Date(today);
    nextSaturday.setDate(today.getDate() + ((6 - today.getDay() + 7) % 7));
    return nextSaturday.toISOString().split('T')[0];
}

function showStatus(message, isError = false) {
    formStatus.innerHTML = `
        <div class="${isError ? 'error-message' : 'success-message'}">
            <i class="fas ${isError ? 'fa-exclamation-circle' : 'fa-check-circle'}"></i>
            ${message}
        </div>
    `;
}

function setLoading(isLoading) {
    submitButton.disabled = isLoading;
    submitButton.innerHTML = isLoading ? 
        '<i class="fas fa-spinner"></i> Envoi en cours...' : 
        'Envoyer la demande';
}

// Validation du formulaire
function validateForm(formData) {
    const errors = [];

    // Validation de la date (pas le weekend)
    const date = new Date(formData.date);
    if (date.getDay() === 0 || date.getDay() === 6) {
        errors.push('Les rendez-vous ne sont pas disponibles le weekend');
    }

    // Validation de l'heure (8h-18h)
    const [hours] = formData.time.split(':');
    if (hours < 8 || hours >= 18) {
        errors.push('Les rendez-vous sont disponibles entre 8h et 18h');
    }

    // Validation des champs requis
    const requiredFields = ['name', 'email', 'phone', 'type', 'service', 'address', 'date', 'time'];
    for (const field of requiredFields) {
        if (!formData[field]) {
            errors.push(`Le champ ${field} est requis`);
        }
    }

    return errors;
}

// Gestion de la soumission du formulaire
async function handleSubmit(event) {
    event.preventDefault();
    
    const formData = {
        name: form.name.value,
        email: form.email.value,
        phone: form.phone.value,
        type: form.type.value,
        service: form.service.value,
        address: form.address.value,
        date: form.date.value,
        time: form.time.value,
        message: form.message.value,
        firstTime: form.firstTime.checked
    };

    // Validation
    const errors = validateForm(formData);
    if (errors.length > 0) {
        showStatus(errors.join('<br>'), true);
        return;
    }

    // Envoi du formulaire
    setLoading(true);
    try {
        const response = await emailjs.send(EMAILJS_SERVICE_ID, EMAILJS_TEMPLATE_ID, formData);
        if (response.status === 200) {
            showStatus('Votre demande a été envoyée avec succès !');
            form.reset();
        } else {
            throw new Error('Erreur lors de l\'envoi du formulaire');
        }
    } catch (error) {
        console.error('Erreur EmailJS:', error);
        let errorMessage = 'Une erreur est survenue lors de l\'envoi du formulaire. ';
        
        if (error.text) {
            if (error.text.includes('template ID not found')) {
                errorMessage += 'Erreur de configuration du template EmailJS.';
            } else if (error.text.includes('service ID not found')) {
                errorMessage += 'Erreur de configuration du service EmailJS.';
            } else {
                errorMessage += error.text;
            }
        } else {
            errorMessage += 'Veuillez réessayer.';
        }
        
        showStatus(errorMessage, true);
    } finally {
        setLoading(false);
    }
}

// Fonctions de test
function fillForm(data) {
    Object.keys(data).forEach(key => {
        const element = form[key];
        if (element) {
            if (element.type === 'checkbox') {
                element.checked = data[key];
            } else {
                element.value = data[key];
            }
            element.dispatchEvent(new Event('change'));
        }
    });
}

function runTest(type) {
    fillForm(testData[type]);
    showStatus(`Test "${type}" exécuté`, false);
}

// Event listeners
form.addEventListener('submit', handleSubmit);

// Les boutons de test sont déjà configurés avec onclick dans le HTML 
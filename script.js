// Configuration EmailJS
(function() {
    emailjs.init("zI5oeRtCieNNcSjsu"); // Clé publique EmailJS
})();

// Gestion du menu burger pour mobile
const burger = document.querySelector('.burger');
const nav = document.querySelector('.nav-links');

if (burger) {
    burger.addEventListener('click', () => {
        nav.classList.toggle('nav-active');
        burger.classList.toggle('toggle');
    });
}

// Animation au défilement
const observerOptions = {
    root: null,
    rootMargin: '0px',
    threshold: 0.1
};

const observer = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

// Observer les éléments à animer
document.addEventListener('DOMContentLoaded', () => {
    const elementsToAnimate = document.querySelectorAll(
        '.service-card, .testimonial-card, .contact-form, .value-card, .contract-card'
    );
    
    elementsToAnimate.forEach(element => {
        observer.observe(element);
    });

    // Animation du texte de la section hero
    const heroText = document.querySelector('.hero h1, .hero p');
    if (heroText) {
        heroText.classList.add('fade-in');
        setTimeout(() => heroText.classList.add('visible'), 100);
    }
});

// Effet de parallaxe sur les sections hero
window.addEventListener('scroll', () => {
    const heroSections = document.querySelectorAll('.hero, .services-hero, .about-hero, .contact-hero');
    heroSections.forEach(section => {
        const scrolled = window.pageYOffset;
        const rate = scrolled * 0.5;
        section.style.backgroundPosition = `center ${rate}px`;
    });
});

// Animation des prix au survol
const priceElements = document.querySelectorAll('.price');
priceElements.forEach(price => {
    price.addEventListener('mouseover', () => {
        price.style.transform = 'scale(1.1)';
    });
    price.addEventListener('mouseout', () => {
        price.style.transform = 'scale(1)';
    });
});

// Animation des boutons CTA
const ctaButtons = document.querySelectorAll('.cta-button');
ctaButtons.forEach(button => {
    button.addEventListener('mouseover', (e) => {
        const x = e.pageX - button.offsetLeft;
        const y = e.pageY - button.offsetTop;
        button.style.setProperty('--x', `${x}px`);
        button.style.setProperty('--y', `${y}px`);
    });
});

// Attendre que le DOM soit chargé
document.addEventListener('DOMContentLoaded', function() {
    // Sélection des éléments du formulaire
    const form = document.getElementById('reservationForm');
    const nameInput = document.getElementById('name');
    const emailInput = document.getElementById('email');
    const phoneInput = document.getElementById('phone');
    const typeInput = document.getElementById('type');
    const serviceInput = document.getElementById('service');
    const addressInput = document.getElementById('address');
    const dateInput = document.getElementById('date');
    const timeInput = document.getElementById('time');
    const messageInput = document.getElementById('message');
    const firstTimeInput = document.getElementById('firstTime');
    const submitButton = form.querySelector('button[type="submit"]');
    const formStatus = document.getElementById('form-status');

    // Fonction pour afficher les messages
    function showMessage(message, isError = false) {
        formStatus.innerHTML = `
            <div class="${isError ? 'error-message' : 'success-message'}">
                <i class="fas fa-${isError ? 'exclamation-circle' : 'check-circle'}"></i>
                ${message}
            </div>
        `;
    }

    // Fonction pour envoyer l'email
    async function handleSubmit(e) {
        e.preventDefault();
        console.log('Formulaire soumis');
        
        // Validation de la date
        const selectedDate = new Date(dateInput.value);
        const dayOfWeek = selectedDate.getDay();
        
        if (dayOfWeek === 0 || dayOfWeek === 6) {
            showMessage("Les rendez-vous ne sont pas disponibles les weekends.", true);
            return;
        }
        
        // Validation de l'heure
        const [hours, minutes] = timeInput.value.split(':').map(Number);
        if (hours < 8 || hours >= 18) {
            showMessage("Les rendez-vous sont disponibles uniquement entre 8h et 18h.", true);
            return;
        }
        
        // Afficher le spinner
        submitButton.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Envoi en cours...';
        submitButton.disabled = true;
        
        try {
            // Formatage de la date en français
            const date = new Date(dateInput.value);
            const formattedDate = date.toLocaleDateString('fr-FR', {
                weekday: 'long',
                year: 'numeric',
                month: 'long',
                day: 'numeric'
            });

            const templateParams = {
                from_name: nameInput.value,
                from_email: emailInput.value,
                phone: phoneInput.value,
                client_type: typeInput.options[typeInput.selectedIndex].text,
                service_type: serviceInput.options[serviceInput.selectedIndex].text,
                address: addressInput.value,
                appointment_date: formattedDate,
                appointment_time: timeInput.value,
                message: messageInput.value || 'Aucun message',
                first_time: firstTimeInput.checked ? 'Oui (10% de réduction)' : 'Non',
                subject: `Nouvelle demande de rendez-vous - ${nameInput.value}`,
                to_name: 'ymeclear'
            };

            console.log('Envoi des paramètres:', templateParams);

            const response = await emailjs.send(
                'service_19lh6ma',
                'template_zbrqpue',
                templateParams
            );

            console.log('Réponse EmailJS:', response);

            if (response.status === 200) {
                showMessage("Votre demande a été envoyée avec succès !");
                form.reset();
            } else {
                throw new Error('Erreur lors de l\'envoi');
            }
        } catch (error) {
            console.error('Erreur détaillée:', error);
            showMessage("Une erreur est survenue lors de l'envoi de votre demande. Veuillez réessayer.", true);
        } finally {
            submitButton.innerHTML = 'Envoyer la demande';
            submitButton.disabled = false;
        }
    }

    // Ajout de l'écouteur d'événement sur le formulaire
    if (form) {
        form.addEventListener('submit', handleSubmit);
        console.log('Écouteur d\'événement ajouté au formulaire');
    } else {
        console.error('Formulaire non trouvé');
    }
});

// Animation des témoignages
const testimonialCards = document.querySelectorAll('.testimonial-card');
testimonialCards.forEach((card, index) => {
    card.style.transitionDelay = `${index * 0.2}s`;
});

// Animation des services
const serviceCards = document.querySelectorAll('.service-card');
serviceCards.forEach((card, index) => {
    card.style.transitionDelay = `${index * 0.1}s`;
}); 
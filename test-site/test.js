// Classe pour simuler un client fictif
class ClientFictif {
    constructor() {
        this.nom = 'Jean Dupont';
        this.email = 'jean.dupont@example.com';
        this.telephone = '514-577-6953';
        this.adresse = '123 Rue Principale, Montréal';
        this.message = 'Bonjour, je souhaite prendre rendez-vous pour un nettoyage complet de ma maison. C\'est une première visite.';
    }

    async naviguerSurLeSite() {
        console.log('🔄 Simulation de navigation du client...');
        
        // Simuler la visite des pages
        await this.visiterPage('Accueil');
        await this.visiterPage('Services');
        await this.visiterPage('À propos');
        await this.visiterPage('Contact');
        
        // Remplir le formulaire
        await this.remplirFormulaire();
    }

    async visiterPage(page) {
        console.log(`📄 Le client visite la page ${page}...`);
        await new Promise(resolve => setTimeout(resolve, 1000));
    }

    async remplirFormulaire() {
        console.log('📝 Le client commence à remplir le formulaire...');
        
        // Remplir les champs du formulaire
        const form = document.getElementById('reservationForm');
        
        // Données de test
        const formData = {
            name: this.nom,
            email: this.email,
            phone: this.telephone,
            type: 'particulier',
            service: 'residentiel',
            address: this.adresse,
            date: this.getProchaineDateDisponible(),
            time: '10:00',
            message: this.message,
            firstTime: true
        };

        // Remplir chaque champ
        Object.keys(formData).forEach(key => {
            const element = form[key];
            if (element) {
                if (element.type === 'checkbox') {
                    element.checked = formData[key];
                } else {
                    element.value = formData[key];
                }
                element.dispatchEvent(new Event('change'));
            }
        });

        console.log('✅ Formulaire rempli avec succès !');
        console.log('📊 Données saisies :', formData);
    }

    getProchaineDateDisponible() {
        const today = new Date();
        let nextDate = new Date(today);
        
        // Si aujourd'hui est samedi ou dimanche, on commence à partir de lundi
        if (today.getDay() === 0) { // Dimanche
            nextDate.setDate(today.getDate() + 1);
        } else if (today.getDay() === 6) { // Samedi
            nextDate.setDate(today.getDate() + 2);
        } else {
            // Si c'est déjà après 18h, on prend le jour suivant
            if (today.getHours() >= 18) {
                nextDate.setDate(today.getDate() + 1);
            }
        }

        // Si le jour suivant est samedi ou dimanche, on passe au lundi
        if (nextDate.getDay() === 0) { // Dimanche
            nextDate.setDate(nextDate.getDate() + 1);
        } else if (nextDate.getDay() === 6) { // Samedi
            nextDate.setDate(nextDate.getDate() + 2);
        }

        return nextDate.toISOString().split('T')[0];
    }
}

// Démarrer la simulation quand la page est chargée
window.addEventListener('load', () => {
    console.log('🚀 Démarrage de la simulation...');
    const client = new ClientFictif();
    client.naviguerSurLeSite();
}); 
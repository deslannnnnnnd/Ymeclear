// Simulation d'un client fictif
class ClientFictif {
    constructor() {
        this.nom = 'Jean Dupont';
        this.email = 'jean.dupont@example.com';
        this.telephone = '514-577-6953';
        this.adresse = '123 Rue Principale, Montréal';
    }

    // Simuler la navigation sur le site
    async naviguerSurLeSite() {
        console.log('=== Simulation de navigation ===');
        
        // Visite de la page d'accueil
        console.log('\n1. Visite de la page d\'accueil');
        await this.visiterPage('index.html');
        
        // Visite de la page services
        console.log('\n2. Visite de la page services');
        await this.visiterPage('services.html');
        
        // Visite de la page à propos
        console.log('\n3. Visite de la page à propos');
        await this.visiterPage('about.html');
        
        // Visite de la page contact et remplissage du formulaire
        console.log('\n4. Visite de la page contact et remplissage du formulaire');
        await this.visiterPage('contact.html');
        await this.remplirFormulaire();
    }

    // Simuler la visite d'une page
    async visiterPage(page) {
        console.log(`Visite de ${page}...`);
        // Simuler un délai de lecture
        await new Promise(resolve => setTimeout(resolve, 2000));
        console.log(`Page ${page} visitée avec succès`);
    }

    // Remplir le formulaire de contact
    async remplirFormulaire() {
        console.log('\nRemplissage du formulaire de contact...');
        
        // Récupérer les champs du formulaire
        const form = document.querySelector('#reservationForm');
        if (!form) {
            console.error('Formulaire non trouvé !');
            return;
        }

        // Remplir les champs
        const formData = {
            name: this.nom,
            email: this.email,
            phone: this.telephone,
            type: 'particulier',
            service: 'residentiel',
            address: this.adresse,
            date: this.getProchaineDateDisponible(),
            time: '10:00',
            message: 'Bonjour, je souhaite prendre rendez-vous pour un nettoyage complet de mon appartement. C\'est la première fois que je fais appel à vos services.',
            firstTime: true
        };

        // Remplir chaque champ
        for (const [id, value] of Object.entries(formData)) {
            const element = document.querySelector(`#${id}`);
            if (element) {
                if (element.type === 'checkbox') {
                    element.checked = value;
                } else {
                    element.value = value;
                }
                element.dispatchEvent(new Event('change'));
                console.log(`Champ ${id} rempli avec : ${value}`);
            }
        }

        // Simuler un délai avant l'envoi
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        // Envoyer le formulaire
        console.log('\nEnvoi du formulaire...');
        form.dispatchEvent(new Event('submit'));
    }

    // Obtenir la prochaine date disponible (lundi)
    getProchaineDateDisponible() {
        const date = new Date();
        const joursJusquaLundi = (8 - date.getDay()) % 7;
        date.setDate(date.getDate() + joursJusquaLundi);
        return date.toISOString().split('T')[0];
    }
}

// Exécuter la simulation
async function demarrerSimulation() {
    console.log('=== Démarrage de la simulation client ===\n');
    
    const client = new ClientFictif();
    await client.naviguerSurLeSite();
    
    console.log('\n=== Simulation terminée ===');
}

// Démarrer la simulation après le chargement de la page
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', demarrerSimulation);
} else {
    demarrerSimulation();
} 
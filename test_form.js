// Fonction pour simuler le remplissage du formulaire
function fillForm() {
    // Récupérer tous les champs du formulaire
    const nameInput = document.querySelector('#name');
    const emailInput = document.querySelector('#email');
    const phoneInput = document.querySelector('#phone');
    const typeSelect = document.querySelector('#type');
    const serviceSelect = document.querySelector('#service');
    const addressInput = document.querySelector('#address');
    const dateInput = document.querySelector('#date');
    const timeInput = document.querySelector('#time');
    const messageInput = document.querySelector('#message');
    const firstTimeCheckbox = document.querySelector('#firstTime');

    // Remplir les champs avec des données de test
    nameInput.value = 'Test User';
    emailInput.value = 'test@example.com';
    phoneInput.value = '514-577-6953';
    typeSelect.value = 'particulier';
    serviceSelect.value = 'residentiel';
    addressInput.value = '123 Test Street, Montreal';
    
    // Définir une date en semaine (lundi)
    const nextMonday = new Date();
    nextMonday.setDate(nextMonday.getDate() + (8 - nextMonday.getDay()));
    dateInput.value = nextMonday.toISOString().split('T')[0];
    
    // Définir une heure entre 8h et 18h
    timeInput.value = '10:00';
    
    messageInput.value = 'Ceci est un message de test';
    firstTimeCheckbox.checked = true;

    // Déclencher les événements de changement pour activer les validations
    nameInput.dispatchEvent(new Event('change'));
    emailInput.dispatchEvent(new Event('change'));
    phoneInput.dispatchEvent(new Event('change'));
    typeSelect.dispatchEvent(new Event('change'));
    serviceSelect.dispatchEvent(new Event('change'));
    addressInput.dispatchEvent(new Event('change'));
    dateInput.dispatchEvent(new Event('change'));
    timeInput.dispatchEvent(new Event('change'));
    messageInput.dispatchEvent(new Event('change'));
    firstTimeCheckbox.dispatchEvent(new Event('change'));

    console.log('Formulaire rempli avec succès !');
}

// Fonction pour tester la validation de la date
function testDateValidation() {
    const dateInput = document.querySelector('#date');
    
    // Test avec un samedi
    const saturday = new Date();
    saturday.setDate(saturday.getDate() + (6 - saturday.getDay()));
    dateInput.value = saturday.toISOString().split('T')[0];
    dateInput.dispatchEvent(new Event('change'));
    
    console.log('Test de validation de date effectué');
}

// Fonction pour tester la validation de l'heure
function testTimeValidation() {
    const timeInput = document.querySelector('#time');
    
    // Test avec une heure en dehors des horaires
    timeInput.value = '19:00';
    timeInput.dispatchEvent(new Event('change'));
    
    console.log('Test de validation d\'heure effectué');
}

// Fonction pour tester l'envoi du formulaire
function testFormSubmission() {
    const form = document.querySelector('#reservationForm');
    const submitButton = form.querySelector('button[type="submit"]');
    
    // Simuler le clic sur le bouton d'envoi
    submitButton.click();
    
    console.log('Test d\'envoi du formulaire effectué');
}

// Fonction principale de test
function runTests() {
    console.log('Démarrage des tests...');
    
    // Test 1: Remplissage du formulaire
    console.log('\nTest 1: Remplissage du formulaire');
    fillForm();
    
    // Test 2: Validation de la date
    console.log('\nTest 2: Validation de la date');
    testDateValidation();
    
    // Test 3: Validation de l'heure
    console.log('\nTest 3: Validation de l\'heure');
    testTimeValidation();
    
    // Test 4: Envoi du formulaire
    console.log('\nTest 4: Envoi du formulaire');
    testFormSubmission();
    
    console.log('\nTests terminés !');
}

// Exécuter les tests
runTests(); 
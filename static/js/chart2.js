var ctx2 = document.getElementById('doughnut').getContext('2d');
var myChart2 = new Chart(ctx2, {
    type: 'polarArea',
    data: {
        labels: ['Utilisateurs', 'Demandes Creation Compte', 'Commentaires', 'Assistance'],
        datasets: [{
            label: 'Pourcentage Utilisation de la plateforme',
            data: [20, 12, 8, 6],
            backgroundColor: [
                'rgba(41, 155, 99, 1)',
                'rgba(54, 162, 235, 1)',
                'rgba(255, 206, 86, 1)',
                'rgba(120, 46, 139, 1)'
            ],
            borderColor: [
                'rgba(41, 155, 99, 1)',
                'rgba(54, 162, 235, 1)',
                'rgba(255, 206, 86, 1)',
                'rgba(120, 46, 139, 1)'
            ],
            borderWidth: 1
        }]
    },
    options: {
        responsive: true,
        maintainAspectRatio: false // Permet au graphique de remplir le conteneur
    }
});
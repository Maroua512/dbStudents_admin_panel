
// add hovered class to selected list item
let list = document.querySelectorAll(".navigation li");

function activeLink() {
  list.forEach((item) => {
    item.classList.remove("hovered");
  });
  this.classList.add("hovered");
}

list.forEach((item) => item.addEventListener("mouseover", activeLink));

// Menu Toggle
let toggle = document.querySelector(".toggle");
let navigation = document.querySelector(".navigation");
let main = document.querySelector(".main");

toggle.onclick = function () {
  navigation.classList.toggle("active");
  main.classList.toggle("active");
};

const refreshIcon = document.getElementById('refreshIcon');

// Ajoutez un gestionnaire d'événements au clic sur l'icône de rafraîchissement
refreshIcon.addEventListener('click', function() {
  console.log('Le gestionnaire d\'événements pour l\'icône de rafraîchissement est appelé !');
  // Ajoutez la classe pour démarrer l'animation
  refreshIcon.classList.add('rotate-refresh');
  console.log('Le gestionnaire d\'événements pour l\'icône de rafraîchissement est appelé !');
  // Définissez un délai pour l'animation (par exemple, 2 secondes)
  setTimeout(() => {
    // Supprimez la classe une fois le délai écoulé pour réinitialiser l'icône
    refreshIcon.classList.remove('rotate-refresh');
    console.log('Le gestionnaire d\'événements pour l\'icône de rafraîchissement est appelé !');
  }, 4000); // 2000 ms = 2 secondes (ajustez selon vos besoins)
});

async function refreshTable() {
  try {
    const response = await axios.get('/get_data');
    const tableBody = document.querySelector('#dataTable tbody');
    tableBody.innerHTML = ''; // Efface les lignes de tableau existantes

    response.data.forEach((row) => {
      const tr = document.createElement('tr');
      tr.innerHTML = `
      <td>${user.id}</td>
      <td>${user.nom}</td>
      <td>${user.email}</td>
      <td>${user.numero}</td>
      <td>${user.type_user}</td>
      <td><img src="${user.photo_profile}" alt=""></td>
      <td><button class="delete-button" onclick="deleteUser('${user.id}')"><ion-icon name="trash-outline"></ion-icon></button></td>
    `;
      tableBody.appendChild(tr);
    });
  } catch (error) {
    console.error('Erreur lors de la récupération des données :', error);
  }
}
axios.defaults.xsrfHeaderName = "X-CSRFTOKEN"; // Nom de l'en-tête CSRF
axios.defaults.xsrfCookieName = "csrftoken"; // Nom du cookie CSRF

async function deleteUser(userId) {
  Swal.fire({
    title: 'Assistance',
    html: `<p>Etes-vous sûr de vouloir supprimer cet utilisateur ?</p>`,
    showConfirmButton: true,
    showCancelButton: true,
    confirmButtonText: 'Confirmer',
    cancelButtonText: 'Annuler',
  }).then((result) => {
    if (result.isConfirmed) {
      // Afficher une alerte de succès
      Swal.fire('Supprimé!', 'L\'utilisateur a été supprimé.', 'success');
      
      // Ajoutez ici la logique pour supprimer l'utilisateur
      axios.delete(`/delete_user/${userId}`)
        .then(response => {
          // Si la suppression réussit, actualiser la page ou mettre à jour le tableau après la suppression
          // Exemple : window.location.reload();
        })
        .catch(error => {
          console.error('Erreur lors de la suppression de l\'utilisateur :', error);
        });
    }
  });
}


  // if (confirm("Êtes-vouFdds sûr de vouloir supprimer cet utilisateur ?")) {
  //   try {
  //     await axios.delete(`/delete_user/${userId}`);
  //     // Supprimer la ligne correspondante dans le tableau
  //     const rowToRemove = document.querySelector(`#dataTable tbody tr[data-user-id="${userId}"]`);
  //     if (rowToRemove) {
  //       rowToRemove.remove();
  //     }
  //   } catch (error) {
  //     console.error("Erreur lors de la suppression de l'utilisateur :", error);
  //   }
  // }

document.getElementById('refreshIcon').addEventListener('click', function() {
  // Rechargez la page actuelle
  window.location.reload();
});
document.addEventListener("DOMContentLoaded", function() {
  const rows = document.querySelectorAll("#dataDemande tbody tr.clickable-row");

  rows.forEach(row => {
    row.addEventListener("click", function() {
      const demandeId = this.getAttribute("data-demande-id");
      console.log("demandeId :", demandeId);
      window.location.href = `/afficher-prestataire?id=${demandeId}`;
    });
  });
});


// document.addEventListener('DOMContentLoaded', function() {
//   fetch('/count_unread_notifications/')
//       .then(response => response.json())
//       .then(data => {
//           const unreadCount = data.unread_count;
//           const notificationSpan = document.getElementById('notificationCount');

//           // Mettre à jour le contenu du span avec le nombre de notifications non lues
//           notificationSpan.textContent = unreadCount;
//       })
//       .catch(error => console.error('Error fetching unread notifications count:', error));
// });
//alert 
async function updatePrestataire(prestataireId) {
 
     const response = await axios.post(`/update_prestataire/${prestataireId}/`);
     
  
}
// Fonction pour afficher l'alerte SweetAlert
function deleteUser1(userId) {
  // Afficher une alerte SweetAlert
  Swal.fire({
      title: 'Êtes-vous sûr?',
      text: "Vous ne pourrez pas récupérer cet utilisateur!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Oui, supprimer!'
  }).then((result) => {
      if (result.isConfirmed) {
          // Si l'utilisateur confirme la suppression, vous pouvez appeler votre fonction de suppression ici
          // Par exemple, deleteUserFunction(userId);
          Swal.fire(
              'Supprimé!',
              'L\'utilisateur a été supprimé.',
              'success'
          );
      }
  });
}
// Fonction pour enregistrer un nouvel utilisateur
function signUp1() {
  //var email = document.getElementById('email').value;
  //var password = document.getElementById('password').value;

  firebase.auth().createUserWithEmailAndPassword("nouha@gmail.com", "password")
      .then((userCredential) => {
          // Enregistrement réussi
          var user = userCredential.user;
          console.log('User created:', user);
      })
      .catch((error) => {
          var errorCode = error.code;
          var errorMessage = error.message;
          console.error('Error:', errorCode, errorMessage);
      });
} 

document.addEventListener('DOMContentLoaded', function() {
    const deleteButtons = document.querySelectorAll('.delete-button');
    deleteButtons.forEach(button => {
        button.addEventListener('click', function() {
            const moduleID = this.closest('tr').dataset.moduleID;
            deleteUser(moduleID);
        });
    });
});

document.addEventListener('DOMContentLoaded', function() {
    const deleteButtons = document.querySelectorAll('.updateButton');
    deleteButtons.forEach(button => {
        button.addEventListener('click', function() {
           // const moduleID = this.closest('tr').dataset.moduleID;
            showModuleForm();
        });
    });
});
document.addEventListener('DOMContentLoaded', function() {
    const deleteButtons = document.querySelectorAll('#addBtn');
    deleteButtons.forEach(button => {
        button.addEventListener('click', function() {
           // const moduleID = this.closest('tr').dataset.moduleID;
            showModuleForm();
        });
    });
});
async function deleteUser(userId) {
    Swal.fire({
        title: 'Confirmation',
        text: 'Êtes-vous sûr de vouloir supprimer cet module ?',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#d33',
        cancelButtonColor: '#3085d6',
        confirmButtonText: 'Oui, supprimer',
        cancelButtonText: 'Annuler'
    }).then(async (result) => {
        if (result.isConfirmed) {
            try {
                const response = await axios.delete(`/delete_user/${userId}`);
                if (response.status === 200) {
                    const rowToRemove = document.querySelector(`#dataTable tbody tr[data-user-id="${userId}"]`);
                    if (rowToRemove) {
                        rowToRemove.remove();
                    }
                    Swal.fire('Supprimé !', 'L\'utilisateur a été supprimé.', 'success');
                } else {
                    throw new Error('Erreur lors de la suppression');
                }
            } catch (error) {
                console.error('Erreur lors de la suppression de l\'utilisateur :', error);
                Swal.fire('Erreur', 'Une erreur s\'est produite lors de la suppression de l\'utilisateur.', 'error');
            }
        }
    });
}

document.getElementById("btnMiseAJour").addEventListener("click", function() {
    Swal.fire({
        title: 'Mise à jour',
        text: 'Entrez le contenu de la mise à jour :',
        input: 'text',
        inputPlaceholder: 'Votre mise à jour ici...',
        showCancelButton: true,
        confirmButtonText: 'Envoyer',
        cancelButtonText: 'Annuler'
    }).then((result) => {
        if (result.isConfirmed) {
            const updateContent = result.value;
            if (updateContent) {
                // Envoyer une requête POST à Django
                axios.post('/update/', new URLSearchParams({
                    'content': updateContent
                }), {
                    headers: {
                        'Content-Type': 'application/x-www-form-urlencoded'
                    }
                })
                .then((response) => {
                    if (response.data.status === 'success') {
                        Swal.fire(
                            'Envoyé!',
                            'La mise à jour a été ajoutée avec succès.',
                            'success'
                        );
                    } else {
                        Swal.fire(
                            'Erreur',
                            response.data.message || 'Erreur inconnue',
                            'error'
                        );
                    }
                })
                .catch((error) => {
                    Swal.fire(
                        'Erreur',
                        'Une erreur s\'est produite lors de l\'envoi de la mise à jour.',
                        'error'
                    );
                    console.error("Erreur lors de l'envoi de la mise à jour: ", error);
                });
            } else {
                Swal.fire(
                    'Erreur',
                    'Le champ de mise à jour ne peut pas être vide.',
                    'error'
                );
            }
        }
    });
});

function showModuleForm() {
    Swal.fire({
        title: 'Ajouter un Module',
        html: `
            <form id="moduleForm">
                <label for="codeModule" class="swal2-label">Code Module:</label>
                <input type="text" id="codeModule" name="codeModule" class="swal2-input" placeholder="Code Module">
                
                <label for="nomModule" class="swal2-label">Nom Module:</label>
                <input type="text" id="nomModule" name="nomModule" class="swal2-input" placeholder="Nom Module">
            </form>
        `,
        showCancelButton: true,
        confirmButtonText: 'Ajouter',
        cancelButtonText: 'Annuler',
        preConfirm: () => {
            const codeModule = document.getElementById('codeModule').value.trim();
            const nomModule = document.getElementById('nomModule').value.trim();

            if (!codeModule || !nomModule) {
                Swal.showValidationMessage('Veuillez remplir tous les champs.');
                return false;
            }

            return { codeModule, nomModule };
        }
    }).then((result) => {
        if (result.isConfirmed) {
            const { codeModule, nomModule } = result.value;

            axios.post('/add_module/', {
                code_module: codeModule,
                nom_module: nomModule
            })
            .then(() => {
                Swal.fire('Succès!', 'Le module a été ajouté avec succès.', 'success');
            })
            .catch(() => {
                Swal.fire('Erreur', 'Une erreur s\'est produite lors de l\'ajout du module.', 'error');
            });
        }
    });
}
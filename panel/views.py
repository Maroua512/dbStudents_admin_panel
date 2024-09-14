from django.shortcuts import render
from django.shortcuts import render, redirect,get_object_or_404
from django.contrib.auth import authenticate, login,logout
from django.contrib import messages
from django.contrib.auth.decorators import login_required
from rest_framework import viewsets
from .serializers import UtilisateurSerializer
from . import models

class UtilisateurViewSet(viewsets.ModelViewSet):
    queryset = models.Utilisateur.objects.all()
    serializer_class = UtilisateurSerializer

# Get  Users  From  PostgreSql ***
def get_Users():
  users = models.Utilisateur.objects.all()
  return users
# Get  Students  From  PostgreSql ***
def get_Students():
    return models.Etudiant.objects.all()

# Get  Teatcher  From  PostgreSql ***
def get_Teatchers():
    return models.Enseignement.objects.all()

# Get  Modules  From  PostgreSql ***
def get_Specialite(id):
    return  models.Specialite.objects.get( id_specialite=id)

# Get Groupes  From  PostgreSql ***
def get_Groupe(id):
    # Recherche du groupe avec id_groupe spécifique
   return models.Groupe.objects.get(id_groupe=id)

# Get Section From  PostgreSql ***
def get_Section(id):
    return  models.Section.objects.get( id_section=id)



def home_view(request):
    if request.user.is_authenticated:
       return render(request, 'admin_base.html')
    return render(request,'login.html')

@login_required
def dashabord(request):
  if not request.user.is_staff:
        return redirect('login')
  return render(request, 'admin_base.html')

def register(request):
    return render(request,'register.html')

def login1(request):
    return render(request,'login.html')

def users(request):
    users = get_Users()
    return render(request,'utilisateur.html',{'users':users})

def etudiants(request):
    liste_etudiants = obtenir_liste_etudiants()
    return render(request, 'etudiants.html', {'data': liste_etudiants})

from .models import Etudiant

def obtenir_liste_etudiants():
    # Requête avec jointure sur les tables liées
    etudiants = Etudiant.objects.select_related('id_utilisateur', 'id_groupe', 'id_section', 'id_section__id_specialite')

    # Créer une liste de tuples avec les informations nécessaires
    resultat = [
        (
            etudiant.matricule,                           # Matricule de l'étudiant
            etudiant.id_utilisateur.nom,                  # Nom de l'utilisateur
            etudiant.id_utilisateur.prenom,               # Prénom de l'utilisateur
            etudiant.date_nais,                           # Date de naissance de l'étudiant
            etudiant.id_utilisateur.email,                # Email de l'utilisateur
            etudiant.id_groupe.TP,  
            etudiant.id_groupe.TD,                    # Numéro du groupe
            etudiant.id_section.nom,                      # Nom de la section
            etudiant.id_section.id_specialite.niveau,     # Niveau de la spécialité
            etudiant.id_section.id_specialite.nom,        # Nom de la spécialité
            etudiant.id_utilisateur.user_role             # Rôle de l'utilisateur
        )
        for etudiant in etudiants
    ]
    
    return resultat
def obtenir_liste_enseignants():
    # Requête avec jointure sur les tables liées
    enseignants = models.Enseignant.objects.select_related('id_utilisateur')

    # Créer une liste de tuples avec les informations nécessaires
    resultat = [
        (
            enseignant.id_enseignant,                       # Matricule de l'étudiant
            enseignant.id_utilisateur.nom,                  # Nom de l'utilisateur
            enseignant.id_utilisateur.prenom,               # Prénom de l'utilisateur
            enseignant.annee_recrutement,                   # Date de naissance de l'étudiant
            enseignant.id_utilisateur.email,                # Email de l'utilisateur
            enseignant.garde,  
            enseignant.id_utilisateur.user_role             # Rôle de l'utilisateur
        )
        for enseignant in enseignants
    ]
    
    return resultat

def enseignants(request):
    enseignants = obtenir_liste_enseignants()
    return render(request,'enseignants.html',{'data':enseignants})

def modules(request):
    data = models.Module.objects.all()
    return render(request,'module.html',{'data':data})

def specialite(request):
    return render(request,'specialite.html')

def login_view(request):
    if request.method == 'POST':
        username = request.POST['username']
        password = request.POST['password']
        print(username)
        user = authenticate(request, username=username, password=password)
        if user is not None:
            print(username)
            login(request,user)
            messages.success(request, 'Vous êtes connecté avec succès !')
            return render(request, 'admin_base.html') # Redirection vers l'interface d'administration
        else:
            print("No")
            messages.error(request, 'Nom d’utilisateur ou mot de passe incorrect.')
    return render(request, 'login.html')

def logout_view(request):
     logout(request)
     messages.success(request, 'Vous avez été déconnecté avec succès.')
     return redirect('login')  # Redirection vers la page de connexion ou autre page souhaitée
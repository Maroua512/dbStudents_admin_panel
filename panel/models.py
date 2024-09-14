# This is an auto-generated Django model module.

# You'll have to do the following manually to clean this up:

#   * Rearrange models' order

#   * Make sure each model has one field with primary_key=True

#   * Make sure each ForeignKey and OneToOneField has `on_delete` set to the desired behavior

#   * Remove `managed = False` lines if you wish to allow Django to create, modify, and delete the table

# Feel free to rename the models, but don't rename db_table values or field names.

from django.db import models






class Enseignement(models.Model):

    id_enseignement = models.IntegerField(primary_key=True)

    id_module = models.ForeignKey('Module', models.DO_NOTHING, db_column='id_module', blank=True, null=True)

    id_groupe = models.ForeignKey('Groupe', models.DO_NOTHING, db_column='id_groupe', blank=True, null=True)

    id_section = models.ForeignKey('Section', models.DO_NOTHING, db_column='id_section', blank=True, null=True)

    id_enseignant = models.ForeignKey('Enseignant',models.DO_NOTHING,db_column='id_enseigant',blank=True,null=True)


    class Meta:

        managed = False

        db_table = 'enseignement'



class Enseignant(models.Model):

    id_enseignant = models.IntegerField(primary_key=True)

    garde = models.CharField(max_length=10, blank=True, null=True)

    annee_recrutement = models.DateField(blank=True, null=True)

    id_utilisateur = models.ForeignKey('Utilisateur', models.DO_NOTHING, db_column='id_utilisateur', blank=True, null=True)



    class Meta:

        managed = False

        db_table = 'enseignant'



class Etudiant(models.Model):

    matricule = models.IntegerField(primary_key=True)

    date_nais = models.DateField(blank=True, null=True)

    id_utilisateur = models.ForeignKey('Utilisateur', models.DO_NOTHING, db_column='id_utilisateur', blank=True, null=True)

    id_groupe = models.ForeignKey('Groupe', models.DO_NOTHING, db_column='id_groupe', blank=True, null=True)

    id_section = models.ForeignKey('Section', models.DO_NOTHING, db_column='id_section', blank=True, null=True)



    class Meta:

        managed = False

        db_table = 'etudiant'





class Groupe(models.Model):

    id_groupe = models.IntegerField(primary_key=True)

    TP = models.IntegerField(blank=True, null=True)
    TD = models.IntegerField(blank=True, null=True)

    class Meta:

        managed = False

        db_table = 'groupe'





class Module(models.Model):

    id_module = models.IntegerField(primary_key=True)

    nom = models.CharField(max_length=20, blank=True, null=True)

    code = models.CharField(max_length=10, blank=True, null=True)



    class Meta:

        managed = False

        db_table = 'module'





class Section(models.Model):

    id_section = models.IntegerField(primary_key=True)

    nom = models.CharField(max_length=50, blank=True, null=True)

    id_specialite = models.ForeignKey('Specialite', models.DO_NOTHING, db_column='id_specialite', blank=True, null=True)



    class Meta:

        managed = False

        db_table = 'section'





class Specialite(models.Model):

    id_specialite = models.IntegerField(primary_key=True)

    niveau = models.CharField(max_length=3, blank=True, null=True)

    nom = models.CharField(max_length=50, blank=True, null=True)

    code = models.CharField(max_length=10, blank=True, null=True)



    class Meta:

        managed = False

        db_table = 'specialite'





class Utilisateur(models.Model):

    id_utilisateur = models.IntegerField(primary_key=True)

    nom = models.CharField(max_length=30, blank=True, null=True)

    prenom = models.CharField(max_length=30, blank=True, null=True)

    email = models.CharField(max_length=254, blank=True, unique=True)

    type_user = models.CharField(max_length=10, blank=True, null=True)

    user_role = models.CharField(max_length=10, blank=True, null=True)



    class Meta:

        managed = False

        db_table = 'utilisateur'


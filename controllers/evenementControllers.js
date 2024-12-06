import nodemailer from 'nodemailer';
import Evenement from '../models/evenement.js';
import { Op } from 'sequelize';
import crypto from 'crypto';

// Configuration de l'envoi d'emails
const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: process.env.SMTP_PORT || 587,
    secure: false,
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASSWORD,
    },
});

// Fonction pour nettoyer le texte des caractères dangereux
function nettoyerTexte(texte) {
    if (typeof texte === 'string') {
        return texte.replace(/[<>]/g, '').trim();
    }
    return texte;
}

// Fonction pour créer un lien unique pour un événement
function creerLienEvenement(eventId) {
    const codeUnique = crypto.randomBytes(8).toString('hex');
    const urlBase = process.env.BASE_URL || 'http://localhost:3000';
    return `${urlBase}/evenements/${eventId}?code=${codeUnique}`;
}

// Créer un nouvel événement
export const createEvenement = async (req, res) => {
   try {
       const titre = nettoyerTexte(req.body.titre);
       const description = nettoyerTexte(req.body.description);
       const lieu = nettoyerTexte(req.body.lieu);
       const date = new Date(req.body.date);
       const heure = req.body.heure;
       const type = req.body.type;
       const capaciteMax = parseInt(req.body.capaciteMax) || 50;
       const image = nettoyerTexte(req.body.image);

       if (!titre || !date || !lieu || !heure) {
           return res.status(400).json({ message:"Veuillez remplir tous les champs obligatoires (titre, date, lieu et heure)" });
       }

       if (capaciteMax < 1 || capaciteMax > 1000) {
           return res.status(400).json({ message:"La capacité doit être comprise entre 1 et 1000 personnes" });
       }

       if (!req.user?.email) {
           return res.status(401).json({ message:"Vous devez être connecté pour créer un événement" });
       }

       const evenement = await Evenement.create({
           titre,
           date,
           heure,
           type,
           lieu,
           description,
           capaciteMax,
           image,
           userId:req.user.id 
       });

       const lienUnique = creerLienEvenement(evenement.id);
       await evenement.update({ lienUnique });

       const messageEmail = `Bonjour, Votre événement "${titre}" a été créé avec succès ! Détails : 
- Titre : ${titre}
- Date : ${date.toLocaleDateString('fr-FR')}
- Heure : ${heure}
- Lieu : ${lieu}
- Capacité : ${capaciteMax} personnes
- Type : ${type}
${description ? `- Description : ${description}\n` : ''}
${image ? `- Image : ${image}\n` : ''}
Voici le lien unique de votre événement : ${lienUnique}`;

       await transporter.sendMail({
           from : process.env.EMAIL_USER,
           to : req.user.email,
           subject :'Nouvel Événement Créé - Lien de Partage',
           text : messageEmail,
       });

       res.status(201).json({ message:'Événement créé avec succès.', evenement });
   } catch (error) {
       console.error('Erreur:', error);
       res.status(500).json({ message:'Une erreur est survenue lors de la création de l\'événement.' });
   }
};

// Récupérer tous les événements avec filtres optionnels
export const getAllEvenements = async (req, res) => {
   try {
       const filtres = {};

       if (req.query.titre) {
           filtres.titre = { [Op.like]: `%${nettoyerTexte(req.query.titre)}%` };
       }

       if (req.query.type) {
           filtres.type = req.query.type;
       }

       if (req.query.date) {
           const date = new Date(req.query.date);
           if (!isNaN(date.getTime())) { 
               filtres.date = date; 
           }
       }

       if (req.query.capaciteMin) {
           filtres.capaciteMax = { [Op.gte]: parseInt(req.query.capaciteMin) };
       }

       const evenements = await Evenement.findAll({
           where:filtres,
           order:[['date','ASC'], ['heure','ASC']],
           limit :50 
       });

       res.json(evenements);
   } catch (error) {
       console.error('Erreur:', error);
       res.status(500).json({ message:'Erreur lors de la récupération des événements.' });
   }
};

// Récupérer un événement par son ID 
export const getEvenementById = async (req,res) => { 
   try { 
       const id= parseInt(req.params.id); 
       
       if (!id) { 
           return res.status(400).json({ message:'L\'identifiant fourni n\'est pas valide.' }); 
       } 

       const evenement= await Evenement.findByPk(id); 

       if(!evenement) { 
           return res.status(404).json({ message:'Événement non trouvé.' }); 
       } 

       res.json(evenement); 
   } catch(error){ 
       console.error('Erreur:', error); 
       res.status(500).json({ message:'Une erreur est survenue lors de la récupération de l\'événement.' }); 
   } 
};

// Mettre à jour un événement par son ID 
export const updateEvenementById = async (req,res) => { 
   try { 
       const id= parseInt(req.params.id); 

       if (!id) { 
           return res.status(400).json({ message:'L\'identifiant fourni n\'est pas valide.' }); 
       } 

       const evenement= await Evenement.findByPk(id); 

       if(!evenement) { 
           return res.status(404).json({ message:'Événement non trouvé.' }); 
       } 

       if(evenement.userId !== req.user?.id) { 
           return res.status(403).json({ message:'Vous n\'avez pas l\'autorisation de modifier cet événement.' }); 
       } 

       const titre= nettoyerTexte(req.body.titre); 
       
       const description= nettoyerTexte(req.body.description); 
       
       const lieu= nettoyerTexte(req.body.lieu); 

        const date= req.body.date ? new Date(req.body.date): evenement.date; 
        
        const heure= req.body.heure || evenement.heure; 
        
        const type= req.body.type || evenement.type; 
        
        const capaciteMax= parseInt(req.body.capaciteMax)|| evenement.capaciteMax; 
        
        const image= nettoyerTexte(req.body.image); 

        if(!titre || !date || !lieu || !heure){ 
            return res.status(400).json({ message:"Les champs titre, date, lieu et heure sont obligatoires." }); 
        } 

        await evenement.update({
            titre,date,heure,type,lieu,description,capaciteMax,image }); 

        res.json({ message:'Événement mis à jour avec succès.', evenement }); 

   } catch(error){ 
      console.error('Erreur:', error); 
      res.status(500).json({ message:'Une erreur est survenue lors de la mise à jour de l\'événement.' }); 
   } 
};

// Supprimer un événement par son ID  
export const deleteEvenementById = async (req,res) => {  
   try{  
      const id= parseInt(req.params.id);  

      if (!id){  
          return res.status(400).json({ message:'L\'identifiant fourni n\'est pas valide.' });  
      }  

      const evenement= await Evenement.findByPk(id);  

      if(!evenement){  
          return res.status(404).json({ message:'Événement non trouvé.' });  
      }  

      if(evenement.userId !== req.user?.id){  
          return res.status(403).json({ message:'Vous n\'avez pas l\'autorisation de supprimer cet événement.' });  
      }  

      await evenement.destroy();  
      res.json({ message:'L\'événement a été supprimé avec succès.' });  
   } catch(error){  
      console.error('Erreur:', error);  
      res.status(500).json({ message:'Une erreur est survenue lors de la suppression de l\'événement.' });  
   }  
};
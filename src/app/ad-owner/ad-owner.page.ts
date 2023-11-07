import { Component, Inject, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { collection, query, where, getDocs, Firestore } from 'firebase/firestore';

import { Ads } from '../models/Ads';
import { Auth } from "@angular/fire/auth";
import { BaseService } from '../services/auth/base.service';


@Component({
  selector: 'app-ad-owner',
  templateUrl: './ad-owner.page.html',
  styleUrls: ['./ad-owner.page.scss'],
})
export class AdOwnerPage implements OnInit {
  uid!: string; // id utilisateur
  ownerName!: string; // nom auteur
  advertissements: any; // annonce list

  status = {
    loading: false,
  };

  firestore = Inject(Firestore) // firestore instance
  /**
   * Cette page ne fonctionne pas très bien
   * Problème avec la fonction where de firebase
   * Mise à jour à Firebase (npm) -> Features
   * @param route 
   * @param auth 
   * @param authService 
   */
  constructor(private route: ActivatedRoute, private auth: Auth, private authService: BaseService,) { }

  ngOnInit() {
    this.getOwner(); // appel de l'auteur
  }

  async ionViewDidEnter() { // execution à chaque ouverture
    const id = this.route.snapshot.paramMap.get("uid"); // recupération de l'id dans url
    if (id) {
      this.uid = id; // assignation à la variable
      // console.log(this.uid);  

      await this.getAdByOwner(this.uid); // récupérer les ads par id
    }
  }

  getOwner() { // verifier si user connecté et assigner son email
    if (this.auth.currentUser && this.auth.currentUser.email) {
      this.ownerName = this.auth.currentUser.email;
      console.log(this.ownerName);
      
    }
  }


  async getAdByOwner(id: string) { // récupérer les ads par id
    this.status.loading = true; // démarrer l'animation

    const myCollection = collection(this.firestore, 'Ads'); // récupérer la connection
    const q = query(myCollection, where("type", "==", "Technology")); // définition de la requete

    getDocs(q)
      .then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
          console.log(doc.id, " => ", doc.data());
          // Ici, vous pouvez traiter les documents qui correspondent à votre requête.
        });
      })
      .catch((error) => {
        console.error("Erreur lors de la récupération des documents : ", error);
      });
        
    /* let querySnapshot = await getDocs(this.query);
    
    querySnapshot.forEach((docElement: any) => {
      
      this.advertissements.push(
        {id: docElement.id,
          title: docElement.data().title,
          description: docElement.data().description,
          type: docElement.data().type,
          photo: docElement.data().photo,
          owner: docElement.data().owner,
          created_at: docElement.data().created_at,}
      );
    });

    console.log(this.advertissements); */
    
    this.status.loading = false;

  }


  logout() {
    this.authService.logout();
  }
  

}

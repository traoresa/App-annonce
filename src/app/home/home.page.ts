import { Component } from '@angular/core';

import { Firestore, collectionData, collection, doc, getDocs, query } from '@angular/fire/firestore';
import { BaseService } from '../services/auth/base.service';
import { Auth } from '@angular/fire/auth';


@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
color:string = 'blue'; //n color pour les tests
img:string = "url('assets/imgs/ocean-3605547_1280.jpg')"; // img pour les test
status = {
  loading: false
};


advertissements:any = []; // variable liste des annonces
querySnapshot: any; // variable pour la response query firebase
query: any; // variable pour la query firebase
uid:any; // id utilisateur
  constructor(private firestore: Firestore, private auth: BaseService, private authFireBase: Auth ) {}



  // Obtenir les annonces à chaque entrée
  async ionViewDidEnter() {
    await this.getAds();

    this.uid = this.authFireBase.currentUser?.uid; // Obtenir uid de l'user connecté
    
  }



  // Obtenir annonces
  async getAds() {
    // initialisation
    this.advertissements = []; 
    this.status.loading = true;

    // Requête de READ firebase
    this.querySnapshot = await getDocs(collection(this.firestore, 'Ads'));
    // console.log(this.querySnapshot);
    this.querySnapshot.forEach((document: any) => {
      // console.log(`${document.id} => ${document.data().title}`);
      // Insertion dans le tableau
      this.advertissements.push({
        id: document.id,
        title: document.data().title,
        description: document.data().description,
        type: document.data().type,
        photo: document.data().photo,
        owner: document.data().owner,
        created_at: document.data().created_at,
      });

    }); 
    this.status.loading = false;

  }


  logout() {
    this.auth.logout();
  }
  
}

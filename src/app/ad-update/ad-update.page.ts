import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Firestore, collectionData, collection, doc, getDoc, query, deleteDoc, updateDoc } from '@angular/fire/firestore';
import { Ads } from '../models/Ads';
import { Types } from '../datas/Types';
import { ToastController } from '@ionic/angular';
import { Location } from '@angular/common';

@Component({
  selector: 'app-ad-update',
  templateUrl: './ad-update.page.html',
  styleUrls: ['./ad-update.page.scss'],
})
export class AdUpdatePage implements OnInit {
  idAds!: string; // id de l'annonce
  querySnapshot: any; // variable de requete
  Ad:Ads = { // variable pour lannonce
    title: "",
    description: "",
    type: "",
    photo: "",
    owner: "",
    created_at: new Date().toLocaleDateString()
  };

  status = {
    loading: false
  };

  types!:Array<string>; // variable pour stocker les types

  constructor(private route: ActivatedRoute, private firestore: Firestore, private toastController: ToastController, private location: Location) { }

  async ngOnInit() {

    // Obtenir id de l'url
    const id = this.route.snapshot.paramMap.get("id");
    if (id) {
      this.idAds = id;
      // console.log(this.idAds);  
      
      await this.getAd(this.idAds); // obtenir annonce par id
    }
  }

  ionViewDidEnter() {
    this.types = Types; // Stocker les types 
  }


  // Obtenir les annonces par id
  async getAd(id: string) {
    // Requete Firebase
    this.querySnapshot = await getDoc(doc(this.firestore, 'Ads', this.idAds));
    // Assimilation variable
    this.Ad.title = this.querySnapshot.data().title;
    this.Ad.description = this.querySnapshot.data().description;
    this.Ad.owner = this.querySnapshot.data().owner;
    this.Ad.photo = this.querySnapshot.data().photo;
    this.Ad.created_at = this.querySnapshot.data().created_at;
    this.Ad.type = this.querySnapshot.data().type;
        
  }


  // Affichage d'1 toast message
  async presentToast(position: 'top' | 'middle' | 'bottom', message: string, color: string) {
    const toast = await this.toastController.create({
      message: message,
      duration: 1500,
      position: position,
      color: color
    });

    await toast.present();
  }




  // Modifier une annonce
  async updateAd() {
    this.status.loading = true;


    // Utilisation updateDoc de Firebase
    await updateDoc(doc(this.firestore, "Ads", this.idAds), {
      title: this.Ad.title,
      description: this.Ad.description,
      type: this.Ad.type,
      photo: this.Ad.photo,
      owner: this.Ad.owner
    }).then(
      async (s) => {
        this.status.loading = false;
        // Affichage du message
        await this.presentToast('bottom', "Your ad is updated with success !", "success");

        setTimeout(
          () => { this.location.back() }, // retour à la page arrière
          1000
        );
        
      }, async (e) => {
        this.status.loading = false;
        // Affichage message d'erreur
        await this.presentToast('bottom', "An error is occured. Please retry now or later !", "danger");
      }
    );
  }

}

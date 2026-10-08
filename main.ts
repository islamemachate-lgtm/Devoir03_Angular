import { Component } from '@angular/core';
import { bootstrapApplication } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';

export class Film {
  idFilm!: number;
  nomFilm!: string;
}

export class Acteur {
  idActeur!: number;
  nomActeur!: string;
  nationalite!: string;
  dateNaissance!: Date;
  film!: Film;
}

@Component({
  selector: 'app-acteur-list',
  standalone: true,
  template: `
    <div class="container mt-4">
      <h2>Liste des Acteurs</h2>
      <table class="table table-striped table-bordered">
        <thead class="table-dark">
          <tr>
            <th>ID</th>
            <th>Nom</th>
            <th>Nationalité</th>
            <th>Date Naissance</th>
            <th>Film</th>
          </tr>
        </thead>
        <tbody>
          @for (a of acteurs; track a.idActeur) {
            <tr>
              <td>{{ a.idActeur }}</td>
              <td>{{ a.nomActeur }}</td>
              <td>{{ a.nationalite }}</td>
              <td>{{ a.dateNaissance | date:'dd/MM/yyyy' }}</td>
              <td>{{ a.film?.nomFilm }}</td>
            </tr>
          }
        </tbody>
      </table>
    </div>
  `,
})
export class ActeurListComponent {
  acteurs: Acteur[] = [
    { idActeur: 1, nomActeur: 'Leonardo DiCaprio', nationalite: 'Américaine', dateNaissance: new Date('1974-11-11'), film: { idFilm: 1, nomFilm: 'Inception' } },
    { idActeur: 2, nomActeur: 'Tom Hanks', nationalite: 'Américaine', dateNaissance: new Date('1956-07-09'), film: { idFilm: 2, nomFilm: 'Forrest Gump' } },
    { idActeur: 3, nomActeur: 'Scarlett Johansson', nationalite: 'Américaine', dateNaissance: new Date('1984-11-22'), film: { idFilm: 3, nomFilm: 'Black Widow' } }
  ];
}

@Component({
  selector: 'app-add-acteur',
  standalone: true,
  imports: [FormsModule],
  template: `
    <div class="container mt-4">
      <h2>Ajouter un Acteur</h2>
      <div class="mb-3">
        <label class="form-label">Nom :</label>
        <input class="form-control" [(ngModel)]="newActeur.nomActeur" placeholder="Nom de l'acteur" />
      </div>
      <div class="mb-3">
        <label class="form-label">Nationalité :</label>
        <input class="form-control" [(ngModel)]="newActeur.nationalite" placeholder="Nationalité" />
      </div>
      <div class="mb-3">
        <label class="form-label">Date de naissance :</label>
        <input class="form-control" type="date" [(ngModel)]="newActeur.dateNaissance" />
      </div>
      <div class="mb-3">
        <label class="form-label">Film :</label>
        <input class="form-control" [(ngModel)]="newActeur.film.nomFilm" placeholder="Nom du film" />
      </div>
      <button class="btn btn-primary" (click)="ajouter()">Ajouter</button>

      @if (message) {
        <div class="alert alert-success mt-3">{{ message }}</div>
      }
    </div>
  `,
})
export class AddActeurComponent {
  newActeur: Acteur = {
    idActeur: 0,
    nomActeur: '',
    nationalite: '',
    dateNaissance: new Date(),
    film: { idFilm: 0, nomFilm: '' }
  };
  message = '';

  ajouter() {
    if (this.newActeur.nomActeur && this.newActeur.film.nomFilm) {
      this.newActeur.idActeur = Math.floor(Math.random() * 1000);
      this.newActeur.film.idFilm = Math.floor(Math.random() * 1000);
      this.message = `Acteur ajouté : ${this.newActeur.nomActeur} - Film: ${this.newActeur.film.nomFilm}`;
      this.newActeur = { idActeur: 0, nomActeur: '', nationalite: '', dateNaissance: new Date(), film: { idFilm: 0, nomFilm: '' } };
    } else {
      this.message = 'Veuillez remplir tous les champs.';
    }
  }
}

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [ActeurListComponent, AddActeurComponent],
  template: `
    <nav class="navbar navbar-expand-lg navbar-dark bg-dark fixed-top">
      <div class="container">
        <a class="navbar-brand" href="#">Devoir 03 - Acteur</a>
        <div class="navbar-nav">
          <a class="nav-link" href="#" (click)="$event.preventDefault(); page = 'list'">Liste des Acteurs</a>
          <a class="nav-link" href="#" (click)="$event.preventDefault(); page = 'add'">Ajouter Acteur</a>
        </div>
      </div>
    </nav>

    @if (page === 'list') {
      <app-acteur-list></app-acteur-list>
    }
    @if (page === 'add') {
      <app-add-acteur></app-add-acteur>
    }
  `,
})
export class App {
  page: string = 'list';
}

bootstrapApplication(App);
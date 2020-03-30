import { Component, OnDestroy, OnInit } from '@angular/core';
import { AlertController, NavController } from '@ionic/angular';
import { Subscription } from 'rxjs';
import { flatMap } from 'rxjs/operators';
import { AuthService } from 'src/app/auth/auth.service';
import { GroupsService } from 'src/app/core/groups.service';
import { UsersService } from 'src/app/core/users.service';
import { Participant } from 'src/app/shared/model/participant.model';
import { UserData } from 'src/app/shared/model/user-data.model';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-groups-create',
  templateUrl: './create.page.html',
  styleUrls: ['./create.page.scss'],
})
export class CreatePage implements OnInit, OnDestroy {

  userDataSubs: Subscription;

  user: UserData;

  groupName: string;
  emailTemp: string;

  participants: Participant[];

  constructor(
    private alert: AlertController,
    private nav: NavController,
    private authService: AuthService,
    private usersService: UsersService,
    private groupsService: GroupsService) {
    this.participants = [];
  }

  ngOnInit() {
    this.initUserData();
  }

  ngOnDestroy(): void {

  }

  initUserData() {
    this.userDataSubs = this.authService.getUserCredential()
      .pipe(flatMap(user => this.usersService.findByUid(user.uid)))
      .subscribe(userData => {
        this.user = userData;
      });
  }

  addParticipant() {
    this.validateAddParticipant()
      .then(valid => {
        if (valid) {
          this.usersService.findByEmail(this.emailTemp)
            .subscribe(result => {
              this.participants.push({
                email: this.emailTemp,
                user: result
              });
              this.emailTemp = null;
            });
        }
      });
  }

  async validateAddParticipant(): Promise<boolean> {
    try {
      this.validateGroupMaxSize();
      this.validateNotLoggedUserEmail();
      this.validateUserAlreadyAdded();
      return Promise.resolve(true);
    } catch (error) {
      const alert = await this.alert.create({
        header: 'Erro',
        message: error.message,
        buttons: ['OK']
      });
      return alert.present().then(() => false);
    }
  }

  validateNotLoggedUserEmail() {
    if (this.emailTemp === this.user.email) {
      throw new Error('Não é possível adicionar a si próprio. Por ser o criador você será automaticamente adicionado ao grupo.');
    }
  }

  validateUserAlreadyAdded() {
    if (this.participants.some(participant => participant.email === this.emailTemp)) {
      throw new Error('Participante já adicionado.');
    }
  }

  validateGroupMaxSize() {
    if (this.participants.length >= environment.groupMaxSize) {
      throw new Error('O grupo atingiu o número máximo de participantes: ' + environment.groupMaxSize);
    }
  }

  remove(participant: Participant) {
    const index = this.participants.indexOf(participant);
    this.participants.splice(index, 1);
  }

  confirm() {
    this.groupsService.create(this.user, this.groupName, this.participants)
      .then(ref => this.success());
  }

  async success() {
    const alert = await this.alert.create({
      header: 'Sucesso!',
      message: `Grupo ${this.groupName} criado com sucesso.`,
      buttons: ['OK']
    });
    alert.present().then(() => this.nav.back());
  }

}

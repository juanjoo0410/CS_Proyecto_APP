import { Injectable } from "@angular/core";
import { MatDialog } from "@angular/material/dialog";
import { CanActivate } from "@angular/router";
import { LoginService } from "src/app/core/services/login.service";

import { LoginComponent } from "./login.component";

@Injectable()
export class LoginGuardian implements CanActivate {

    constructor(private loginService: LoginService, private dialog:MatDialog) { }

    canActivate() {

        if (localStorage.getItem('Usuario') !== null) {

            return true;

        } else {

            this.dialog.open(LoginComponent, { disableClose: true, width: '500px' });
            return false;

        }
    }
}

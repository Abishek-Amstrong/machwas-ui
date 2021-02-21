import { Component, OnInit } from "@angular/core";
import { Contact } from "@capacitor-community/contacts";
import { isPlatform } from "@ionic/angular";

import { Plugins } from "@capacitor/core";
import { AccountService } from "../shared/services/account.service";
import { ToastrService } from "ngx-toastr";
import { handleError } from "../shared/helpers/error-handler";

const { Contacts } = Plugins;

@Component({
  selector: "app-groups",
  templateUrl: "./groups.page.html",
  styleUrls: ["./groups.page.scss"],
})
export class GroupsPage implements OnInit {
  contacts = [];
  friends = [];
  selectedSegment: string;

  constructor(
    private accountService: AccountService,
    private toastrService: ToastrService
  ) {
    this.loadContacts();
    this.loadFriends();
    this.selectedSegment = "Friends";
  }

  ngOnInit() {}

  // To display the latest friend list from server
  loadFriends() {
    this.accountService.getFriendList().subscribe(
      (result: any) => {
        this.friends = result;
      },
      (err) => {
        this.toastrService.error(handleError(err));
      }
    );
  }

  // To load the contacts list from mobile
  async loadContacts() {
    if (isPlatform("android")) {
      let permission = await Contacts.getPermissions();
      if (!permission.granted) {
        return;
      }
    }

    Contacts.getContacts().then((result) => {
      console.log(result);
      this.contacts = result.contacts;
    });
  }

  // Handle segment navigation
  segmentChanged(ev: any) {
    this.selectedSegment = ev.detail.value;
  }

  // To add the selected user to the logged in user friend list
  addFriend(phoneNumber: any) {
    this.accountService.addFriendToUser(phoneNumber).subscribe(
      (result) => {
        this.toastrService.success("User added successfully");
        this.selectedSegment = "Friends";
        this.loadFriends();
      },
      (err) => {
        this.toastrService.error(handleError(err));
      }
    );
  }
}

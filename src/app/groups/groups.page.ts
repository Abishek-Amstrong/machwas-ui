import { Component, OnInit } from "@angular/core";
import { Contact } from "@capacitor-community/contacts";
import { isPlatform } from "@ionic/angular";

import { Plugins } from "@capacitor/core";

const { Contacts } = Plugins;

@Component({
  selector: "app-groups",
  templateUrl: "./groups.page.html",
  styleUrls: ["./groups.page.scss"],
})
export class GroupsPage implements OnInit {
  contacts = [];
  selectedSegment: string;

  constructor() {
    this.loadContacts();
    this.selectedSegment = "Friends";
    // this.contacts = [
    //   {
    //     contactId: 1,
    //     displayName: "Abishek Amstrong",
    //     emails: [],
    //     phoneNumbers: ["8015386360"],
    //   },
    //   {
    //     contactId: 2,
    //     displayName: "Akash Dubey",
    //     emails: [],
    //     phoneNumbers: ["9874563210"],
    //   },
    //   {
    //     contactId: 3,
    //     displayName: "Sunita Gogoi",
    //     emails: [],
    //     phoneNumbers: ["9780210003"],
    //   },
    //   {
    //     contactId: 1,
    //     displayName: "Abishek Amstrong",
    //     emails: [],
    //     phoneNumbers: ["8015386360"],
    //   },
    //   {
    //     contactId: 2,
    //     displayName: "Akash Dubey",
    //     emails: [],
    //     phoneNumbers: ["9874563210"],
    //   },
    //   {
    //     contactId: 3,
    //     displayName: "Sunita Gogoi",
    //     emails: [],
    //     phoneNumbers: ["9780210003"],
    //   },
    //   {
    //     contactId: 1,
    //     displayName: "Abishek Amstrong",
    //     emails: [],
    //     phoneNumbers: ["8015386360"],
    //   },
    //   {
    //     contactId: 2,
    //     displayName: "Akash Dubey",
    //     emails: [],
    //     phoneNumbers: ["9874563210"],
    //   },
    //   {
    //     contactId: 3,
    //     displayName: "Sunita Gogoi",
    //     emails: [],
    //     phoneNumbers: ["9780210003"],
    //   },
    //   {
    //     contactId: 1,
    //     displayName: "Abishek Amstrong",
    //     emails: [],
    //     phoneNumbers: ["8015386360"],
    //   },
    //   {
    //     contactId: 2,
    //     displayName: "Akash Dubey",
    //     emails: [],
    //     phoneNumbers: ["9874563210"],
    //   },
    //   {
    //     contactId: 3,
    //     displayName: "Sunita Gogoi",
    //     emails: [],
    //     phoneNumbers: ["9780210003"],
    //   },
    //   {
    //     contactId: 1,
    //     displayName: "Abishek Amstrong",
    //     emails: [],
    //     phoneNumbers: ["8015386360"],
    //   },
    //   {
    //     contactId: 2,
    //     displayName: "Akash Dubey",
    //     emails: [],
    //     phoneNumbers: ["9874563210"],
    //   },
    //   {
    //     contactId: 3,
    //     displayName: "Sunita Gogoi",
    //     emails: [],
    //     phoneNumbers: ["9780210003"],
    //   },
    // ];
  }

  ngOnInit() {}

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

  segmentChanged(ev: any) {
    this.selectedSegment = ev.detail.value;
  }
}

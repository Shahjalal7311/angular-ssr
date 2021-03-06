import { Component, OnInit } from '@angular/core';
import { Title, Meta, TransferState, makeStateKey } from '@angular/platform-browser';
import { HttpClient } from '@angular/common/http';

// make state key in state to store users
const STATE_KEY_USERS = makeStateKey('users');

@Component({
    selector: 'app-about',
    templateUrl: './about.component.html',
    styleUrls: ['./about.component.scss']
})
export class AboutComponent implements OnInit {
    public users: any = [];

    constructor(
        private title: Title,
        private meta: Meta,
        private http: HttpClient,
        private state: TransferState
    ) { }

    ngOnInit() {
        this.title.setTitle('About Angular SSR title update');
        this.meta.updateTag({
            'description': 'About Angular SSR description update'
        });

        this.users = this.state.get(STATE_KEY_USERS, <any>[]);
        if (this.users.length == 0) {
            this.http.get('https://jsonplaceholder.typicode.com/users')
            .subscribe((users) => {
                this.users = users;
                this.state.set(STATE_KEY_USERS, <any>users);
            }, (err) => {
                console.log(err);
            });
        }
    }
}
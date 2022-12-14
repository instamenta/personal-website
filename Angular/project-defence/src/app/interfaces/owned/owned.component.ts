import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NftService } from 'src/app/auth/nft.service';
import { UserService } from 'src/app/auth/user.service';

@Component({
  selector: 'app-owned',
  templateUrl: './owned.component.html',
  styleUrls: ['./owned.component.css']
})
export class OwnedComponent implements OnInit {

  userData: any;
  nftArray: any = [];
  params$: any;
  userId: any;
  constructor(
    private userService: UserService,
    public nftService: NftService,
    private route: ActivatedRoute
  ) { }


  ngOnInit(): void {
    this.params$ = this.route.params
    .subscribe(params => {
      this.userId = params["id"]
    })
    this.userService.getUser(this.userId)
    .subscribe((data) => {
      this.userData = data
      this.userData.ownedNft.forEach((element: any) => {
        this.nftService.loadNftByLink(element)
        .subscribe(result => {
          if (result != undefined) {
            this.nftArray.push(result)
          }
        })
      });
    })
  }
}



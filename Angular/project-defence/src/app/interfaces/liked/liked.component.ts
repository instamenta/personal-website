import { Component, OnInit } from '@angular/core';
import { NftService } from 'src/app/auth/nft.service';
import { UserService } from 'src/app/auth/user.service';

@Component({
  selector: 'app-liked',
  templateUrl: './liked.component.html',
  styleUrls: ['./liked.component.css']
})
export class LikedComponent implements OnInit {

  userData: any;
  nftArray: any =[];
  constructor(private userService: UserService, public nftService: NftService) { }


  ngOnInit(): void {
    this.userService.getUserData().subscribe((result) => {


      this.userData = result
      console.log(this.userData)

      this.userData.likedNft.forEach((element:any) => {
        this.nftService.loadNft(element).subscribe(result => {
          if(result != undefined) {  
            this.nftArray.push(result)

          }

        })
        
      });
     
    })
  }
}



import { Component , OnInit} from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NftService } from 'src/app/auth/nft.service';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.css']
})
export class DetailsComponent implements OnInit {
  
  nftData: any | null = null
  nftId: any;
  params$: any;
  constructor( private route: ActivatedRoute, private nftService: NftService) {}
  
  ngOnInit() {  

    this.params$ = this.route.params.subscribe(params => {
      this.nftId = params["id"]
    })
    console.log(this.nftId)

    this.nftData = this.nftService.loadNft(this.nftId).subscribe({
      next: (nftData) => {
        this.nftData = nftData
        console.log(nftData)
      }
    })
  }
}

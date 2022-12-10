import { Component, OnInit } from '@angular/core';
import { NftService } from 'src/app/auth/nft.service';

@Component({
  selector: 'app-catalog',
  templateUrl: './catalog.component.html',
  styleUrls: ['./catalog.component.css']
})
export class CatalogComponent implements OnInit{
  nftsData: any | null = null  

  constructor(private nftService: NftService) {}

  ngOnInit(): void {
    this.nftService.loadNfts().subscribe({
      next: (nftsData) => {
        this.nftsData = nftsData
        console.log(nftsData)
      }
    })
  }
}

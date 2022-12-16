import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { NftService } from 'src/app/auth/nft.service';
import { UserService } from 'src/app/auth/user.service';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.css']
})
export class CreateComponent implements OnInit {
  form: FormGroup;
  nameError: any;
  descriptionError: any;
  imgSrc: any = 'https://rlv.zcache.com.au/create_your_own_photo_print-r7881a010b313447b82044d4b2d1875bc_ncud_8byvr_324.jpg?square_it=true';
  urlError: any;
  priceError: any;
  userData: any;
  responseMessage: any;
  tokenValue: any;

  constructor(
    private formBuilder: FormBuilder,
    private nftService: NftService,
    private userService: UserService,
    private router: Router,
   ) {
    this.form = this.formBuilder.group({
      name: ['', [Validators.required, Validators.minLength(3)],],
      description: ['', [Validators.required, Validators.minLength(4)]],
      url: ['', [Validators.required, Validators.minLength(4)]],
      price: ['', [Validators.required, Validators.minLength(4)]],
    });
  }
  ngOnInit(): void {
    this.userService.getUserData().subscribe((result) => { this.userData = result;
      console.log(this.userData)})
    
  }
  onSubmit() {

    const nameControl = this.form.get('name')
    const descriptionControl = this.form.get('description')
    const urlControl = this.form.get('url')
    const priceControl = this.form.get('price')



    if (this.form.valid) {
      console.log('valid')
      const name = nameControl?.value
      const description = descriptionControl?.value
      const pic = urlControl?.value
      const price = priceControl?.value

      console.log(name)
      console.log(description)
      console.log(pic)
      console.log(price)
      this.nftService.createNft(
        name,
        description,
        price,
        pic,
        this.userData
        )
        .subscribe((response) => {
          
          this.router.navigate(['/catalog/details/' + response.post._id])
        })

    } else {
      if(nameControl?.hasError) {
        this.nameError = true
      }
      
      if(descriptionControl?.hasError) {
        this.descriptionError = true
      }
      
      if(priceControl?.hasError) {
        this.priceError = true
      }
      
      if(urlControl?.hasError) {
        this.urlError = true
      }
    }
  }

  urlHandler() {
    let data = this.form.get('url')
    this.imgSrc = data?.value

  }
}
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AuthenticationService } from 'src/app/authentication/authentication.service';

@Component({
    selector: 'app-details',
    templateUrl: './details.component.html',
    styleUrls: ['./details.component.scss']
})
export class DetailsComponent implements OnInit {
    public productId;
    public productData;
    constructor(private route: ActivatedRoute, public api: AuthenticationService) { }

    ngOnInit() {
        this.productId = this.route.snapshot.params.id;
        this.route.params.subscribe(
            (param) => {
                this.productId = param.id;
                this.api.getProduct(this.productId).toPromise()
                    .then((res:any) => {
                            //console.log('response', res);
                            this.productData = res.data;
                            //console.log(this.productData.product_name);
                        }
                    )
                    .catch(err => {
                        console.log(err);
                    });

                /* .subscribe(
                 (res:any) => {
                 this.productData = res.data;
                 console.log('Product console', this.productData);
                 },
                 (error:any) => {
                 console.log(error);
                 },
                 ) */


            }
         )


    }

}

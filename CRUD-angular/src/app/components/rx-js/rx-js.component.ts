import { Component } from '@angular/core';
import { interval, map, Subscription, timer } from 'rxjs';
import { ProductserviceService } from '../products/productservice.service';

@Component({
  selector: 'app-rx-js',
  templateUrl: './rx-js.component.html',
  styleUrls: ['./rx-js.component.css']
})
export class RxJSComponent {

  interval:any;
  timer:any;
  mapvar:any;
  users:any;
  filterKey:any | undefined;
  subscription:Subscription | undefined;
  subscription2:Subscription | undefined;
  subscription3:Subscription | undefined;


  constructor(private productervice:ProductserviceService){}

  ngOnInit(){
    
    //interval

    const intervalExample = interval(2000);
    this.subscription = intervalExample.subscribe(res=>{
      console.log(res)
      this.interval = res
      if(res>=5){
        this.subscription?.unsubscribe()
      }
    })
 
    // timer
    const timerExample = timer(5000,1000)
    this.subscription2 = timerExample.subscribe(res=>{
      console.log(res)
      this.timer = res
      if(res>=5){
        this.subscription2?.unsubscribe()
      }
    })


    //map
    //const numbers = [10,20,30,40,50,60,70,80,90,100]
    const mapExample = interval(2000);
    this.subscription3 = mapExample.pipe(
      map(data=>data*10)
    )
    .subscribe(res=>{
      console.log(res)
      this.mapvar = res
      if(res>=50){
        this.subscription3?.unsubscribe()
      }
    })


    this.productervice.getProductList({'page':0,'size':10}).pipe(
      // filter( res=> console.log(res))
    )
    .subscribe((res:any)=>{
      console.log(res)
      this.users = res['products']
    })

  }    

}

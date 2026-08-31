import {
  Component
} from '@angular/core';

import {
  Router
} from '@angular/router';


interface GiftOffer {
  id: string;
  title: string;
  description: string;
  icon: string;
  discount: string;
}


@Component({
  selector: 'app-offers',
  templateUrl: './offers.html',
  styleUrl: './offers.css'
})
export class Offers {

  offers: GiftOffer[] = [

    {
      id: 'offer-01',
      title: 'خصم على صناديق الهدايا',
      description:
        'استمتع بخصم على بعض اختيارات صناديق الهدايا.',
      icon: '🎁',
      discount: 'خصم 10%'
    },

    {
      id: 'offer-02',
      title: 'عرض الورد والشوكولاتة',
      description:
        'اختار ورد وشوكولاتة داخل نفس الصندوق واستمتع بعرض مميز.',
      icon: '🌹',
      discount: 'عرض خاص'
    },

    {
      id: 'offer-03',
      title: 'إضافات بسعر مميز',
      description:
        'اختار التغليف والكارت مع صندوق الهدية بسعر أفضل.',
      icon: '🎀',
      discount: 'وفر أكتر'
    }

  ];


  constructor(
    private router: Router
  ) {}


  goToCatalog(): void {

    this.router.navigate(
      ['/gifts/catalog']
    );
  }


  goBack(): void {

    this.router.navigate(
      ['/gifts']
    );
  }

}
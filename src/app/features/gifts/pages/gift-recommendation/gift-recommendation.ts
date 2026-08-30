import { Component } from '@angular/core';
import { Router } from '@angular/router';

type Recipient =
  | 'male'
  | 'female'
  | 'boy'
  | 'girl';

type Occasion =
  | 'birthday'
  | 'anniversary'
  | 'graduation'
  | 'congratulations'
  | 'thanks'
  | 'love'
  | 'apology'
  | 'none';

interface RecipientOption {
  id: Recipient;
  name: string;
  icon: string;
}

interface OccasionOption {
  id: Occasion;
  name: string;
  icon: string;
  allowedFor: Recipient[];
}

@Component({
  selector: 'app-gift-recommendation',
  templateUrl: './gift-recommendation.html',
  styleUrl: './gift-recommendation.css'
})
export class GiftRecommendation {

  step = 1;

  selectedRecipient: Recipient | null = null;
  selectedOccasion: Occasion | null = null;

  recipients: RecipientOption[] = [
    {
      id: 'male',
      name: 'ذكر',
      icon: '👨'
    },
    {
      id: 'female',
      name: 'أنثى',
      icon: '👩'
    },
    {
      id: 'boy',
      name: 'طفل',
      icon: '👦'
    },
    {
      id: 'girl',
      name: 'طفلة',
      icon: '👧'
    }
  ];

  occasions: OccasionOption[] = [
    {
      id: 'birthday',
      name: 'عيد ميلاد',
      icon: '🎂',
      allowedFor: [
        'male',
        'female',
        'boy',
        'girl'
      ]
    },

    {
      id: 'anniversary',
      name: 'ذكرى سنوية',
      icon: '💍',
      allowedFor: [
        'male',
        'female'
      ]
    },

    {
      id: 'graduation',
      name: 'تخرج',
      icon: '🎓',
      allowedFor: [
        'male',
        'female'
      ]
    },

    {
      id: 'congratulations',
      name: 'تهنئة',
      icon: '🎉',
      allowedFor: [
        'male',
        'female',
        'boy',
        'girl'
      ]
    },

    {
      id: 'thanks',
      name: 'شكر وتقدير',
      icon: '🙏',
      allowedFor: [
        'male',
        'female',
        'boy',
        'girl'
      ]
    },

    {
      id: 'love',
      name: 'للتعبير عن الحب',
      icon: '❤️',
      allowedFor: [
        'male',
        'female'
      ]
    },

    {
      id: 'apology',
      name: 'اعتذار / مصالحة',
      icon: '🤍',
      allowedFor: [
        'male',
        'female'
      ]
    },

    {
      id: 'none',
      name: 'بدون مناسبة',
      icon: '🌸',
      allowedFor: [
        'male',
        'female',
        'boy',
        'girl'
      ]
    }
  ];

  constructor(
    private router: Router
  ) {}


  get availableOccasions(): OccasionOption[] {

    if (!this.selectedRecipient) {
      return [];
    }

    return this.occasions.filter(
      occasion =>
        occasion.allowedFor.includes(
          this.selectedRecipient!
        )
    );
  }


  selectRecipient(
    recipient: Recipient
  ): void {

    this.selectedRecipient = recipient;

    // لو غير الشخص نلغي المناسبة القديمة
    this.selectedOccasion = null;
  }


  selectOccasion(
    occasion: Occasion
  ): void {

    this.selectedOccasion = occasion;
  }


  goToNextStep(): void {

    if (!this.selectedRecipient) {
      return;
    }

    this.step = 2;
  }


  goToPreviousStep(): void {

    this.step = 1;

    this.selectedOccasion = null;
  }


  showRecommendations(): void {

    if (
      !this.selectedRecipient ||
      !this.selectedOccasion
    ) {
      return;
    }

    this.router.navigate(
      ['/gifts/catalog'],
      {
        queryParams: {
          recommendation: 'true',
          recipient: this.selectedRecipient,
          occasion: this.selectedOccasion
        }
      }
    );
  }
}
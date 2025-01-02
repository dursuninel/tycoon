export const COURSES = {
  basic_training: {
    name: 'Temel Eğitim',
    description: 'Üretkenliği %10 artırır',
    duration: 30,
    cost: 100,
    effect: {
      productivity: 0.1
    }
  },
  advanced_production: {
    name: 'İleri Üretim Teknikleri',
    description: 'Üretkenliği %25 artırır',
    duration: 60,
    cost: 250,
    effect: {
      productivity: 0.25
    },
    requires: 'basic_training'
  },
  leadership: {
    name: 'Liderlik Eğitimi',
    description: 'Takım verimliliğini %15 artırır',
    duration: 45,
    cost: 200,
    effect: {
      leadership: 0.15
    }
  },
  quality_control: {
    name: 'Kalite Kontrol',
    description: 'Ürün kalitesini %20 artırır',
    duration: 40,
    cost: 150,
    effect: {
      quality: 0.2
    }
  }
}; 
export const TECHNOLOGIES = {
  'Üretim Teknolojileri': {
    'automated_production': {
      name: 'Otomatik Üretim',
      description: 'Üretim verimliliğini %20 artırır',
      cost: 5000,
      researchTime: 60,
      unlocked: true,
      canResearch: true,
      effects: {
        productionEfficiency: 1.2
      },
      requirements: []
    },
    'advanced_machinery': {
      name: 'Gelişmiş Makineler',
      description: 'Fabrika üretimini %30 artırır',
      cost: 10000,
      researchTime: 120,
      unlocked: false,
      canResearch: false,
      effects: {
        factoryOutput: 1.3
      },
      requirements: ['automated_production']
    }
  },
  'İşçi Geliştirme': {
    'worker_training': {
      name: 'İşçi Eğitimi',
      description: 'İşçi verimliliğini %15 artırır',
      cost: 3000,
      researchTime: 45,
      unlocked: true,
      canResearch: true,
      effects: {
        workerEfficiency: 1.15
      },
      requirements: []
    },
    'team_management': {
      name: 'Takım Yönetimi',
      description: 'İşçi motivasyonunu artırır',
      cost: 7000,
      researchTime: 90,
      unlocked: false,
      canResearch: false,
      effects: {
        workerHappiness: 1.2
      },
      requirements: ['worker_training']
    }
  },
  'Kaynak Yönetimi': {
    'resource_optimization': {
      name: 'Kaynak Optimizasyonu',
      description: 'Hammadde kullanımını %10 azaltır',
      cost: 4000,
      researchTime: 50,
      unlocked: true,
      canResearch: true,
      effects: {
        resourceEfficiency: 1.1
      },
      requirements: []
    }
  }
}; 
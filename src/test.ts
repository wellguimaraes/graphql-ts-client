import arriereBackoffice from './arriereBackoffice'

arriereBackoffice.setHeader('Authorization', 'Bearer 63x9OdRKPWr38z7XkxPUVUD5PMl39A2i')

arriereBackoffice.queries
  .home({
    __args: {
      homeId: 'ffe1e02d-4f58-11e9-87e3-476937c31240',
    },
    id: true,
    title: true,
    // name: true,
    // description: true,
    // latitude: true,
    // longitude: true,
    // maxOccupancy: true,
    // maxPets: true,
    // active: true,
    // liveStatus: true,
    // createdAt: true,
    // activeLeaseMonthlyAmount: true,
    // shortDescription: true,
    leases: {
      startDate: true,
      // endDate: true,
    },
    blockedHomes: {
      id: true,
      name: true,
      thumbnail: {
        url: true,
      },
      region: {
        name: true,
      },
    },
  })
  .then(r => console.log(r.leases.map(it => it.startDate)))

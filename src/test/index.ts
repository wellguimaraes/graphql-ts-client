import arrierePublic from './arrierePublic'

(async () => {
  await arrierePublic.mutations.generateTrackedUrl({
    __args: {
      action: 'bookingDownload',
      url: 'https://avantstay.com/download',
      metadata: JSON.stringify({}),
    },
  })
})()

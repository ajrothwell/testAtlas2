var BASE_CONFIG_URL = 'https://cdn.rawgit.com/ajrothwell/mapboard-base-config/252debf3c4089478419f78e4bdfe26486988d236/config.js';
var GATEKEEPER_KEY = '82fe014b6575b8c38b44235580bc8b11';


mapboard.default({
  baseConfig: BASE_CONFIG_URL,
  gatekeeperKey: GATEKEEPER_KEY,
  components: {
    type: 'topic-set',
    options: {
      defaultTopic: 'property'
    }
  },
  parcels: {
    pwd: {
      multipleAllowed: false,
      geocodeFailAttemptParcel: null,
      clearStateOnError: false,
      wipeOutOtherParcelsOnReverseGeocodeOnly: true,
      geocodeField: 'PARCELID',
      parcelIdInGeocoder: 'pwd_parcel_id',
      getByLatLngIfIdFails: false
    },
    dor: {
      multipleAllowed: true,
      geocodeFailAttemptParcel: 'pwd',
      clearStateOnError: true,
      wipeOutOtherParcelsOnReverseGeocodeOnly: false,
      geocodeField: 'MAPREG',
      parcelIdInGeocoder: 'dor_parcel_id',
      getByLatLngIfIdFails: true
    }
  },
  dataSources: {},
  topics: [
    {
      key: 'Property',
      components: [],
    }
  ],

});


if (location.hostname !== 'localhost') {
  console.log = console.info = console.debug = console.error = function () {};
}

var BASE_CONFIG_URL = 'https://cdn.rawgit.com/ajrothwell/mapboard-base-config/252debf3c4089478419f78e4bdfe26486988d236/config.js';
var GATEKEEPER_KEY = '82fe014b6575b8c38b44235580bc8b11';


mapboard.default({
  baseConfig: BASE_CONFIG_URL,
  gatekeeperKey: GATEKEEPER_KEY,
  components: [
    {
      type: 'topic-set',
      options: {
        // defaultTopic: 'property'
      }
    },
  ],
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
  greeting: {
    initialMessage: '\
      <h2>Atlas is your front door to the City of Philadelphia.</h2>\
      <p>Here are some things you can do with Atlas:</p>\
      <div class="callout">\
        <ul>\
          <li>Get the history of permits, licenses, and inspections at any address</li>\
          <li>Research real estate information including property values, zoning, and document archives</li>\
          <li>Get easy access to a variety of hard-to-find City resources</li>\
          <li>View recent activity around your address, such as crimes, 311 service requests, and more</li>\
          <li>Explore historical imagery and maps</li>\
        </ul>\
      </div>\
      <p>To get started, click anywhere on the map, or type an address, intersection, property assessment account number, or Department of Records Map Registry number into the search box.</p>\
    ',
  },
  dataSources: {
    opa: {
      type: 'http-get',
      url: 'https://data.phila.gov/resource/w7rb-qrn8.json',
      options: {
        params: {
          parcel_number: function(feature) { return feature.properties.opa_account_num; }
        },
        success: function(data) {
          return data[0];
        }
      }
    },
  },
  topics: [
    {
      key: 'property',
      icon: 'home',
      label: 'Property Assessments',
      parcels: 'pwd',
      identifyFeature: 'address-marker',
      components: [
        {
          type: 'callout',
          slots: {
            text: '\
              Property assessment and sale information for this address. Source: Office of Property Assessments (OPA). OPA was formerly a part of the Bureau of Revision of Taxes (BRT) and some City records may still use that name.\
            '
          }
        },
      ],
    },
    {
      key: 'deeds',
      icon: 'book',
      label: 'Deeds',
      parcels: 'dor',
      identifyFeature: 'dor-parcel',
      components: [
        {
          type: 'callout',
          slots: {
            text: '\
              Deed information and document transactions for this address.\
              The map faithfully reflects property boundaries as described in \
              recorded deeds including multiple types of easements.\
              The property boundaries displayed on the map are for reference \
              only and should not be used in place of the recorded deeds or \
              land surveys. Source: Department of Records\
            ',
          }
        },
      ],
    }
  ],
});

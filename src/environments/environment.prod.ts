// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environments.ts` with `environments.prod.ts`.
// The list of file replacements can be found in `angular.json`.
export const environment = {
  production: true
};
export const DEFAULT_CODE_LANG = 'es';
export const DEFAULT_SYMBOL_CURRENCY = 'US$';
export const SHOW_WINDOWS_BAR = false;
export const MAX_SIZE_IN_PX = 2500;
export const MAX_SIZE_IN_MB = 0.7;
export const SUPPORTED_PRODUCTS = [
  {name: 'Relojería', productId: 'WATCH', color: '#FF920B'},
  {name: 'Joyería', productId: 'JEWELS', color: '#ff412d'}
];
// ,
// {name: 'Bolsos', productId: 'HANDPACK', color: '#995cff'},
// {name: 'Maletas', productId: 'BACKPACK', color: '#51ffa5'}

export const PRODUCT_TYPES = {
  WATCH: 'watches',
};

export const WATCH_PARTS = {
  MOVEMENT: {
    name: 'Maquinaria',
    productType: 'watches',
    productTypeId: 'watch',
    type: 'movements',
    typeId: 'movement'
  },
  CASE: {
    name: 'Caja',
    productType: 'watches',
    productTypeId: 'watch',
    type: 'cases',
    typeId: 'case'
  },
  MODEL: {
    name: 'Modelo',
    productType: 'watches',
    productTypeId: 'watch',
    type: 'models',
    typeId: 'model'
  },
  COLLECTION: {
    name: 'Colección',
    productType: 'watches',
    productTypeId: 'watch',
    type: 'bunckles',
    typeId: 'collection'
  },
  WATCH_CONFIG: {
    name: 'Configuración de reloj',
    productType: 'watches',
    productTypeId: 'watch',
    type: 'watchConfigs',
    typeId: 'watchConfig'
  },
  STRAP: {
    name: 'Pulso',
    productType: 'watches',
    productTypeId: 'watch',
    type: 'straps',
    typeId: 'strap'
  },
  BUNCKLE: {
    name: 'Hebilla',
    productType: 'watches',
    productTypeId: 'watch',
    type: 'bunckles',
    typeId: 'bunckle'
  },
  CROWN: {
    name: 'Corona',
    productType: 'watches',
    productTypeId: 'watch',
    type: 'crowns',
    typeId: 'crown'
  },
  CASEBACK: {
    name: 'Tapa',
    productType: 'watches',
    productTypeId: 'watch',
    type: 'casebacks',
    typeId: 'caseback'
  },
  CRYSTAL: {
    name: 'Cristal',
    productType: 'watches',
    productTypeId: 'watch',
    type: 'crystals',
    typeId: 'crystal'
  }
};

export const CATEGORIES = {
  INVENTORY: 'inventory',
  STRUCTURE: 'structures',
  COUNTER: 'counters',
  LOTS: 'lots'
};

//   MODEL: {
//     name: 'Modelo',
//     productType: 'models',
//   },
//   STRAP: {
//     name: 'Pulso',
//     productType: 'models',
//     imgDbRoute: 'products/watches/parts/strap'
//   },
//   BUNCKLE: {
//     name: 'Hebilla',
//     productType: 'models',
//     imgDbRoute: 'products/watches/parts/bunckles'
//   },
//   CASE: {
//     name: 'Caja',
//     imgDbRoute: 'products/watches/parts/cases'
//   },
//   CRYSTAL: {
//     name: 'Cristal',
//     imgDbRoute: 'products/watches/parts/crystals'
//   },
//   CROWN: {
//     name: 'Corona',
//     productId: 'crown',
//     imgDbRoute: 'products/watches/parts/crowns'
//   },
//   CASEBACK: {
//     name: 'Tapa',
//     productId: 'caseBack',
//     imgDbRoute: 'products/watches/parts/caseBacks'
//   }
// };
export const DBS = {
  public: {
    apiKey: 'AIzaSyAZcu9JauJIWtaGQnDgLnJ3ZFg7RcEweAo',
    authDomain: 'publicpage-5b145-68fbf.firebaseapp.com',
    databaseURL: 'https://publicpage-5b145-68fbf.firebaseio.com',
    projectId: 'publicpage-5b145',
    storageBucket: 'publicpage-5b145.appspot.com',
    messagingSenderId: '610932498989'
  },
  main: {
    apiKey: 'AIzaSyC2yKQPYRZeTnF1rqFNtWkAC8JVBAXEMTI',
    authDomain: 'moena-1989.firebaseapp.com',
    databaseURL: 'https://moena-1989.firebaseio.com',
    projectId: 'moena-1989',
    storageBucket: 'moena-1989.appspot.com',
    messagingSenderId: '641564036734'
  }
};
/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.

/* 
 * This is the main configuration file for SmartMonitoring Frontend.
 * 
 * You should only change values in these file for your setup. No need to
 * modify other files.
 */

var SmartMonitoring = {
    version: '3.0 dev'
};

var baseurl = window.location.protocol + "//" + window.location.host;
var SWAC_config = {
    lang: 'de',
    notifyDuration: 5000,
    debugmode: false,
    debug: '',
    globalparams: {
        smartdataurlnenc: baseurl + '/SmartDataAirquality',
        smartdataurl: encodeURIComponent(baseurl) + '%2FSmartDataAirquality',
        measurefreq: 10,
        data_collection: '[DATA_COLLECTION]',
        display_value_1: 'pm2_5',
        display_value_1_icon: 'air',
        display_value_2: 'pm10_0',
        display_value_2_icon: 'air',
        route_data_destination: 'tbl_routes_planned',
        route_identifier: 'route_id',
        display_value_3: 'temp1',
        display_value_3_icon: 'device_thermostat',
        display_value_4_icon: '123',
        timestamp: 'ts',
        map_datadescription: '../../customisations/data/airquality_map_datadesc.json',
        lat: 'pos_lat',
        lon: 'pos_lon'
    },
    startuptests: [
    ],
    datasources: [
        {
            url: "/SmartDataAirquality/smartdata/[iface]/[fromName]?storage=smartmonitoring",
            interfaces: {
                get: ['GET', 'records'],
                list: ['GET', 'records'],
                defs: ['GET', 'collection'],
                cdefs: ['POST', 'collection'],
                create: ['POST', 'records'],
                update: ['PUT', 'records'],
                delete: ['DELETE', 'records']
            },
            exclude: ['getCollections']
        },
        {
            url: "/SmartDataTest/smartdata/storage/[fromName]?name=smartmonitoring"
        },
        
// @deprecated Configuration for useing SmartMonitoringBackend
//            exclude: ['observedobject/create', 'listParents', 'listChilds', 'listForObservedObject']
//        },
//        {
//            url: "/SmartMonitoringBackend/smartmonitoring/[fromName]",
//            interfaces: {
//                get: ['GET', 'get'],
//                list: ['GET', 'list'],
//                defs: ["GET", 'definition'],
//                create: ['POST', 'create'],
//                update: ['UPDATE', 'update'],
//                delete: ['DELETE', 'delete']
//            }
//        }
    ],
    progressive: {
        active: false
    },
    onlinereactions: [
//    {
//      path: SWAC_config.swac_root + '/swac/components/Upload/UploadOnReact.js',
//      config: {}
//    }
    ]
};

/**
 * Options for swac_user component
 * Used on every page
 */
var userform_options = {
    loginURL: '/SmartUser/smartuser/user/performLogin',
    afterLogoutLoc: '../../index.html',
    accountURL: '../../sites/user/account.html',
    activeOn: {
        fromName: 'tbl_systemconfiguration', // Name of the datatable
        fromWheres: {
            filter: 'ckey,eq,func_userlogin&filter=active,eq,true'
        }
    }
};
//user_options.loggedinRedirects = new Map();
//user_options.loggedinRedirects.set('user_example3.html','../sites/user_example2.html');

// Links for footer navigation
var footerlinks = [
    {id: 1, rfrom: "*", rto: "about/datenschutz.html", name: "Datenschutzerklärung"},
    {id: 2, rfrom: "*", rto: "about/impressum.html", name: "Impressum"},
    {id: 3, rfrom: "*", rto: "about/system.html", name: "SmartMonitoring"}
];

// Options for favourites
window['favs_options'] = {
    showFavIcon: true,
    showFavList: false,
    showHistList: false,
    activeOn: {
        fromName: 'tbl_systemconfiguration', // Name of the datatable
        fromWheres: {
            filter: 'ckey,eq,func_userfavs&filter=active,eq,true'
        }
    }
};

// Erzwinge clearstates=true damit keine caching probleme auftreten
(function ensureClearStatesParam(){
    const url = new URL(window.location.href);
    if (url.searchParams.get('clearstates') !== 'true') {
        url.searchParams.set('clearstates', 'true');
        history.replaceState({}, '', url);
    }
})();



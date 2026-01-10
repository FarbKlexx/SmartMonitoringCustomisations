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
        measurefreq: 10
    },
    datasources: [
        {
            url: "/SmartDataAirquality/smartdata/[iface]/[fromName]?storage=smartmonitoring",
            interfaces: {
                get: ['GET', 'records'],
                list: ['GET', 'records'],
                defs: ['GET', 'collection'],
                create: ['POST', 'records'],
                update: ['PUT', 'records'],
                delete: ['DELETE', 'records']
            },
            exclude: ['getCollections']
        },
        {
            url: "/SmartDataAirquality/smartdata/storage/[fromName]?name=smartmonitoring"
        }
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
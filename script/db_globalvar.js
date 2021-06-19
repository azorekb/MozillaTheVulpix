// constans
const MOBILE_WIDTH = 760;
const SIZE_OF_TD = 20;
const IMG_WAY = 'img/';
const NUMBER_OF_EFFECTS = 3;
const COLOR_SUCCESS = '#008000';
const COLOR_ERROR = '#ff0000';
const COLOR_WARNING = '#0000ff';
const waitingImageUrl = "img/vapi.gif";

//variable

let logInTab = 'logIn';
let mapCenter = {toX: 0, isX: 0, toY: 0, isY: 0,};
let way_comming = null;
let actualPosition = {x:0, y:0};
let activeWindow = -1;
let speed = 10;
let actualMap = [];
let actualMapData = {title: {english: null}, no: 0};
let activeButton = null;
let activeUser = {name: '', admin: false};
let language = 'polski';

let adm_selectedMapObject = 0;
let adm_selectedMapBG = 0;
let noErrors = true;
let adm_thisMap = [];

// tables from server db
let pokemonList = [];
let moveList = [];
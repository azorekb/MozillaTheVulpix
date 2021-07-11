// constans
const MOBILE_WIDTH = 760;
const SIZE_OF_TD = 20;
const NUMBER_OF_EFFECTS = 3;
const COLOR_SUCCESS = '#008000';
const COLOR_ERROR = '#ff0000';
const COLOR_WARNING = '#0000ff';
const waitingImageUrl = "img/vapi.gif";
const NATURE_CHANGE = 0.1;
const MAX_EV_SUM = 512;
const MAX_EV = 256;
const ENCOUNTER_CHANCE = 30;
const TEAM_COUNT = 6;
const POKEMON_MOVE_COUNT = 4;
const MAIN_CHARACTER_IMAGE = 'img/objects/joy.png';

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
let activeUser = {name: '', admin: false, team: []};
let language = 'polski';
let battle = new BattleField();
let battle_opponentTeam = [];
let battle_allyTeam = [];

//HTTP Request
let php_request = new XMLHttpRequest();
let requestInterval;
let numberOfTries = 0;

// tables from server db
let pokemonList = [];
let moveList = [];

//admin vars
let adm_selectedMapObject = 0;
let adm_selectedMapBG = 0;
let noErrors = true;
let adm_thisMap = [];

//test
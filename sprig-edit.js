/*
@title: Sprig-Edit
@author: Colack
@tags: ['utility']
@img: ""
@addedOn: 2024-04-30

This is a simple text editor for Sprig.

Controls:
AD - Left / Right
JL - Change Letter
W - New Line
S - Space and Start
I - Place
K - Delete
*/

/*
  Sprig-Edit
  By Jack Spencer (Colack)

  Sprig-Edit is a basic text editor for the Sprig that I've created. It was originally written in C++, then translated over to JS for this project.
  Sprig-Edit contains 40 characters: A-Z, !?.- and 0-9. It is controlled with all the buttons, and is a pretty robust text editor that will be
  updated for the forseeable future. 

  There is documentation in the code for what each bit of code does.

  Thanks,
  - Colack
*/

// Tunes for the Game
const MUSIC_main = tune`
97.71986970684038: C4-97.71986970684038 + C5/97.71986970684038,
97.71986970684038,
97.71986970684038: C4-97.71986970684038 + C5/97.71986970684038,
97.71986970684038,
97.71986970684038: C4-97.71986970684038,
97.71986970684038: E4-97.71986970684038 + E5/97.71986970684038,
97.71986970684038: C4-97.71986970684038 + C5/97.71986970684038,
97.71986970684038,
97.71986970684038: C4-97.71986970684038 + C5/97.71986970684038,
97.71986970684038,
97.71986970684038: C4-97.71986970684038 + C5/97.71986970684038,
97.71986970684038: E4-97.71986970684038 + E5/97.71986970684038,
97.71986970684038: C4-97.71986970684038 + C5/97.71986970684038,
97.71986970684038,
97.71986970684038: C4-97.71986970684038 + C5/97.71986970684038,
97.71986970684038,
97.71986970684038: C4-97.71986970684038 + C5/97.71986970684038,
97.71986970684038: C4-97.71986970684038 + C5/97.71986970684038,
97.71986970684038: G4-97.71986970684038 + G5/97.71986970684038,
97.71986970684038,
97.71986970684038: G4-97.71986970684038 + G5/97.71986970684038,
97.71986970684038,
97.71986970684038: B4-97.71986970684038 + B5/97.71986970684038,
97.71986970684038,
97.71986970684038: G4-97.71986970684038 + G5/97.71986970684038,
97.71986970684038,
97.71986970684038: B4-97.71986970684038 + B5/97.71986970684038,
97.71986970684038: A4-97.71986970684038 + A5/97.71986970684038,
97.71986970684038: G4-97.71986970684038 + G5/97.71986970684038,
97.71986970684038: F4-97.71986970684038 + F5/97.71986970684038,
97.71986970684038: E4-97.71986970684038 + E5/97.71986970684038,
97.71986970684038: D4-97.71986970684038 + D5/97.71986970684038`;
const MUSIC_controls = tune`
138.88888888888889: C4/138.88888888888889 + C5^138.88888888888889,
138.88888888888889,
138.88888888888889: C4/138.88888888888889 + C5^138.88888888888889,
138.88888888888889: D4/138.88888888888889 + D5^138.88888888888889,
138.88888888888889: G4/138.88888888888889 + G5^138.88888888888889,
138.88888888888889,
138.88888888888889: G4/138.88888888888889 + G5^138.88888888888889,
138.88888888888889: B4/138.88888888888889 + B5^138.88888888888889,
138.88888888888889: G4/138.88888888888889 + G5^138.88888888888889,
138.88888888888889: D4/138.88888888888889 + D5^138.88888888888889,
138.88888888888889: D4/138.88888888888889 + D5^138.88888888888889,
138.88888888888889: G4/138.88888888888889 + G5^138.88888888888889,
138.88888888888889,
138.88888888888889: G4/138.88888888888889 + G5^138.88888888888889,
138.88888888888889: C5^138.88888888888889 + C4/138.88888888888889,
138.88888888888889: E5^138.88888888888889 + E4/138.88888888888889,
138.88888888888889: C5^138.88888888888889 + C4/138.88888888888889,
138.88888888888889: E5^138.88888888888889 + E4/138.88888888888889,
138.88888888888889: E5^138.88888888888889 + E4/138.88888888888889,
138.88888888888889: G5^138.88888888888889 + G4/138.88888888888889,
138.88888888888889: E5^138.88888888888889 + E4/138.88888888888889,
138.88888888888889: G5^138.88888888888889 + G4/138.88888888888889,
138.88888888888889: G5^138.88888888888889 + G4/138.88888888888889,
138.88888888888889: B5^138.88888888888889 + B4/138.88888888888889,
138.88888888888889: G5^138.88888888888889 + G4/138.88888888888889,
138.88888888888889: B5^138.88888888888889 + B4/138.88888888888889,
138.88888888888889: G5^138.88888888888889 + G4/138.88888888888889,
138.88888888888889: E5^138.88888888888889 + E4/138.88888888888889,
138.88888888888889: C5^138.88888888888889 + C4/138.88888888888889,
138.88888888888889: E5^138.88888888888889 + E4/138.88888888888889,
138.88888888888889: G5^138.88888888888889 + G4/138.88888888888889,
138.88888888888889: E5^138.88888888888889 + E4/138.88888888888889`;
const MUSIC_editor = tune`
196.07843137254903: C4/196.07843137254903 + C5-196.07843137254903,
196.07843137254903: D4/196.07843137254903 + F5-196.07843137254903,
196.07843137254903: C4/196.07843137254903 + A5-196.07843137254903,
196.07843137254903: D4/196.07843137254903,
196.07843137254903: G4/196.07843137254903 + A5-196.07843137254903,
196.07843137254903: A4/196.07843137254903 + F5-196.07843137254903,
196.07843137254903: G4/196.07843137254903,
196.07843137254903: A4/196.07843137254903 + F5-196.07843137254903,
196.07843137254903: C4/196.07843137254903 + D5-196.07843137254903,
196.07843137254903: D4/196.07843137254903 + C5-196.07843137254903,
196.07843137254903: C4/196.07843137254903 + C5-196.07843137254903,
196.07843137254903: D4/196.07843137254903 + D5-196.07843137254903,
196.07843137254903: G4/196.07843137254903 + D5-196.07843137254903,
196.07843137254903: A4/196.07843137254903 + F5-196.07843137254903,
196.07843137254903: G4/196.07843137254903 + C5-196.07843137254903,
196.07843137254903: A4/196.07843137254903 + F5-196.07843137254903,
196.07843137254903: C4/196.07843137254903 + D5-196.07843137254903,
196.07843137254903: D4/196.07843137254903 + F5-196.07843137254903,
196.07843137254903: C4/196.07843137254903 + A5-196.07843137254903,
196.07843137254903: D4/196.07843137254903 + F5-196.07843137254903,
196.07843137254903: G4/196.07843137254903,
196.07843137254903: A4/196.07843137254903 + F5-196.07843137254903,
196.07843137254903: G4/196.07843137254903 + E5-196.07843137254903,
196.07843137254903: A4/196.07843137254903 + C5-196.07843137254903,
196.07843137254903: C4/196.07843137254903 + E5-196.07843137254903,
196.07843137254903: D4/196.07843137254903 + A5-196.07843137254903,
196.07843137254903: C4/196.07843137254903 + D5-196.07843137254903,
196.07843137254903: D4/196.07843137254903 + F5-196.07843137254903,
196.07843137254903: G4/196.07843137254903 + D5-196.07843137254903,
196.07843137254903: A4/196.07843137254903 + F5-196.07843137254903,
196.07843137254903: G4/196.07843137254903 + D5-196.07843137254903,
196.07843137254903: A4/196.07843137254903 + C5-196.07843137254903`;

// Sound Effects
const SFX_start = tune`
500: C4-500,
15500`;
const SFX_edit = tune`
103.44827586206897: C4-103.44827586206897,
103.44827586206897: C4-103.44827586206897,
103.44827586206897: C4-103.44827586206897,
3000`;
const SFX_jared = tune`
236.2204724409449: C4/236.2204724409449 + C5/236.2204724409449,
7322.834645669292`;

// Playback variables.
const PLAYBACK_MAIN = playTune(MUSIC_main, Infinity);
var PLAYBACK_CONTROLS;
var PLAYBACK_EDITOR;

// Title Screen Level
var LEVEL_TITLE = map``;

// Text Variables
const TEXT_A = "A";
const TEXT_B = "B";
const TEXT_C = "C";
const TEXT_D = "D";
const TEXT_E = "E";
const TEXT_F = "F";
const TEXT_G = "G";
const TEXT_H = "H";
const TEXT_I = "I";
const TEXT_J = "J";
const TEXT_K = "K";
const TEXT_L = "L";
const TEXT_M = "M";
const TEXT_N = "N";
const TEXT_O = "O";
const TEXT_P = "P";
const TEXT_Q = "Q";
const TEXT_R = "R";
const TEXT_S = "S";
const TEXT_T = "T";
const TEXT_U = "U";
const TEXT_V = "V";
const TEXT_W = "W";
const TEXT_X = "X";
const TEXT_Y = "Y";
const TEXT_Z = "Z";

// Symbol Variables
const TEXT_EX = "!";
const TEXT_QU = "?";
const TEXT_PE = "[";
const TEXT_DA = "-";

// Number Variables
const NUM_0 = "0";
const NUM_1 = "1";
const NUM_2 = "2";
const NUM_3 = "3";
const NUM_4 = "4";
const NUM_5 = "5";
const NUM_6 = "6";
const NUM_7 = "7";
const NUM_8 = "8";
const NUM_9 = "9";

// Logo Variables
const LOGO_1 = "(";
const LOGO_2 = ")";
const LOGO_3 = "*";
const LOGO_4 = "&";

const BACKGROUND_BLACK = "^";

const player = "#";             // Player Variable

var textLegened = map`
................
................
................
................
................
................
................
................
................
................
................
................
................
................
................
................`;     // This map stores the data for where each piece of text is.
var isUppercase = false;        // Change this to true to have the current character be uppercase.
var isHidden = false;           // Variable to make the press down to start blink
var currentTextPosition = 0;    // Integer that stores the current position in the text_array.
var currentCharacter = 0;      // Current Character Held.
var newInterval;
var currentLine = 0;

const VERSION_MAJOR = "0";
const VERSION_MINOR = "0";
const VERSION_PATCH = "5";

setLegend(
  [ player, bitmap`
22..............
22..............
22..............
22..............
22..............
22..............
22..............
22..............
22..............
22..............
22..............
22..............
22..............
22..............
22..............
22..............` ],    // Player text selector position

  [ TEXT_A, bitmap`
................
................
................
......2222......
......2222......
....22....22....
....22....22....
....22222222....
....22222222....
....22....22....
....22....22....
....22....22....
....22....22....
................
................
................`],     // A
  [ TEXT_B, bitmap`
................
................
................
................
....222222......
....222222......
....22....22....
....22....22....
....222222......
....222222......
....22....22....
....22....22....
....222222......
....222222......
................
................`],     // B
  [ TEXT_C, bitmap`
................
................
................
................
......222222....
......222222....
....22..........
....22..........
....22..........
....22..........
....22..........
....22..........
......222222....
......222222....
................
................`],     // C
  [ TEXT_D, bitmap`
................
................
................
................
....222222......
....222222......
....22....22....
....22....22....
....22....22....
....22....22....
....22....22....
....22....22....
....222222......
....222222......
................
................`],     // D
  [ TEXT_E, bitmap`
................
................
................
................
....22222222....
....22222222....
....22..........
....22..........
....222222......
....222222......
....22..........
....22..........
....22222222....
....22222222....
................
................`],     // E
  [ TEXT_F, bitmap`
................
................
................
................
....22222222....
....22222222....
....22..........
....22..........
....222222......
....222222......
....22..........
....22..........
....22..........
....22..........
................
................`],     // F
  [ TEXT_G, bitmap`
................
................
................
................
......222222....
......222222....
....22..........
....22..........
....22..2222....
....22..2222....
....22....22....
....22....22....
......222222....
......222222....
................
................`],     // G
  [ TEXT_H, bitmap`
................
................
................
................
....22....22....
....22....22....
....22....22....
....22....22....
....22222222....
....22222222....
....22....22....
....22....22....
....22....22....
....22....22....
................
................`],     // H
  [ TEXT_I, bitmap`
................
................
................
................
.......00.......
.......00.......
.......00.......
.......00.......
.......00.......
.......00.......
.......00.......
.......00.......
.......00.......
.......00.......
................
................`],     // I
  [ TEXT_J, bitmap`
................
................
..........00....
..........00....
..........00....
..........00....
..........00....
..........00....
..........00....
..........00....
....00....00....
....00....00....
......0000......
......0000......
................
................`],     // J
  [ TEXT_K, bitmap`
................
................
................
................
....00....00....
....00....00....
....00..00......
....00..00......
....0000........
....0000........
....00..00......
....00..00......
....00....00....
....00....00....
................
................`],     // K
  [ TEXT_L, bitmap`
................
................
................
................
....00..........
....00..........
....00..........
....00..........
....00..........
....00..........
....00..........
....00..........
....000000......
....000000......
................
................`],     // L
  [ TEXT_M, bitmap`
................
................
................
................
...00......00...
...00......00...
...0000..0000...
...0000..0000...
...00..00..00...
...00..00..00...
...00......00...
...00......00...
...00......00...
...00......00...
................
................`],     // M
  [ TEXT_N, bitmap`
................
................
................
................
....00....00....
....00....00....
....0000..00....
....0000..00....
....00..0000....
....00..0000....
....00....00....
....00....00....
....00....00....
....00....00....
................
................`],     // N
  [ TEXT_O, bitmap`
................
................
................
................
......0000......
......0000......
....00....00....
....00....00....
....00....00....
....00....00....
....00....00....
....00....00....
......0000......
......0000......
................
................`],     // O
  [ TEXT_P, bitmap`
................
................
................
................
....000000......
....000000......
....00....00....
....00....00....
....000000......
....000000......
....00..........
....00..........
....00..........
....00..........
................
................`],     // P
  [ TEXT_Q, bitmap`
................
................
................
................
......0000......
......0000......
....00....00....
....00....00....
....00....00....
....00....00....
....00..0000....
....00..0000....
......000000....
......000000....
................
................`],     // Q
  [ TEXT_R, bitmap`
................
................
................
................
....000000......
....000000......
....00....00....
....00....00....
....000000......
....000000......
....00..00......
....00..00......
....00....00....
....00....00....
................
................`],     // R
  [ TEXT_S, bitmap`
................
................
................
................
......000000....
......000000....
....00..........
....00..........
......0000......
......0000......
..........00....
..........00....
....000000......
....000000......
................
................`],     // S
  [ TEXT_T, bitmap`
................
................
................
................
.....000000.....
.....000000.....
.......00.......
.......00.......
.......00.......
.......00.......
.......00.......
.......00.......
.......00.......
.......00.......
................
................`],     // T
  [ TEXT_U, bitmap`
................
................
................
................
....00....00....
....00....00....
....00....00....
....00....00....
....00....00....
....00....00....
....00....00....
....00....00....
....00000000....
....00000000....
................
................`],     // U
  [ TEXT_V, bitmap`
................
................
................
................
.....00..00.....
.....00..00.....
.....00..00.....
.....00..00.....
.....00..00.....
.....00..00.....
.....00..00.....
.....00..00.....
.......00.......
.......00.......
................
................`],     // V
  [ TEXT_W, bitmap`
................
................
................
................
...00......00...
...00......00...
...00......00...
...00......00...
...00......00...
...00......00...
...00..00..00...
...00..00..00...
.....00..00.....
.....00..00.....
................
................`],     // W
  [ TEXT_X, bitmap`
................
................
................
................
.....00..00.....
.....00..00.....
.....00..00.....
.....00..00.....
.......00.......
.......00.......
.....00..00.....
.....00..00.....
.....00..00.....
.....00..00.....
................
................`],     // X
  [ TEXT_Y, bitmap`
................
................
................
................
.....00..00.....
.....00..00.....
.....00..00.....
.....00..00.....
.....000000.....
.....000000.....
.......00.......
.......00.......
.......00.......
.......00.......
................
................`],     // Y
  [ TEXT_Z, bitmap`
................
................
................
................
....00000000....
....00000000....
..........00....
..........00....
........00......
........00......
......00........
......00........
....00000000....
....00000000....
................
................`],     // Z
  
  [ TEXT_EX, bitmap`
................
................
.......00.......
.......00.......
.......00.......
.......00.......
.......00.......
.......00.......
.......00.......
.......00.......
................
................
.......00.......
.......00.......
................
................`],    // !
  [ TEXT_QU, bitmap`
................
................
................
................
....0000........
....0000........
........00......
........00......
....0000........
....0000........
................
................
....00..........
....00..........
................
................`],    // ?
  [ TEXT_PE, bitmap`
................
................
................
................
................
................
................
................
................
................
................
................
..00............
..00............
................
................`],    // .
  [ TEXT_DA, bitmap`
................
................
................
................
................
................
................
...0000000000...
...0000000000...
................
................
................
................
................
................
................`],    // -

  [ NUM_0, bitmap`
................
................
................
................
.....000000.....
.....000000.....
...00....0000...
...00....0000...
...00..00..00...
...00..00..00...
...0000....00...
...0000....00...
.....000000.....
.....000000.....
................
................`],      // 0
  [ NUM_1, bitmap`
................
................
.......00.......
.......00.......
.....0000.......
.....0000.......
.......00.......
.......00.......
.......00.......
.......00.......
.......00.......
.......00.......
...0000000000...
...0000000000...
................
................`],      // 1
  [ NUM_2, bitmap`
................
................
................
................
...00000000.....
...00000000.....
...........00...
...........00...
.....000000.....
.....000000.....
...00...........
...00...........
...0000000000...
...0000000000...
................
................`],      // 2
  [ NUM_3, bitmap`
................
................
................
................
.....000000.....
.....000000.....
...00......00...
...00......00...
.......0000.....
.......0000.....
...00......00...
...00......00...
.....000000.....
.....000000.....
................
................`],      // 3
  [ NUM_4, bitmap`
................
................
................
................
.......0000.....
.......0000.....
.....00..00.....
.....00..00.....
...00....00.....
...00....00.....
...0000000000...
...0000000000...
.........00.....
.........00.....
................
................`],      // 4
  [ NUM_5, bitmap`
................
................
................
................
...0000000000...
...0000000000...
...00...........
...00...........
...00000000.....
...00000000.....
...........00...
...........00...
...00000000.....
...00000000.....
................
................`],      // 5
  [ NUM_6, bitmap`
................
................
................
................
.....00000000...
.....00000000...
...00...........
...00...........
...00000000.....
...00000000.....
...00......00...
...00......00...
.....000000.....
.....000000.....
................
................`],      // 6
  [ NUM_7, bitmap`
................
................
................
................
...0000000000...
...0000000000...
...........00...
...........00...
.........00.....
.........00.....
.......00.......
.......00.......
.......00.......
.......00.......
................
................`],      // 7
  [ NUM_8, bitmap`
................
................
................
................
.....000000.....
.....000000.....
...00......00...
...00......00...
.....000000.....
.....000000.....
...00......00...
...00......00...
.....000000.....
.....000000.....
................
................`],      // 8
  [ NUM_9, bitmap`
................
................
................
................
.....000000.....
.....000000.....
...00......00...
...00......00...
.....00000000...
.....00000000...
...........00...
...........00...
.....000000.....
.....000000.....
................
................`],      // 9

  [ BACKGROUND_BLACK, bitmap`
0000000000000000
0000000000000000
0000000000000000
0000000000000000
0000000000000000
0000000000000000
0000000000000000
0000000000000000
0000000000000000
0000000000000000
0000000000000000
0000000000000000
0000000000000000
0000000000000000
0000000000000000
0000000000000000`],

  [ LOGO_1, bitmap`
................
................
................
.........222....
........20022...
........200022..
........20000222
........20200020
........20220000
........20220000
........20000000
........22000000
........22002000
........20020000
........20200700
........20202000`],
  [ LOGO_2, bitmap`
................
........2222....
........20022...
......2220002...
......22000022..
......220002022.
222222200002202.
000000000002202.
000000000002202.
0000000000000022
0000000000000002
0000002220000002
0000002007000002
0000022077700002
0000022020070002
0000022070070002`],
  [ LOGO_3, bitmap`
........20207000
........20207000
........20207000
........20207700
........20207700
........20000000
.........2088800
..........200222
.......222222000
.......200000220
.......202220000
.......200222200
.......220222000
........22022000
........22002000
.........2200000`],
  [ LOGO_4, bitmap`
0000222070070002
0000222070070002
0000022070070002
0000022077700002
0000002077000202
0000000000022200
0000000888880000
2222222222200020
2222222220000220
0000000000602220
6666666666002220
6666666660002200
6666660600002202
0660006000000002
0660066000000022
006666000000022.`],
)

setSolids([])

var level = 0
const levels = [
  map`
..COLACK..2024..
----------------
................
................
...SPRIG-EDIT...
......----......
.....V0[0[1.....
................
................
...PRESS.DOWN...
................
....TO.START....
................
................
..............()
..............*&`,                    // Title Screen
  map`
....CONTROLS....
----------------
................
AD.-.MOVE.CURSOR
................
JL.-.CHANGE.....
.....LETTER.....
................
W..-.NEW.LINE...
................
S..-.SPACE.START
................
I..-.PLACE......
................
K..-.DELETE.....
----------------`,                    // Controls
  map`
................
................
................
................
................
................
................
................
................
................
................
................
................
................
................
................`,                    // Text Editor
]

/*
  Set the current selected character for use in the text editor.
*/
function setCharacter() {
  switch (currentCharacter) {
    case 0:
      currentCharacter = TEXT_A;
      break;
    case 1:
      currentCharacter = TEXT_B;
      break;
    case 2:
      currentCharacter = TEXT_C;
      break;
    case 3:
      currentCharacter = TEXT_D;
      break;
    case 4:
      currentCharacter = TEXT_E;
      break;
    case 5:
      currentCharacter = TEXT_F;
      break;
    case 6:
      currentCharacter = TEXT_G;
      break;
    case 7:
      currentCharacter = TEXT_H;
      break;
    case 8:
      currentCharacter = TEXT_I;
      break;
    case 9:
      currentCharacter = TEXT_J;
      break;
    case 10:
      currentCharacter = TEXT_K;
      break;
    case 11:
      currentCharacter = TEXT_L;
      break;
    case 12:
      currentCharacter = TEXT_M;
      break;
    case 13:
      currentCharacter = TEXT_N;
      break;
    case 14:
      currentCharacter = TEXT_O;
      break;
    case 15:
      currentCharacter = TEXT_P;
      break;
    case 16:
      currentCharacter = TEXT_Q;
      break;
    case 17:
      currentCharacter = TEXT_R;
      break;
    case 18:
      currentCharacter = TEXT_S;
      break;
    case 19:
      currentCharacter = TEXT_T;
      break;
    case 20:
      currentCharacter = TEXT_U;
      break;
    case 21:
      currentCharacter = TEXT_V;
      break;
    case 22:
      currentCharacter = TEXT_W;
      break;
    case 23:
      currentCharacter = TEXT_X;
      break;
    case 24:
      currentCharacter = TEXT_Y;
      break;
    case 25:
      currentCharacter = TEXT_Z;
      break;
  }
}

/*
  Loaded at the beginning of the program to display specifically the version.
*/
function createTitleScreen() {
  LEVEL_TITLE = map`..COLACK..2024..
----------------
................
................
...SPRIG-EDIT...
......----......
.....V${VERSION_MAJOR}[${VERSION_MINOR}[${VERSION_PATCH}.....
................
................
...PRESS.DOWN...
................
....TO.START....
................
................
..............()
..............*&`;
  setMap(LEVEL_TITLE);
}

function titleBlink() {
  if (!isHidden) {
    isHidden = true;
    LEVEL_TITLE = map`..COLACK..2024..
----------------
................
................
...SPRIG-EDIT...
......----......
.....V${VERSION_MAJOR}[${VERSION_MINOR}[${VERSION_PATCH}.....
................
................
................
................
................
................
................
..............()
..............*&`;
  } else {
    isHidden = false;
    LEVEL_TITLE = map`..COLACK..2024..
----------------
................
................
...SPRIG-EDIT...
......----......
.....V${VERSION_MAJOR}[${VERSION_MINOR}[${VERSION_PATCH}.....
................
................
...PRESS.DOWN...
................
....TO.START....
................
................
..............()
..............*&`;
  }
  setMap(LEVEL_TITLE);
}

/*
  Executed when the game boots up
*/
function onGameStart() {
  createTitleScreen();

  newInterval = setInterval(titleBlink, 500);
}

/*
  Updates the current legend and rearranges all the text.
*/
function updateTextLegend() {

}

setMap(levels[level])

onInput("w", () => {
  if (currentLine == 14) {
    currentLine = 0;
  } else {
    currentLine++;
  }
});
      
onInput("j", () => {
  if (currentCharacter == 0) {
    currentCharacter = 39;
  } else {
    currentCharacter--;
  }
});

onInput("l", () => {
  if (currentCharacter == 39) {
    currentCharacter = 0;
  } else {
    currentCharacter++;
  }
});

onInput("s", () => {
  switch (level) {
    case 0:
      level = 1;
      setMap(levels[level]);
      clearInterval(newInterval);
      PLAYBACK_MAIN.end();
      playTune(SFX_start);

      PLAYBACK_CONTROLS = playTune(MUSIC_controls, Infinity);
      break;
    case 1:
      level = 2;
      setMap(levels[level]);
      PLAYBACK_CONTROLS.end();
      playTune(SFX_edit);

      PLAYBACK_EDITOR = playTune(MUSIC_editor, Infinity);
      break;
  }
});

afterInput(() => {
  if (level == 2) {
    updateTextLegend();
    playTune(SFX_jared);
  }
});

onGameStart();

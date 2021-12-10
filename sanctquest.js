//-------------------------------------------------------------------------
//
// sanctquest for Processing
//
// You can download Processing at the following URL.
//                           https://processing.org/
//                                                            by Jun Fujiki
//
//-------------------------------------------------------------------------

let canvas;
let smafo = false;

let BASE_SCREEN_WIDTH = 256;
let BASE_SCREEN_HEIGHT = 224;
let BASE_DISPLAY_WIDTH = 960;
let BASE_DISPLAY_HEIGHT = 540;

let keyLeft = false;
let keyRight = false;
let keyDown = false;
let keyUp = false;

let g_player;

//-------------------------------------------------------------------------
// preload
//-------------------------------------------------------------------------

function preload() 
{
  g_player = new Player();
  g_player.setup();
}

//-------------------------------------------------------------------------
// setup
//-------------------------------------------------------------------------

function setup()
{
  canvas = createCanvas( windowWidth, windowHeight, WEBGL );  
  canvas.style('z-index', '-1');
  canvas.style('position', 'fixed');
  canvas.style('top', '0');
  canvas.style('left', '0');

  let userAgent = window.navigator.userAgent.toLowerCase();
  if (userAgent.indexOf('iphone') != -1) {
    smafo = true;
  } else if (userAgent.indexOf('ipad') != -1) {
    smafo = true;
  } else if (userAgent.indexOf('android') != -1) {
    if (userAgent.indexOf('mobile') != -1) {
      smafo = true;
    } else {
      smafo = true;
    }
  }

  if ( smafo == true )
  {
    canvas.style('position', 'scroll');
  }

  background( 127 );
  noSmooth();

  frameRate( 30 );
}

//-------------------------------------------------------------------------
// draw
//-------------------------------------------------------------------------

function draw()
{
  background( 0 );

  let r1 = float(windowWidth)/float(BASE_DISPLAY_WIDTH);
  let r2 = float(windowHeight)/float(BASE_DISPLAY_HEIGHT);
  let h, w;
  if ( r1 > r2 )
  {    
    w =  r1;
    h =  r1;
  } else
  {
    w =  r2;
    h =  r2;
  }

  translate( -windowWidth/2, -windowHeight/2 );
  translate( (float(windowWidth)-w*float(BASE_SCREEN_WIDTH))/2, (float(windowHeight)-h*float(BASE_SCREEN_HEIGHT))/2 );
  scale( w, h );

  g_player.update();
  g_player.draw();
}

//------------------------------------------------------------------------------------------
// key
//------------------------------------------------------------------------------------------

function keyPressed()
{
  switch( keyCode )
  {
  case RIGHT_ARROW:
    keyRight = true;
    break;
  case LEFT_ARROW:
    keyLeft = true;
    break;
  case DOWN_ARROW:
    keyDown = true;
    break;
  case UP_ARROW:
    keyUp = true;
    break;
  }
}

function keyReleased()
{
  switch( keyCode )
  {
  case RIGHT_ARROW:
    keyRight = false;
    break;
  case LEFT_ARROW:
    keyLeft = false;
    break;
  case DOWN_ARROW:
    keyDown = false;
    break;
  case UP_ARROW:
    keyUp = false;
    break;
  }
}

//-------------------------------------------------------------------------
// windowResized
//-------------------------------------------------------------------------

function windowResized() 
{ 
  let userAgent = window.navigator.userAgent.toLowerCase();
  if (userAgent.indexOf('iphone') != -1) {
    smafo = true;
  } else if (userAgent.indexOf('ipad') != -1) {
    smafo = true;
  } else if (userAgent.indexOf('android') != -1) {
    if (userAgent.indexOf('mobile') != -1) {
      smafo = true;
    } else {
      smafo = true;
    }
  }

  if ( smafo == true )
  {
    if ( canvas != null )
    {
      canvas.style('position', 'fixed');
    }
    return;
  }

  canvas = createCanvas( windowWidth, windowHeight, WEBGL );
  canvas.style('z-index', '-1');
  if ( smafo == false )
  {
    canvas.style('position', 'fixed');
  }
  canvas.style('top', '0');
  canvas.style('left', '0');

  noSmooth();
  frameRate( 30 );
}
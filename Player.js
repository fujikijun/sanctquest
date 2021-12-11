//------------------------------------------------------------------------------------------
//
//          Player
//
//------------------------------------------------------------------------------------------

let PLAYER_STATE_WAIT = 0;
let PLAYER_STATE_MOVE = 1;

class Player
{
  constructor()
  {    
    this.x = 0;
    this.y = 0;
    this.direction = 0;
    this.frame = 0;
    this.state = PLAYER_STATE_WAIT;

    this.frameSpeed = 0.05;
    this.speed = 16;
    this.m_imgPlayer = [];
  }

  //----------------------------------------------------------------------------------------
  // setup
  //----------------------------------------------------------------------------------------

  setup()
  {
    this.x = 275 * BASE_MAPTIP_SIZE;
    this.y = 159 * BASE_MAPTIP_SIZE;
    this.direction = 0;
    this.frame = 0;
    this.state = PLAYER_STATE_WAIT;

    for ( let i=0; i<4; i++ )
    {
      this.m_imgPlayer[i] = [];
      for ( let j=0; j<2; j++ )
      {
        this.m_imgPlayer[i][j] = loadImage( "data/player" +i+j+ ".png" );
      }
    }

    this.init();
  }


  //----------------------------------------------------------------------------------------
  // init
  //----------------------------------------------------------------------------------------

  init()
  {
  }

  //----------------------------------------------------------------------------------------
  // update
  //----------------------------------------------------------------------------------------

  update()
  {
    switch( this.state )
    {
      // ------------------------------------------------
      // PLAYER_STATE_WAIT
      // ------------------------------------------------

    case PLAYER_STATE_WAIT:
      {
        //if ( keyIsPressed && keyCode === RIGHT_ARROW )
        if ( keyRight )
        {
          this.x += this.speed;
          this.direction = 3;
          this.state = PLAYER_STATE_MOVE;
        }
        //if ( keyIsPressed && keyCode === LEFT_ARROW )
        if ( keyLeft )
        {
          this.x -= this.speed;
          this.direction = 1;
          this.state = PLAYER_STATE_MOVE;
        }
        //if ( keyIsPressed && keyCode === DOWN_ARROW )
        if ( keyDown )
        {
          this.y += this.speed;
          this.direction = 0;
          this.state = PLAYER_STATE_MOVE;
        }
        //if ( keyIsPressed && keyCode === UP_ARROW )
        if ( keyUp )
        {
          this.y -= this.speed;
          this.direction = 2;
          this.state = PLAYER_STATE_MOVE;
        }

        this.frame += this.frameSpeed;
        if ( this.frame >= 1.0 )
        {
          this.frame -= 1.0;
        }
      }
      break;

      // ------------------------------------------------
      // PLAYER_STATE_MOVE
      // ------------------------------------------------

    case PLAYER_STATE_MOVE:
      {
        switch( this.direction )
        {
        case 0:  
          this.y += this.speed;  
          break;
        case 1:  
          this.x -= this.speed;  
          break;
        case 2:  
          this.y -= this.speed;  
          break;
        case 3:  
          this.x += this.speed;  
          break;
        }

        if ( int(this.x)%BASE_MAPTIP_SIZE == 0 && int(this.y)%BASE_MAPTIP_SIZE == 0 )
        {
          this.state = PLAYER_STATE_WAIT;
        }

        this.frame += this.frameSpeed;
        if ( this.frame >= 1.0 )
        {
          this.frame -= 1.0;
        }
      }
      break;
    }
  }

  //----------------------------------------------------------------------------------------
  // draw
  //----------------------------------------------------------------------------------------

  draw()
  {
    g_map.draw( this.x, this.y );
    image( this.m_imgPlayer[this.direction][int(this.frame*2)], 0, 0 );
    
    console.log( getRealXfromField(this.x/BASE_MAPTIP_SIZE), getRealYfromField(this.y/BASE_MAPTIP_SIZE) );
  }
}
//------------------------------------------------------------------------------------------
//
//          Player
//
//------------------------------------------------------------------------------------------

class Player
{
  constructor()
  {    
    this.x = 0;
    this.y = 0;
    this.direction = 0;
    this.frame = 0;
    this.frameSpeed = 0.05;
    this.speed = 2;
    this.m_imgPlayer = [];
  }

  //----------------------------------------------------------------------------------------
  // setup
  //----------------------------------------------------------------------------------------

  setup()
  {
    this.x = 0;//BASE_SCREEN_WIDTH / 2;
    this.y = 0;//BASE_SCREEN_HEIGHT / 2;
    this.direction = 0;
    this.frame = 0;
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
    //if ( keyIsPressed && keyCode === RIGHT_ARROW )
    if( keyRight )
    {
      this.x += this.speed;
      this.direction = 3;
    }
    //if ( keyIsPressed && keyCode === LEFT_ARROW )
    if( keyLeft )
    {
      this.x -= this.speed;
      this.direction = 1;
    }
    //if ( keyIsPressed && keyCode === DOWN_ARROW )
    if( keyDown )
    {
      this.y += this.speed;
      this.direction = 0;
    }
    //if ( keyIsPressed && keyCode === UP_ARROW )
    if( keyUp )
    {
      this.y -= this.speed;
      this.direction = 2;
    }
    
    this.frame += this.frameSpeed;
    if( this.frame >= 1.0 )
    {
      this.frame -= 1.0;
    }
  }

  //----------------------------------------------------------------------------------------
  // draw
  //----------------------------------------------------------------------------------------

  draw()
  {
    image( this.m_imgPlayer[this.direction][int(this.frame*2)], this.x, this.y );
  }
}
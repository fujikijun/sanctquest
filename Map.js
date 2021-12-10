//------------------------------------------------------------------------------------------
//
//          Map
//
//------------------------------------------------------------------------------------------

class CTip
{
  constructor()
  {
    this.img = null;
  }
}

class Map
{
  constructor()
  {
    this.TIP_NUM = 7;
    this.SIZE_X = 240;
    this.SIZE_Y = 135;
    this.imgMap = null;
    this.imgTip = [];
    this.mapTip = [];
  }

  //----------------------------------------------------------------------------------------
  // setup
  //----------------------------------------------------------------------------------------

  setup( mapFileName )
  {
    for ( let i=0; i<this.TIP_NUM; i++ )
    {
      this.imgTip[i] = loadImage( "data/tip"+i+".png" );
    }
    this.imgMap = loadImage( "data/map.png" );
  }

  //----------------------------------------------------------------------------------------
  // create
  //----------------------------------------------------------------------------------------

  create()
  {
    this.imgMap.loadPixels();
    this.SIZE_X = this.imgMap.width;
    this.SIZE_Y = this.imgMap.height;

    for ( let x=0; x<this.SIZE_X; x++ )
    {
      this.mapTip[x] = [];

      for ( let y=0; y<this.SIZE_Y; y++ )
      {
        this.mapTip[x][y] = new CTip();

        let col = this.imgMap.get(x, y);
        let r = int(red(col));
        let g = int(green(col));
        let b = int(blue(col));

        if ( r==138 && g==180 && b==248 )//sea
        {
          this.mapTip[x][y].img = this.imgTip[3];
        } else if ( r==154 && g==211 && b==169 )//forest
        {
          this.mapTip[x][y].img = this.imgTip[1];
        } else if ( r==232 && g==208 && b==118 )//desert
        {
          this.mapTip[x][y].img = this.imgTip[5];
        } else if ( r==140 && g==154 && b==143 )//rock
        {
          this.mapTip[x][y].img = this.imgTip[2];
        } else if ( r==128 && g==0 && b==0 )//mountain
        {
          this.mapTip[x][y].img = this.imgTip[4];
        } else if ( r==255 && g==255 && b==255 )//sanctuary
        {
          this.mapTip[x][y].img = this.imgTip[6];
        } else // grass
        {
          this.mapTip[x][y].img = this.imgTip[0];
        }
      }
    }
  }

  //----------------------------------------------------------------------------------------
  // draw
  //----------------------------------------------------------------------------------------

  draw( px, py )
  {
    fill( 255 );
    noStroke();

    for ( let y=0; y<this.SIZE_Y; y++ )
    {
      for ( let x=0; x<this.SIZE_X; x++ )
      {          

        if ( x < int(px)/BASE_MAPTIP_SIZE-24 )
        {
          continue;
        }
        if ( x > int(px)/BASE_MAPTIP_SIZE+24 )
        {
          continue;
        }
        if ( y < int(py)/BASE_MAPTIP_SIZE-14 )
        {
          continue;
        }
        if ( y > int(py)/BASE_MAPTIP_SIZE+14 )
        {
          continue;
        }

        image( this.mapTip[x][y].img, x*BASE_MAPTIP_SIZE-px, y*BASE_MAPTIP_SIZE-py );
      }
    }
  }
}
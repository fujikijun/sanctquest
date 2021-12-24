const L = 85.05112878;

function xy2la( x, y )
{
  return tile2LatLon( x*1.97/BASE_MAPTIP_SIZE+6767, y*1.97/BASE_MAPTIP_SIZE+2702, 5 );
}

function la2xy( lat, lon )
{
  let a = latLon2tile( lat, lon, 5 );
  return [ (a[0]-6767)/1.97, (a[1]-2702)/1.97 ];
}

function latLon2tile(lat, lon, zoom)
{
    lat = parseFloat(lat); // 緯度
    lon = parseFloat(lon); // 経度
    zoom = parseInt(zoom); // 尺度

    var pixelX = parseInt(Math.pow(2, zoom + 7) * (lon / 180 + 1));
    var tileX = parseInt(pixelX / 256);

    var pixelY = parseInt((Math.pow(2, zoom + 7) / Math.PI) * ((-1 * Math.atanh(Math.sin((Math.PI / 180) * lat))) + Math.atanh(Math.sin((Math.PI / 180) * L))));
    var tileY = parseInt(pixelY / 256);

    return [pixelX, pixelY];
}

function tile2LatLon(pixelX, pixelY, zoom) 
{
    pixelX = parseInt(pixelX); // ピクセル座標X
    pixelY = parseInt(pixelY); // ピクセル座標Y
    zoom = parseInt(zoom); // 尺度

    var tileX = parseInt(pixelX / 256); // タイル座標X
    var tileY = parseInt(pixelY / 256); // タイル座標Y

    var lat = 180 * (pixelX / Math.pow(2, zoom + 7) - 1);
    var lon = (180 / Math.PI) * (Math.asin(Math.tanh((-1 * Math.PI / Math.pow(2, zoom + 7) * pixelY) + Math.atanh(Math.sin(Math.PI / 180 * L)))));

    return [lon,lat];
}
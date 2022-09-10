<?php
date_default_timezone_set('UTC');
$time_enter = microtime(true);

$x = (float) $_GET['x'];
$y = (float) $_GET['y'];
$R = (float) $_GET['R'];

function encode_json($array)
{
  return
    "{" .
    "\"x\":\"" . (string)$array[0] . "\"," .
    "\"y\":\"" . (string)$array[1] . "\"," .
    "\"R\":\"" . (string)$array[2] . "\"," .
    "\"result\":\"" . $array[3] . "\"," .
    "\"server_time\":\"" . (string)$array[4] . "\"," .
    "\"script_exec_time\":\"" . (string)$array[5] . "\"," .
    "\"correct\":\"" . $array[6] . "\"" .
    "}";
}

if (!(($x <= 2 && $x >= -2) &&
     ($y <= 3 && $y >= -5) &&
    ($R == 1 || $R == 1.5 || $R == 2 || $R == 2.5 || $R == 3)))
{
  echo encode_json(array(0, 0, 0, 0, 0, 0, "false"));
}
else {
  if (
    ($x >= 0 && $y >= 0 && $x + $y < $R && $x <= $R && $x <= $R ) ||
    ($x >= 0 && $y <= 0 && ($x * $x + $y * $y) <= ($R/2 * $R/2)) ||
    ($x <= $R/2 && $y <= $R))
  {
    $result = "Match";
  } else {
    $result = "No match";
  }

  $server_time = date('e H:i:s', time());
  $script_exec_time = ceil((10 ** 6 * (microtime(true) - $time_enter)));

  echo encode_json(array(
    $x, $y, $R, $result, $server_time, $script_exec_time, "true"
  ));
}

<?php
date_default_timezone_set('UTC');
define("time_enter", hrtime(true));

//"/tmp/DatabaseWeb1.db"
//"/tmp/Web1.db"
$db = new SQLite3("/tmp/DatabaseWeb1.db");
checkBD($db);

if (isset($_COOKIE["ID"])){
    define("cookie",  $_COOKIE["ID"]);
}
else {

    define("cookie", bin2hex(random_bytes(512)));
    setcookie("ID", cookie, array('samesite' => 'Strict'));
}
if(!((isset($_GET["x"]) && isset($_GET["y"]) && isset($_GET["R"])) || isset($_GET["restore"]))){
    exit("Ошибка получения данных");
}
$x = (float) $_GET['x'];
$y = (float) $_GET['y'];
$R = (float) $_GET['R'];
$restore = isset($_GET["restore"]);

if(!$restore){

    if (!(($x <= 2 && $x >= -2) &&
        ($y <= 3 && $y >= -5) &&
        ($R == 1 || $R == 1.5 || $R == 2 || $R == 2.5 || $R == 3)))
    {
        echo json_encode(
            [
                "x" => $x,
                "y" => $y,
                "R" => $R,
                "result" => 0,
                "server_time" => 0,
                "execute_time" => 0,
                "success" => false,
            ]);
    }
    else {
        if (
            ($x >= 0 && $y >= 0 && $x + $y < $R && $x <= $R) ||
            ($x >= 0 && $y <= 0 && ($x * $x + $y * $y) <= ($R/2 * $R/2)) ||
            ($x <= $R/2 && $y <= $R))
        {
            $result = true;
        } else {
            $result = false;
        }

        $server_time = date('e H:i:s', time());
        $execute_time = (string) ceil(((hrtime(true) - time_enter)) /10 ** 6);

        $statementSt = $db->prepare(
            "INSERT INTO"
            . " web1table(cookieID, resultJson)"
            . " VALUES"
            . " (:cookieID, :resultJson)"
        );
        $statementSt->bindValue("cookieID", cookie, SQLITE3_TEXT);
        $statementSt->bindValue("resultJson", json_encode(
            [
                "x" => $x,
                "y" => $y,
                "R" => $R,
                "result" => $result,
                "server_time" => $server_time,
                "execute_time" => $execute_time,
                "success" => true,
            ]), SQLITE3_TEXT);
        $statementSt->execute()->finalize();
        echo json_encode(
            [
                "x" => $x,
                "y" => $y,
                "R" => $R,
                "result" => $result,
                "server_time" => $server_time,
                "execute_time" => $execute_time,
                "success" => true,
            ]);
    }

}
else{
    $getStatement = $db->prepare(
        "SELECT resultJson FROM web1table WHERE cookieID=:id"
    );
    $getStatement->bindValue(":id", cookie, SQLITE3_TEXT);
    $result = $getStatement->execute();
    $response = [];
    while ($row = $result->fetchArray()) {
        $response[] = $row['resultJson'];
    }
    echo json_encode($response);
}

function checkBD($db){
    $db->exec(
        "CREATE TABLE IF NOT EXISTS"
        . " web1table"
        . "("
        . "cookieID STRING"
        . ", resultJson STRING"
        . ")"
    );
}
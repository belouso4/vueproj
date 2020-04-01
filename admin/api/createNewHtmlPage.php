<?php

$newFile = "../../" . $_POST["name"] . ".html";
$removeFile = "../../" . $_POST["nameremove"] . ".html";

if($_POST["name"]) {
    if (file_exists($newFile)) {
        header("HTTP/1.0 400 Bad Request");
    } else {
        fopen($newFile, 'w');
    }
}

if($_POST["nameremove"]) {
    if(file_exists($removeFile)) {
        unlink($removeFile);
    } else {
        header("HTTP/1.0 400 Bad Request");
    }
}


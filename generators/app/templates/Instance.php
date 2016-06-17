<?php

/*
 * The Code is the property of Nik Kyriakidis
 * Use of this Code without a Legally obtained lisence is strictly forbidden, if you have used this code without a legally obtained lisence you are in violation of copyright law and will be prosecuted accordingly
 */

namespace <%= vendor %>\<%= package %>;

/**
 * Description of Instance
 *
 * @author Nik Kyriakidis
 */
class Instance {

    private static $dir;
    private static $uri;
    public static $APP_DIR;
    public static $EXTENSIONS_DIR;
    public static $CONTROLLER_DIR;
    public static $VIEW_DIR;
    public static $ENV_DIR;
    public static $CACHE_DIR;
    public static $BOWER_URI;
    public static $ASSET_DIR;

    public static function init($dir, $uri) {
        require_once 'Vendor/autoload.php';
        self::$dir = $dir;
        self::$uri = $uri;
        $config = include self::$dir . "/wordsmith.php";
        self::$ENV_DIR = self::$dir . $config["ENV_DIR"];
        self::$APP_DIR = self::$dir . $config["APP_DIR"];
        self::$CONTROLLER_DIR = self::$dir . $config["CONTROLLER_DIR"];
        self::$EXTENSIONS_DIR = self::$dir . $config["EXTENSIONS_DIR"];
        self::$VIEW_DIR = self::$dir . $config["VIEW_DIR"];
        self::$CACHE_DIR = self::$dir . $config["CACHE_DIR"];
        self::$BOWER_URI = self::$uri . $config["BOWER_URI"];
        self::$ASSET_DIR = self::$uri . $config["ASSET_DIR"];
        self::boot();
    }

    public static function boot() {
        self::loadDir(self::$ENV_DIR);
        self::loadDir(self::$EXTENSIONS_DIR);
        self::loadDir(self::$APP_DIR);
        self::loadDir(self::$CONTROLLER_DIR);
    }

    private static function loadDir($dir) {
        $ffs = scandir($dir);
        $i = 0;
        foreach ($ffs as $ff) {
            if ($ff != '.' && $ff != '..') {
                if (strlen($ff) >= 5) {
                    if (substr($ff, -4) == '.php') {
                        include $dir . '/' . $ff;
                    }
                }
                if (is_dir($dir . '/' . $ff))
                    self::loadDir($dir . '/' . $ff);
            }
        }
    }

}

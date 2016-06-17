<?php
/*
 * THEME FUNCTIONS
 * 
 * Here we will inject the wordmsith framework, first and foremost.
 * if you need to add any other code into your theme that cannot be done using the framework,
 * please do so after the theme hs been initialized.
 * 
 */
//include composer
require_once 'Vendor/autoload.php';
include_once( ABSPATH . 'wp-admin/includes/plugin.php' );
if (is_plugin_active('WordSmith/Wordsmith.php')) {
    require_once ABSPATH.'wp-content/plugins/WordSmith/Wordsmith.php';
    //include your app injection point
    require_once 'Instance.php';
    //initialize the application
    <%= vendor%>\<%= package %>\Instance::init(__DIR__, get_template_directory_uri());
}

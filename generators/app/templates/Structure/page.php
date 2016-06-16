<?php

/*
 * Page Template
 * 
 * in this template like all other templates we will create an action reference to inject a controller, here we will determine the view to be loaded on this template
 */
$method = $_SERVER['REQUEST_METHOD'];
switch ($method) {
    case 'GET':
        do_action('page_controller');
        break;
    case 'POST':
        echo 'post method';
        break;
}


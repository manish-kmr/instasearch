<?php
/**
 * Plugin Name:       Insta Search
 * Description:       Find instruments by name or symbol.
 * Requires at least: 6.1
 * Requires PHP:      7.0
 * Version:           0.1.0
 * Author:            Manish Kumar
 */

function reactshort() {
    return '<div id="my-react-app"></div>';
}

function enq_react()
{
    wp_enqueue_script(
        'search_plugin',
        plugin_dir_url( __FILE__ ) . '/build/index.js',
        ['wp-element'],
        null,
        true
    );
}

function add_query_vars_filter( $vars ){
    $vars[] = "ppc";
    return $vars;
}

add_shortcode('react-app', 'reactshort');
add_action('wp_enqueue_scripts', 'enq_react');
add_action('init','add_get_val');
add_filter( 'query_vars', 'add_query_vars_filter' );

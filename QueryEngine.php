<?php

include_once( __DIR__ . '/vendor/autoload.php' );

$config = new \QueryEngine\Config(

);

$installer = new \QueryEngine\Installer( $config );

$installer->install();
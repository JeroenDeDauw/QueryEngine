<?php

namespace QueryEngine;

use Wikibase\QueryEngine\SQLStore\Store;
use Wikibase\QueryEngine\SQLStore\StoreConfig;
use Wikibase\QueryEngine\SQLStore\DataValueHandlers;

class Installer {

	private $config;

	public function __construct( Config $config ) {
		$this->config = $config;
	}

	public function install() {
		$dvHandlers = new DataValueHandlers();

		$config = new StoreConfig(
			'My awesome query store',
			'nyan_',
			$dvHandlers->getHandlers()
		);

		//$store = new Store( $config, $queryInterface, $tableBuilder );
	}

}
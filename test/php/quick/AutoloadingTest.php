<?php

namespace QueryEngine\Tests;

/**
 * @licence GNU GPL v2+
 * @author Jeroen De Dauw < jeroendedauw@gmail.com >
 */
class AutoloadingTest extends \PHPUnit_Framework_TestCase {

	public function testOwnClassesAreLoaded() {
		$this->assertTrue( class_exists( 'QueryEngine\Config' ) );
		$this->assertTrue( class_exists( 'QueryEngine\Installer' ) );
	}

	public function testDependencyClassesAreLoaded() {
		$this->assertTrue( class_exists( 'Ask\Language\Query' ) );
	}

}

<?php

namespace App\Tests;

use PHPUnit\Framework\TestCase;
use App\Entity\Music;
use App\Entity\Category;


class TestMusicEntityTest extends TestCase
{
    public function testMusicEntity()
    {
        // Create a new instance of the Music entity
        $music = new Music();

        // Set some values for testing
        $music->setMusicTitle('Bilie jean');
        $music->setSingerName('Michel Jakson');
        $music->setCover('test_cover.jpg');
        $music->setAudio('test_audio.mp3');

        // Assertions
        $this->assertEquals('Bilie jean', $music->getMusicTitle());
        $this->assertEquals('Michel Jakson', $music->getSingerName());
        $this->assertEquals('test_cover.jpg', $music->getCover());
        $this->assertEquals('test_audio.mp3', $music->getAudio());
    }

    public function testMusicTitleIsString()
    {
        // Create a new instance of the Music entity
        $music = new Music();

        // Set some values for testing
        $music->setMusicTitle('Bilie jean');

        // Assertions
        $this->assertIsString('Bilie jean', $music->getMusicTitle());
    }

    public function testSetAndGetCategory()
    {
        $music = new Music();

        // Create a Category instance
        $category = new Category();
        $category->setCategoryName('POP');

        // Set the Category for the Music entity
        $music->setCategory($category);

        // Check if getCategory returns the expected Category instance
        $this->assertSame($category, $music->getCategory());
    }
}

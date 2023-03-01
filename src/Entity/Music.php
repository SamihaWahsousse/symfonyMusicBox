<?php

namespace App\Entity;

use App\Repository\MusicRepository;
use Doctrine\ORM\Mapping as ORM;
use Vich\UploaderBundle\Mapping\Annotation as Vich;
use Symfony\Component\HttpFoundation\File\File;



#[ORM\Entity(repositoryClass: MusicRepository::class)]
#[Vich\Uploadable]

class Music
{
    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column]
    private ?int $id = null;

    #[ORM\Column(length: 255)]
    private ?string $music_title = null;

    #[ORM\Column(length: 255)]
    private ?string $singer_name = null;



    #[ORM\Column(length: 255)]
    private ?string $cover = null;

    /**
     * @Vich\UploadableField(mapping="album_covers", fileNameProperty="cover")
     * @var File
     */
    private $coverFile;


    #[ORM\Column(length: 255)]
    private ?string $audio = null;

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getMusicTitle(): ?string
    {
        return $this->music_title;
    }

    public function setMusicTitle(string $music_title): self
    {
        $this->music_title = $music_title;

        return $this;
    }

    public function getSingerName(): ?string
    {
        return $this->singer_name;
    }

    public function setSingerName(string $singer_name): self
    {
        $this->singer_name = $singer_name;

        return $this;
    }


    public function getCover(): ?string
    {
        return $this->cover;
    }

    public function setCover(string $cover): self
    {
        $this->cover = $cover;

        return $this;
    }

    public function setCoverFile(File $cover = null)
    {
        $this->coverFile = $cover;
    }

    public function getCoverFile()
    {
        return $this->coverFile;
    }

    public function getAudio(): ?string
    {
        return $this->audio;
    }

    public function setAudio(string $audio): self
    {
        $this->audio = $audio;

        return $this;
    }
}

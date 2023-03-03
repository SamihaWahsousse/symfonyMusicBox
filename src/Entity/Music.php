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

    /**
     * @Vich\UploadableField(mapping="album_audio", fileNameProperty="audio")
     * @var File
     */
    private $audioFile;

    #[ORM\ManyToOne(inversedBy: 'music')]
    #[ORM\JoinColumn(nullable: false)]
    private ?Category $category = null;

    public function setAudioFile(File $audio = null)
    {
        $this->audioFile = $audio;
    }

    public function getAudioFile()
    {
        return $this->audioFile;
    }



    public function getId(): ?int
    {
        return $this->id;
    }

    public function getMusic_Title(): ?string
    {
        return $this->music_title;
    }

    public function setMusic_Title(string $music_title): self
    {
        $this->music_title = $music_title;

        return $this;
    }

    public function getSinger_Name(): ?string
    {
        return $this->singer_name;
    }

    public function setSinger_Name(string $singer_name): self
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

    /////////////////////////////////////////


    public function getAudio(): ?string
    {
        return $this->audio;
    }

    public function setAudio(string $audio): self
    {
        $this->audio = $audio;

        return $this;
    }
    /////////////////////////////////////////////////////

    public function getCategory(): ?Category
    {
        return $this->category;
    }

    public function setCategory(?Category $category): self
    {
        $this->category = $category;

        return $this;
    }
}

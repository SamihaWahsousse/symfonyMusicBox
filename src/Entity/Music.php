<?php

namespace App\Entity;

use App\Repository\MusicRepository;
use Doctrine\ORM\Mapping as ORM;

#[ORM\Entity(repositoryClass: MusicRepository::class)]
class Music
{
    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column]
    private ?int $id = null;

    #[ORM\Column(length: 255)]
    private ?string $music_title = null;

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
}

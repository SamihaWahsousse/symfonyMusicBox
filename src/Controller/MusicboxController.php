<?php

namespace App\Controller;

use App\Entity\Music;
use Doctrine\ORM\EntityManagerInterface;
use App\Repository\MusicRepository;
use Doctrine\Persistence\ManagerRegistry;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;

class MusicboxController extends AbstractController
{
    #[Route('/', name: 'app_musicbox')]
    public function index(MusicRepository $musicRepository): Response
    {
        $songs = $musicRepository->findAll([]);
        //dd($songs);
        // $repository = $entityManager->getRepository(Music::class);

        return $this->render('musicbox/home.html.twig', [
            // "Songs" => $musicRepository->findAll()->
            'songs' => $songs,
        ]);
    }
}

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
        // $music = $musicRepository->find($musicId);
        // dd($music);


        //dd($songs);
        // $repository = $entityManager->getRepository(Music::class);

        return $this->render('musicbox/home.html.twig', [
            // "Songs" => $musicRepository->findAll()->
            'songs' => $songs,
        ]);
    }
    /*
    #[Route('/displayMusic/{musicId}', name: 'app_musicbox1')]
    public function displayMusic(ManagerRegistry $doctrine, $musicId): Response
    {
        $music = $this->getDoctrine()->getRepository(Music::class)->find($musicId);
        // dd($music);
        return $this->render('musicbox/home.html.twig', [
            "music" => $music,
        ]);
    }*/
}

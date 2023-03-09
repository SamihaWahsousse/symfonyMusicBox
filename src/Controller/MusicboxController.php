<?php

namespace App\Controller;

use App\Entity\Music;
use Doctrine\ORM\EntityManagerInterface;
use App\Repository\MusicRepository;
use Doctrine\Persistence\ManagerRegistry;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\HttpKernel\Exception\NotFoundHttpException;
use Symfony\Component\Routing\Annotation\Route;

class MusicboxController extends AbstractController
{
    #[Route('/home', name: 'app_musicbox')]
    public function index(MusicRepository $musicRepository): Response

    // public function index(ManagerRegistry $doctrine, $id): Response
    {
        // $songs = $doctrine->getRepository(Music::class)->find($id);
        $songs = $musicRepository->findAll([]);
        // $songs = $musicRepository->findBy(['music_title' => "music_title"]);

        return $this->render('musicbox/home.html.twig', [
            'songs' => $songs,
        ]);
    }

    #[Route('/favorites/add/{id}', name: 'add_favorites')]

    public function ajoutFavoris(Music $music)
    {
        if (!$music) {
            throw new NotFoundHttpException('Pas d\'annonce trouvée');
        }
        $music->addFavorite($this->getUser());

        $em = $this->getDoctrine()->getManager();
        $em->persist($music);
        $em->flush();
        return $this->redirectToRoute('app_musicbox');
    }

    #[Route('/favorites/remove/{id}', name: 'remove_favorites')]
    public function retraitFavoris(Music $music)
    {
        if (!$music) {
            throw new NotFoundHttpException('Pas d\'annonce trouvée');
        }

        $music->removeFavorite($this->getUser());

        $em = $this->getDoctrine()->getManager();
        $em->persist($music);
        $em->flush();
        return $this->redirectToRoute('app_musicbox');
    }






    // // Récupère les informations sur la chanson à partir de la base de données

    // #[Route('/home', name: 'app_musicbox')]

    // public function play(MusicRepository $musicRepository, $songId): Response
    // {
    //     $songs = $musicRepository->find($songId);
    //     $songF = $this->getDoctrine()
    //         ->getRepository(Music::class);

    //     return $this->render('musicbox/home.html.twig', [
    //         'songF' => $songs,
    //     ]);
    // }





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

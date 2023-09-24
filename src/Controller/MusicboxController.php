<?php

namespace App\Controller;

use App\Entity\Music;
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

    {
        $songs = $musicRepository->findAll([]);
        return $this->render('musicbox/home.html.twig', [
            'songs' => $songs,
        ]);
    }

    #[Route('/favorites/add/{id}', name: 'add_favorites')]

    public function ajoutFavoris(Music $music, ManagerRegistry $doctrine)
    {
        if (!$music) {
            throw new NotFoundHttpException('Pas de musique trouvée');
        }
        $music->addFavorite($this->getUser());
        $entityManager = $doctrine->getManager();
        $entityManager->persist($music);
        $entityManager->flush();
        return $this->redirectToRoute('app_musicbox');
    }

    #[Route('/favorites/remove/{id}', name: 'remove_favorites')]
    public function retraitFavoris(Music $music, ManagerRegistry $doctrine)
    {
        if (!$music) {
            throw new NotFoundHttpException('Pas de musique trouvée');
        }

        $music->removeFavorite($this->getUser());

        $entityManager = $doctrine->getManager();
        $entityManager->persist($music);
        $entityManager->flush();
        return $this->redirectToRoute('app_musicbox');
    }
}

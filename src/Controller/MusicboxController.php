<?php

namespace App\Controller;

use App\Entity\Music;
use App\Repository\MusicRepository;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\HttpKernel\Exception\NotFoundHttpException;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Component\HttpFoundation\JsonResponse;

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

    public function ajoutFavoris(Music $music)
    {
        if (!$music) {
            throw new NotFoundHttpException('Pas de musique trouvée');
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
            throw new NotFoundHttpException('Pas de musique trouvée');
        }

        $music->removeFavorite($this->getUser());

        $em = $this->getDoctrine()->getManager();
        $em->persist($music);
        $em->flush();
        return $this->redirectToRoute('app_musicbox');
    }
}

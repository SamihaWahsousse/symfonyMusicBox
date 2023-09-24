<?php

namespace App\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;


class FavoritesController extends AbstractController
{
    #[Route('/user/favorites', name: 'app_favorites')]
    public function index(): Response
    {
        // TODO: retrieve the user's favorite music from the database
        /** @var $user User */
        $user = $this->getUser();
        $favoritePlaylist = $user->getFavorites();

        return $this->render('favorites/index.html.twig', [
            'favoritePlaylist' => $favoritePlaylist,
        ]);
    }
}

<?php

namespace App\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;

class MusicboxController extends AbstractController
{
    #[Route('/', name: 'app_musicbox')]
    public function index(): Response
    {
        return $this->render('musicbox/home.html.twig', [
            'controller_name' => 'MusicboxController',
        ]);
    }
}

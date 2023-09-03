<?php

namespace App\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;
use App\Entity\User;
use App\Form\ResetPasswordType;
use Doctrine\Persistence\ManagerRegistry;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\PasswordHasher\Hasher\UserPasswordHasherInterface;
use Symfony\Component\Security\Core\User\UserInterface;

class UserController extends AbstractController
{
    #[Route('/user', name: 'app_user')]
    public function index(): Response
    {
        return $this->render('user/index.html.twig', [
            'controller_name' => 'UserController',
        ]);
    }


    #[Route('/editUserPassword', name: 'edit_user_password')]
    public function editUser(Request $request, ManagerRegistry $doctrine, UserPasswordHasherInterface $passwordHasher, UserInterface $user)
    {
        //récupérer l'utilisateur connecté 
        $user = $this->getUser();
        //instanciation du formulaire avec la méthode creatForm
        $form = $this->createForm(ResetPasswordType::class, $user);
        $form->handleRequest($request);

        if ($form->isSubmitted() && $form->isValid()) {
            $plaintextPassword = $form->getData()->getPlainPassword();
            // dd($data);
            $oldPassword = $user->getPassword();
            if ($passwordHasher->isPasswordValid($user, $plaintextPassword)) {
                dd("l ancien et le nouveau mot d epasse sont identiques");
            } else {
                dd("pas ok");
            }

            //send the data to database
            $entityManager = $doctrine->getManager();
            $entityManager->persist($user);
            $entityManager->flush();

            $this->addFlash('message', 'Profil mis à jour');

            // redirect to home page
            return $this->redirectToRoute('app_musicbox');
        }

        return $this->render('user/editUser.html.twig', [
            'form' => $form->createView(),
        ]);
    }
}

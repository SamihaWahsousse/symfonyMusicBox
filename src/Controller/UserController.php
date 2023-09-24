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
use Symfony\Component\HttpFoundation\Session\Flash\FlashBagInterface;

class UserController extends AbstractController
{
    private $flashMessage;
    public function __construct(FlashBagInterface $flashMessage)
    {
        $this->flashMessage = $flashMessage;
    }



    #[Route('/user', name: 'app_user')]
    public function index(): Response
    {
        return $this->render('user/index.html.twig', [
            'controller_name' => 'UserController',
        ]);
    }

    /**
     * Cette fonction permet de changer le password utilisateur et de lui demander de fournir un mot de passe different à celui stocker dans la BDD
     */

    #[Route('/editUserPassword', name: 'edit_user_password')]
    public function editUser(Request $request, ManagerRegistry $doctrine, UserPasswordHasherInterface $passwordHasher, UserInterface $user): Response
    {
        if (!$this->getUser()) {
            return $this->redirectToRoute('app_login');
        }

        //récupérer l'utilisateur connecté 
        $user = $this->getUser();
        //instanciation du formulaire avec la méthode creatForm
        $changePasswordForm = $this->createForm(ResetPasswordType::class, $user);

        $changePasswordForm->handleRequest($request);
        $entityManager = $doctrine->getManager();

        if ($changePasswordForm->isSubmitted() && $changePasswordForm->isValid()) {
            $plaintextPassword = $changePasswordForm->getData()->getPlainPassword();

            // isValidPassword vérifie si le nouveau mot d epasse indiqué est identiques ou non avec celui stocker dans la BDD;
            if (!($passwordHasher->isPasswordValid($user, $plaintextPassword))) {
                // dd("l ancien et le nouveau mot de passe sont identiques");
                // dd($passwordHasher->isPasswordValid($user, $plaintextPassword));

                $newHashedPassword = $passwordHasher->hashPassword($user, $plaintextPassword);
                $user->setPassword($newHashedPassword);

                $entityManager->persist($user);
                $entityManager->flush();

                $this->addFlash('success', 'Votre mot de passe a été mis à jour');
                return $this->redirectToRoute('app_musicbox');
            } else {
                // dd("l ancien et le nouveau mot de passe sont  identiques");
                $this->addFlash('error', "l'ancien et le nouveau mot de passe sont identiques");
            }

            //     $user->setPassword($passwordHasher->hashPassword(
            //         $user,
            //         $changePasswordForm->get('plainPassword')->getData()
            //     ));

            //     // $user = $changePasswordForm->getData();
            //     $entityManager->persist($user);
            //     $entityManager->flush();
            //     $this->addFlash('message', 'Profil mis à jour');
            //     return $this->redirectToRoute('app_musicbox');
            // }

            //send the data to database
            // $entityManager->persist($user);
            // $entityManager->flush();

            // $this->addFlash('message', 'Profil mis à jour');

            // redirect to home page

        }

        return $this->render('user/editUser.html.twig', [
            'changePasswordForm' => $changePasswordForm->createView(),
        ]);
    }
}

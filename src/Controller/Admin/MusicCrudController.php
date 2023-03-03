<?php

namespace App\Controller\Admin;

use App\Entity\Music;
use EasyCorp\Bundle\EasyAdminBundle\Controller\AbstractCrudController;
use EasyCorp\Bundle\EasyAdminBundle\Field\AssociationField;
use EasyCorp\Bundle\EasyAdminBundle\Field\IdField;
use EasyCorp\Bundle\EasyAdminBundle\Field\ImageField;
use EasyCorp\Bundle\EasyAdminBundle\Field\TextField;
use Symfony\Component\Form\Extension\Core\Type\FileType;
use Vich\UploaderBundle\Form\Type\VichImageType;

class MusicCrudController extends AbstractCrudController
{
    public static function getEntityFqcn(): string
    {
        return Music::class;
    }


    public function configureFields(string $pageName): iterable
    {
        return [
            IdField::new('id')->hideOnForm(),
            TextField::new('music_title'),
            TextField::new('singer_name'),
            ImageField::new('cover')
                ->setBasePath('/uploads/covers/')
                ->setUploadDir('public/uploads/covers')
                ->setRequired(false),
            // ->onlyOnIndex(),
            // textField::new('coverFile')
            //     ->setFormType(VichImageType::class),
            // ->hideOnIndex(),
            ImageField::new('audio')
                ->setBasePath('/uploads/audio/')
                ->setUploadDir('public/uploads/audio')
                ->setRequired(false),

            AssociationField::new('category'),

        ];
    }
}
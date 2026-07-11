// Visuels de stock (Unsplash) choisis pour coller à l'esprit « coffee lounge »
// moderne de MORNACO : palette teal/crème, verdure façon mur végétal, néon,
// café soigné et boissons à partager. Aucune photo du menu papier n'est utilisée.
// IDs vérifiés (réponse 200 image/jpeg) le 2026-07-07.
const unsplash = (id, w = 1600) =>
  `https://images.unsplash.com/photo-${id}?w=${w}&q=80&auto=format&fit=crop`

export const img = {
  // Salon verdoyant, plantes en cascade — ambiance « lounge » pour le Hero.
  heroLounge: unsplash('1600093463592-8e36ae95ef56', 1920),
  // Enseigne lumineuse « CAFE » — écho au néon MORNACO du mur végétal.
  cafeNeon: unsplash('1501339847302-ac426a4a7cbb'),
  // Cappuccinos latte art entourés de plantes vertes.
  lattePlants: unsplash('1509042239860-f550ce710b93'),
  // Intérieur café chaleureux, plantes et comptoir.
  interiorPlants: unsplash('1554118811-1e0d58224f24'),
  // Trois cafés trinqués — l'esprit « à partager ».
  shareCups: unsplash('1495474472287-4d71bcdd2085'),
  // Terrasse extérieure, verdure et pavés.
  terrasse: unsplash('1559925393-8be0ec4767c8'),
}

// Galerie de la section Ambiance.
export const galleryImages = [
  { src: img.interiorPlants, alt: 'Salle MORNACO chaleureuse, plantes et comptoir' },
  { src: img.cafeNeon, alt: 'Enseigne lumineuse d’un coffee lounge, ambiance du soir' },
  { src: img.lattePlants, alt: 'Cappuccinos latte art entourés de verdure' },
  { src: img.shareCups, alt: 'Trois cafés partagés autour de la table' },
  { src: img.terrasse, alt: 'Terrasse extérieure verdoyante' },
]

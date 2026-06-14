require('dotenv').config();
const bcrypt = require('bcryptjs');
const db = require('./models');

const seed = async () => {
  await db.sequelize.sync({ force: true });

  // Admin user
  const adminHash = await bcrypt.hash('admin123', 12);
  await db.User.create({
    firstName: 'Admin',
    lastName: 'MadaHorizon',
    email: 'admin@madahorizon.com',
    password: adminHash,
    role: 'admin',
    phone: '+261 34 00 000 00',
  });

  // Demo client
  const clientHash = await bcrypt.hash('client123', 12);
  await db.User.create({
    firstName: 'Jean',
    lastName: 'Rakoto',
    email: 'client@test.com',
    password: clientHash,
    role: 'client',
    phone: '+261 32 00 000 01',
  });

  // Categories
  const categories = await db.Category.bulkCreate([
    { name: 'Circuits', slug: 'circuits', description: 'Découvrez Madagascar à travers nos circuits organisés', icon: '📍' },
    { name: 'Séjours', slug: 'sejours', description: 'Séjours tout compris dans les plus beaux endroits', icon: '🏖️' },
    { name: 'Activités', slug: 'activites', description: 'Activités variées pour tous les goûts', icon: '🎯' },
    { name: 'Excursions', slug: 'excursions', description: 'Excursions d\'une journée vers les sites incontournables', icon: '🏔️' },
  ]);

  // Offers
  const offers = await db.Offer.bulkCreate([
    {
      title: 'Circuit découverte - Madagascar Express',
      slug: 'circuit-decouverte-madagascar-express',
      description: 'Un circuit complet de 10 jours pour découvrir les merveilles de Madagascar. De la capitale Antananarivo aux plages paradisiaques de Nosy Be, en passant par les célèbres baobabs de Morondava et le parc national d\'Andasibe.',
      itinerary: `Jour 1: Arrivée à Antananarivo\nJour 2: Visite d'Antananarivo\nJour 3: Route vers Morondava\nJour 4: Allée des Baobabs\nJour 5: Parc national d'Andasibe\nJour 6: Lémuriens et nature\nJour 7: Vol vers Nosy Be\nJour 8: Plages et détente\nJour 9: Excursion en mer\nJour 10: Départ`,
      duration: '10 jours / 9 nuits',
      price: 2500000,
      originalPrice: 3000000,
      destination: 'Madagascar',
      maxParticipants: 15,
      isFeatured: true,
      mainImage: '/uploads/baobab.jpg',
      included: 'Vols internes, hébergement 4*, petits déjeuners, guide francophone, transferts',
      excluded: 'Vols internationaux, déjeuners et dîners, pourboires, assurance voyage',
      category_id: 1,
    },
    {
      title: 'Séjour balnéaire - Nosy Be Paradise',
      slug: 'sejour-balneaire-nosy-be-paradise',
      description: 'Un séjour de rêve sur l\'île de Nosy Be. Profitez de plages de sable blanc, eaux cristallines et couchers de soleil à couper le souffle.',
      duration: '7 jours / 6 nuits',
      price: 1800000,
      destination: 'Nosy Be',
      maxParticipants: 20,
      isFeatured: true,
      mainImage: '/uploads/nosy-beach.jpg',
      included: 'Hébergement en bungalow vue mer, tous repas, activités nautiques incluses',
      excluded: 'Vols, boissons alcoolisées, spa',
      category_id: 2,
    },
    {
      title: 'Excursion - Lémuriens d\'Andasibe',
      slug: 'excursion-lemuriens-andasibe',
      description: 'Une journée inoubliable au parc national d\'Andasibe-Mantadia, à la rencontre des lémuriens et de la biodiversité unique de Madagascar.',
      duration: '1 jour',
      price: 350000,
      destination: 'Andasibe',
      maxParticipants: 10,
      isFeatured: true,
      mainImage: '/uploads/lemur.jpg',
      included: 'Transport A/R, guide naturaliste, entrée parc, déjeuner',
      excluded: 'Dépenses personnelles, pourboires',
      category_id: 4,
    },
    {
      title: 'Circuit Aventure - La Route du Sud',
      slug: 'circuit-aventure-route-du-sud',
      description: 'Partez à l\'aventure dans le sud de Madagascar. Découvrez l\'Allée des Baobabs, le parc national de l\'Isalo et les plages d\'Ifaty.',
      duration: '12 jours / 11 nuits',
      price: 3200000,
      destination: 'Sud de Madagascar',
      maxParticipants: 12,
      isFeatured: false,
      mainImage: '/uploads/baobab-alley.jpg',
      included: 'Tous transports, hébergement, guide, repas',
      excluded: 'Vols internationaux, équipement personnel',
      category_id: 1,
    },
    {
      title: 'Activité - Plongée sous-marine à Nosy Be',
      slug: 'activite-plongee-sous-marine-nosy-be',
      description: 'Explorez les fonds marins exceptionnels de Nosy Be. Sites de plongée pour tous niveaux, encadrement professionnel.',
      duration: 'Demi-journée',
      price: 150000,
      destination: 'Nosy Be',
      maxParticipants: 8,
      isFeatured: false,
      mainImage: '/uploads/sea-turtle.jpg',
      included: 'Équipement complet, guide instructeur, boissons',
      excluded: 'Certificat médical (si requis)',
      category_id: 3,
    },
    {
      title: 'Séjour Culturel - Les Hautes Terres',
      slug: 'sejour-culturel-hautes-terres',
      description: 'Immergez-vous dans la culture malgache à travers les hautes terres. Visite des rizières en terrasses, palais royaux et ateliers artisanaux.',
      duration: '5 jours / 4 nuits',
      price: 1200000,
      originalPrice: 1500000,
      destination: 'Antananarivo - Ambositra - Antsirabe',
      maxParticipants: 10,
      isFeatured: false,
      mainImage: '/uploads/hautes-terres.jpg',
      included: 'Hébergement, guide, entrées sites, transport',
      excluded: 'Repas non mentionnés, achats personnels',
      category_id: 2,
    },
    {
      title: 'Excursion - Tsingy de Bemaraha',
      slug: 'excursion-tsingy-bemaraha',
      description: 'Découvrez le site classé UNESCO des Tsingy de Bemaraha, un paysage unique de formations karstiques acérées.',
      duration: '2 jours / 1 nuit',
      price: 650000,
      destination: 'Tsingy de Bemaraha',
      maxParticipants: 8,
      isFeatured: false,
      mainImage: '/uploads/tsingy.jpg',
      included: 'Transport 4x4, guide, hébergement, repas',
      excluded: 'Équipement de randonnée',
      category_id: 4,
    },
    {
      title: 'Activité - Randonnée dans l\'Isalo',
      slug: 'activite-randonnee-isalo',
      description: 'Randonnée guidée dans le magnifique parc national de l\'Isalo. Piscines naturelles, canyons et paysages époustouflants.',
      duration: '1 jour',
      price: 200000,
      destination: 'Parc National de l\'Isalo',
      maxParticipants: 10,
      isFeatured: false,
      mainImage: '/uploads/isalo.jpg',
      included: 'Guide, entrée parc, pique-nique',
      excluded: 'Transport jusqu\'au parc',
      category_id: 3,
    },
  ]);

  // Offer images
  await db.OfferImage.bulkCreate([
    { offer_id: 1, url: '/uploads/baobab.jpg', alt: 'Circuit Madagascar Express', isPrimary: true },
    { offer_id: 1, url: '/uploads/baobab-field.jpg', alt: 'Circuit Madagascar Express', isPrimary: false },
    { offer_id: 2, url: '/uploads/nosy-beach.jpg', alt: 'Plage Nosy Be', isPrimary: true },
    { offer_id: 2, url: '/uploads/beach-boats.jpg', alt: 'Plage Nosy Be', isPrimary: false },
    { offer_id: 3, url: '/uploads/lemur.jpg', alt: 'Lémurien Andasibe', isPrimary: true },
    { offer_id: 3, url: '/uploads/forest.jpg', alt: 'Forêt Andasibe', isPrimary: false },
    { offer_id: 4, url: '/uploads/baobab-alley.jpg', alt: 'Route du Sud', isPrimary: true },
    { offer_id: 4, url: '/uploads/baobab-sunset.jpg', alt: 'Couché de soleil', isPrimary: false },
    { offer_id: 5, url: '/uploads/sea-turtle.jpg', alt: 'Plongée Nosy Be', isPrimary: true },
    { offer_id: 5, url: '/uploads/nosy-beach.jpg', alt: 'Plage Nosy Be', isPrimary: false },
    { offer_id: 6, url: '/uploads/hautes-terres.jpg', alt: 'Hautes Terres', isPrimary: true },
    { offer_id: 6, url: '/uploads/mountain.jpg', alt: 'Montagnes', isPrimary: false },
    { offer_id: 7, url: '/uploads/tsingy.jpg', alt: 'Tsingy Bemaraha', isPrimary: true },
    { offer_id: 7, url: '/uploads/isalo.jpg', alt: 'Parc national', isPrimary: false },
    { offer_id: 8, url: '/uploads/isalo.jpg', alt: 'Randonnée Isalo', isPrimary: true },
    { offer_id: 8, url: '/uploads/landscape.jpg', alt: 'Paysage Isalo', isPrimary: false },
  ]);

  // News
  await db.NewsArticle.bulkCreate([
    {
      title: 'Madagascar rouvre ses frontières aux touristes',
      slug: 'madagascar-rouvre-frontieres',
      excerpt: 'Bonne nouvelle pour les voyageurs ! Madagascar accueille à nouveau les touristes internationaux dans les meilleures conditions.',
      content: 'Madagascar a officiellement rouvert ses frontières aux voyageurs internationaux. Les visiteurs peuvent désormais découvrir les merveilles de l\'île dans le respect des mesures sanitaires en vigueur. L\'aéroport international d\'Antananarivo est opérationnel et accueille les vols réguliers et charters.\n\nLes touristes vaccinés peuvent entrer sans test PCR, tandis que les non-vaccinés devront présenter un test négatif de moins de 72h. Une assurance voyage couvrant la COVID-19 est recommandée.',
      image: '/uploads/landscape.jpg',
      isPublished: true,
      publishedAt: new Date('2026-06-01'),
    },
    {
      title: 'Découvrez la nouvelle piste cyclable d\'Antananarivo',
      slug: 'nouvelle-piste-cyclable-tana',
      excerpt: 'La capitale malgache se met au vert avec une nouvelle piste cyclable de 15 km à travers la ville.',
      content: 'La ville d\'Antananarivo a inauguré une piste cyclable de 15 km reliant le centre-ville aux quartiers périphériques. Cette initiative s\'inscrit dans le plan de développement durable de la capitale.\n\nLes touristes peuvent désormais louer des vélos pour explorer la ville de façon écologique et agréable. MadaHorizon propose désormais des circuits à vélo dans le cadre de ses offres.',
      image: '/uploads/mountain.jpg',
      isPublished: true,
      publishedAt: new Date('2026-05-15'),
    },
    {
      title: 'Nosy Be élue meilleure île de l\'océan Indien',
      slug: 'nosy-be-meilleure-ile',
      excerpt: 'L\'île aux parfums remporte le prix de la meilleure destination insulaire de l\'océan Indien 2026.',
      content: 'Nosy Be, joyau du nord-ouest de Madagascar, a été élue meilleure île de l\'océan Indien pour l\'année 2026 par le prestigieux magazine Travel & Leisure. Cette récompense vient couronner des années d\'efforts pour développer un tourisme durable et de qualité.\n\nAvec ses plages de sable blanc, ses eaux cristallines et sa biodiversité exceptionnelle, Nosy Be continue d\'attirer les voyageurs du monde entier.',
      image: '/uploads/beach-boats.jpg',
      isPublished: true,
      publishedAt: new Date('2026-04-20'),
    },
  ]);

  // Reviews
  await db.Review.bulkCreate([
    { offer_id: 1, user_id: 2, rating: 5, comment: 'Circuit incroyable ! Les paysages sont à couper le souffle. Le guide était excellent et très professionnel.', isApproved: true },
    { offer_id: 2, user_id: 2, rating: 4, comment: 'Séjour merveilleux à Nosy Be. Hôtel parfait, plages magnifiques. Juste un petit bémol sur l\'organisation des excursions.', isApproved: true },
    { offer_id: 3, user_id: 2, rating: 5, comment: 'Excursion inoubliable ! Voir les lémuriens dans leur habitat naturel est une expérience unique.', isApproved: true },
  ]);

  console.log('Base de données initialisée avec succès !');
  console.log('Admin: admin@madahorizon.com / admin123');
  console.log('Client: client@test.com / client123');
  process.exit(0);
};

seed().catch(err => {
  console.error(err);
  process.exit(1);
});

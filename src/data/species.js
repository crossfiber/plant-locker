// ============================================================
// MOCK DATA: Species reference list (seeded, edit freely)
// Each species: id, commonName, scientificName, careInfo,
// plus presentation fields used by the SVG illustration system:
//   art  - which illustration motif to draw (see PlantArt.jsx)
//   tint - background tint token for covers ('mint' | 'sage' | 'peach' | 'sand')
// Care info is accurate basic guidance, kept to one line per field.
// ============================================================

export const SPECIES = [
  {
    id: 'monstera-deliciosa',
    commonName: 'Monstera',
    scientificName: 'Monstera deliciosa',
    art: 'monstera',
    tint: 'mint',
    careInfo: {
      light: 'Bright, indirect light. Direct sun scorches the leaves.',
      water: 'When the top 2 inches of soil are dry, roughly weekly.',
      humidity: 'Medium to high. 50% or more keeps fenestrations coming.',
      difficulty: 'Easy',
    },
  },
  {
    id: 'ponytail-palm',
    commonName: 'Ponytail Palm',
    scientificName: 'Beaucarnea recurvata',
    art: 'palm',
    tint: 'sand',
    careInfo: {
      light: 'Bright light, happily takes some direct sun.',
      water: 'Sparingly. Let soil dry fully; the bulbous trunk stores water.',
      humidity: 'Low humidity is fine. Very drought tolerant.',
      difficulty: 'Easy',
    },
  },
  {
    id: 'snake-plant',
    commonName: 'Snake Plant',
    scientificName: 'Dracaena trifasciata',
    art: 'snake',
    tint: 'sage',
    careInfo: {
      light: 'Tolerates low light to bright indirect. Very forgiving.',
      water: 'Every 2 to 4 weeks. Let soil dry out completely between.',
      humidity: 'Any household humidity works.',
      difficulty: 'Very easy',
    },
  },
  {
    id: 'golden-pothos',
    commonName: 'Golden Pothos',
    scientificName: 'Epipremnum aureum',
    art: 'trailing',
    tint: 'mint',
    careInfo: {
      light: 'Low to bright indirect light. Variegation fades in deep shade.',
      water: 'When the top half of the soil is dry; leaves droop when thirsty.',
      humidity: 'Average room humidity is fine.',
      difficulty: 'Very easy',
    },
  },
  {
    id: 'zz-plant',
    commonName: 'ZZ Plant',
    scientificName: 'Zamioculcas zamiifolia',
    art: 'zz',
    tint: 'sage',
    careInfo: {
      light: 'Low to bright indirect light. Avoid harsh direct sun.',
      water: 'Every 2 to 3 weeks. Rhizomes store water; dry out fully first.',
      humidity: 'Low humidity is no problem.',
      difficulty: 'Very easy',
    },
  },
  {
    id: 'fiddle-leaf-fig',
    commonName: 'Fiddle Leaf Fig',
    scientificName: 'Ficus lyrata',
    art: 'fiddle',
    tint: 'sand',
    careInfo: {
      light: 'Lots of bright light, a little gentle sun. Hates being moved.',
      water: 'When the top inch is dry. Water evenly around the pot.',
      humidity: 'Medium, 40 to 60%. Keep away from drafts and vents.',
      difficulty: 'Challenging',
    },
  },
  {
    id: 'rubber-plant',
    commonName: 'Rubber Plant',
    scientificName: 'Ficus elastica',
    art: 'rubber',
    tint: 'sage',
    careInfo: {
      light: 'Bright, indirect light keeps leaves glossy and dark.',
      water: 'When the top inch is dry, about weekly. Less in winter.',
      humidity: 'Average room humidity. Wipe leaves so they can breathe.',
      difficulty: 'Easy',
    },
  },
  {
    id: 'spider-plant',
    commonName: 'Spider Plant',
    scientificName: 'Chlorophytum comosum',
    art: 'spider',
    tint: 'mint',
    careInfo: {
      light: 'Bright, indirect light. Tolerates lower light.',
      water: 'Keep lightly moist. Filtered water helps avoid brown tips.',
      humidity: 'Average to slightly humid.',
      difficulty: 'Very easy',
    },
  },
  {
    id: 'peace-lily',
    commonName: 'Peace Lily',
    scientificName: 'Spathiphyllum wallisii',
    art: 'lily',
    tint: 'mint',
    careInfo: {
      light: 'Low to medium indirect light. Blooms more with brighter light.',
      water: 'Keep evenly moist. It dramatically droops when thirsty, then recovers.',
      humidity: 'High humidity preferred. Mist or group with other plants.',
      difficulty: 'Easy',
    },
  },
  {
    id: 'aloe-vera',
    commonName: 'Aloe Vera',
    scientificName: 'Aloe barbadensis miller',
    art: 'aloe',
    tint: 'sand',
    careInfo: {
      light: 'Bright light with some direct sun. A sunny sill is ideal.',
      water: 'Deep soak, then let dry fully. Every 2 to 3 weeks.',
      humidity: 'Dry air is fine. Overwatering is the main killer.',
      difficulty: 'Easy',
    },
  },
  {
    id: 'pilea',
    commonName: 'Chinese Money Plant',
    scientificName: 'Pilea peperomioides',
    art: 'pilea',
    tint: 'mint',
    careInfo: {
      light: 'Bright, indirect light. Rotate weekly so it grows evenly.',
      water: 'When the top inch is dry. Leaves curl when overwatered.',
      humidity: 'Average room humidity.',
      difficulty: 'Easy',
    },
  },
  {
    id: 'string-of-pearls',
    commonName: 'String of Pearls',
    scientificName: 'Curio rowleyanus',
    art: 'pearls',
    tint: 'sage',
    careInfo: {
      light: 'Bright light with some gentle direct sun.',
      water: 'Sparingly. Pearls wrinkle slightly when thirsty.',
      humidity: 'Dry air preferred. Succulent rules apply.',
      difficulty: 'Moderate',
    },
  },
  {
    id: 'bird-of-paradise',
    commonName: 'Bird of Paradise',
    scientificName: 'Strelitzia nicolai',
    art: 'bop',
    tint: 'peach',
    careInfo: {
      light: 'Bright light including direct sun. The more, the better.',
      water: 'When the top 2 inches are dry. Keep moister in summer.',
      humidity: 'Medium to high. Mist to keep leaf edges from crisping.',
      difficulty: 'Moderate',
    },
  },
  {
    id: 'calathea',
    commonName: 'Calathea',
    scientificName: 'Goeppertia orbifolia',
    art: 'calathea',
    tint: 'mint',
    careInfo: {
      light: 'Medium, indirect light. Direct sun fades the patterns.',
      water: 'Keep consistently moist with filtered or rain water.',
      humidity: 'High, 60% or more. A humidifier is its best friend.',
      difficulty: 'Challenging',
    },
  },
  {
    id: 'jade-plant',
    commonName: 'Jade Plant',
    scientificName: 'Crassula ovata',
    art: 'jade',
    tint: 'sand',
    careInfo: {
      light: 'Bright light with several hours of direct sun.',
      water: 'Let soil dry out between waterings. Very little in winter.',
      humidity: 'Dry air is fine.',
      difficulty: 'Easy',
    },
  },
  {
    id: 'boston-fern',
    commonName: 'Boston Fern',
    scientificName: 'Nephrolepis exaltata',
    art: 'fern',
    tint: 'mint',
    careInfo: {
      light: 'Medium, indirect light. No harsh sun.',
      water: 'Keep soil consistently moist, never soggy.',
      humidity: 'High. Mist often or keep in a bright bathroom.',
      difficulty: 'Moderate',
    },
  },
  {
    id: 'hoya',
    commonName: 'Hoya',
    scientificName: 'Hoya carnosa',
    art: 'trailing',
    tint: 'sage',
    careInfo: {
      light: 'Bright, indirect light. Some morning sun encourages blooms.',
      water: 'Let it mostly dry out between waterings.',
      humidity: 'Medium. Appreciates a little extra moisture.',
      difficulty: 'Easy',
    },
  },
  {
    id: 'plumeria',
    commonName: 'Plumeria',
    scientificName: 'Plumeria rubra',
    art: 'plumeria',
    tint: 'peach',
    careInfo: {
      light: 'Full sun. Give it the brightest spot you have.',
      water: 'Regularly in summer, almost none during winter dormancy.',
      humidity: 'Medium. Loves warm, tropical conditions.',
      difficulty: 'Moderate',
    },
  },
]

export function getSpecies(id) {
  return SPECIES.find((s) => s.id === id)
}

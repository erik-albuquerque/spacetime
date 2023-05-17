import { robotoFonts, baiJamjureeFonts } from '../common/fonts'

import { useFonts as useExpoFonts } from '@expo-google-fonts/roboto'

const useFonts = () => {
  const [hasLoadedFonts, errors] = useExpoFonts({
    ...robotoFonts,
    ...baiJamjureeFonts,
  })

  return {
    hasLoadedFonts,
    errors,
  }
}

export { useFonts }

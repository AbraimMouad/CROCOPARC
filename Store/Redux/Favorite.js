const initialState = { favoritesPlant: [] }

function toggleFavorite(state = initialState, action) {
  let nextState
  switch (action.type) {
    case 'TOGGLE_FAVORITE':
      const favoritePlantIndex = state.favoritesPlant.findIndex(item => item.id === action.value.id)
      if (favoritePlantIndex !== -1) {
        // Déjà dans les favoris, on le supprime de la liste
        nextState = {
          ...state,  // Copies state sans toucher l'origine valeur
          favoritesPlant: state.favoritesPlant.filter( (item, index) => index !== favoritePlantIndex)
        }
      }
      else {
        // N'est pas dans la favoris, on l'ajoute à la liste
        nextState = {
          ...state,
          favoritesPlant: [...state.favoritesPlant, action.value]
        }
      }
      return nextState || state  // Si nextState est undefined return state
  default:
    return state
  }
}

export default toggleFavorite

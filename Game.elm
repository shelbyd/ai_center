module Game exposing (..)


type GameState game winner
    = Terminal (Maybe winner)
    | NonTerminal game


lift : (action -> game -> GameState game winner) -> action -> GameState game winner -> GameState game winner
lift f action state =
    case state of
        Terminal t ->
            state

        NonTerminal game ->
            f action game


asNonTerminal: GameState game winner -> Maybe game
asNonTerminal state =
  case state of
    Terminal t -> Nothing
    NonTerminal game -> Just game

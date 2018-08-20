module Game exposing (..)


type GameState game winner
    = Terminal (Maybe winner)
    | NonTerminal game


lift : (action -> game -> Maybe (GameState game winner)) -> action -> Maybe (GameState game winner) -> Maybe (GameState game winner)
lift f action state =
    case state of
        Just (NonTerminal game) ->
            f action game

        _ ->
            state


asNonTerminal : Maybe (GameState game winner) -> Maybe game
asNonTerminal state =
    case state of
        Just (NonTerminal game) ->
            Just game

        _ ->
            Nothing

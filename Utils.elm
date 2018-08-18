module Utils exposing (..)


dedup : List a -> Maybe a
dedup list =
    case list of
        [] ->
            Nothing

        [ item ] ->
            Just item

        head :: tail ->
            if (Just head) == dedup tail then
                Just head
            else
                Nothing


maybeOrElse : Maybe a -> Maybe a -> Maybe a
maybeOrElse orElse original =
    case original of
        Just a ->
            Just a

        Nothing ->
            orElse

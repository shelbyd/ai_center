module TicTacToe
    exposing
        ( TicTacToe
        , Action
        , Player(..)
        , activePlayer
        , play
        , ticTacToe
        , validActions
        )

import Array exposing (Array)
import Game exposing (..)
import Utils


type alias TicTacToe =
    { board : Array (Maybe Player) }


type Player
    = X
    | O


type alias Action =
    Int


ticTacToe : TicTacToe
ticTacToe =
    { board = Array.repeat 9 Nothing
    }


winningPatterns: List (List Int)
winningPatterns =
    [ [ 0, 1, 2 ]
    , [ 3, 4, 5 ]
    , [ 6, 7, 8 ]
    , [ 0, 3, 6 ]
    , [ 1, 4, 7 ]
    , [ 2, 5, 8 ]
    , [ 0, 4, 8 ]
    , [ 2, 4, 6 ]
    ]


validActions : TicTacToe -> List Action
validActions ttt =
    ttt.board
        |> Array.indexedMap (\i -> \v -> ( i, v ))
        |> Array.filter (\( _, v ) -> v == Nothing)
        |> Array.map (\( i, _ ) -> i)
        |> Array.toList


play : Action -> TicTacToe -> GameState TicTacToe Player
play action ttt =
    let
        newTtt =
            playRaw action ttt
    in
        newTtt
            |> asTerminal
            |> Maybe.map (Terminal)
            |> Maybe.withDefault (NonTerminal newTtt)


playRaw : Action -> TicTacToe -> TicTacToe
playRaw action ttt =
    let
        newBoard =
            ttt.board
                |> Array.set action (Just (activePlayer ttt))
    in
        { ttt | board = newBoard }


asTerminal : TicTacToe -> Maybe (Maybe Player)
asTerminal ttt =
    let
        maybeDraw =
            if List.length (validActions ttt) == 0 then
                Just Nothing
            else
                Nothing
    in
        winningPatterns
            |> List.filterMap (winner ttt)
            |> List.head
            |> Maybe.map Just
            |> Utils.maybeOrElse maybeDraw


winner : TicTacToe -> List Int -> Maybe Player
winner ttt pattern =
    pattern
        |> List.map (\i -> Array.get i ttt.board)
        |> List.map (Maybe.withDefault Nothing)
        |> Utils.dedup
        |> Maybe.withDefault Nothing


activePlayer : TicTacToe -> Player
activePlayer ttt =
    if (count X ttt) > (count O ttt) then
        O
    else
        X


count : Player -> TicTacToe -> Int
count player ttt =
    ttt.board |> Array.filter (\v -> v == Just player) |> Array.length

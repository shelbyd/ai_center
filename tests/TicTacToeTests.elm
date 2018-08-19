module TicTacToeTests exposing (..)

import Expect
import Test exposing (..)
import Fuzz exposing (intRange)
import Game exposing (..)
import TicTacToe exposing (..)


playAll : List Action -> TicTacToe -> GameState TicTacToe Player
playAll actions ttt =
    actions |> List.foldl (Game.lift play) (NonTerminal ttt)


suite : Test
suite =
    concat
        [ test "empty game can play anything" <|
            \_ ->
                ticTacToe
                    |> validActions
                    |> Expect.equal (List.range 0 8)
        , test "empty game has X active" <|
            \_ ->
                ticTacToe |> activePlayer |> Expect.equal X
        , fuzz (intRange 0 8) "playing an action makes it unplayable" <|
            \action ->
                let
                    expected =
                        (List.range 0 8) |> List.filter (\v -> v /= action)
                in
                    ticTacToe
                        |> play action
                        |> asNonTerminal
                        |> Maybe.map validActions
                        |> Expect.equal (Just expected)
        , fuzz (intRange 0 8) "O is active after 1 play" <|
            \action ->
                ticTacToe
                    |> play action
                    |> asNonTerminal
                    |> Maybe.map activePlayer
                    |> Expect.equal (Just O)
        , fuzz (intRange 0 7) "X is active after 2 plays" <|
            \action ->
                ticTacToe
                    |> playAll [ 8, action ]
                    |> asNonTerminal
                    |> Maybe.map activePlayer
                    |> Expect.equal (Just X)
        , test "top row wins" <|
            \_ ->
                ticTacToe
                    |> playAll [ 0, 3, 1, 4, 2 ]
                    |> Expect.equal (Terminal (Just X))
        , test "draw" <|
            \_ ->
                ticTacToe
                    |> playAll [ 0, 2, 1, 3, 5, 4, 6, 8, 7 ]
                    |> Expect.equal (Terminal Nothing)
        ]

module Main exposing (..)

import Array
import Html exposing (Html, button, div, text, pre, h1, input, form, p)
import Html.Events exposing (onClick, onInput, onSubmit)
import Html.Attributes exposing (value)
import Game exposing (GameState(..))
import TicTacToe exposing (TicTacToe, Player)


main : Program Never Model Msg
main =
    Html.beginnerProgram
        { model =
            { gameState = (NonTerminal TicTacToe.ticTacToe)
            , play = ""
            , error = Nothing
            }
        , view = view
        , update = update
        }


type alias Model =
    { gameState : GameState TicTacToe Player
    , play : String
    , error : Maybe String
    }


type Msg
    = ChangePlay String
    | Play


update : Msg -> Model -> Model
update msg model =
    case msg of
        ChangePlay string ->
            { model | play = string }

        Play ->
            let
                parsedPlay : Maybe Int
                parsedPlay =
                    model.play |> String.toInt |> Result.toMaybe

                playAction : Int -> Maybe (GameState TicTacToe Player)
                playAction action =
                    Game.lift TicTacToe.play action (Just model.gameState)

                newBoard =
                    parsedPlay
                        |> Maybe.andThen playAction

                error =
                    case newBoard of
                        Just _ ->
                            Nothing

                        Nothing ->
                            Just "Invalid action"
            in
                { model
                    | play = ""
                    , gameState = (Maybe.withDefault model.gameState newBoard)
                    , error = error
                }


view : Model -> Html Msg
view model =
    div []
        [ h1 [] [ text "AI Center" ]
        , pre [] [ text (ticTacToeString model.gameState) ]
        , p [] [ text (Maybe.withDefault "" model.error) ]
        , form [ onSubmit Play ]
            [ input [ value model.play, onInput ChangePlay ] []
            , button [] [ text "Play" ]
            ]
        ]


ticTacToeString : GameState TicTacToe Player -> String
ticTacToeString state =
    case state of
        NonTerminal game ->
            nonTerminalString game

        Terminal (Just winner) ->
            "Winner: " ++ (toString winner)

        Terminal Nothing ->
            "Draw"


nonTerminalString : TicTacToe -> String
nonTerminalString ttt =
    let
        cellString : Maybe Player -> String
        cellString =
            Maybe.map toString >> Maybe.withDefault "-"

        getCell : Int -> Maybe Player
        getCell i =
            Array.get i ttt.board |> Maybe.withDefault Nothing

        line : List Int -> String
        line =
            List.map (getCell >> cellString) >> String.join " "

        pattern =
            [ [ 0, 1, 2 ], [ 3, 4, 5 ], [ 6, 7, 8 ] ]
    in
        pattern |> List.map line |> String.join "\n"

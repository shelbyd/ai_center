module Main exposing (..)

import Html exposing (Html, button, div, text, pre, h1, input)
import Html.Events exposing (onClick, onInput)
import Html.Attributes exposing (value)


main : Program Never Model Msg
main =
    Html.beginnerProgram
        { model =
            { board = "- - -\n- - -\n- - -"
            , play = Nothing
            }
        , view = view
        , update = update
        }


type alias Model =
    { board : String
    , play : Maybe String
    }


type Msg
    = UpdateBoard String
    | ChangePlay String
    | Play


update : Msg -> Model -> Model
update msg model =
    case msg of
        UpdateBoard board ->
            { model | board = board }

        ChangePlay string ->
            { model | play = Just string }

        Play ->
            { model | play = Nothing }


view : Model -> Html Msg
view model =
    div []
        [ h1 [] [ text "AI Center" ]
        , pre [] [ text model.board ]
        , input [ value (Maybe.withDefault "" model.play), onInput ChangePlay ] []
        , button [ onClick Play ] [ text "Play" ]
        ]

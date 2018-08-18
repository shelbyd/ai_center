module UtilsTests exposing (..)

import Expect
import Test exposing (..)
import Fuzz exposing (..)
import Utils exposing (..)


suite : Test
suite =
    concat
        [ describe "dedup"
            [ test "empty list" <|
                \_ ->
                    dedup [] |> Expect.equal Nothing
            , fuzz (intRange 1 1024) "a list of the same item is Just item" <|
                \(count) ->
                    List.repeat count 42
                        |> dedup
                        |> Expect.equal (Just 42)
            , fuzz (intRange 1 1024) "a list of the same item with another" <|
                \(count) ->
                    List.repeat count 42
                        |> (::) 0
                        |> dedup
                        |> Expect.equal Nothing
            ]
        ]

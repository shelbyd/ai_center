module Example exposing (..)

import Expect
import Test exposing (..)


suite : Test
suite =
    describe "basic arithmetic"
        [ test "1 + 1 = 2" <|
            \_ -> (1 + 1) |> Expect.equal 2
        , test "2 + 2 = 4" <|
            \_ -> ((+) 2 2) |> Expect.equal 4
        , describe "multiplication"
            [ test "2 * 2 = 4" <|
                \_ -> (2 * 2) |> Expect.equal 4
            ]
        ]

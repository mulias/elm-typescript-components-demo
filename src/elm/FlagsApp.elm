module FlagsApp exposing (main)

import Browser
import Html exposing (..)
import Task
import Time


main : Program Flags Model msg
main =
    Browser.element
        { init = init
        , update = update
        , subscriptions = subscriptions
        , view = view
        }


type alias Flags =
    String


type alias Model =
    String


init : Flags -> ( Model, Cmd msg )
init name =
    ( name, Cmd.none )


update : msg -> Model -> ( Model, Cmd msg )
update _ model =
    ( model, Cmd.none )


subscriptions : Model -> Sub msg
subscriptions _ =
    Sub.none


view name =
    div [] [ div [] [ text <| "Hello " ++ name ++ "!" ] ]

port module FlagsAndPortsApp exposing (main)

import Browser
import Html exposing (Html, button, div, text)
import Html.Events exposing (onClick)


main : Program Flags Model Msg
main =
    Browser.element
        { init = init
        , update = update
        , subscriptions = subscriptions
        , view = view
        }


type alias Flags =
    { startNum : Int }


type alias Model =
    Int


type Msg
    = Increment
    | Decrement


init : Flags -> ( Model, Cmd Msg )
init { startNum } =
    ( startNum, Cmd.none )


update : Msg -> Model -> ( Model, Cmd Msg )
update msg model =
    case msg of
        Increment ->
            let
                newModel =
                    model + 1

                cmd =
                    if newModel == 9001 then
                        alert "9001? That's a big number."

                    else
                        Cmd.none
            in
            ( newModel, cmd )

        Decrement ->
            ( model - 1, Cmd.none )


subscriptions : Model -> Sub msg
subscriptions _ =
    Sub.none


view model =
    div []
        [ button [ onClick Decrement ] [ text "-" ]
        , div [] [ text (String.fromInt model) ]
        , button [ onClick Increment ] [ text "+" ]
        ]


port alert : String -> Cmd msg

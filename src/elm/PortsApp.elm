port module PortsApp exposing (main)

import Browser
import Html exposing (Html, button, div, text)
import Html.Attributes exposing (disabled)
import Html.Events exposing (onClick)


main : Program () Model Msg
main =
    Browser.element
        { init = init
        , update = update
        , subscriptions = subscriptions
        , view = view
        }


type alias Model =
    { canPing : Bool }


type Msg
    = Ping
    | Pong ()


init : () -> ( Model, Cmd Msg )
init _ =
    ( { canPing = True }, Cmd.none )


update : Msg -> Model -> ( Model, Cmd Msg )
update msg model =
    case msg of
        Ping ->
            ( { canPing = False }, ping () )

        Pong _ ->
            ( { canPing = True }, Cmd.none )


subscriptions : Model -> Sub Msg
subscriptions _ =
    pong Pong


view { canPing } =
    div []
        [ text "elm: "
        , button [ onClick Ping, disabled (not canPing) ] [ text "Ping!" ]
        ]


port ping : () -> Cmd msg


port pong : (() -> msg) -> Sub msg

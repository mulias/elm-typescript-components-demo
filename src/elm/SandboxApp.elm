module SandboxApp exposing (main)

import Browser
import Html exposing (..)
import Task
import Time


main : Program () Model Msg
main =
    Browser.element
        { init = init
        , update = update
        , subscriptions = subscriptions
        , view = view
        }


type alias Model =
    { zone : Maybe Time.Zone
    , time : Maybe Time.Posix
    }


type Msg
    = Tick Time.Posix
    | AdjustTimeZone Time.Zone


init : () -> ( Model, Cmd Msg )
init () =
    let
        model =
            { zone = Nothing
            , time = Nothing
            }

        cmd =
            Task.perform AdjustTimeZone Time.here
    in
    ( model, cmd )


update : Msg -> Model -> ( Model, Cmd Msg )
update msg model =
    case msg of
        Tick newTime ->
            ( { model | time = Just newTime }
            , Cmd.none
            )

        AdjustTimeZone newZone ->
            ( { model | zone = Just newZone }
            , Cmd.none
            )


subscriptions : Model -> Sub Msg
subscriptions _ =
    Time.every 1000 Tick


view { zone, time } =
    let
        hour =
            Maybe.map2 Time.toHour zone time
                |> Maybe.map String.fromInt
                |> Maybe.withDefault "--"
                |> String.padLeft 2 ' '

        minute =
            Maybe.map2 Time.toMinute zone time
                |> Maybe.map String.fromInt
                |> Maybe.withDefault "--"
                |> String.padLeft 2 '0'
    in
    div [] [ div [] [ text <| "The time is " ++ hour ++ ":" ++ minute ] ]

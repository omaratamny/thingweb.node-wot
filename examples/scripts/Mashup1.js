/*
This is a mashup that uses the devices of the red cart.
If you cover the light sensor:
The robot arm will turn right, > will be displayed on a sensehat and the HUE light on the right will turn on.
If there is enough light on the light sensor, the opposite will happen.
If you press the joystick, the Dotstar LEDs will light up with random colors.
*/

const Coffee_TD_ADDRESS = "http://TUMEIESI-MeArmPi-Orange.local:8080/MeArmPi";
const Toast_TD_ADDRESS = "http://192.168.188.9";

WoT.fetch(Coffee_TD_ADDRESS).then(async (MyCoffeeThing) => {

    WoT.fetch(Toast_TD_ADDRESS).then(async (MyBreadThing) => {


                        MyCoffeeThing = WoT.consume(MyCoffeeThing);
                        MyBreadThing = WoT.consume(MyBreadThing);

                        MyCoffeeThing.events.binfull.subscribe(x => {
                                MyBreadThing.actions["Toasting"].invoke();
                            },
                            e => {
                                console.log("onError: %s", e)
                            },
                            () => {
                                console.log("onCompleted");
                            }
                        )

                        setInterval(async () => {
                            var breadpercentage = await MyBreadThing.properties.breadpercentage.read();
                            if (breadpercentage < 51) {
                                MyCoffeeThing.actions["grinding"].invoke();
                                MyCoffeeThing.actions["brew"].invoke({
                                    "textString": "LatteMachiatto"
                                });
                            } else {
                                robotThing.actions["breww"].invoke({
                                    "textString" : "haha"
                                });
                            }
                        }, 200);
                    });
})
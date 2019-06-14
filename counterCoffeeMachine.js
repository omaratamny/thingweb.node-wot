/********************************************************************************
 * Copyright (c) 2018 - 2019 Contributors to the Eclipse Foundation
 * 
 * See the NOTICE file(s) distributed with this work for additional
 * information regarding copyright ownership.
 * 
 * This program and the accompanying materials are made available under the
 * terms of the Eclipse Public License v. 2.0 which is available at
 * http://www.eclipse.org/legal/epl-2.0, or the W3C Software Notice and
 * Document License (2015-05-13) which is available at
 * https://www.w3.org/Consortium/Legal/2015/copyright-software-and-document.
 * 
 * SPDX-License-Identifier: EPL-2.0 OR W3C-20150513
 ********************************************************************************/

const Brewing = "count";
const Grinding = "grinding";
const Error = "Error";
const Brew = "Brew";
const Stop_A_Coffee = "stopacoffee";
const NAME_ACTION_turnOff = "turnoff";
const NAME_EVENT_CHANGE = "change";

let thing = WoT.produce({
        title: "counterCoffeMachine",
        description: "counter example Thing",
        "@context": ["https://www.w3.org/2019/wot/td/v1", {"iot": "http://example.org/iot"}],
    });

console.log("Produced " + thing.title);

thing.addProperty(
    Brewing,
    {
        type: "boolean",
        description: "Whether the Machine is brewing",
        "iot:Custom": "example annotation",
        observable: true,
        readOnly: true
    },
    0);
thing.addProperty(
    Grinding,
    {
        type: "boolean",
        description: "Whether the Machine is grinding",
        observable: true,
        readOnly: true
    },
    0);
thing.addProperty(
    Error,
    {
        type: "boolean",
        description: "If there is an ERROR",
        "iot:Custom": "example annotation",
        observable: true,
        readOnly: true
    },
    0);

thing.addAction(
    Brew,
    {},
    (data,options) => {
        console.log(data);
        return thing.properties[NAME_PROPERTY_COUNT].read().then( (count) => {
            let value = count + 1;
            thing.properties[Brewing].write(true);
            thing.events[NAME_EVENT_CHANGE].emit();
        });
    });

thing.addAction(
    Stop_A_Coffe,
    {},
    () => {
        console.log("stop the coffee making");
        return thing.properties[NAME_PROPERTY_COUNT].read().then( (count) => {
            let value = count - 1;
            thing.properties[brew].write(false);
            thing.properties[NAME_PROPERTY_LAST_CHANGE].write((new Date()).toISOString());
            thing.events[NAME_EVENT_CHANGE].emit();
        });
    });

thing.addAction(
    NAME_ACTION_TurnOff,
    {},
    () => {
        console.log("turn the machine off");
        thing.properties[NAME_PROPERTY_COUNT].write(0);
        thing.properties[NAME_PROPERTY_LAST_CHANGE].write((new Date()).toISOString());
        thing.events[NAME_EVENT_CHANGE].emit();
    });
    
thing.addEvent(
    NAME_EVENT_watershortage,
{
        type: "boolean",
        description: "If there is a watershortage",});

thing["support"] = "git://github.com/eclipse/thingweb.node-wot.git";

thing.expose().then( () => { console.info(thing.title + " ready"); } );


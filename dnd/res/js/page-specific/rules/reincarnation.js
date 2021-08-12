"use strict";
class ReincarnationViewer extends React.Component {
    render() {
        return (React.createElement("div", { className: "container bg-light" },
            React.createElement("h1", null, "Reincarnation Expanded"),
            React.createElement("p", { className: "px-2" }, "The version of reincarnate found in the standard Player's Handbook may be enough to sate some adventurers... well, at least the BORING ones that is! This document outlines an alternate version of the spell reincarnate. One that any DM leading a party of powergamers would best avoid using. For all else, enjoy."),
            React.createElement("div", { className: "card rounded bg-white mb-2" },
                React.createElement("div", { className: "card-body" },
                    React.createElement("h4", { className: "card-title" }, "The Steps to Reincarnation!"),
                    React.createElement("p", { className: "card-text" },
                        React.createElement("ol", null,
                            React.createElement("li", null, "Roll on the Base Table"),
                            React.createElement("li", null, "Roll on the Sex Table (result has no effect on a character's gender)"),
                            React.createElement("li", null, "Roll on the Successfulness Table and follow instructions from there"),
                            React.createElement("li", null, "Roll on any additional applicable tables"),
                            React.createElement("li", null, "Finish up by rolling on any applicable subrace tables for your race")),
                        React.createElement("h4", null, "Subraces!"),
                        React.createElement("p", null, "An asterisk next to a race indicates that there is a matching subrace table to roll on. For instance, the Elements table would be used to determine what kind of Genasi, elemental, etc. a character ends up as. There are also tables for dragon types, tiefling types, and many more. Find these tables in the Subraces section at the end of the book."),
                        React.createElement("div", { className: "accordion accordion-flush", id: "stepsToReincarnationAccordion" },
                            React.createElement(ReincarnationAccordionItem, { parentID: "stepsToReincarnationAccordion", idBase: "Species", title: "Table 1: Base Table", rows: this.props.tableData.race }),
                            React.createElement(ReincarnationAccordionItem, { parentID: "stepsToReincarnationAccordion", idBase: "Gender", title: "Table 2: Sex (Optional)", rows: this.props.tableData.gender }),
                            React.createElement("div", { className: "accordion-item" },
                                React.createElement("h2", { className: "accordion-header", id: "successfulnessHeading" },
                                    React.createElement("button", { className: "accordion-button collapsed", type: "button", "data-bs-toggle": "collapse", "data-bs-target": "#successfulnessTable", "aria-expanded": "false", "aria-controls": "successfulnessTable" }, "Table 3: Successfulness")),
                                React.createElement("div", { id: "successfulnessTable", className: "accordion-collapse collapse", "aria-labelledby": "successfulnessHeading", "data-bs-parent": "#stepsToReincarnationAccordion" },
                                    React.createElement("div", { className: "accordion-body p-0" },
                                        React.createElement("p", null,
                                            "Even the most powerful spellcasters make mistakes! Roll on this table even when the caster is using optimal conditions. If something is VERY wrong, jump ahead to the following tables:",
                                            React.createElement("ul", null,
                                                React.createElement("li", null, "If the caster uses sub-optimal component pieces, roll on the Mutation table 1-3 times depending on how bad the components are as determined by the DM"),
                                                React.createElement("li", null, "If the caster uses the wrong component pieces, learned the spell wrong, or the spell is interrupted or sabotaged, roll on the Whoops! table"),
                                                React.createElement("li", null, "If the weave is distorted or damaged in the area, roll on the Wild Magic table"),
                                                React.createElement("li", null, "If there is some kind of outside magical influence, such as a fiend, fey, powerful undead, or deity affecting the weave of the area, or the spell is being cast in a plane such as Shadowfell or the Feywilds, roll of the table that best matches that kind of influence in the Magical Distortions section."))),
                                        React.createElement(RollableTable, { rows: this.props.tableData.successfulness })))))))),
            React.createElement("div", { className: "accordion accordion-flush", id: "outerTableAccordion" },
                React.createElement("div", { className: "accordion-item" },
                    React.createElement("h2", { className: "accordion-header", id: "mistakesHeading" },
                        React.createElement("button", { className: "accordion-button collapsed", type: "button", "data-bs-toggle": "collapse", "data-bs-target": "#mistakesCollapse", "aria-expanded": "false", "aria-controls": "mistakesCollapse" },
                            React.createElement("h2", null, "Mistakes"))),
                    React.createElement("div", { id: "mistakesCollapse", className: "accordion-collapse collapse", "aria-labelledby": "mistakesHeading", "data-bs-parent": "#outerTableAccordion" },
                        React.createElement("div", { className: "accordion-body p-0" },
                            React.createElement("div", { className: "accordion accordion-flush", id: "mistakesTablesAccordion" },
                                React.createElement("div", { className: "accordion-item" },
                                    React.createElement("h2", { className: "accordion-header", id: "headingMutations" },
                                        React.createElement("button", { className: "accordion-button collapsed", type: "button", "data-bs-toggle": "collapse", "data-bs-target": "#collapseMutations", "aria-expanded": "false", "aria-controls": "collapseMutations" }, "Mutations")),
                                    React.createElement("div", { id: "collapseMutations", className: "accordion-collapse collapse", "aria-labelledby": "headingMutations", "data-bs-parent": "#mistakesTablesAccordion" },
                                        React.createElement("div", { className: "accordion-body p-0" },
                                            React.createElement("p", null, "Well... something went a little awry, but it could be worse! Roll away! If your base race already has the feature that the mutation describes, tough luck, roll again!"),
                                            React.createElement("table", { className: "table table-dark table-striped" },
                                                React.createElement("tbody", null,
                                                    React.createElement("tr", null,
                                                        React.createElement("th", null, "1d100"),
                                                        React.createElement("th", null, "Mutation")),
                                                    React.createElement("tr", null,
                                                        React.createElement("td", null, "1-2"),
                                                        React.createElement("td", null, "You have twice the normal amount of eyes as your race")),
                                                    React.createElement("tr", null,
                                                        React.createElement("td", null, "3-4"),
                                                        React.createElement("td", null, "You have twice the normal amount of arms as your race")),
                                                    React.createElement("tr", null,
                                                        React.createElement("td", null, "5-6"),
                                                        React.createElement("td", null, "You grow wings and a flying speed equal to your land speed")),
                                                    React.createElement("tr", null,
                                                        React.createElement("td", null, "7-8"),
                                                        React.createElement("td", null, "You develop fiendish traits including horns, glowing eyes, and sharp teeth")),
                                                    React.createElement("tr", null,
                                                        React.createElement("td", null, "9-10"),
                                                        React.createElement("td", null, "You are half the size your race normally is and your Strength score decreases by 2")),
                                                    React.createElement("tr", null,
                                                        React.createElement("td", null, "11-12"),
                                                        React.createElement("td", null, "You are twice the size that your race normally is and your Strength score increases by 2")),
                                                    React.createElement("tr", null,
                                                        React.createElement("td", null, "13-14"),
                                                        React.createElement("td", null, "You are covered in horrible scars or deformities and your Charisma score is reduced by 1")),
                                                    React.createElement("tr", null,
                                                        React.createElement("td", null, "15-16"),
                                                        React.createElement("td", null, "Chimera! Roll on the Base race table again. You are now a mixture of those two races. The DM decides how these mix")),
                                                    React.createElement("tr", null,
                                                        React.createElement("td", null, "17-18"),
                                                        React.createElement("td", null, "You are blind, but have blindsight up to a 30 ft radius")),
                                                    React.createElement("tr", null,
                                                        React.createElement("td", null, "19-20"),
                                                        React.createElement("td", null, "You are deaf, but have extraordinary eyesight and gain advantage on perception and investigation checks that rely on sight.")),
                                                    React.createElement("tr", null,
                                                        React.createElement("td", null, "21-22"),
                                                        React.createElement("td", null, "Your Strength score decreases by 4 but your Intelligence score increases by 4")),
                                                    React.createElement("tr", null,
                                                        React.createElement("td", null, "23-24"),
                                                        React.createElement("td", null, "You resemble your base race, but are made completely out of plant matter and are vulnerable to fire damage but you do not need to eat")),
                                                    React.createElement("tr", null,
                                                        React.createElement("td", null, "25-26"),
                                                        React.createElement("td", null, "You are an amphibious version of your race, can breathe underwater, and gain a swimming speed equal to your land speed")),
                                                    React.createElement("tr", null,
                                                        React.createElement("td", null, "27-28"),
                                                        React.createElement("td", null, "You age at half the speed of your base race")),
                                                    React.createElement("tr", null,
                                                        React.createElement("td", null, "29-30"),
                                                        React.createElement("td", null, "You age at twice the speed of your base race")),
                                                    React.createElement("tr", null,
                                                        React.createElement("td", null, "31-32"),
                                                        React.createElement("td", null, "You are mute, but can communicate telepathically to intelligent creatures within 30 ft of you. You can only do this to one creature at a time, but they need not share a language with you to understand you")),
                                                    React.createElement("tr", null,
                                                        React.createElement("td", null, "33-34"),
                                                        React.createElement("td", null, "Bad luck! You have a degenerative disease that will kill you unless it is cured with a greater restoration or wish spell! Your Constitution score is 7 and reduces by 1 every 24 hours until you die! How fun!")),
                                                    React.createElement("tr", null,
                                                        React.createElement("td", null, "35-36"),
                                                        React.createElement("td", null, "You're a natural-born lycanthrope... sort of. Roll on the lycanthropy subrace chart")),
                                                    React.createElement("tr", null,
                                                        React.createElement("td", null, "37-38"),
                                                        React.createElement("td", null, "Your tongue is like a frog's and is as long as you are tall")),
                                                    React.createElement("tr", null,
                                                        React.createElement("td", null, "39-40"),
                                                        React.createElement("td", null, "Your body is translucent")),
                                                    React.createElement("tr", null,
                                                        React.createElement("td", null, "41-42"),
                                                        React.createElement("td", null, "You are an unnaturally beautiful specimen, your Charisma increases by 1")),
                                                    React.createElement("tr", null,
                                                        React.createElement("td", null, "43-44"),
                                                        React.createElement("td", null, "You curse everyone who touches you with mummy rot! Hope you didn't have an SO!")),
                                                    React.createElement("tr", null,
                                                        React.createElement("td", null, "45-46"),
                                                        React.createElement("td", null, "You glow in the dark")),
                                                    React.createElement("tr", null,
                                                        React.createElement("td", null, "47-48"),
                                                        React.createElement("td", null, "Your skin is a strange and unnatural color for your race")),
                                                    React.createElement("tr", null,
                                                        React.createElement("td", null, "49-50"),
                                                        React.createElement("td", null, "You are covered in scales")),
                                                    React.createElement("tr", null,
                                                        React.createElement("td", null, "51-52"),
                                                        React.createElement("td", null, "You are paralyzed from the waist down")),
                                                    React.createElement("tr", null,
                                                        React.createElement("td", null, "53-54"),
                                                        React.createElement("td", null, "You have an exoskeleton which grants you a natural AC of 13")),
                                                    React.createElement("tr", null,
                                                        React.createElement("td", null, "55-56"),
                                                        React.createElement("td", null, "You have an eye in the middle of your forehead and can cast scrying once per long rest without the use of a crystal ball or mirror")),
                                                    React.createElement("tr", null,
                                                        React.createElement("td", null, "57-58"),
                                                        React.createElement("td", null, "You are reincarnated as a skeletal version of your base race")),
                                                    React.createElement("tr", null,
                                                        React.createElement("td", null, "59-60"),
                                                        React.createElement("td", null, "You are reincarnated as a child")),
                                                    React.createElement("tr", null,
                                                        React.createElement("td", null, "61-62"),
                                                        React.createElement("td", null, "You are reincarnated as an elderly person")),
                                                    React.createElement("tr", null,
                                                        React.createElement("td", null, "63-64"),
                                                        React.createElement("td", null, "You have a tail")),
                                                    React.createElement("tr", null,
                                                        React.createElement("td", null, "65-66"),
                                                        React.createElement("td", null, "Your arms are dexterous prehensile tentacles. Your reach increases by 5 ft")),
                                                    React.createElement("tr", null,
                                                        React.createElement("td", null, "67-68"),
                                                        React.createElement("td", null, "Your body is made out of crystal")),
                                                    React.createElement("tr", null,
                                                        React.createElement("td", null, "69-70"),
                                                        React.createElement("td", null, "Your fingers end in long, sharp claws which do 1d6 slashing damage")),
                                                    React.createElement("tr", null,
                                                        React.createElement("td", null, "71-72"),
                                                        React.createElement("td", null, "You are an albino")),
                                                    React.createElement("tr", null,
                                                        React.createElement("td", null, "73-74"),
                                                        React.createElement("td", null, "Shifter! Roll again on the Base race table. You can now shift between your base races whenever you complete a long rest")),
                                                    React.createElement("tr", null,
                                                        React.createElement("td", null, "75-76"),
                                                        React.createElement("td", null, "You do not need to blink and do not have eyelids")),
                                                    React.createElement("tr", null,
                                                        React.createElement("td", null, "77-78"),
                                                        React.createElement("td", null, "You mimic sounds in the same way as a Kenku, but cannot speak normally")),
                                                    React.createElement("tr", null,
                                                        React.createElement("td", null, "79-80"),
                                                        React.createElement("td", null, "You are repulsed by the taste of vegetable matter and can only eat meat")),
                                                    React.createElement("tr", null,
                                                        React.createElement("td", null, "81-82"),
                                                        React.createElement("td", null, "You are repulsed by the taste of meat and can only eat vegetable matter")),
                                                    React.createElement("tr", null,
                                                        React.createElement("td", null, "83-84"),
                                                        React.createElement("td", null, "You gain empathic abilities that lets you intuitively know the surface emotions of those around you")),
                                                    React.createElement("tr", null,
                                                        React.createElement("td", null, "85-86"),
                                                        React.createElement("td", null, "Your legs are replaced by a mass of tentacles. Your land speed stays the same")),
                                                    React.createElement("tr", null,
                                                        React.createElement("td", null, "87-88"),
                                                        React.createElement("td", null, "Centaur-ish! You have the lower half of a random animal from the animal types table")),
                                                    React.createElement("tr", null,
                                                        React.createElement("td", null, "89-90"),
                                                        React.createElement("td", null, "You have a mass of boney spines growing from your back")),
                                                    React.createElement("tr", null,
                                                        React.createElement("td", null, "91-92"),
                                                        React.createElement("td", null, "Your genitalia is... unusual in some way")),
                                                    React.createElement("tr", null,
                                                        React.createElement("td", null, "93-94"),
                                                        React.createElement("td", null, "You have the antlers of a deer")),
                                                    React.createElement("tr", null,
                                                        React.createElement("td", null, "95-96"),
                                                        React.createElement("td", null, "You have mouths on your palms")),
                                                    React.createElement("tr", null,
                                                        React.createElement("td", null, "97-98"),
                                                        React.createElement("td", null, "You can change your hair color and style at will")),
                                                    React.createElement("tr", null,
                                                        React.createElement("td", null, "99-00"),
                                                        React.createElement("td", null, "Congratulations! You're magic! Roll on the Sorcery and Other Powers table!"))))))),
                                React.createElement("div", { className: "accordion-item" },
                                    React.createElement("h2", { className: "accordion-header", id: "headingWildMagic" },
                                        React.createElement("button", { className: "accordion-button collapsed", type: "button", "data-bs-toggle": "collapse", "data-bs-target": "#collapseWildMagic", "aria-expanded": "false", "aria-controls": "collapseWildMagic" }, "Wild Magic")),
                                    React.createElement("div", { id: "collapseWildMagic", className: "accordion-collapse collapse", "aria-labelledby": "headingWildMagic", "data-bs-parent": "#mistakesTablesAccordion" },
                                        React.createElement("div", { className: "accordion-body p-0" },
                                            React.createElement("p", null, "In the case that The Weave around the area which a reincarnation spell is cast is damaged or unusual in some way, strange magical events may occur. This may be obvious to a caster, or the caster may just have been unlucky and tugged at a few of the wrong threads of magic. Either way, that's what this table is for!"),
                                            React.createElement("table", { className: "table table-dark table-striped" },
                                                React.createElement("tbody", null,
                                                    React.createElement("tr", null,
                                                        React.createElement("th", null, "1d20"),
                                                        React.createElement("th", null, "Result")),
                                                    React.createElement("tr", null,
                                                        React.createElement("td", null, "1-4"),
                                                        React.createElement("td", null, "The target is brought back as a race from the Exotic Races table")),
                                                    React.createElement("tr", null,
                                                        React.createElement("td", null, "5-6"),
                                                        React.createElement("td", null, "The target is brought back in their previous body, but immediately disintegrates into magically charged dust")),
                                                    React.createElement("tr", null,
                                                        React.createElement("td", null, "7-8"),
                                                        React.createElement("td", null, "Someone who is not the target is brought back from the dead. This person is determined by the DM")),
                                                    React.createElement("tr", null,
                                                        React.createElement("td", null, "9-10"),
                                                        React.createElement("td", null, "The target is successfully reincarnated, but comes back somewhere else within 10 miles")),
                                                    React.createElement("tr", null,
                                                        React.createElement("td", null, "11-12"),
                                                        React.createElement("td", null, "A new body is created by the reincarnate spell, and the proper soul is summoned, but the caster ends up in the new body and the target ends up in the caster's body")),
                                                    React.createElement("tr", null,
                                                        React.createElement("td", null, "13-14"),
                                                        React.createElement("td", null, "The target's new body radiates with magical energy, and constantly illuminates the area within 10 ft of them with bright, arcane light.")),
                                                    React.createElement("tr", null,
                                                        React.createElement("td", null, "15-16"),
                                                        React.createElement("td", null, "The target is successfully brought back... only they're stuck in the ethereal plane")),
                                                    React.createElement("tr", null,
                                                        React.createElement("td", null, "17-18"),
                                                        React.createElement("td", null, "A powerful entity takes an interest in the reincarnated target and offers them a warlock pact within 21 days")),
                                                    React.createElement("tr", null,
                                                        React.createElement("td", null, "19-20"),
                                                        React.createElement("td", null, "Sorcery! Roll on the Sorcery and Other Powers table!"))))))),
                                React.createElement("div", { className: "accordion-item" },
                                    React.createElement("h2", { className: "accordion-header", id: "headingWhoops" },
                                        React.createElement("button", { className: "accordion-button collapsed", type: "button", "data-bs-toggle": "collapse", "data-bs-target": "#collapseWhoops", "aria-expanded": "false", "aria-controls": "collapseWhoops" }, "Whoops!")),
                                    React.createElement("div", { id: "collapseWhoops", className: "accordion-collapse collapse", "aria-labelledby": "headingWhoops", "data-bs-parent": "#mistakesTablesAccordion" },
                                        React.createElement("div", { className: "accordion-body p-0" },
                                            React.createElement("p", null, "Well son, you done fucked up. Something really bad happened. Your spell was sabotaged, those expensive components you bought were actually just made of paper mache, you mumbled the last word of the incantation and now all you can say is \"Whoops!\""),
                                            React.createElement("table", { className: "table table-dark table-striped" },
                                                React.createElement("tbody", null,
                                                    React.createElement("tr", null,
                                                        React.createElement("th", null, "1d20"),
                                                        React.createElement("th", null, "Mishap")),
                                                    React.createElement("tr", null,
                                                        React.createElement("td", null, "1-10"),
                                                        React.createElement("td", null, "The target is brought back as a race from the Exotic Races table")),
                                                    React.createElement("tr", null,
                                                        React.createElement("td", null, "11-13"),
                                                        React.createElement("td", null, "The target is brought back as a race from the Exotic Races table with one mutation from the Mutations table")),
                                                    React.createElement("tr", null,
                                                        React.createElement("td", null, "14"),
                                                        React.createElement("td", null, "The target is brought back as a zombie of the base race they rolled and retains their personality, mental ability scores, class levels, etc.")),
                                                    React.createElement("tr", null,
                                                        React.createElement("td", null, "15"),
                                                        React.createElement("td", null, "The target is brought back as a skeleton of the base race they rolled and retains their personality, mental ability scores, class levels, etc.")),
                                                    React.createElement("tr", null,
                                                        React.createElement("td", null, "16"),
                                                        React.createElement("td", null, "The target is brought back as a vampiric version of their old self. The DM chooses whether or not they are in control of this vampire, if the player retains their alignment and personality, etc.")),
                                                    React.createElement("tr", null,
                                                        React.createElement("td", null, "17"),
                                                        React.createElement("td", null, "The target is brought back under the effects of the feeblemind spell")),
                                                    React.createElement("tr", null,
                                                        React.createElement("td", null, "18"),
                                                        React.createElement("td", null, "The target is brought back as a familiar to the caster as described in the find familiar spell. They retain their personality, mental ability scores, and knowledge but cannot use their class features")),
                                                    React.createElement("tr", null,
                                                        React.createElement("td", null, "19"),
                                                        React.createElement("td", null, "The target's soul is brought back and instead of going into the new body created by reincarnate, goes into the nearest full suit of plate armor and becomes animated armor. They retain their personality, mental ability scores, class levels, etc.")),
                                                    React.createElement("tr", null,
                                                        React.createElement("td", null, "20"),
                                                        React.createElement("td", null, "The target's soul is brought back and instead of going into the new body created by reincarnate, goes into the nearest tree, shrub, etc. and becomes an awakened plant. They retain their personality, mental ability scores, class levels, etc."))))))),
                                React.createElement("div", { className: "accordion-item" },
                                    React.createElement("h2", { className: "accordion-header", id: "headingExoticRaces" },
                                        React.createElement("button", { className: "accordion-button collapsed", type: "button", "data-bs-toggle": "collapse", "data-bs-target": "#collapseExoticRaces", "aria-expanded": "false", "aria-controls": "collapseExoticRaces" }, "Exotic Races")),
                                    React.createElement("div", { id: "collapseExoticRaces", className: "accordion-collapse collapse", "aria-labelledby": "headingExoticRaces", "data-bs-parent": "#otherTablesAccordion" },
                                        React.createElement("div", { className: "accordion-body p-0" },
                                            React.createElement("p", null, "Well, you ended up here one way or another. Someone's life is about to seriously change. Are you ready for that? No matter what is rolled the person being reincarnated still remembers their previous life as they would normally, retains their mental ability scores, their class levels, their alignment, and their personality."),
                                            React.createElement("table", { className: "table table-dark table-striped" },
                                                React.createElement("tbody", null,
                                                    React.createElement("tr", null,
                                                        React.createElement("th", null, "1d100"),
                                                        React.createElement("th", null, "Race")),
                                                    React.createElement("tr", null,
                                                        React.createElement("td", null, "1"),
                                                        React.createElement("td", null, "Blight*")),
                                                    React.createElement("tr", null,
                                                        React.createElement("td", null, "2"),
                                                        React.createElement("td", null, "Dryad")),
                                                    React.createElement("tr", null,
                                                        React.createElement("td", null, "3"),
                                                        React.createElement("td", null, "Nymph")),
                                                    React.createElement("tr", null,
                                                        React.createElement("td", null, "4"),
                                                        React.createElement("td", null, "Satyr")),
                                                    React.createElement("tr", null,
                                                        React.createElement("td", null, "5"),
                                                        React.createElement("td", null, "Selkie")),
                                                    React.createElement("tr", null,
                                                        React.createElement("td", null, "6"),
                                                        React.createElement("td", null, "Troglodyte")),
                                                    React.createElement("tr", null,
                                                        React.createElement("td", null, "7"),
                                                        React.createElement("td", null, "Doppelganger")),
                                                    React.createElement("tr", null,
                                                        React.createElement("td", null, "8"),
                                                        React.createElement("td", null, "Myconid")),
                                                    React.createElement("tr", null,
                                                        React.createElement("td", null, "9"),
                                                        React.createElement("td", null, "Cambion")),
                                                    React.createElement("tr", null,
                                                        React.createElement("td", null, "10"),
                                                        React.createElement("td", null, "Half-Dragon*")),
                                                    React.createElement("tr", null,
                                                        React.createElement("td", null, "11"),
                                                        React.createElement("td", null, "Rakshasa")),
                                                    React.createElement("tr", null,
                                                        React.createElement("td", null, "12"),
                                                        React.createElement("td", null, "Half-Demon*")),
                                                    React.createElement("tr", null,
                                                        React.createElement("td", null, "13"),
                                                        React.createElement("td", null, "Half- Devil*")),
                                                    React.createElement("tr", null,
                                                        React.createElement("td", null, "14"),
                                                        React.createElement("td", null, "Spriggan")),
                                                    React.createElement("tr", null,
                                                        React.createElement("td", null, "15"),
                                                        React.createElement("td", null, "Awakened Golem*")),
                                                    React.createElement("tr", null,
                                                        React.createElement("td", null, "16"),
                                                        React.createElement("td", null, "Shardmind")),
                                                    React.createElement("tr", null,
                                                        React.createElement("td", null, "17"),
                                                        React.createElement("td", null, "Oni")),
                                                    React.createElement("tr", null,
                                                        React.createElement("td", null, "18"),
                                                        React.createElement("td", null, "Yeti")),
                                                    React.createElement("tr", null,
                                                        React.createElement("td", null, "19"),
                                                        React.createElement("td", null, "Half-Dryad")),
                                                    React.createElement("tr", null,
                                                        React.createElement("td", null, "20"),
                                                        React.createElement("td", null, "Pixie")),
                                                    React.createElement("tr", null,
                                                        React.createElement("td", null, "21"),
                                                        React.createElement("td", null, "Dragon Wyrmling*")),
                                                    React.createElement("tr", null,
                                                        React.createElement("td", null, "22"),
                                                        React.createElement("td", null, "Illithid")),
                                                    React.createElement("tr", null,
                                                        React.createElement("td", null, "23"),
                                                        React.createElement("td", null, "Demon*")),
                                                    React.createElement("tr", null,
                                                        React.createElement("td", null, "24"),
                                                        React.createElement("td", null, "Devil*")),
                                                    React.createElement("tr", null,
                                                        React.createElement("td", null, "25"),
                                                        React.createElement("td", null, "Hag*")),
                                                    React.createElement("tr", null,
                                                        React.createElement("td", null, "26"),
                                                        React.createElement("td", null, "Elemental*")),
                                                    React.createElement("tr", null,
                                                        React.createElement("td", null, "27"),
                                                        React.createElement("td", null, "Drider")),
                                                    React.createElement("tr", null,
                                                        React.createElement("td", null, "28"),
                                                        React.createElement("td", null, "Darkling")),
                                                    React.createElement("tr", null,
                                                        React.createElement("td", null, "29"),
                                                        React.createElement("td", null, "Quickling")),
                                                    React.createElement("tr", null,
                                                        React.createElement("td", null, "30"),
                                                        React.createElement("td", null, "Ghoul")),
                                                    React.createElement("tr", null,
                                                        React.createElement("td", null, "31"),
                                                        React.createElement("td", null, "Medusa")),
                                                    React.createElement("tr", null,
                                                        React.createElement("td", null, "32"),
                                                        React.createElement("td", null, "Mimic")),
                                                    React.createElement("tr", null,
                                                        React.createElement("td", null, "33"),
                                                        React.createElement("td", null, "Gargoyle")),
                                                    React.createElement("tr", null,
                                                        React.createElement("td", null, "34"),
                                                        React.createElement("td", null, "Giant*")),
                                                    React.createElement("tr", null,
                                                        React.createElement("td", null, "35"),
                                                        React.createElement("td", null, "Slaad*")),
                                                    React.createElement("tr", null,
                                                        React.createElement("td", null, "36"),
                                                        React.createElement("td", null, "Boggle")),
                                                    React.createElement("tr", null,
                                                        React.createElement("td", null, "37"),
                                                        React.createElement("td", null, "Firenewt")),
                                                    React.createElement("tr", null,
                                                        React.createElement("td", null, "38"),
                                                        React.createElement("td", null, "Deep Scion")),
                                                    React.createElement("tr", null,
                                                        React.createElement("td", null, "39"),
                                                        React.createElement("td", null, "Flumph")),
                                                    React.createElement("tr", null,
                                                        React.createElement("td", null, "40"),
                                                        React.createElement("td", null, "Galeb Duhr")),
                                                    React.createElement("tr", null,
                                                        React.createElement("td", null, "41"),
                                                        React.createElement("td", null, "Ooze*")),
                                                    React.createElement("tr", null,
                                                        React.createElement("td", null, "42"),
                                                        React.createElement("td", null, "Gnoll")),
                                                    React.createElement("tr", null,
                                                        React.createElement("td", null, "43"),
                                                        React.createElement("td", null, "Grung*")),
                                                    React.createElement("tr", null,
                                                        React.createElement("td", null, "44"),
                                                        React.createElement("td", null, "Harpy")),
                                                    React.createElement("tr", null,
                                                        React.createElement("td", null, "45"),
                                                        React.createElement("td", null, "Redcap")),
                                                    React.createElement("tr", null,
                                                        React.createElement("td", null, "46"),
                                                        React.createElement("td", null, "Siren")),
                                                    React.createElement("tr", null,
                                                        React.createElement("td", null, "47"),
                                                        React.createElement("td", null, "Sprite")),
                                                    React.createElement("tr", null,
                                                        React.createElement("td", null, "48"),
                                                        React.createElement("td", null, "Lamia")),
                                                    React.createElement("tr", null,
                                                        React.createElement("td", null, "49"),
                                                        React.createElement("td", null, "Merperson")),
                                                    React.createElement("tr", null,
                                                        React.createElement("td", null, "50"),
                                                        React.createElement("td", null, "Tlincalli")),
                                                    React.createElement("tr", null,
                                                        React.createElement("td", null, "51"),
                                                        React.createElement("td", null, "Yuan-Ti (non-pureblood of player's choice)")),
                                                    React.createElement("tr", null,
                                                        React.createElement("td", null, "52"),
                                                        React.createElement("td", null, "Vegepygmy")),
                                                    React.createElement("tr", null,
                                                        React.createElement("td", null, "53"),
                                                        React.createElement("td", null, "Wood Woad")),
                                                    React.createElement("tr", null,
                                                        React.createElement("td", null, "54"),
                                                        React.createElement("td", null, "Banshee")),
                                                    React.createElement("tr", null,
                                                        React.createElement("td", null, "55"),
                                                        React.createElement("td", null, "Beholder")),
                                                    React.createElement("tr", null,
                                                        React.createElement("td", null, "56"),
                                                        React.createElement("td", null, "Half-Giant*")),
                                                    React.createElement("tr", null,
                                                        React.createElement("td", null, "57"),
                                                        React.createElement("td", null, "Brokkos")),
                                                    React.createElement("tr", null,
                                                        React.createElement("td", null, "58"),
                                                        React.createElement("td", null, "Ratfolk")),
                                                    React.createElement("tr", null,
                                                        React.createElement("td", null, "59"),
                                                        React.createElement("td", null, "Giff")),
                                                    React.createElement("tr", null,
                                                        React.createElement("td", null, "60"),
                                                        React.createElement("td", null, "Loxodon")),
                                                    React.createElement("tr", null,
                                                        React.createElement("td", null, "61"),
                                                        React.createElement("td", null, "Wilkoss")),
                                                    React.createElement("tr", null,
                                                        React.createElement("td", null, "62"),
                                                        React.createElement("td", null, "Bloodfin")),
                                                    React.createElement("tr", null,
                                                        React.createElement("td", null, "63"),
                                                        React.createElement("td", null, "Icenewt")),
                                                    React.createElement("tr", null,
                                                        React.createElement("td", null, "64"),
                                                        React.createElement("td", null, "Bearfolk")),
                                                    React.createElement("tr", null,
                                                        React.createElement("td", null, "65"),
                                                        React.createElement("td", null, "Simian")),
                                                    React.createElement("tr", null,
                                                        React.createElement("td", null, "66"),
                                                        React.createElement("td", null, "Vedalken")),
                                                    React.createElement("tr", null,
                                                        React.createElement("td", null, "67"),
                                                        React.createElement("td", null, "Mind-Flayer")),
                                                    React.createElement("tr", null,
                                                        React.createElement("td", null, "68"),
                                                        React.createElement("td", null, "Thri-Keen")),
                                                    React.createElement("tr", null,
                                                        React.createElement("td", null, "69"),
                                                        React.createElement("td", null, "Bullywug")),
                                                    React.createElement("tr", null,
                                                        React.createElement("td", null, "70"),
                                                        React.createElement("td", null, "Nsoki")),
                                                    React.createElement("tr", null,
                                                        React.createElement("td", null, "71"),
                                                        React.createElement("td", null, "Sahuagin")),
                                                    React.createElement("tr", null,
                                                        React.createElement("td", null, "72"),
                                                        React.createElement("td", null, "Merfolk")),
                                                    React.createElement("tr", null,
                                                        React.createElement("td", null, "73"),
                                                        React.createElement("td", null, "Kuo-toa")),
                                                    React.createElement("tr", null,
                                                        React.createElement("td", null, "74"),
                                                        React.createElement("td", null, "Nereid")),
                                                    React.createElement("tr", null,
                                                        React.createElement("td", null, "75"),
                                                        React.createElement("td", null, "Khenra")),
                                                    React.createElement("tr", null,
                                                        React.createElement("td", null, "76"),
                                                        React.createElement("td", null, "Naga")),
                                                    React.createElement("tr", null,
                                                        React.createElement("td", null, "77"),
                                                        React.createElement("td", null, "Aven")),
                                                    React.createElement("tr", null,
                                                        React.createElement("td", null, "78"),
                                                        React.createElement("td", null, "Kor")),
                                                    React.createElement("tr", null,
                                                        React.createElement("td", null, "79"),
                                                        React.createElement("td", null, "Aetherborn")),
                                                    React.createElement("tr", null,
                                                        React.createElement("td", null, "80"),
                                                        React.createElement("td", null, "Vampire")),
                                                    React.createElement("tr", null,
                                                        React.createElement("td", null, "81-99"),
                                                        React.createElement("td", null, "Reroll")),
                                                    React.createElement("tr", null,
                                                        React.createElement("td", null, "100"),
                                                        React.createElement("td", null, "DM chooses"))))))),
                                React.createElement("div", { className: "accordion-item" },
                                    React.createElement("h2", { className: "accordion-header", id: "headingSorceryAndOtherPowers" },
                                        React.createElement("button", { className: "accordion-button collapsed", type: "button", "data-bs-toggle": "collapse", "data-bs-target": "#collapseSorceryAndOtherPowers", "aria-expanded": "false", "aria-controls": "collapseSorceryAndOtherPowers" }, "Sorcery and Other Powers")),
                                    React.createElement("div", { id: "collapseSorceryAndOtherPowers", className: "accordion-collapse collapse", "aria-labelledby": "headingSorceryAndOtherPowers", "data-bs-parent": "#otherTablesAccordion" },
                                        React.createElement("div", { className: "accordion-body p-0" },
                                            React.createElement("table", { className: "table table-dark table-striped" },
                                                React.createElement("tbody", null,
                                                    React.createElement("tr", null,
                                                        React.createElement("th", null, "1d20"),
                                                        React.createElement("th", null, "Powers")),
                                                    React.createElement("tr", null,
                                                        React.createElement("td", null, "1d20"),
                                                        React.createElement("td", null, "Powers")),
                                                    React.createElement("tr", null,
                                                        React.createElement("td", null, "1-2"),
                                                        React.createElement("td", null, "Draconic Sorcery*")),
                                                    React.createElement("tr", null,
                                                        React.createElement("td", null, "3-4"),
                                                        React.createElement("td", null, "Wild Sorcery")),
                                                    React.createElement("tr", null,
                                                        React.createElement("td", null, "5-6"),
                                                        React.createElement("td", null, "Divine Soul")),
                                                    React.createElement("tr", null,
                                                        React.createElement("td", null, "7-8"),
                                                        React.createElement("td", null, "Storm Sorcery")),
                                                    React.createElement("tr", null,
                                                        React.createElement("td", null, "9-10"),
                                                        React.createElement("td", null, "Phoenix Sorcery")),
                                                    React.createElement("tr", null,
                                                        React.createElement("td", null, "11-12"),
                                                        React.createElement("td", null, "Stone Sorcery")),
                                                    React.createElement("tr", null,
                                                        React.createElement("td", null, "13-14"),
                                                        React.createElement("td", null, "Sea Sorcery")),
                                                    React.createElement("tr", null,
                                                        React.createElement("td", null, "15-16"),
                                                        React.createElement("td", null, "Shadow Magic")),
                                                    React.createElement("tr", null,
                                                        React.createElement("td", null, "17-18"),
                                                        React.createElement("td", null, "Psionic Powers")),
                                                    React.createElement("tr", null,
                                                        React.createElement("td", null, "19-20"),
                                                        React.createElement("td", null, "Player Choice of Power")))),
                                            "*roll on the dragon types table",
                                            React.createElement("div", { id: "PowerElaboration", className: "aside" },
                                                React.createElement("h4", null, "Power Elaboration"),
                                                React.createElement("p", null, "For the most part, the powers in the previous table simply correspond to sorcerer classes, but if the player rolls psionic powers there are a few options. They could gain access to mystic levels, or could gain the ability to speak telepathically, or gain a use of rary's telepathic bond twice per long rest, or the ability to lift objects telekinetically, using their Intelligence to calculate the amount they can lift instead of Strength. It's really up to the player and their DM to collaborate on."))))))))),
                React.createElement("div", { className: "accordion-item" },
                    React.createElement("h2", { className: "accordion-header", id: "subracesHeading" },
                        React.createElement("button", { className: "accordion-button collapsed", type: "button", "data-bs-toggle": "collapse", "data-bs-target": "#subracesCollapse", "aria-expanded": "false", "aria-controls": "subracesCollapse" },
                            React.createElement("h2", null, "Subraces"))),
                    React.createElement("div", { id: "subracesCollapse", className: "accordion-collapse collapse", "aria-labelledby": "subracesHeading", "data-bs-parent": "#outerTableAccordion" },
                        React.createElement("div", { className: "accordion-body p-0" },
                            React.createElement("p", null, "The following section contains tables for randomly generating various subraces such as dragon type, tiefling ancestry, goblinoid kind, elf race, demon or devil type, etc."),
                            React.createElement("div", { className: "accordion accordion-flush", id: "subracesAccordion" },
                                React.createElement("div", { className: "accordion-item" },
                                    React.createElement("h2", { className: "accordion-header", id: "headingStandardSubraces" },
                                        React.createElement("button", { className: "accordion-button collapsed", type: "button", "data-bs-toggle": "collapse", "data-bs-target": "#collapseStandardSubraces", "aria-expanded": "false", "aria-controls": "collapseStandardSubraces" }, "Standard Subraces")),
                                    React.createElement("div", { id: "collapseStandardSubraces", className: "accordion-collapse collapse", "aria-labelledby": "headingStandardSubraces", "data-bs-parent": "#subracesAccordion" },
                                        React.createElement("div", { className: "accordion-body p-0" },
                                            React.createElement("div", { className: "accordion accordion-flush", id: "standardSubracesAccordion" }, this.props.tableData.subraces.standard.map((slimData, index) => React.createElement(ReincarnationSlimTableAccordionItem, { parentID: "standardSubracesAccordion", slimData: slimData, key: index })))))),
                                React.createElement("div", { className: "accordion-item" },
                                    React.createElement("h2", { className: "accordion-header", id: "headingExoticSubraces" },
                                        React.createElement("button", { className: "accordion-button collapsed", type: "button", "data-bs-toggle": "collapse", "data-bs-target": "#collapseExoticSubraces", "aria-expanded": "false", "aria-controls": "collapseExoticSubraces" }, "Exotic Subraces")),
                                    React.createElement("div", { id: "collapseExoticSubraces", className: "accordion-collapse collapse", "aria-labelledby": "headingExoticSubraces", "data-bs-parent": "#subracesAccordion" },
                                        React.createElement("div", { className: "accordion-body p-0" },
                                            React.createElement("div", { className: "accordion accordion-flush", id: "exoticSubracesAccordion" }, this.props.tableData.subraces.exotic.map((slimData, index) => React.createElement(ReincarnationSlimTableAccordionItem, { parentID: "exoticSubracesAccordion", slimData: slimData, key: index })))))))))),
                React.createElement("div", { className: "accordion-item" },
                    React.createElement("h2", { className: "accordion-header", id: "magicalDistortionsHeading" },
                        React.createElement("button", { className: "accordion-button collapsed", type: "button", "data-bs-toggle": "collapse", "data-bs-target": "#magicalDistortionsCollapse", "aria-expanded": "false", "aria-controls": "magicalDistortionsCollapse" },
                            React.createElement("h2", null, " Magical Distortions "))),
                    React.createElement("div", { id: "magicalDistortionsCollapse", className: "accordion-collapse collapse", "aria-labelledby": "magicalDistortionsHeading", "data-bs-parent": "#outerTableAccordion" },
                        React.createElement("div", { className: "accordion-body p-0" },
                            React.createElement("p", { className: "px-3" }, "This section is meant to be used when a character casts reincarnate in an unusual place, be it a plane of existence which is not the material plane, or in the heart of a vampire's lair. Find the table in this section that best fits the magics affecting the spell and roll on it, applying the results as needed. If the description on the table matches a trait your race already has (for example, if you've already rolled an Elf and then roll on the Fey table to add the fey ancestry and trance traits) roll again."),
                            React.createElement("p", { className: "px-3" }, "No matter what is rolled the person being reincarnated still remembers their previous life as they would normally, retains their mental ability scores, their class levels, their alignment, and their personality."),
                            React.createElement("div", { className: "accordion accordion-flush", id: "magicalDistortionsAccordion" },
                                React.createElement(ReincarnationAccordionItem, { parentID: "magicalDistortionsAccordion", title: "Celestial", rows: this.props.tableData.magicalDistortions.celestial }),
                                React.createElement(ReincarnationAccordionItem, { parentID: "magicalDistortionsAccordion", title: "Fey", rows: this.props.tableData.magicalDistortions.fey }),
                                React.createElement(ReincarnationAccordionItem, { parentID: "magicalDistortionsAccordion", title: "Fiendish", rows: this.props.tableData.magicalDistortions.fiend }),
                                React.createElement(ReincarnationAccordionItem, { parentID: "magicalDistortionsAccordion", title: "Necrotic", rows: this.props.tableData.magicalDistortions.necrotic }))))),
                React.createElement("div", { className: "accordion-item" },
                    React.createElement("h2", { className: "accordion-header", id: "elementalDistortionsHeading" },
                        React.createElement("button", { className: "accordion-button collapsed", type: "button", "data-bs-toggle": "collapse", "data-bs-target": "#elementalDistortionsCollapse", "aria-expanded": "false", "aria-controls": "elementalDistortionsCollapse" },
                            React.createElement("h2", null, " Elemental Distortions "))),
                    React.createElement("div", { id: "elementalDistortionsCollapse", className: "accordion-collapse collapse", "aria-labelledby": "elementalDistortionsHeading", "data-bs-parent": "#outerTableAccordion" },
                        React.createElement("div", { className: "accordion-body p-0" },
                            React.createElement("div", { className: "accordion accordion-flush", id: "elementalDistortionsHeading" }, this.props.tableData.distortions.elemental.map((slimData, index) => React.createElement(ReincarnationSlimTableAccordionItem, { parentID: "elementalDistortionsHeading", slimData: slimData, key: index })))))),
                React.createElement("div", { className: "accordion-item" },
                    React.createElement("h2", { className: "accordion-header", id: "otherTablesHeading" },
                        React.createElement("button", { className: "accordion-button collapsed", type: "button", "data-bs-toggle": "collapse", "data-bs-target": "#otherTablesCollapse", "aria-expanded": "false", "aria-controls": "otherTablesCollapse" },
                            React.createElement("h2", null, " Other Tables "))),
                    React.createElement("div", { id: "otherTablesCollapse", className: "accordion-collapse collapse", "aria-labelledby": "otherTablesHeading", "data-bs-parent": "#outerTableAccordion" },
                        React.createElement("div", { className: "accordion-body p-0" },
                            React.createElement("div", { className: "accordion accordion-flush", id: "otherTablesAccordion" },
                                React.createElement(ReincarnationAccordionItem, { parentID: "otherTablesAccordion", idBase: "Animal", title: "Animal Types", rows: this.props.tableData.otherTables.animals }),
                                React.createElement(ReincarnationAccordionItem, { parentID: "otherTablesAccordion", idBase: "Lycanthropy", title: "Lycanthropy", rows: this.props.tableData.otherTables.lycanthropy }))))))));
    }
}
class ReincarnationSlimTableAccordionItem extends React.Component {
    render() {
        let idBase = this.props.slimData.title.replace(/[\s\(\)\[\]\{\}\,]/g, '');
        return (React.createElement(ReincarnationAccordionItem, { parentID: this.props.parentID, idBase: idBase, title: this.props.slimData.title, preface: this.props.slimData.preface, postface: this.props.slimData.postface, rows: this.props.slimData.rows }));
    }
}
ReincarnationSlimTableAccordionItem.defaultProps = {
    resultColumnLabel: "Result"
};
class ReincarnationAccordionItem extends React.Component {
    render() {
        let collapseId = "collapse" + (this.props.idBase ? this.props.idBase : this.props.title);
        let headerId = "heading" + (this.props.idBase ? this.props.idBase : this.props.title);
        return (React.createElement("div", { className: "accordion-item" },
            React.createElement("h2", { className: "accordion-header", id: headerId },
                React.createElement("button", { className: "accordion-button collapsed", type: "button", "data-bs-toggle": "collapse", "data-bs-target": "#" + collapseId, "aria-expanded": "false", "aria-controls": collapseId }, this.props.title)),
            React.createElement("div", { id: collapseId, className: "accordion-collapse collapse", "aria-labelledby": headerId, "data-bs-parent": "#" + this.props.parentID },
                React.createElement("div", { className: "accordion-body p-0" },
                    this.props.preface.map((paragraph, index) => React.createElement(ParagraphFromRawHTML, { text: paragraph, key: index })),
                    React.createElement(RollableTable, { resultColumnLabel: this.props.resultColumnLabel, rows: this.props.rows }),
                    this.props.postface.map((paragraph, index) => React.createElement(ParagraphFromRawHTML, { text: paragraph, key: index }))))));
    }
}
ReincarnationAccordionItem.defaultProps = {
    postface: [],
    preface: [],
    resultColumnLabel: "Result"
};
const ReincarnationTables = {
    distortions: {
        elemental: [
            {
                title: "Air",
                rows: [
                    {
                        odds: 10,
                        result: "The target is reincarnated as an air genasi.",
                    },
                    {
                        odds: 3,
                        result: "The target is reincarnated as an air elemental.",
                    },
                    {
                        odds: 1,
                        result: "The target is reincarnated as the race they rolled on the base table, but gains resistance to lightning damage.",
                    },
                    {
                        odds: 1,
                        result: "The target is reincarnated as the race they rolled on the base table, but their eyes appear to crackle with electricity.",
                    },
                    {
                        odds: 1,
                        result: "The target is reincarnated as the race they rolled on the base table, but gains a severe fear of being underground, and has disadvantage on all skill checks and saving throws while underground.",
                    },
                    {
                        odds: 1,
                        result: "The target is reincarnated as the race they rolled on the base table, but can cast feather fall at will.",
                    },
                    {
                        odds: 1,
                        result: "The target is reincarnated as the race they rolled on the base table, but gains power over the winds, gifting them with a flying speed equal to their land speed. They also can hover up to a foot in the air and travel this way instead of walking.",
                    },
                    {
                        odds: 1,
                        result: "The target is reincarnated as the race they rolled on the base table, but has feathers instead of hair and weighs half as much as they appear they should.",
                    },
                    {
                        odds: 1,
                        result: "The target is reincarnated as the race they rolled on the base table, but gains a level in storm sorcery.",
                    },
                ]
            },
            {
                title: "Earth",
                rows: [
                    {
                        odds: 10,
                        result: "The target is reincarnated as an earth genasi.",
                    },
                    {
                        odds: 3,
                        result: "The target is reincarnated as an earth elemental.",
                    },
                    {
                        odds: 1,
                        result: "The target is reincarnated as the race they rolled on the base table, but gains resistance to bludgeoning damage.",
                    },
                    {
                        odds: 1,
                        result: "The target is reincarnated as the race they rolled on the base table, but their eyes appear to be made of gemstones.",
                    },
                    {
                        odds: 1,
                        result: "The target is reincarnated as the race they rolled on the base table, but is abnormally dense and heavy, their base land speed is lowered by 5 ft.",
                    },
                    {
                        odds: 1,
                        result: "The target is reincarnated as the race they rolled on the base table, but can cast earth tremor at will as a first level spell.",
                    },
                    {
                        odds: 1,
                        result: "The target is reincarnated as the race they rolled on the base table, but is made of crystal, and has resistance to piercing, slashing, and bludgeoning damage from non-magical weapons.",
                    },
                    {
                        odds: 1,
                        result: "The target is reincarnated as the race they rolled on the base table, but has skin textured like marble or layers of sandstone.",
                    },
                    {
                        odds: 1,
                        result: "The target is reincarnated as the race they rolled on the base table, but gains a level in stone sorcery.",
                    },
                ]
            },
            {
                title: "Fire",
                rows: [
                    {
                        odds: 10,
                        result: "The target is reincarnated as a fire genasi.",
                    },
                    {
                        odds: 3,
                        result: "The target is reincarnated as a fire elemental.",
                    },
                    {
                        odds: 1,
                        result: "The target is reincarnated as the race they rolled on the base table, but gains resistance to fire damage.",
                    },
                    {
                        odds: 1,
                        result: "The target is reincarnated as the race they rolled on the base table, but their eyes glow with the flames of an endless furnace.",
                    },
                    {
                        odds: 1,
                        result: "The target is reincarnated as the race they rolled on the base table, but becomes vulnerable to cold damage.",
                    },
                    {
                        odds: 1,
                        result: "The target is reincarnated as the race they rolled on the base table, but can cast burning hands at will as a first level spell can cast burning hands at will as a first level spell.",
                    },
                    {
                        odds: 1,
                        result: "The target is reincarnated as the race they rolled on the base table, but has hair made of fire and is immune to fire damage.",
                    },
                    {
                        odds: 1,
                        result: "The target is reincarnated as the race they rolled on the base table, but has veins that glow like magma.",
                    },
                    {
                        odds: 1,
                        result: "The target is reincarnated as the race they rolled on the base table, but gains a level in phoenix sorcery.",
                    },
                ]
            },
            {
                title: "Water",
                rows: [
                    {
                        odds: 10,
                        result: "The target is reincarnated as a water genasi.",
                    },
                    {
                        odds: 3,
                        result: "The target is reincarnated as a water elemental.",
                    },
                    {
                        odds: 1,
                        result: "The target is reincarnated as the race they rolled on the base table, but gains resistance to cold damage.",
                    },
                    {
                        odds: 1,
                        result: "The target is reincarnated as the race they rolled on the base table, but their eyes look like deep, endless pools of water.",
                    },
                    {
                        odds: 1,
                        result: "The target is reincarnated as the race they rolled on the base table, but must submerge in water once every three days or gain one level of exhaustion as they dry up.",
                    },
                    {
                        odds: 1,
                        result: "The target is reincarnated as the race they rolled on the base table, but can cast ice knife at will as a first level spell.",
                    },
                    {
                        odds: 1,
                        result: "The target is reincarnated as the race they rolled on the base table, but gains webbed toes and fingers, gaining a swimming speed equal to their land speed.",
                    },
                    {
                        odds: 1,
                        result: "The target is reincarnated as the race they rolled on the base table, but has fish scales and a few vestigal fins.",
                    },
                    {
                        odds: 1,
                        result: "The target is reincarnated as the race they rolled on the base table, but gains a level in sea sorcery.",
                    },
                ]
            },
        ],
        magical: [
            {
                title: "Air",
                rows: [
                    {
                        odds: 2,
                        result: "Twig",
                    },
                ]
            },
        ],
    },
    gender: [
        {
            odds: 50,
            result: "Female",
        },
        {
            odds: 50,
            result: "Male",
        },
    ],
    magicalDistortions: {
        celestial: [
            {
                odds: 10,
                result: "The target is reincarnated as an aasimar*",
            },
            {
                odds: 1,
                result: "The target is reincarnated as the race they rolled on the base table, but they gain a set of angelic wings, granting them a 30 ft flying speed.",
            },
            {
                odds: 1,
                result: "The target is reincarnated as the race they rolled on the base table, but they are exceptionally beautiful and gain 2 charisma.",
            },
            {
                odds: 1,
                result: "The target is reincarnated as the race they rolled on the base table, but they are marked with the symbol of a god, goddess, or powerful angel.",
            },
            {
                odds: 1,
                result: "The target is reincarnated as the race they rolled on the base table, but they gain the Scourge Aasimar's Radiant Consumption ability.",
            },
            {
                odds: 1,
                result: "The target is reincarnated as the race they rolled on the base table, but they gain a selection of celestial traits typical to aasimar, such as clear skin, white hair, glowing eyes, feathers instead of hair, or glowing patterns across their skin.",
            },
            {
                odds: 1,
                result: "The target is reincarnated as the race they rolled on the base table, but they gain the paladin's Divine Sense power.",
            },
            {
                odds: 1,
                result: "The target is reincarnated as the race they rolled on the base table, but they learn the Celestial language.",
            },
            {
                odds: 1,
                result: "The target is reincarnated as the race they rolled on the base table, but can cast cure wounds once per short rest without expending a spell slot.",
            },
            {
                odds: 1,
                result: "The target is reincarnated as the race they rolled on the base table, but can cast zone of truth once per short rest without expending a spell slot.",
            },
            {
                odds: 1,
                result: "The target is reincarnated as an angel.",
            },
        ],
        fey: [
            {
                odds: 1,
                result: "The target is reincarnated as a pixie or sprite.",
            },
            {
                odds: 1,
                result: "The target is reincarnated as an awakened plant.",
            },
            {
                odds: 1,
                result: "The target is reincarnated as an Eladrin.",
            },
            {
                odds: 1,
                result: "The target is reincarnated as a Satyr.",
            },
            {
                odds: 1,
                result: "The target is reincarnated as a Spriggan.",
            },
            {
                odds: 1,
                result: "The target is reincarnated as a Doppelganger.",
            },
            {
                odds: 1,
                result: "The target is reincarnated as the race they rolled on the base table, but with a powerful fey taking an interest in them.",
            },
            {
                odds: 1,
                result: "The target is reincarnated as the race they rolled on the base table, but with a set of antlers.",
            },
            {
                odds: 1,
                result: "The target is reincarnated as the race they rolled on the base table, but with a set of butterfly or dragonfly wings, granting them a 30 ft flying speed.",
            },
            {
                odds: 1,
                result: "The target is reincarnated as the race they rolled on the base table, but they gain the fey ancestry and trance traits.",
            },
            {
                odds: 1,
                result: "The target is reincarnated as the race they rolled on the base table, but they learn Sylvan.",
            },
            {
                odds: 1,
                result: "The target is reincarnated as the race they rolled on the base table, but they gain physical traits resembling those of a type of hag, such as green skin, warts, or slimey skin.",
            },
            {
                odds: 1,
                result: "The target is reincarnated as the race they rolled on the base table, but they can speak to animals.",
            },
            {
                odds: 1,
                result: "The target is reincarnated as the race they rolled on the base table, but they can speak to plants.",
            },
            {
                odds: 1,
                result: "The target is reincarnated as the race they rolled on the base table, but with a strange and detrimental fey curse determined by the DM.",
            },
            {
                odds: 1,
                result: "The target is reincarnated as the race they rolled on the base table, but they are made completely out of plant matter and are vulnerable to fire damage and do not need to eat.",
            },
            {
                odds: 1,
                result: "The target is reincarnated as the race they rolled on the base table, but the lower half of their body is that of a deer or stag.",
            },
            {
                odds: 1,
                result: "The target is reincarnated as the race they rolled on the base table, but their eyes are an unusual color and twinkle like stars at twilight.",
            },
            {
                odds: 1,
                result: "The caster grows a set of butterfly or dragonfly wings, but the target is not reincarnated.",
            },
            {
                odds: 1,
                result: "The caster grows a set of antlers, but the target is not reincarnated.",
            },
        ],
        fiend: [
            {
                odds: 10,
                result: "The target is reincarnated as a tiefling*",
            },
            {
                odds: 1,
                result: "The target is reincarnated as a half-devil*",
            },
            {
                odds: 1,
                result: "The target is reincarnated as the race they rolled on the base table, but they gain a set of devilish wings, granting them a 30 ft flying speed.",
            },
            {
                odds: 1,
                result: "The target is reincarnated as the race they rolled on the base table, but they are exceptionally beautiful and gain 2 charisma.",
            },
            {
                odds: 1,
                result: "The target is reincarnated as the race they rolled on the base table, but they are exceptionally hideous and lose 2 charisma (to a minimum of 1).",
            },
            {
                odds: 1,
                result: "The target is reincarnated as the race they rolled on the base table, but they are marked with the symbol of a powerful fiend.",
            },
            {
                odds: 1,
                result: "The target is reincarnated as the race they rolled on the base table, but they gain a selection of fiendish traits typical to tieflings, such as horns, golden or red eyes, scales, cloven feet, six fingers, no cast shadow, no reflection, a tail, a forked tongue or smelling of brimstone.",
            },
            {
                odds: 1,
                result: "The target is reincarnated as the race they rolled on the base table, but they learn the Infernal language.",
            },
            {
                odds: 1,
                result: "The target is reincarnated as the race they rolled on the base table, but they learn the Abyssal language.",
            },
            {
                odds: 1,
                result: "The target is reincarnated as the race they rolled on the base table, but gains resistance to fire damage and is vulnerable to radiant damage.",
            },
            {
                odds: 1,
                result: "The target is reincarnated as a demon or devil* (player choice).",
            },
        ],
        necrotic: [
            {
                odds: 6,
                result: "The target is reincarnated as a skeletal version of what they rolled on the base table.",
            },
            {
                odds: 5,
                result: "The target is reincarnated as a zombie version of what they rolled on the base table.",
            },
            {
                odds: 1,
                result: "The target is reincarnated as a vampiric version of what they rolled on the base table.",
            },
            {
                odds: 1,
                result: "The target is reincarnated as a ghoulish version of what they rolled on the base table.",
            },
            {
                odds: 1,
                result: "Roll on the Exotic Races table, the target is brought back as a skeletal version of that race.",
            },
            {
                odds: 1,
                result: "The target is reincarnated as a wight version of what they rolled on the base table.",
            },
            {
                odds: 1,
                result: "The target is reincarnated as a revenant version of what they rolled on the base table.",
            },
            {
                odds: 1,
                result: "The target is reincarnated as the race they rolled on the base table, but with a powerful undead taking an interest in them.",
            },
            {
                odds: 1,
                result: "The target is reincarnated as the race they rolled on the base table, but with a level in shadow magic sorcery.",
            },
            {
                odds: 1,
                result: "The target is reincarnated as the race they rolled on the base table, but with pure black eyes and grey skin. They have darkvision up to 120 ft.",
            },
            {
                odds: 1,
                result: "The target is reincarnated as the race they rolled on the base table, but is healed by necrotic energy (such as inflict wounds) and harmed by positive energy (such as cure wounds).",
            },
        ],
    },
    otherTables: {
        animals: [
            {
                odds: 1,
                result: "Big Cat",
            },
            {
                odds: 1,
                result: "Bear",
            },
            {
                odds: 1,
                result: "Camel",
            },
            {
                odds: 1,
                result: "Deer/Elk/Stag",
            },
            {
                odds: 1,
                result: "Dog",
            },
            {
                odds: 1,
                result: "Snake",
            },
            {
                odds: 1,
                result: "Lizard",
            },
            {
                odds: 1,
                result: "Crab/Lobster",
            },
            {
                odds: 1,
                result: "Octopus",
            },
            {
                odds: 1,
                result: "Fish",
            },
            {
                odds: 1,
                result: "Frog",
            },
            {
                odds: 1,
                result: "Boar",
            },
            {
                odds: 1,
                result: "Bird",
            },
            {
                odds: 1,
                result: "Goat",
            },
            {
                odds: 1,
                result: "Scorpion/Spider",
            },
            {
                odds: 1,
                result: "Wasp",
            },
            {
                odds: 1,
                result: "Rhino",
            },
            {
                odds: 1,
                result: "Sea Horse",
            },
            {
                odds: 1,
                result: "Wolf",
            },
            {
                odds: 1,
                result: "Horse",
            },
        ],
        lycanthropy: [
            {
                odds: 1,
                result: "Tiger",
            },
            {
                odds: 1,
                result: "Bear",
            },
            {
                odds: 1,
                result: "Wolf",
            },
            {
                odds: 1,
                result: "Boar",
            },
            {
                odds: 1,
                result: "Rat",
            },
            {
                odds: 1,
                result: "Raven",
            },
        ],
    },
    race: [
        {
            odds: 4,
            result: "Aarakocra",
        },
        {
            odds: 4,
            result: "Aasimar*",
        },
        {
            odds: 3,
            result: "Centaur",
        },
        {
            odds: 3,
            result: "Changeling",
        },
        {
            odds: 4,
            result: "Dragonborn*",
        },
        {
            odds: 4,
            result: "Dwarf*",
        },
        {
            odds: 4,
            result: "Elf*",
        },
        {
            odds: 4,
            result: "Firbolg",
        },
        {
            odds: 4,
            result: "Genasi*",
        },
        {
            odds: 2,
            result: "Gith*",
        },
        {
            odds: 4,
            result: "Gnome*",
        },
        {
            odds: 4,
            result: "Goblinoid*",
        },
        {
            odds: 4,
            result: "Goliath",
        },
        {
            odds: 4,
            result: "Halfling*",
        },
        {
            odds: 4,
            result: "Half-Elf*",
        },
        {
            odds: 4,
            result: "Half-Orc",
        },
        {
            odds: 4,
            result: "Human",
        },
        {
            odds: 4,
            result: "Kenku",
        },
        {
            odds: 4,
            result: "Kobold*",
        },
        {
            odds: 4,
            result: "Lizardfolk",
        },
        {
            odds: 2,
            result: "Minotaur",
        },
        {
            odds: 3,
            result: "Orc",
        },
        {
            odds: 4,
            result: "Tabaxi",
        },
        {
            odds: 4,
            result: "Tiefling*",
        },
        {
            odds: 4,
            result: "Tortle",
        },
        {
            odds: 4,
            result: "Triton",
        },
        {
            odds: 3,
            result: "Yuan-Ti Pureblood",
        },
    ],
    subraces: {
        exotic: [
            {
                title: "Blight",
                rows: [
                    {
                        odds: 2,
                        result: "Twig",
                    },
                    {
                        odds: 2,
                        result: "Vine",
                    },
                    {
                        odds: 2,
                        result: "Needle",
                    },
                ]
            },
            {
                title: "Demon Types",
                rows: [
                    {
                        odds: 1,
                        result: "Armanite",
                    },
                    {
                        odds: 1,
                        result: "Babau",
                    },
                    {
                        odds: 1,
                        result: "Barlgura",
                    },
                    {
                        odds: 1,
                        result: "Bulezau",
                    },
                    {
                        odds: 1,
                        result: "Dybbuk",
                    },
                    {
                        odds: 1,
                        result: "Hezrou",
                    },
                    {
                        odds: 1,
                        result: "Marilith",
                    },
                    {
                        odds: 1,
                        result: "Maurezhi",
                    },
                    {
                        odds: 1,
                        result: "Nabassu",
                    },
                    {
                        odds: 1,
                        result: "Shadow Demon",
                    },
                    {
                        odds: 1,
                        result: "Tanarukk",
                    },
                    {
                        odds: 1,
                        result: "Vrock",
                    },
                ]
            },
            {
                title: "Devil Types",
                rows: [
                    {
                        odds: 1,
                        result: "Abishai (roll on kobold subclass table for chromatic type)",
                    },
                    {
                        odds: 1,
                        result: "Barbed Devil",
                    },
                    {
                        odds: 1,
                        result: "Bearded Devil",
                    },
                    {
                        odds: 1,
                        result: "Bone Devil",
                    },
                    {
                        odds: 1,
                        result: "Chain Devil",
                    },
                    {
                        odds: 1,
                        result: "Erinyes",
                    },
                    {
                        odds: 1,
                        result: "Horned Devil",
                    },
                    {
                        odds: 1,
                        result: "Narzugon",
                    },
                    {
                        odds: 1,
                        result: "Orthon",
                    },
                    {
                        odds: 1,
                        result: "Pit Fiend",
                    },
                    {
                        odds: 1,
                        result: "Spined Devil",
                    },
                    {
                        odds: 1,
                        result: "Succubus/Incubus",
                    },
                ]
            },
            {
                title: "Golem",
                rows: [
                    {
                        odds: 1,
                        result: "Bone",
                    },
                    {
                        odds: 1,
                        result: "Clay",
                    },
                    {
                        odds: 1,
                        result: "Flesh",
                    },
                    {
                        odds: 1,
                        result: "Gemstone",
                    },
                    {
                        odds: 1,
                        result: "Glass",
                    },
                    {
                        odds: 1,
                        result: "Metal",
                    },
                    {
                        odds: 1,
                        result: "Stone",
                    },
                    {
                        odds: 1,
                        result: "Wood",
                    },
                ]
            },
            {
                title: "Grung Color",
                rows: [
                    {
                        odds: 1,
                        result: "Blue",
                    },
                    {
                        odds: 1,
                        result: "Gold",
                    },
                    {
                        odds: 1,
                        result: "Green",
                    },
                    {
                        odds: 1,
                        result: "Orange",
                    },
                    {
                        odds: 1,
                        result: "Purple",
                    },
                    {
                        odds: 1,
                        result: "Red",
                    },
                ]
            },
            {
                title: "Hag",
                rows: [
                    {
                        odds: 1,
                        result: "Annis Hag",
                    },
                    {
                        odds: 1,
                        result: "Bheur Hag",
                    },
                    {
                        odds: 1,
                        result: "Green Hag",
                    },
                    {
                        odds: 1,
                        result: "Night Hag",
                    },
                    {
                        odds: 1,
                        result: "Red Hag",
                    },
                    {
                        odds: 1,
                        result: "Sea Hag",
                    },
                ]
            },
            {
                title: "Giant",
                rows: [
                    {
                        odds: 1,
                        result: "Cloud Giant",
                    },
                    {
                        odds: 1,
                        result: "Cyclops",
                    },
                    {
                        odds: 1,
                        result: "Fire Giant",
                    },
                    {
                        odds: 1,
                        result: "Frost Giant",
                    },
                    {
                        odds: 1,
                        result: "Hill Giant",
                    },
                    {
                        odds: 1,
                        result: "Ogre",
                    },
                    {
                        odds: 1,
                        result: "Oni",
                    },
                    {
                        odds: 1,
                        result: "Stone Giant",
                    },
                    {
                        odds: 1,
                        result: "Storm Giant",
                    },
                    {
                        odds: 1,
                        result: "Troll",
                    },
                ]
            },
            {
                title: "Slaad",
                rows: [
                    {
                        odds: 2,
                        result: "Blue Slaad",
                    },
                    {
                        odds: 2,
                        result: "Death Slaad",
                    },
                    {
                        odds: 2,
                        result: "Gray Slaad",
                    },
                    {
                        odds: 2,
                        result: "Green Slaad",
                    },
                    {
                        odds: 2,
                        result: "Red Slaad",
                    },
                ]
            },
            {
                title: "Ooze",
                rows: [
                    {
                        odds: 2,
                        result: "Adult Oblex",
                    },
                    {
                        odds: 2,
                        result: "Black Pudding",
                    },
                    {
                        odds: 2,
                        result: "Gray Ooze",
                    },
                    {
                        odds: 2,
                        result: "Ochre Jelly",
                    },
                    {
                        odds: 2,
                        result: "Slithering Tracker",
                    },
                ]
            },
        ],
        standard: [
            {
                title: "Aasimar",
                rows: [
                    {
                        odds: 2,
                        result: "Fallen",
                    },
                    {
                        odds: 2,
                        result: "Protector",
                    },
                    {
                        odds: 2,
                        result: "Scourge",
                    },
                ]
            },
            {
                title: "Dragon Types",
                rows: [
                    {
                        odds: 1,
                        result: "Black",
                    },
                    {
                        odds: 1,
                        result: "Blue",
                    },
                    {
                        odds: 1,
                        result: "Brass",
                    },
                    {
                        odds: 1,
                        result: "Bronze",
                    },
                    {
                        odds: 1,
                        result: "Copper",
                    },
                    {
                        odds: 1,
                        result: "Gold",
                    },
                    {
                        odds: 1,
                        result: "Green",
                    },
                    {
                        odds: 1,
                        result: "Red",
                    },
                    {
                        odds: 1,
                        result: "Silver",
                    },
                    {
                        odds: 1,
                        result: "White",
                    },
                ]
            },
            {
                title: "Dwarf",
                rows: [
                    {
                        odds: 2,
                        result: "Hill Dwarf",
                    },
                    {
                        odds: 2,
                        result: "Mountain Dwarf",
                    },
                    {
                        odds: 2,
                        result: "Duergar",
                    },
                ]
            },
            {
                title: "Elf, Half-Elf",
                rows: [
                    {
                        odds: 1,
                        result: "High Elf",
                    },
                    {
                        odds: 1,
                        result: "Wood Elf",
                    },
                    {
                        odds: 1,
                        result: "Drow",
                    },
                    {
                        odds: 1,
                        result: "Eladrin",
                    },
                    {
                        odds: 1,
                        result: "Sea Elf",
                    },
                    {
                        odds: 1,
                        result: "Avariel",
                    },
                    {
                        odds: 1,
                        result: "Grugach",
                    },
                    {
                        odds: 1,
                        result: "Shadar-Kai",
                    },
                ]
            },
            {
                title: "Elements (Genasi, Elementals)",
                rows: [
                    {
                        odds: 1,
                        result: "Air",
                    },
                    {
                        odds: 1,
                        result: "Earth",
                    },
                    {
                        odds: 1,
                        result: "Fire",
                    },
                    {
                        odds: 1,
                        result: "Water",
                    },
                ]
            },
            {
                title: "Gith",
                rows: [
                    {
                        odds: 2,
                        result: "Githyanki",
                    },
                    {
                        odds: 2,
                        result: "Githzerai",
                    },
                ]
            },
            {
                title: "Gnome",
                rows: [
                    {
                        odds: 2,
                        result: "Forest Gnome",
                    },
                    {
                        odds: 2,
                        result: "Rock Gnome",
                    },
                    {
                        odds: 2,
                        result: "Deep Gnome (Svirfneblin)",
                    },
                ]
            },
            {
                title: "Goblinoid",
                rows: [
                    {
                        odds: 2,
                        result: "Bugbear",
                    },
                    {
                        odds: 2,
                        result: "Goblin",
                    },
                    {
                        odds: 2,
                        result: "Hobgoblin",
                    },
                ]
            },
            {
                title: "Halfling",
                rows: [
                    {
                        odds: 2,
                        result: "Lightfoot",
                    },
                    {
                        odds: 2,
                        result: "Stout",
                    },
                    {
                        odds: 2,
                        result: "Ghostwise",
                    },
                ]
            },
            {
                title: "Kobold (chromatic dragon colors)",
                rows: [
                    {
                        odds: 2,
                        result: "Black",
                    },
                    {
                        odds: 2,
                        result: "Blue",
                    },
                    {
                        odds: 2,
                        result: "Green",
                    },
                    {
                        odds: 2,
                        result: "Red",
                    },
                    {
                        odds: 2,
                        result: "White",
                    },
                ]
            },
            {
                title: "Tiefling",
                rows: [
                    {
                        odds: 1,
                        result: "Asmodeus",
                    },
                    {
                        odds: 1,
                        result: "Baalzebul",
                    },
                    {
                        odds: 1,
                        result: "Dispater",
                    },
                    {
                        odds: 1,
                        result: "Fierna",
                    },
                    {
                        odds: 1,
                        result: "Glasya",
                    },
                    {
                        odds: 1,
                        result: "Levistus",
                    },
                    {
                        odds: 1,
                        result: "Mammon",
                    },
                    {
                        odds: 1,
                        result: "Abyssal",
                    },
                ]
            },
        ],
    },
    successfulness: [
        {
            odds: 15,
            result: "Success. Take result from Base table.",
        },
        {
            odds: 1,
            result: "Mixed Success. Roll on the Mutation table once and add results to base race.",
        },
        {
            odds: 1,
            result: "Mixed Success. Roll on the Mutation table twice and add results to base race.",
        },
        {
            odds: 1,
            result: "Mixed Success. Roll on the Mutation table thrice and add results to base race.",
        },
        {
            odds: 1,
            result: "Weave Distortion. Roll on the Wild Magic table and add results to base race unless the result asks for you to roll on the Exotic Races table.",
        },
        {
            odds: 1,
            result: "Failure. Roll on the Whoops! table and add results to base race unless the result asks for you to roll on the Exotic Races table.",
        },
    ],
};
ReactDOM.render(React.createElement(ReincarnationViewer, { tableData: ReincarnationTables }), document.getElementById("viewer-panel"));
//# sourceMappingURL=reincarnation.js.map
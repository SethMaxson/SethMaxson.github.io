"use strict";
const AirshipGenerator = {
    generateAirship: function (systems) {
        let nq = new Quest();
        // nq.name = randomize(QuestParts.types);
        nq.name = QuestGenerator.getQuestName();
        nq.active = true;
        nq.handcrafted = false;
        nq.issuer = new NPC();
        QuestGenerator.NpcGenerator.randomizeNPC(nq.issuer);
        if (systems) {
            let system = randomize(systems);
            nq.location = randomize(system.planets);
        }
        nq.registrationRequired = randomize([false, true]);
        nq.rank = randomize(["D", "C", "B", "A", "S"]);
        nq.payment.credits = QuestGenerator.getQuestCredits(nq.rank);
        return nq;
    },
    getAirshipName: function () {
        let questName = "";
        let propStart = QuestGenerator.QuestParts.string;
        do {
            const keys = Object.keys(propStart);
            const index = (keys.length * Math.random() << 0);
            questName += keys[index] + " ";
            propStart = propStart[keys[index]];
        } while (Object.keys(propStart).length > 0);
        return questName;
    }
};
//# sourceMappingURL=airship.js.map
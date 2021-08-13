interface ISessionNotesViewerProps { }
class SessionNotesViewer extends React.Component<ISessionNotesViewerProps> {
	render()
	{
		return (
			<div className="container">
			<ul className="nav nav-tabs sticky-top fixed-top bg-dark" id="myTab" role="tablist">
				<li className="nav-item" role="presentation">
					<button className="nav-link active" id="campaign-1-tab" data-bs-toggle="tab" data-bs-target="#campaign-1" type="button" role="tab" aria-controls="campaign-1" aria-selected="true">Campaign #1</button>
				</li>
				<li className="nav-item" role="presentation">
					<button className="nav-link" id="campaign-1-revised-tab" data-bs-toggle="tab" data-bs-target="#campaign-1-revised" type="button" role="tab" aria-controls="campaign-1-revised" aria-selected="true">Campaign #1 (Revised)</button>
				</li>
				<li className="nav-item" role="presentation">
					<button className="nav-link" id="campaign-2-tab" data-bs-toggle="tab" data-bs-target="#campaign-2" type="button" role="tab" aria-controls="campaign-2" aria-selected="false">Campaign #2</button>
				</li>
			</ul>
			<div className="tab-content container" id="myTabContent">
				<div className="tab-pane row show active" id="campaign-1" role="tabpanel" aria-labelledby="campaign-1-tab">
						<div className="accordion" id="campaign-1-accordion">
						<SessionNotesCategoryHeader text="Geoss Campaign I: The Godfall Fallout" />
						<h4></h4>
						<button className="collapsible">
							<span className="date">12/30/2017</span>
							New King on the Block
						</button>
						<div className="content">
							<ul className="party-list">
								<li>Damien</li>
								<li>Torvald</li>
								<li>Felix Charr</li>
								<li>Ilidan</li>
								<li>Ymir</li>
							</ul>
							<p>
								After defeating Robill Cypress, the heroes Thorin, Victor, Carnage, and Carrigan were pulled through tears in the fabric of reality, just as Smith approached to check in on them. Roughly 2 weeks later, Carnage reappeared at the same location, to find that Smith had established a small camp for himself and several new heroes that had emerged through similar tears: Damien, Torvald, Felix Charr, Ilidan, and Ymir.
							</p>
							<p>
								As a reward for stopping the robot-zombie threat, Smith tidied up Robill's zeppelin, the Flying Death, and presented it to Carnage, the last remaining member of the group that defeated Robill. The experience of drifting through the dimensional rift seemed to change Carnage. He became a bit less violent, and changed his name to Jack. Carnage elected to take the newcomers with him and return to the Bandit Camp, eager to complete the original mission offered to him by the Brothers Lim.
							</p>
							<p>
								Upon arriving, the party split and headed in different directions. Ilidan stayed to guard the zeppelin, Damien headed for the chief's cabin, Ymir began to search for a bounty board, and the others entered the pub.
							</p>
							<p>
								After knocking on the door of the chief's hut, Damien was able to rouse the chief from his slumber to ask him some questions. However, his questions were far too cryptic and vague for the poor fellow to comprehend. Frustrated, Damien attempted to use a Wish spell to write the chief out of existence. He was successful only in making the chief go back to bed.
							</p>
							<p>
								Jack, Felix, and Torvald all simply obtained varying amounts of ale.
							</p>
							<p>
								Ymir was unable to locate a bounty board, but asked a random passerby about the quickest way to make money in the area. The stranger informed her that ever since the tears brought flying ships into the world, sky piracy was the fastest way to fill one's coffers. However, he also offered her 1,000g to kill one of her party members so he could laugh at the look of betrayed shock on their face. Misunderstanding his offer, Ymir decided to pick a fight with and kill a random stranger in the pub, but not before picking her targets pockets. After a long string of poor decisions coupled with poor rolls, the encounter quickly turned NSFW and gathered a large crowd of onlookers.
							</p>
							<p>
								Frustrated with the slow progress of the rest of the party, Ilidan abandoned the ship to check in on their progress. He arrived in the center of town just in time to witness the climax of insanity that had occurred. Shortly afterwards, Jack and Felix fell ill due to the ale. Torvald had not yet consumed any of his ale, so he was unaffected.
							</p>
							<p>
								While the party was distracted, a man snuck aboard their zeppelin and took to the skies. Once again casting a Wish spell, Damien managed to bring the party, the bandit Chief, and another random stranger that Ymir had recently knocked unconscious back aboard their ship.
							</p>
							<p>
								The party returned to the Iron Keep to repair the damage sustained by the zeppelin and sleep for the night. Smith informed them that Cross was a pirate rapidly rising to power through sheer force and ruthlessness. Hearing this, the party decided to convince the bandit chief to encourage his people to join their fight against Cross. The bandit chief agreed, but pointed out that the party would need more than one airship in order to transport any additional troops.
							</p>
							<p>
								Damien wished for a fleet, and was answered by the appearance of 3 one man fighters, and one 6 man vessel. Using these, they foolishly charged Cross's armada. This did not end well.
							</p>
						</div>
						<button className="collapsible">
							<span className="date">01/13/2018</span>
							A Pirate's Life for Me
						</button>
						<div className="content">
							<ul className="party-list">
								<li>Bud</li>
								<li>Namfoodle</li>
								<li>S'kra'p'ap</li>
								<li>Thistlewick</li>
								<li>Yoaral</li>
							</ul>
							<p>
								5 newly minted sky pirates began their training under Captain Smiley:
								1. Namfoodle the Gnome Warlock
								2. S'kra'p'ap the Grung Sorceror
								3. Bud the Aasimer Druid
								4. Yoaral the Lizardfolk Barbarian
								5. Thistlewick the Kenku Rogue

								Unused starting characters:
								1. Jehris (Triton Paladin)
								2. Songmaker (Goliath Bard)
								3. Urreek (Aarakocra Ranger)
								4. Wrecker (Warforged Barbarian)
								5. Qwot (Tortle Monk)
							</p>
							<p>
								Smiley chose a nearby rowboat for their first target. One of the crew members was killed, one captured and fed to the lizardfolk, and the final crew member accepted an offer by Namfoodle to join Smiley's crew. They were carrying a letter from the capital city to the desert realm leadership, informing them that the Brothers Lim are missing, but instructing them to keep it quiet to prevent unrest.
							</p>
							<p>
								Captain Smiley's ship was set upon by a much larger, far better armed vessel and boarded. They identified Smiley as captain, killed him, and left after informing the party that the same fate awaited all pirates. During the chaos, Namfoodle and Thistlewick attempted to board and sabotage the enemy vessel. As the hostiles were climbing back onto their ship, Thistlewick used a rowboat to fly to the enemy captain's rope and cut it, sending him plummeting to his death. However, this was witnessed by no fewer than 38 members of the enemy crew, who promptly dispatched the kenku with a hail of arrows. Namfoodle managed to narrowly escape, having fashioned a sort of glider out of canvas bags.
							</p>
							<p>
								Thistlewick's ghost was magically pulled into the brig, where it was able to choose a victim to possess. Upon entering the body of Qwot the Tortle, he gained the memories and skills of his new host body.
							</p>
							<p>
								The group received a magical phone call from their boss, Cross. Cross told them to elect a new captain from amongst themselves to replace Smiley, after which Namfoodle was chosen.
							</p>
							<p>
								Ready to test their strength, they chose a ship of similar power and approached it. After attempts at deceiving the captain of the opposing ship failed, Yoaral took the wheel and rammed the ship. After a somewhat lengthy battle, the party managed to take their prize. Both ships sustained heavy damage in the battle.
							</p>
							<p>
								With their newly acquired ship in tow, the party set sail for the only apparent floating landmass. They found it to be about a halfmile in diameter, and covered in the ruins of what appeared to be a harbor village. They saw smoke coming from the other side of the island and decided to investigate, leaving Qwot/Thistlewick to guard the ships.
							</p>
							<p>
								The exploration party found the source of the smoke to be a campfire outside one of the huts. This hut appeared to have been partially repaired and contained a bedroll far newer than any of the other furniture. Despite all the signs of recent activity, the party saw no signs of intelligent life.
							</p>
							<p>
								Meanwhile, Qwot caught an intruder on their boats, curiously wandering into the captain's cabin. The intruder introduced himself as Smith, and said that he had been living on the island for a few weeks. The party were the first visitors to the island since he moved in. He agreed to help them repair their ships.
							</p>
						</div>
						<button className="collapsible">
							<span className="date">01/27/2018</span>
							The Brotherhood
						</button>
						<div className="content">
							<ul className="party-list">
								<li>WickerBeak</li>
								<li>Yoaral</li>
							</ul>
							<p>
								The crew were sent on a smuggling mission from Cross to a cold, mountaintop outpost. Being coldblooded, Yoaral was left behind on the island with Smith to avoid freezing. Smith sent Yoaral on an assignment of his own to investigate a shadowy new organization outside the capital city.
							</p>
							<p>
								The organization operated out of a secluded mansion several miles outside of town in a dense forest. Yoaral took the spare airship and hid it in a small clearing a few miles from the mansion. Upon arriving at the mansion, he bumped into two other adventurers interested in learning more about the inner workings of the cult. The smaller of the two would-be infiltrators was a Kenku known as WickerBeak CrowFist, and the bossier of the two referred to himself as Matthias, Dark Lord of All.
							</p>
							<p>
								The party joined the guild, but gained very little immediate information as to its function. In order to obtain the information they needed, it appeared that they would need to meet with the cult leader directly. However, this required reaching a minimum rank within the guild. The party set out to achieve this, gaining several magic items as rewards for reaching certain ranks.
							</p>
							<p>
								After being distracted by the magic items, WickerBeak and Yoaral almost entirely forgot to determine whether or not the guild was safe. They attempted to rank up more rapidly by completing the two highest valued Brotherhood tasks; recruiting a Dryad, and recruiting a speaking carrot. They were able to convince a Dryad to give speech to a carrot, but they were unsuccessful in recruiting the Dryad to the cause (not that they knew what it was anyway). The carrot incorrectly identified WickerBeak as his father. WickerBeak then named the carrot Pete, shortly before handing him over to the Brotherhood.
							</p>
							<p>
								The duo managed to accumulate enough points to allow for themselves and Matthias to meet with Gustav. After an unproductive meeting with Gustav, the duo decided to continue to work for the cult instead of decide whether or not they were dangerous. After dilly-dallying about for another day, they unwittingly stood idle while Matthias took over the cult, gaining a both a new base of operations and a small army of additional henchmen.
							</p>
							<p>
								After consulting Smith, they decided that the wisest course of action was to leave Matthias be for the time being. While relatively little was actually accomplished, both WickerBeak and Yoaral obtained myriad magical items.
							</p>
						</div>
						<button className="collapsible">
							<span className="date">02/10/2018</span>
							Recruitment Drive
						</button>
						<div className="content">
							<ul className="party-list">
								<li>Namfoodle</li>
								<li>Paavu</li>
								<li>Skra'p'ap</li>
								<li>WickerBeak</li>
								<li>Yoaral</li>
							</ul>
							<p>
								Returning from the icy mountain region, the crew are shocked to find their island under attack from a small party of raiders. While WickerBeak, Yoaral, and Smith held them at bay, the rest of the crew made port and joined the fray. With their combined strength, the threat was promptly eliminated. However, this gave rise to concerns that the island was no longer safe from passersby. The party took one of the invaders alive and interrogated him. He revealed that he was part of a scouting party sent by Captain Polus, and that the joint forces of Captain Polus and Captain Stor Hattur would invade the island soon.
							</p>
							<p>
								Upon hearing this, Smith urged the party to fortify the island. The party split up and descended to the surface world to gather as much aid as possible.
							</p>
							<p>
								WickerBeak and Yoaral returned to the former Gustav Manor, where they appealed to their evil overlord, Matthias. They convinced him that Captain Polus was a self-declared hero, and was an endless font of heroic deeds. Matthias was almost immediately triggered, and vowed to destroy Polus with extreme prejudice. WickerBeak attempted to obtain some cookies on his way out the door, but the greeter informed him that he wouldn't be able to bake the cookies until after dark when he was no longer needed at the front desk.
							</p>
							<p>
								WickerBeak and Yoaral then made their way to the Ruined Coliseum. They saw a mysterious light emanating from within the ruins, but only one guard at the entrance. He stopped them as they attempted to enter, and asked that they not proceed. He warned that they couldn't possibly imagine the horrors within, and that if they entered they would not leave.
							</p>
							<p>
								Namfoodle, Skra'p'ap, and Paavu elected to pay a visit to Bubble Town. They found it to be a very primitive, backwards society. They were intercepted at the border by a strangely well-spoken and fashion forward blue-jay Aakocra. He offered to help the Party find whatever destination they were looking for, but forewarned them that he would have to kill them if there was any funny business. The party requested to be led to the ruler, so their new guide/probation officer led them to a makeshift castle. The place was ruled by an unidentifiable purple creature, and was populated primarily by Aakocra, Kenku, Grung, Lizardfolk, very young Tortles, and strange new fish mutants. After winning the ruler's favor with dinner and a show, the Bubble Town party was granted 12 green grung, and 3 blue ones with the caveat that they bring back more food from outside the swamps.
							</p>
							<p>
								They decided to chat up their guide before leaving, and discovered that his name is Quintus Skybreeze. Namfoodle learned that Quintus serves as the scout/diplomat for Bubble Town. His job is to venture into the outside world, and bring any knowledge he gains back to share with his people. After Namfoodle informed him that they live on a floating island, the guide decided to come along out of curiosity.
							</p>
						</div>
						<button className="collapsible">
							<span className="date">02/24/2018</span>
							Pyrate vs. Pyrate
						</button>
						<div className="content">
							<ul className="party-list">
								<li>Namfoodle</li>
								<li>Skra'p'ap</li>
								<li>WickerBeak</li>
								<li>Yoaral</li>
							</ul>
							<p>
								Villains:
								Captain Polus
								Captain Stor Hattur
							</p>
							<p>
								The party readied their weapons, and equipped their new underlings with any spare gear they could scrounge. Having removed the cannons from their ships, they managed to create a makeshift artillery at the edge of the island.
							</p>
							<p>
								While the battle was harsh, the party and their allies were able to handily defeat the invading force. Skra'p'ap made short work of two small battalions, destroying one of them before their ship ever made landfall. Namfoodle commanded the artillery, and managed to dispose of a battalion personally commanded by Stor Hattur. The two Aarakocra present were tasked with bombing runs. Yoaral and WickerBeak led a small force to deal with a flanking battalion led by Captain Polus. While they were vastly outnumbered, Yoaral and WickerBeak managed to hold their ground against Polus' henchmen. Having finally made the needed travel preparations, Matthius teleported directly behind Yoaral and WickerBeak, and promptly summoned a tornado to sweep Polus and his remaining forces off of the island.
							</p>
							<p>
								Searching the wounded attackers, the party was able to heal and recruit 10 new pirates. They also managed to recruit 14 who attempted to flee the area and capture 1 who refused to join the cause.
							</p>
						</div>
						<button className="collapsible">
							<span className="date">03/10/2018</span>
							Monolith Heist
						</button>
						<div className="content">
							<ul className="party-list">
								<li>Namfoodle</li>
								<li>Skra'p'ap</li>
								<li>Yoaral</li>
							</ul>
							<p>
								Cross contacted Namfoodle and informed him that he had a special assignment for the party. He instructed them to meet a contact in Amarillo who would fill them in on the details, and that their success would determine their position in Cross's organization going forward. Failure would be punished with a painful death, while success would result in compensation and a promotion.
							</p>
							<p>
								Upon entering the gates of the capital, a guard approached the party and whispered "Cog and Sprocket". Yoaral recognized this as the name of a curiosity shop in the commercial district of the city. Entering the store, the party was able to hear the tail-end of a conversation about the Lim Brothers resuming holding court a customer left the store. Once inside, they were able to discern that the only other people in the store were the shopkeep, and a shady looking elf. The elf gave them what info he could about the secret gambling establishment that Cross needed them to burglarize. Cog, the shopkeep, quietly pretended not to be paying attention, but Skra'p'ap's noticed him acting uncomfortable. After Cross's liaison left, the party asked Cog what he knew. After a bit of convincing, he informed the party that they were looking for a casino called The Monolith. He also informed them that this was in a secret underground city that could only be entered when a codephrase is spoken at a specific door in a specific part of Amarillo.
							</p>
							<p>
								The party was able to locate this door and enter with the codephrase. After navigating the supernatural entryway and the city's customs agents, they entered the secret city known as Aphotia. The Monolith was easily the largest building in Aphotia, and was at the very center of the city. After purchasing enchanted goggles for those without darkvision, the party entered The Monolith. The heroes were briefly sidetracked with gambling, and had mostly disastrous results. Most of this was negated by Namfoodle, but Skra'p'ap was true polymorphed into a merperson.
							</p>
							<p>
								Making their way into the security staircase leading to the vault, they faced several trials. Making short work of these, Skra'p'ap was able to use bright light to melt through the shadowsteel casing of the vault. The party obtained the safe that Cross required, and stuffed their pockets for good measure. However, the treasure was heavily cursed. Since Yoaral was nominated to be the packmule, he was hit with the bulk of the curses. Something in his mind snapped, causing him to believe that his eyes wielded the power of a beholder. Despite this, the worst was yet to come for Yoaral.
							</p>
							<p>
								The party rested in an alleyway in Amarillo after narrowly escaping the casino's elite Draugr guard on foot. Yoaral fell asleep during his watch, and suddenly exploded 54 times. His original body completely destroyed, he was magically reborn as an Azer.
							</p>
							<p>
								Back on the island, WickerBeak took a few hits of the Potion of Unknowable Outcome due to boredom. This resulted in him being polymorphed into a Ringtailed Lemur with a detached second head following a foot behind him at all times. This additional head constantly shifts between every facial expression it can imagine. Both effects will wear off after 4 days.
							</p>
						</div>
						<button className="collapsible">
							<span className="date">03/24/2018</span>
							The Fall of Bubbletown
						</button>
						<div className="content">
							<ul className="party-list">
								<li>Bud</li>
								<li>Namfoodle</li>
								<li>Skra'p'ap</li>
								<li>Victor</li>
								<li>WickerBeak</li>
								<li>Yoaral</li>
								<li>Zora</li>
							</ul>
							<p>
								Namfoodle, Skra'p'ap, and Yoaral met back up with WickerBeak and Bud at their island base. After deciding to call it a night, Skra'p'ap was awakened by the sound of rustling leaves outside. Quickly rousing his comrades, the party investigated the source of the distraction. The source of the noise was a monster hunter known as Victor, who traveled to the island after receiving a tip about a few potential vampires. Unbeknownst to the party, this anonymous tip came from Glaumgough, the proprietor of the casino they recently burgled. He misled Victor so that he could make use of his ability to track prey, and had 2 assassins secretly stow away aboard Victor's ship. No sooner had the party assured Victor that nobody on the island had contracted vampirism, than the assassins made their move. The party fought valiantly, but Yoaral fell in combat. Bud placed Yoaral's once flaming Azer body into a bonfire, and ritualistically placed an egg with him. The improvised ritual caused Yoaral's body to become enveloped in a mysterious white glow.
							</p>
							<p>
								After getting as much rest as possible, the party received coordinates from Cross. These led to a large flying hangar of sorts. Inside, the party was given a new ship, complete with a crew and Quartermaster, Zora.
							</p>
							<p>
								Meanwhile, Yoaral's body began to stir and contort. The residual energy of the curse that had cost Yoaral his lizardhood had lingered, and Bud's ritual accidentally activated it. Yoaral's physical form regenerated one final time, granting him a new lease on life in the form of a young half-elf maiden.
							</p>
							<p>
								The party took some time to introduce themselves to their new quatermaster, and to transfer any important belongings from their previous ship to their new one. The party then departed the hangar, and decided to test the might of their ship and crew. They set a course for Bubbletown, and for conquest. Upon arrival, the party tricked the ruler into climbing into WickerBeak's questionable handbag of holding. As soon as the creature was inside, Wickerbeak slashed the bag open, trapping the former ruler in another plane of existence.
							</p>
							<p>
								Bud quickly proclaimed himself the new god-king of Bubbletown, and renamed it Budopolis. Skra'p'ap convinced the ruler of the Grung to accompany the party back to the sky island, to survey it and see if it would make a suitable new home for his people. With the help of a Fly spell from Skra'p'ap, WickerBeak demonstrated flight to the native Kenku. WickerBeak then invited the crowd of kenku to join him in founding a monastery so that he could teach them the secrets of flight.
							</p>
							<p>
								Having successfully thrown the entirety of Budopolis into chaos, the party decided to head back to their island home.
							</p>
						</div>
						<button className="collapsible">
							<span className="date">04/07/2018</span>
							Rumblings of Rewera
						</button>
						<div className="content">
							<ul className="party-list">
								<li>Namfoodle</li>
								<li>Skra'p'ap</li>
								<li>Zora</li>
							</ul>
							<p>
								Upon returning once again to the sky island, the party was greeted by the sounds of progress. The ruins of the ancient village had been restored to livability, and the residents of the island had begun work on expanding their small community. A few shops were in place, and several other houses and workshops were under construction. Before the party could take in the view, they were greeted by Smith. Smith informed the party that he had always hated them, and then stabbed Skra'p'ap. The party swiftly defeated Smith. Upon closer inspection of the body, the party realized this was a Doppleganger, not their advisor. Just as they realized this, Smith walked out of a small hut, removing the last of the rope that had bound him. After thanking the party for dealing with the Doppleganger, he tried and failed to stab Namfoodle. As it turns out, this Smith was also a Doppleganger.
							</p>
							<p>
								Using her highly attuned Drow senses, Zora was able to hear the faint sounds of someone struggling against bonds in one of the more secluded houses. Inside, the party found and disposed of a third Doppleganger. With his dying breath, the Doppleganger called out something in Abyssal, provoking a thunderous noise several miles away. The party freed the captives taken by the Dopplegangers (including the real Smith).
							</p>
							<p>
								After taking a moment to settle their heads, the party used a spyglass to determine the source of the rumbling. A green dragon was flying straight towards their island home. Taking what little advance warning they had, the party drafted a battle plan. The dragon was swiftly dispatched by the might of their combined forces.
							</p>
						</div>
						<button className="collapsible">
							<span className="date">05/05/2018</span>
							Dagger in the Dark
						</button>
						<div className="content">
							<ul className="party-list">
								<li>Namfoodle</li>
								<li>Silwerren</li>
								<li>Skra'p'ap</li>
								<li>Zora</li>
							</ul>
							<p>
								The party began to hear rumors of a mighty treasure in the forests to the southwest. Namfoodle, Skra'p'ap, and Zora set out to find this shiny artifact. After circling the forest in their airship for around an hour, they spotted what appeared to be the ruins of an ancient temple. They weighed anchor and disembarked. Inside the temple, they met a sneaky tabaxi rogue/assassin/gloom-stalker. They decided to join forces and explore the ruins together.
							</p>
							<p>
								After many hardships and death saving throws, the party managed to secure the artifact within. Though unsure of its purpose, the party quickly discovered that the golden dagger housed atop a shrine in the treasure chamber was very potent.
							</p>
							<p>
								Meanwhile, WickerBeak became bored and turned to drink. He had lost control when drinking from his enchanted flask before, but this time felt different. He became both brilliant purple, and a dryad. He was no longer a flightless, voiceless bird. She was now a champion of nature, complete with a voice all her own.


								Outcome: 1,500 xp
							</p>
						</div>
						<button className="collapsible">
							<span className="date">06/02/2018</span>
							Settling In
						</button>
						<div className="content">
							<ul className="party-list">
								<li>Namfoodle</li>
								<li>Skra'p'ap</li>
								<li>Zora</li>
							</ul>
							<p>
								Power player npcs:
								Althea
								Quintus
								Qwot
								Wickerbeak
								Billy
							</p>
							<p>
								After returning home and recuperating, the party decided it was time to explore their island more thoroughly.
							</p>
							<p>
								Namfoodle took two conscripted pirates (Milo and Norilla) and one of their more flora-savvy recent immigrants (Althea) and set out towards the mountain to find a plot to farm. The closer the group came to the mountain, the thicker the forest became. After nearing the base of the mountain, the party was attacked by an Assassin Vine. Namfoodle was entangled and injured. Thinking quickly, Namfoodle called for help with his communication crystal. Milo and Norilla panicked and fled back towards town, but Althea stood her ground and attempted to free Namfoodle. Once Namfoodle broke free from the vines that constrained him, he and Althea also fled.
							</p>
							<p>
								Zora decided to ask Smith if he had any older maps of the island. Zora hoped that comparing older maps to the current edge of the island might indicate the rate of expansion. However, Smith was nowhere to be found. His house was vacant, but full of a large number of mysterious arcane artifacts. Zora received Namfoodle's distress call before she could finish her investigation.
							</p>
							<p>
								Skra'p'ap decided to more closely examine the old monument towards the southwest of the island. Though aged, the large circular platform had clearly once served some magical purpose. Skra'p'ap rallied a team of grung to clear the debris and foliage from the platform.
							</p>
						</div>
						<button className="collapsible">
							<span className="date">06/16/2018</span>
							Rewind Time
						</button>
						<div className="content">
							<ul className="party-list">
								<li>Arver</li>
								<li>Bud</li>
								<li>Namfoodle</li>
								<li>Shamous</li>
								<li>Skra'p'ap</li>
								<li>Zora</li>
								<li>Uriver</li>
							</ul>
							<p>
								The party awoke early in the morning to the sound of a loud, distorted bell toll. Alarmed, the party set out to determine its origin. The townsfolk heard no such toll. Just a few moments after beginning their frantic search, Namfoodle, Skra'p'ap, and Zora saw a ship make port at their island home. Bud Smoke disembarked with a new entourage consisting of Uriver (totally a human), Shamous (firbolg), and Arver (bugbear). They had heard the bell as they were pulling in to port. Perplexed as to why only the seven of them had heard the bell, they were uncertain of what to do. After approximately an hour had passed, the party heard another, duller bell toll. The party quickly spread out in different directions and
							</p>
						</div>
						<button className="collapsible">
							<span className="date">08/04/2018</span>
							Wererat Pest Control
						</button>
						<div className="content">
							<ul className="party-list">
								<li>Namfoodle</li>
								<li>Uriver</li>
							</ul>
							<p>
								Namfoodle and Uriver both received invitations to hold court in Amarillo, with the promise of great reward if they showed up. Not ones to turn down money, both parties promptly arrived in the capital. They were tasked with dispatching a pest in the downtown area.
							</p>
						</div>
						<button className="collapsible">
							<span className="date">08/11/2018</span>
							Information, Technology
						</button>
						<div className="content">
							<ul className="party-list">
								<li>Zora</li>
							</ul>
							<p>
								Zora was summoned by Cross to discuss a highly sensitive matter. He wished to inspect the dagger she carried, and task her with keeping an eye out for the rest of the set. Cross also presented Zora with a new model of firearm to test out.
							</p>
						</div>
						<button className="collapsible">
							<span className="date">08/25/2018</span>
							The Interrogation of Nilbog
						</button>
						<div className="content">
							<ul className="party-list">
								<li>Bud</li>
								<li>Namfoodle</li>
								<li>Shamous</li>
								<li>Skra'p'ap</li>
								<li>Uriver</li>
								<li>Zora</li>
							</ul>
							<p>
								Party was invited to Quicheday, and questioned Nilbog. Nilbog informed them that the Rewera intended to become a god, and that this somehow involved the set of magical weapons to which the dagger belongs. He also provided them with his 'Shopping list', which had the teleportation circle runes for 7 locations, with 2 of them crossed out.
							</p>
							<p>
								He further informed them that each location contained an important item from the same set as their dagger, but that he did not know which item was in which location. With this newfound knowledge, the party decided to try the first two (crossed out) locations on the list. The first led to Aphotia, where Namfoodle panicked and convinced the party to try the next location. Though his magic was nearly drained, Skra'p'ap was able to muster enough power to travel one last time. This time the party found themselves on the top of the northern mountains in the middle of a blizzard.
							</p>
						</div>
						<button className="collapsible">
							<span className="date">09/08/2018</span>
							The Firelake, Part I
						</button>
						<div className="content">
							<ul className="party-list">
								<li>Bud</li>
								<li>Namfoodle</li>
								<li>Redji</li>
								<li>Rynn</li>
								<li>Shamous</li>
								<li>Uriver</li>
								<li>Zora</li>
							</ul>
							<p>
								Skra'p'ap decided to take a step back from the role of active adventurer to better guide his people.
							</p>
							<p>
								Bud received a letter urging him to go to Wustebie. While there was no recognizeable stamp or name, the sender claimed to be a friend. Bud showed this to his traveling companions, and they soon decided to do as the letter asked. The party found Wustebie to be a strange place. The citizens were all kobolds, and the only trade appeared to be the crafting and selling of jerky.
							</p>
							<p>
								The party decided to explore the firelake, and was quickly captured by the local firenewts. Most of the party escaped without issue, and Rynn was able to win his own freedom in combat. He then proceeded to introduce the Firenewts to trap music.
							</p>
						</div>
						<button className="collapsible">
							<span className="date">10/06/2018</span>
							Calling Down the Thunder
						</button>
						<div className="content">
							<ul className="party-list">
								<li>Chris Angel</li>
								<li>Uriver</li>
							</ul>
							<p>
								Party found a Godfall pick, and made kinda friends with Tordenei. Also told her about Zora and the Godfall dagger she carries.
							</p>
							<p>
								Dispelled the disguise on the brothers Lim, revealing them to be a Goblin and an Ogre. Made some rudimentary newspapers with the text 'Pehr Lim is a goblin' and air dropped them into Amarillo. Accidentally killed a merchant with one.
							</p>
							<p>
								Returned to the Sky Isle only to find Tordenei had decided to pay Zora a visit.
							</p>
						</div>
						<button className="collapsible">
							<span className="date">10/20/2018</span>
							The Trial
						</button>
						<div className="content">
							<ul className="party-list">
								<li>Bud</li>
								<li>Namfoodle</li>
								<li>Redji</li>
								<li>Shamous</li>
								<li>Uriver</li>
								<li>Zora</li>
							</ul>
							<p>
								The party stood trial for collecting the godfall artifacts. Redji frantically hid the dagger, but was still rounded up and added to the rest.
							</p>
							<p>
								Bud made an impression on Tordenei.
							</p>
							<p>
								The party all received punishments of some sort or another:<br/>

								Bud received a stern talking-to and a small fine.<br/>

								Namfoodle had all of his top teeth removed.<br/>

								Shamous was banished to the bottom of the sea.<br/>

								Redji was made to bow before Veland, and was forced to take on a goblin ward, Thunder.<br/>

								Uriver was placed atop a tower of glass, which was then shattered.<br/>

								Zora was sentenced to "lighten up".
							</p>
								<p>
									Each party member was also granted a small boon:<br/>
								Bud received a keg golem from Tordenei.<br/>
								Namfoodle received schematics and two power cores, with which to build modified modrons.<br/>
								Shamous received a bag full of beans and a dead angler fish.<br/>
								Redji received a vague map and some notes. These will eventually lead to his father.<br/>
								Uriver received bladed boomerangs, and an enchanted dark ruby ring.<br/>
								Zora received a magical locket and a pocket watch.
							</p>
						</div>
						<button className="collapsible">
							<span className="date">11/03/2018</span>
							Rise of Rewera (the Death of Immordan)
						</button>
						<div className="content">
							<ul className="party-list">
								<li>Bud</li>
								<li>Namfoodle</li>
								<li>Redji</li>
								<li>Shamous</li>
								<li>Uriver</li>
								<li>Zora</li>
							</ul>
							<p>
								There are those who say the wheels of fate are above question, and are fair rulers of our destinies. Those people are fools. In perhaps the most severe recorded case of circumstantial evidence, the party had barely been released from their trial when the unthinkable happened. Immordan, god of death, was slain in his domain.
							</p>
							<p>
								Shamous may bump into Sonya (dead wife)

								Namfoodle will likely bump into Jerry.

								Party bumps into Billy, who is now a mask wight

								Party gets resurrected by Rewera as undead minions if they are too slow to find a way to escape the afterlife.
							</p>
							<p>
								If this outcome occurs, party's free will is temporarily restored by Nilbog.
							</p>
							<p>
								Shamous wandered into Thistleton. The Grippli residents initially hid and watched him from the treetops, but his nature-sense began to tingle. He called out to them and assured them that he meant them no harm. One of the Grippli, named Ribbert, talked with Shamous and offered him directions to the nearest port. Following these directions, Shamous began to head south. However, he was intercepted and executed by a horde of Grippli warriors little more than a mile outside of Thistleton.
							</p>
							<p>
								The party was executed by what appeared to be the goddess of law, Larazi.
							</p>
							<p>
								Thanks to their nearly simultaneous executions, the party was reunited in the underworld. Here they did some stuff and got into some mischief, before ultimately being selected to become some of the first members of the Rewera's undead army. Once thrust back into their bodies, Namfoodle and Redji were able to temporarily resist the Rewera. The other party members did not fare so well. They began to walk towards the mountain on the Sky Isle, with the intention of retrieving the amulets left there. The party was intercepted by Nilbog, who used his beguiling influence to temporarily block the Rewera's influence from the party's minds. He informed them that he could restore two of them to life, with the Rewera's influence removed. However, the other 4 would have to be slain, and their bodies burnt to prevent the Rewera resurrecting them again.
							</p>
							<p>
								Bud informed everyone that he had the ability to reincarnate the recently deceased, and asked Nilbog if this would have a similar effect. Nilbog agreed that it would most likely break the telepathic link with the Rewera.
							</p>
							<p>
								After a great deal of debate and mishap, Redji and Bud were selected for Nilbog's resurrection, while Namfoodle and Shamous were reincarnated. Namfoodle became a Tiefling, while Shamous became a Protector Aasimar.
							</p>
							<p>
								Nilbog stressed that he did not want anyone to know of his intervention, and that he intended to retreat into exile. Desperate to hide from the wrath of the Rewera, Nilbog fled the island.
							</p>
							<p>
								The party took a brief moment to mourn their fallen comrades. After collecting any useful items, the surviving party members constructed funeral pyres and cremated Uriver and Zora. They collected ashes from each in case they found a way to rescue their souls from the Rewera.
							</p>
							<p>
								The party made haste towards Amarillo. Making their way to the slums, Redji checked the hiding place where he left the Godfall Dagger. Unfortunately, it was nowhere to be found. They didn't know it yet, but it had fallen into the hands of Amarillo's newest crime boss.
							</p>
						</div>
						<button className="collapsible">
							<span className="date">11/17/2018</span>
							Birth of the Resistance
						</button>
						<div className="content">
							<ul className="party-list">
								<li>Bud</li>
								<li>Falimur</li>
								<li>Jasper</li>
								<li>Namfoodle</li>
								<li>Redji</li>
								<li>Shamous</li>
							</ul>
							<p>
								The surviving members of the party were summoned to a secret Rewera resistance meeting. It was here that they were introduced to two new allies, Falimer and Jasper. They were given some new equipment, and a rough location on two of the Godfall weapons. One was located somewhere in the palace of Amarillo, while the other was being sold to an unknown collector. The party wisely elected to follow the transaction first, to prevent the weapon from falling into the wrong hands.
							</p>
							<p>
								They were able to track the transaction to Aphotia, where they found Cross' fence, Herzog Meier, exchanging payment with a group of mobsters. The party waited for Herzog to leave, and then promptly eliminated the mobsters and relieved them of their money.
							</p>
							<p>
								Namfoodle and Redji departed with the money for safekeeping. Bud, Falimer, Shamous, and Jasper soldiered on. After spending the night in the forest south of Amarillo, they managed to intercept the convoy with the Godfall weapon before it reached the rondezvous point. The party then retreated to Tilaporth to hide from Cross' pirates until things blew over.
							</p>
						</div>
						<button className="collapsible">
							<span className="date">12/01/2018</span>
							Orcs and Axes
						</button>
						<div className="content">
							<ul className="party-list">
								<li>Bud</li>
								<li>Jasper</li>
								<li>Namfoodle</li>
								<li>Redji</li>
								<li>Shamous</li>
							</ul>
							<p>
								The party regrouped in Amarillo, with the intention of obtaining the Godfall weapon hidden inside the palace. After much bribery, they quickly determined that it was held by the larger of the Lim brothers, Osbeck Lim. After a brief debate that devolved into combat, the party sealed all of the exits and eliminated all of the guards in the throne room. They then managed to bargain their way into possession of the aforementioned item, the Godfall Greataxe. Now in possession of both of the items needed to gain entry into the hidden chamber under the mountain on their sky island, the party decided to return to their former base of operations.
							</p>
							<p>
								After arriving once again on their sky island, the party found Thunder cooking a squirrel over a bonfire made out of an old bed. Strangely, the lesser deity Telov had kept him company. Telov revealed that he had been placed on guard duty. While the gods did not know what was hidden inside the island vault, they knew it must be bad. After pointing out that this line of reasoning directly contradicted Telov's core tenets, he left the island to ponder his life choices.
							</p>
							<p>
								The party promptly hoofed it to the newly unguarded vault. With both needed weapons in tow, the door opened with no issues. Inside, the party encountered a horde of flail snails and a time-locked room with a mimic. It was here that the party found the Rewera amulets. After a lengthy discussion, the Rewera amulets were carefully placed back in the time-locked room, and the party left the vault.
							</p>
						</div>
						<button className="collapsible">
							<span className="date">12/15/2018</span>
							Notriven
						</button>
						<div className="content">
							<ul className="party-list">
								<li>Bud</li>
								<li>Falimur</li>
								<li>Jasper</li>
								<li>Redji</li>
							</ul>
							<p>

							</p>
						</div>
						<button className="collapsible">
							<span className="date">12/29/2018</span>
							Underwater Squad
						</button>
						<div className="content">
							<ul className="party-list">
								<li>Jasper</li>
								<li>Namfoodle</li>
								<li>Redji</li>
							</ul>
							<p>
								Rewera's spies have noted the lack of fortification surrounding the resting place of the amulets, and has dispatched a force to retrieve the artifacts.
							</p>
							<p>
								The party has learned of two prophesies concerning large beings of darkness with different colored eyes. Lime Green in the forests of Budopolis, and Ice Blue in the billows of the Firelake.
							</p>
							<p>
								Jasper, Namfoodle, and Redji decided to examine the two unknown locations on the list they obtained from Nilbog so long ago. The first of these locations was immediately familiar to Namfoodle, who recognized it as the site he and several fallen allies had obtained the Godfall Dagger. After deciding that there was no reason to delve back into the depths of the temple before them, the party attempted the next location. They awakened in a strange, dark place made of creaking metal. The instant one of them set foot off of the teleportation circle, an alarm spell was triggered and several triton guards entered the room. Jasper was able to hide by climbing onto the ceiling. Namfoodle and Redji surrendered willingly.
							</p>
							<p>
								The duo of captured heroes was shuffled away to meet the triton general, who demanded to know their reason for coming to their stronghold, Morsko Dno. The party explained their gods-given mission to find and destroy the Godfall weapons. The general informed the party that they were more than welcome to keep the triton's Godfall weapon, provided they could retrieve it from their vault.
							</p>
							<p>
								After much trial and tribulation, the party did just that.
							</p>
						</div>
						<button className="collapsible">
							<span className="date">01/12/2019</span>
							Setbacks and New Friends
						</button>
						<div className="content">
							<ul className="party-list">
								<li>Falimur</li>
								<li>Jasper</li>
								<li>Namfoodle</li>
								<li>Redji</li>
								<li>Shamous</li>
							</ul>
							<p>
								Rewera has taken several lesser deities hostage, with the intention of killing them once he has more amulets. The prisoners are:
								• Gillywung
								• Klause
								• Mosoc
								• Ochiphe
								• Telov
							</p>
							<p>
								This news has begun to travel, and has reached Cross's ears. He has issued a bounty on the heads of all demigods. Once he obtains one, he intends to use it as bait to lure the god of death out of hiding.
							</p>
							<p>
								Meanwhile, Rewera's forces have become far more openly hostile in their dealings. No longer content to operate in shadow, they now raid villages with full scale invasions. Using his limited knowledge of teleportation circles tied to the history of the Godfall artifacts, Rewera has begun to send forces en masse to obtain the weapons.
							</p>
							<p>
								Consequently, the forces of Rewera are quickly becoming exceedingly active in the Sky Isle, Notriven, the Firelake, the Wetwood, and Morsko Dno.
							</p>
							<p>
								Likely encounters:
								• 80 + 2xd20 zombies
								• Boggle with an Amulet of Planeshifting
							</p>
							<p>
								Likely loot:
								• Galder's Bubble Pipe
								• Ring of Telekinesis
								• Bracelet of Rock Magic
								• Animated Shield
								• Stonespeaker Crystal
								• Shield of Far Sight +1
								• Deck of Many Things
								• Gem of Seeing
							</p>
							<p>
								Party visited the inn in Tilaporth run by Perrin Brushgather.
							</p>
							<p>
								Grimlok and Sally fought.
							</p>
						</div>
						<button className="collapsible">
							<span className="date">01/26/2019</span>
							The Rescue Party
						</button>
						<div className="content">
							<ul className="party-list">
								<li>Falimur</li>
								<li>Jasper</li>
								<li>Namfoodle</li>
								<li>Redji</li>
								<li>Shamous</li>
							</ul>
							<p>
								The party's search for their missing allies led them to the continent of Paros to the west. Here, they
							</p>
							<p>
								Stonweald (a New York City inspired settlement carved out of a mountain. Probably inhabited by dwarves and/or earth elementals)


								Encounters

								Wilderness:
								A treant and a stone golem were magically locked
								together during an ancient battle. Over the centuries
								since, fey gardeners have turned the two into a
								temple. Characters who explore the temple might
								inadvertently help the treant or the golem finally
								overcome its foe.

								A leprechaun (use quickling statistics from Volo’s
								Guide to Monsters) crosses the characters’ path. If
								successfully caught without being killed, the creature
								negotiates its release with the location of its hidden
								treasure: 1,000 gp in brightly polished coins.

								Cavern:
								A galeb duhr serves as a kind of door between
								passageways. Negotiating with it successfully allows
								access to a secret tunnel that cuts days off the
								characters’ journey.

								Roving outlaws (five to ten thugs led by a bandit
								captain) heading to the monastery to join its ranks
								are hopelessly lost in the tunnels. In gratitude for
								being rescued, they offer to help the characters in
								their quest, but betray them at the first opportunity.

								Mountain:
								A party of monks (five cultists led by a cult fanatic)
								either survived the characters’ assault on the
								Monastery of the Distressed Body or were away from
								the monastery and returned to find it routed. They
								pursue the characters—to try to convince them to
								take on leadership of the monastery.
							</p>
						</div>
						<button className="collapsible">
							<span className="date">02/09/2019</span>
							Monastery Rescue Finale
						</button>
						<div className="content">
							<ul className="party-list">
								<li>Bud</li>
								<li>Falimur</li>
								<li>Namfoodle</li>
								<li>Seabern</li>
								<li>Shamous</li>
								<li>Zenrya</li>
							</ul>
							<p>
								Boon that allows Shamous to use both uses of his wild shape to become a Young Black Dragon. He can remain in this shape half as long as a normal wildshape.
							</p>
							<p>
								Marvelous Pigments
								Professor Orb
								Immovable Rod
								Staff of the Woodlands
								Potion of Diminution
								Potion of Giant Size
								Potion of Longevity
								Scroll of Gate
								Scroll of True Polymorph
								Scroll of Weird
								Scroll of Feeblemind
								Scroll of Animal Shapes
								Scroll of Clone
								Scroll of Resurrection
							</p>
							<p>
								Herald of Undeath (Creature Codex pg. 218)

								Jinmenju (Creature Codex pg. 232) in Nilbog's garden.

								Morko (Creature Codex pg. 270) outside Stonweald

								Yagi (Baba Yaga, Creature Codex pg. 46)
							</p>
						</div>
						<button className="collapsible">
							<span className="date">02/23/2019</span>
							Treasure of the Firenewts
						</button>
						<div className="content">
							<ul className="party-list">
								<li>Bud</li>
								<li>Falimur</li>
								<li>Namfoodle</li>
								<li>Redji</li>
								<li>Zenrya</li>
							</ul>
							<p>
								Party received a new set of maps from the Cartoholic as payment for mapping a portion of The Great Rampart.
							</p>
							<p>
								They returned to the Firelake, wherein everyone who had not already passed a trial passed without successfully. Redji completed a trial by combat, and spared his already injured opponent. Bud and Falimur had been marked previously, and were allowed to enter without issue. Zenrya completed trial by Storycrafting. Namfoodle completed trial by rap battle, and unseated Zainen as ruler of the Firelake, becoming the new Zainen. With his new title in tow, Namfoodle claimed the Godfall Reaping Chain and swiftly fled the Firelake with the rest of the party in tow.
							</p>
							<p>
								The party then elected to check in with the Aarakocra community in the Moonfire Mountains. The community was thankfully still safe, and offered the party shelter for the night.
							</p>
							<p>
								The following morning the party received an offer from Cross. Cross was willing to pay the first pirate to bring him the Godfall Dagger 15,000 platinum. He also offered an additional 15,000 platinum if the pirate holding the dagger was a capable warrior and willing to assist him in a murder.
							</p>
						</div>
						<button className="collapsible">
							<span className="date">03/09/2019</span>
							The Verdant Isle
						</button>
						<div className="content">
							<ul className="party-list">
								<li>Falimur</li>
								<li>Jasper</li>
								<li>Namfoodle</li>
								<li>Redji</li>
								<li>Shamous</li>
							</ul>
							<p>
								Strong Bad luchador who lives to answer fan letters
							</p>
							<p>
								Initiative/AC/Health/Status/Passive score tracking sheet
							</p>
							<p>
								Party encountered 9 stegasaurus riding kobolds. They also met Zig, a lost member of the aforementioned kobold pack with dull green scales with indigo spots. Party heard rumors of a Godfall rapier in Thistleton. With help from Shamous, the party was able to locate Thistleton with little effort.
							</p>
						</div>
						<button className="collapsible">
							<span className="date">03/16/2019</span>
							Echoes of the Past
						</button>
						<div className="content">
							<ul className="party-list">
								<li>Bud</li>
								<li>Falimur</li>
								<li>Namfoodle</li>
								<li>Redji</li>
								<li>Zenrya</li>
							</ul>
							<p>
								Notriv informed Falimur that the gods can no longer feel Klause's life force.
							</p>
							<p>
								Spaxxis informed Falimur that "The solution to all this Rewera tom-foolery, could likely be found by buying some jewelry."
							</p>
							<p>
								Chromus informed Redji that 'The key to the future lies in the events of the past.'
							</p>
							<p>
								Party encountered crazy eyed dwarf who runs a shop. After chatting with him, they realized they should probably seek out any and all black diamonds. This led them to Decapos.
							</p>
							<p>
								Party sailed south for Decapos and decided to begin their search in the ruins of Grandcrest. It was here that they encountered one of the last remaining Nagpa. The party was able to narrowly defeat the Nagpa, but not before Falimur was slain. Overwhelmed, Zenrya fled from the battle. She retreated to the ship, only to find it occupied by two Hobgoblins and a human cleric named Teomyr. They had come to the ship to prevent the party from wandering into Grandcrest, and likely to their own doom. Upon seeing a survivor, the Hobgoblins felt that they had done their good deed for the day and left. Grumschs, the more talkative of the two, wished Zenrya and Teomyr good luck and informed them that he could be found in Bashnya Strazha if they found themselves in need of assistance.
							</p>
							<p>
								Zenrya found herself too short too effectively steer the ship, and offered the helm to Teomyr. After nearly crashing the vessel, he was booted from the wheel and Thunder steered the ship to Grandcrest. Teomyr lowered the anchor so that the remaining heroes on the ground level could climb up for a safe extraction.
							</p>
							<p>
								The party managed to locate 2 black diamond amulets, and an old laboratory filled with notes, artifacts, and scrolls.
							</p>
							<p>
								The Rewera now knows the location of the amulets, roughly what protects them, and that the party knows the location of 4-5 Godfall weapons. He also knows that Redji possesses the dagger.
							</p>
						</div>
						<button className="collapsible">
							<span className="date">03/23/2019</span>
							The Frogfolk of Thistleton
						</button>
						<div className="content">
							<ul className="party-list">
								<li>Jasper</li>
								<li>Shamous</li>
							</ul>
							<p>
								Grippli are awaiting a sign from the gods. They are a deeply religious people, and the loss of their god-queen Gillywung has left them shaken.
							</p>
							<p>
								Visitors seeking the rapier are subjected to Rorschach tests in order to gauge their character. If deemed pure of heart, the Grippli will willingly hand over the weapon.
							</p>
							<p>
								They have recently begun entertaining the ideas set forth by an 'outside prophet.' This orange idealogical invader is Pete the carrot.
							</p>
							<p>
								Ribbert has created alchemical lightsabers.
							</p>
							<p>
								The grippli survive primarily on a diet of Giant Wasps (MM, page 329) and any local berries they can scavenge.
							</p>
							<p>
								The townsfolk mostly fall into these stat-block categories:
								• Commoner (50%)
								• Tribal Warrior (35%)
								• Druid (10%)
								• Archer (5%)
							</p>
							<p>
								Ribbert will offer the party potions to make them appear as Grippli for 24 hours, but requires 500g or lab rat services in order to hand them over. Should the party choose the lab rat option, they are subjected to one of the following:

								Potion of Reduce - drinker's size is halved in all dimensions for the next minute.
								Potion of Polymorph - The potion is polymorphed into a Pixie (MM, Page 253) for 1 hour. Bright lime green color.
								Potion of Seeming - The user gains the effects of the Seeming spell for 8 hours. Deep gray.
								Potion of Suggestion - The drinker gains the effects of the Suggestion spell for 8 hours. Electric yellow.
								Potion of Polymorph - The potion is polymorphed into a Spring Eladrin for 1 hour. Light blue with smoky wisps of white.
							</p>
							<p>
								Shamous has potion of Pixie.
								Jasper has potion of Suggestion.
							</p>
							<p>
								The party received titles as follows:
								<ul>
									<li>
										Sir Jeffery (Jasper) The Bold
									</li>
									<li>
										Sir Simon (Shamous) The Noble
									</li>
								</ul>
							</p>
							<p>
								The frog buildings are nearly 200' off the ground, and are mostly rather rounded. The frogs also enjoy brightly colored canvas tents, but limit their ground buildings to things that can be easily dismantled and hidden if outsiders venture too close to their borders.
							</p>
							<p>
								The gang headed north to trace the steps of the creatures that abducted Gillywung. They caught the trail of a collection of robed figures heading east. Exhausted from the events of the day, the party made camp at the edge of the Forest of Life. During the night, Jasper spotted a one-man skiff airship approaching the Verdant Isle from the north. This skiff was promptly attacked by projectiles being hurled from a point somewhere else in the trees. The attack proved too much for the tiny vessel, and soon crashed into the ground. The party elected to leave it until morning.
							</p>
							<p>
								Once morning arrived, the party set out eastward following the trail of the robed wanderers. This trail looped around and eventually led them to the wreckage of the skiff. The vessel had been robbed, and it's pilot lay dying on the ground next to it. Shamous was able to stabilize her. She introduced herself as Howler, a member of the guild Polyforce. With her ship already destroyed, she agreed to accompany the party on their search for the robed figures.
							</p>
							<p>
								Resuming the hunt led the party to Okham. The party learned that the robed figures had attempted to enter Okham but were turned away when they failed the entrance exam. The grumpy gnome gatekeeping the city told them he recalled seeing the robes head south.
							</p>
							<p>
								Howler informed the party that she was attempting to find the rest of the party on orders from her guild leader. She was instructed to extend an invitation for them to join Polyforce, and inform them of its base of operations in the tower to "the north, or east, or whatever direction it is from you when you hear this."
							</p>
							<p>
								The party made excellent time, and located the robes en route to Vidan's Rest. They identified them as members of the Brotherhood of Matthias and eliminated them after questioning.
							</p>
							<p>
								The party parted ways with Zig, and set out towards Lagos. The session ended with the party at the Temple of the Sacred Soul.
							</p>
						</div>
						<button className="collapsible">
							<span className="date">03/30/2019</span>
							Ancient Wisdom
						</button>
						<div className="content">
							<ul className="party-list">
								<li>Jasper</li>
								<li>Shamous</li>
							</ul>
							<p>
								The sessions from 03/16/19 and 03/23/19 took place simulataneously in-universe. However, Jasper and Shamous' mission took 1 day fewer than the rest of the party's mission.
							</p>
							<p>
								This supplemental session caught up the timelines.
							</p>
							<p>
								Shamous received a psychic message from Salax Dolv, the elder of the kobold town, Wustebie. Salax had been scrying on Shamous' quest ever since their first meeting. After seeing Shamous excercise selflessness and mercy when among the tribe of frog-folk who had slain him once, Salax decided that Shamous can be trusted.
							</p>
							<p>
								With newfound respect for Shamous, Salax offered up the Godfall Longsword, and charged Shamous with using it to its fullest. He also revealed that he was Sonya's father. Salax believes there may be a way to reverse Sonya's untimely demise.
							</p>
						</div>
						<button className="collapsible">
							<span className="date">04/06/2019</span>
							Beginning of the End
						</button>
						<div className="content">
							<ul className="party-list">
								<li>Jasper</li>
								<li>Shamous</li>
							</ul>
							<p>
								Cross would probably see the life barrier around the Verdant Isle as desperation by Vidan, and attempt to use this to pressure him into a deal to resurrect his family. Cross has connections with wizards and tinkerers, and may know that one of the scientists in Okham knows of a way to enter Hel. If so, he will definitely try to use that to get a clear shot at the Rewera.
							</p>
							<p>
								He would probably also send a ship to deal with the remainder of his village, and ensure that none of his former friends or family could be used as pawns of the Rewera.
							</p>
							<p>
								Ochiphe has been slain. Rewera has now reached a divine strength of 1.67, making him the most powerful of all the gods.
							</p>
							<p>
								The party will likely receive a message from a figure through a time window. This is an ally from a dark future where the Rewera succeeds in his dark conspiracies. He has used the last of his magic to aid the party with his wisdom, so that they might avoid making the same mistakes as the party did in his timeline.


								Potential stuff to use:
								Noseyus Isle
								Amos Aldrin

								Loot:
								Bag of Beans
								Demon Armor
								Amulet of the Black Skull
								Boon for Jasper allowing permanent flight.
								Claws of the Umber Hulk
								Ring of X-Ray Vision
								Cloak of the Bat
								Scrolls that teach one language and then disappear
								Necklace of Prayer Beads
								Eyes of Charming

								Moonblade
								The moonblade scores a critical hit on a roll of 19 or 20.
								Moonblade is +3
								Can be used to cast Spirit Guardians. Roll a d6 immediately after casting. On a roll of 1-5, this property cannot be used again until the next dawn.

								Efreeti Chain
								Manual of Bodily Health
								Manual of Gainful Excercise
								Manual of Quickness
								Tome of Clear Thought
								Tome of Leadership
								Tome of Understanding

								Sprite's Pendant (reflavored Cloak of the Bat)

								Steal Life - Spell. Steal Life energy from target and decrease users age.
							</p>
							<p>
								Should probably give Jasper a few story beats with the Tinkerer who thawed her out.
							</p>
							<p>
								Mounts:
								Pegasus (Jasper)
								Broom of Flying (Zenrya)
							</p>
						</div>
						<button className="collapsible">
							<span className="date">04/20/2019</span>
							CANCELLED (Birthday Party)
						</button>
						<div className="content">
							<p>
								Session cancelled due to birthday party.
							</p>
						</div>
						<button className="collapsible">
							<span className="date">05/04/2019</span>
							BegENDning: 2 Past 2 Furious
						</button>
						<div className="content">
							<ul className="party-list">
								<li>Bud</li>
								<li>Jasper</li>
								<li>Namfoodle</li>
								<li>Redji</li>
								<li>Shamous</li>
							</ul>
							<p>
								Party arrived at Noseyus Island at roughly 4:22pm. Was met by Raccogli Gasparu.

								Redji traveled 1000 years into the past and left a mark on the temple labeled "What Is". This is visible in the present, although he was unable to verify this personally.


								After traveling 1000 years backwards in time, Redji then traveled another 1,000 years backwards. Unfortunately, this placed him prior to the construction of the time-gates, leaving him stranded 2,000 years in the past.


								Maestru Francescu


								Party was escorted to the past by:
								Guardia Lucia
								Guardia Angiolina


								Bud successfully hugged Guardia Angiolina without being mauled, due to rolling a 22 on his persuasion check.


								Bud, Jasper, Shamous, and a handful of Brokkos entered the "What Might Have Been" gate for a laugh.

								Bud was sent to a realm ruled by Sirens, but succeeded on his saving throw and returned to his original reality.

								Jasper was sent to a realm ruled by dryads. She exchanged a friendly greeting with one, and then returned to her original reality.

								Shamous was sent to a twisted fey realm, and was immediately attacked by a Redcap. He retreated back through the gate with the Redcap still clinging to his shell. The rest of the party was able to aid Shamous in disposing of the Redcap before it killed him.

								Of the Brokkos, one did not return. Another returned eating the remains of a freshly slain Yuan-Ti Malison.
							</p>
						</div>
						<button className="collapsible">
							<span className="date">05/18/2019</span>
							CANCELLED (Honeymoon)
						</button>
						<div className="content">
							<p>
								Session cancelled due to honeymoon.
							</p>
						</div>
						<button className="collapsible">
							<span className="date">06/01/2019</span>
							Back to the Future
						</button>
						<div className="content">
							<ul className="party-list">
								<li>Bud</li>
								<li>Jasper</li>
								<li>Namfoodle</li>
								<li>Redji</li>
								<li>Shamous</li>
								<li>Teomyr</li>
							</ul>
							<p>
								Picks up where last session left off. 7:30pm on the 23rd of Marua. Jasper still has ~6 hours of Potion of Suggestion left.
							</p>
							<p>
								Chromus returned Redji to the present, and transported Teomyr from the continent of Lagos to Noseyus Isle to join the rest of the party. Chromus informed the party that he believed there were only 4-6 days before the end of the world. He offered them the chance to travel 1 week into the past at the location of their choosing to make final preparations.
							</p>
							<p>
								The party members wisely chose to separate to diversify their preparations. The timelines of these preparations are shown below. They arrived at precisely 8:00am at their selected destinations.
								<div className="w-100 overflow-auto">
									<table className="timeline">
										<tr>
											<th>
												Party Member
											</th>
											<th>
												1st Day
											</th>
											<th>
												2nd Day
											</th>
											<th>
												3rd Day
											</th>
											<th>
												4th Day
											</th>
											<th>
												5th Day
											</th>
											<th>
												6th Day
											</th>
											<th>
												Final Day
											</th>
										</tr>
										<tr>
											<td className="sub-header">
												Bud
											</td>
											<td>
												Destination: Amarillo

												Met with Pehr Lim. Negotiated an alliance against the Rewera. Lim agreed to help, in exchange for custody of the fiend that killed his brother. Flew to Budopolis to make further preparations.
											</td>
											<td>
												Flew to the industrial city of Grinford to evaluate the possibility of having a construct army comissioned. Met Rickard, who offered to prototype a construct army in exchange for certain... trade goods. Departed for Rickard's laboratory in Okham to discuss further details.
											</td>
											<td>
												Arrived in Okham. Reached an agreement with Ricard regarding the comissioned army.
											</td>
											<td>
												Provided input during prototyping.
											</td>
											<td>
												Settled on final prototype design. Sent order to Grinford.
											</td>
											<td>
												Began mass production.
											</td>
											<td>

											</td>
										</tr>
										<tr>
											<td className="sub-header">
												Jasper
											</td>
											<td>
												Destination: Thunder Plains<br/>
												<br/>
												Met the Giff batallion located in the Thunder Plains. Negotiated contract for the Giff's services. The Giff agreed to participate, in exchange for explosives/weaponry of an acceptable quality. Departed for Stonweald in order to evaluate potential payment methods.
											</td>
											<td>
												Arrived in Stonweald. Local options for payment were deemed unacceptable. Departed for Amarillo to present other payment options.
											</td>
											<td>
												Sailed for Amarillo.
											</td>
											<td>
												Sailed for Amarillo.
											</td>
											<td>
												Arrived in Amarillo before the sun. Took the Giff to Cog and Sprocket to demo some of their more deadly merchandise. The Giff were pleased. Departed for the Firelake.
											</td>
											<td>
												Arrived at the Firelake. Slew the Firenewt Zainen in single combat, earning the throne. The newts were unready to accept an outsider as leader due to Namfoodle's recent misuse of the position. Jasper used a combination of magic and deception to convince the Firenewts that she is a god of fire.
											</td>
											<td>
												Continued to cement her position as leader of the Firenewts.
											</td>
										</tr>
										<tr>
											<td className="sub-header">
												Namfoodle
											</td>
											<td>
												Destination: Peku<br/>
												<br/>
												Met wandering indigenous bearfolk. Asked to be brought to their high council.
											</td>
											<td>
												Met with council. Was incorrectly associated with the fire elementals terrorizing the local wild-life. Sentenced to banishment within the volcano in the center of the island.
											</td>
											<td>
												Escort begins journey to volcano. Namfoodle managed to convince them of his innocence. They agreed to take him to another council for a re-trial. Begain heading east.
											</td>
											<td>
												They brought him to the village of the Kapi, and presented him to the local Treant council. The Treants agreed to help with the coming war, in exchange for assistance dealing with the fire elemental infestation.
											</td>
											<td>
												Namfoodle and his entourage ventured northward, so that he could assess the strength of the fire elemntals.
											</td>
											<td>
												Venturing north.
											</td>
											<td>
												Encountered Oni. Decided to head south.
											</td>
										</tr>
										<tr>
											<td className="sub-header">
												Redji
											</td>
											<td>
												Destination: The Retaliator<br/>
												<br/>
												Time on Retaliator | 6 hrs.

												Met with Cross. Negotiated an alliance against the Rewera.
											</td>
											<td>

											</td>
											<td>

											</td>
											<td>

											</td>
											<td>

											</td>
											<td>

											</td>
											<td>

											</td>
										</tr>
										<tr>
											<td className="sub-header">
												Shamous
											</td>
											<td>
												Destination: Victarn<br/>
												<br/>
												Traveled to the monster hunter academy in Victarn. Met with the headmaster, and convinced him of the incoming threat. Departed for Wustebie with one of the more self-assured students.<br/>
												Arrived in Wustebie at roughly 7:30pm.
											</td>
											<td>
												Time East of Mountain | 1 hrs
												Scouting Mountain | 12 hrs<br/>
												<br/>

												Arrived on the western side of Bravagg at roughly 9:30am. Scouted top of mountain while en route to eastern side of island. Arrived at eastern clearing at roughly 6:30pm.<br/>
												Was set upon by feral Dracon. Dispatched them, and headed towards nearest town. Using new information gained from the town, scouted mountain for entrances.
											</td>
											<td>
												Entered mountain. Spoke to some of its citizens.<br/>
												Spoke to the the beast from before time.
											</td>
											<td>
												Set out for Thistleton
											</td>
											<td>
												Continued toward Thistleton
											</td>
											<td>
												Arrived in Thistleton. Consulted with Elders. Persuaded them to join the assault on the Rewera.
											</td>
											<td>
												Made preparations.
											</td>
										</tr>
										<tr>
											<td className="sub-header">
												Teomyr
											</td>
											<td>
												Destination: Stonweald
												<br/>
												<br/>
												Met with King Harbek Stonespire IV.<br/>
												Became engaged to Riswynn Stonespire.
											</td>
											<td>
												Wedding preparations.
											</td>
											<td>
												Wedding Ceremony.<br/>
												Consumated.<br/>
												Expecting.
											</td>
											<td>
												Honeymoon / battle preparations.
											</td>
											<td>
												Battle preparations.
											</td>
											<td>
												Battle preparations.
											</td>
											<td>
												Battle preparations.
											</td>
										</tr>
										<tr>
											<td className="sub-header">
												Thunder
											</td>
											<td>
												Destination:
											</td>
											<td>

											</td>
											<td>

											</td>
											<td>

											</td>
											<td>

											</td>
											<td>

											</td>
											<td>

											</td>
										</tr>
										<tr>
											<td className="sub-header">
												Zenrya
											</td>
											<td>
												Destination: Eyesbane
												Zenrya elected to investigate rumors of a civilization of fungi located in the shadows of the mountains in Decapos.<br/>
												She arrived at the town of Eyesbane and began her search.
											</td>
											<td>
												Zenrya located a tribe of the rumored fungi-folk, known as Myconids. Despite their intimidating appearance, they proved to be largely benevolent. They were easily swayed to the cause.<br/>
												Zenrya ventured further into Decapos to recruit further Myconid tribes to the resistance.
											</td>
											<td>
												Continued to search for Myconid tribes.
											</td>
											<td>
												Continued to search for Myconid tribes.
											</td>
											<td>
												Continued to search for Myconid tribes.
											</td>
											<td>
												Continued to search for Myconid tribes.
											</td>
											<td>
												Continued to search for Myconid tribes.
											</td>
										</tr>
									</table>
								</div>
							</p>
						</div>
						<button className="collapsible">
							<span className="date">06/15/2019</span>
							Storm the Gates
						</button>
						<div className="content">
							<ul className="party-list">
								<li>Bud</li>
								<li>Jasper</li>
								<li>Namfoodle</li>
								<li>Redji</li>
								<li>Shamous</li>
							</ul>
							<p>
								Focusing all of his strength, Vidan is able to return some degree of free will to the dead within the underworld. This prevents the souls of the dead from joining the legions of the Rewera, and even allows some of the more strong-willed souls to join the party in the uprising.
							</p>
							<p>
								Dead gods:
								Klause
								Ociphe
								Gillywung

								Imprisoned Gods:
								Mosoc
								Telov
							</p>
							<p>
								Loot Table:
								1. Umbrella of Feather Falling
								2. Accursed Anchor Earring
								3. Talisman of Ultimate Good


							</p>
						</div>
						<button className="collapsible">
							<span className="date">06/29/2019</span>
							CANCELLED
						</button>
						<div className="content">
							<ul className="party-list">
								<li>Bud</li>
								<li>Jasper</li>
								<li>Namfoodle</li>
								<li>Redji</li>
								<li>Shamous</li>
							</ul>
							This session was postponed until 07/13/2019 to ensure that all players could attend the finale.
						</div>
						<button className="collapsible">
							<span className="date">07/13/2019</span>
							A Whole New World
						</button>
						<div className="content">
							<ul className="party-list">
								<li>Bud</li>
								<li>Jasper</li>
								<li>Namfoodle</li>
								<li>Redji</li>
								<li>Shamous</li>
								<li>Teomyr</li>
							</ul>
							<p>
								<ul>
									<li>Spaxis - lived</li>
									<li>Rachi - lived</li>
									<li>Graisum - dead</li>
									<li>Larazi - dead</li>
									<li>Vidan - lived</li>
									<li>Notriv - lived</li>
									<li>Tordanei - lived</li>
									<li>Chromus - dead</li>
									<li>Mortadus - lived</li>
									<li>Lonic - lived</li>
									<li>Fouvil - lived</li>
								</ul>


								Bud became the new god of the harvest, and went on to father many children with Tordanei, goddess of storms.
								Namfoodle became the new god of death.
								Falimur became the new god of law.
								Redji declined to become the new god of time, and instead chose to seek out and select a worthy person to inherit the title.


							</p>
						</div>

					</div>
				</div>

				<div className="tab-pane row" id="campaign-1-revised" role="tabpanel" aria-labelledby="campaign-1-revised-tab">
					<SessionNotesCategoryHeader text="Geoss Campaign I: The Godfall Fallout (Revised)" />
						<div className="accordion" id="campaign-1-revised-accordion">
							<div className="accordion-item">
								<h2 className="accordion-header" id="campaign-1-revised-session-1-heading">
									<button className="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target="#campaign-1-revised-session-1" aria-expanded="false" aria-controls="campaign-1-revised-session-1">
										<span className="col-sm-1">12/31/2021</span>
										<span className="col-sm-1">-</span>
										A New Hope
									</button>
								</h2>
								<div id="campaign-1-revised-session-1" className="accordion-collapse collapse" aria-labelledby="campaign-1-revised-session-1-heading" data-bs-parent="#campaign-1-revised-accordion">
										<div className="accordion-body">
										<SessionPartyList>
											- New Hero #1
											- New Hero #2
											- New Hero #3
											- New Hero #4
											- New Hero #5
										</SessionPartyList>
										<p>
											Sometimes things happen. When things happen, they are recorded here for future reference. It would be best if they were recorded thoroughly and verbosely.
										</p>
									</div>
								</div>
							</div>
							<SessionEntry campaignID="campaign-1-revised" date="12/31/2021" title="Empire Strikes Back"
								sessionNumber={2}
								paragraphs={[
									"Sometimes things happen. When things happen, they are recorded here for future reference. It would be best if they were recorded thoroughly and verbosely."
								]}
							/>
					</div>
				</div>

				<div className="tab-pane row" id="campaign-2" role="tabpanel" aria-labelledby="campaign-2-tab">
					<div className="accordion" id="campaign-2-accordion">
						<SessionNotesCategoryHeader text="Geoss Campaign II" />
						<div className="accordion-item">
							<h2 className="accordion-header" id="campaign-2-session-1-heading">
								<button className="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target="#campaign-2-session-1" aria-expanded="false" aria-controls="campaign-2-session-1">
									<span className="col-sm-1">12/31/2021</span>
									<span className="col-sm-1">-</span>
									A New Hope
							  </button>
							</h2>
							<div id="campaign-2-session-1" className="accordion-collapse collapse" aria-labelledby="campaign-2-session-1-heading" data-bs-parent="#campaign-2-accordion">
								<div className="accordion-body">
									<ul className="party-list">
										<li>New Hero #1</li>
										<li>New Hero #2</li>
										<li>New Hero #3</li>
										<li>New Hero #4</li>
										<li>New Hero #5</li>
									</ul>
									<p>
										Sometimes things happen. When things happen, they are recorded here for future reference. It would be best if they were recorded thoroughly and verbosely.
									</p>
								</div>
							</div>
						</div>
					</div>
				</div>

			</div>
		</div>
		);
	}
}

interface ISessionNotesCategoryHeaderProps
{
	text?: string;
}
class SessionNotesCategoryHeader extends React.Component<ISessionNotesCategoryHeaderProps> {
	render()
	{
		return <h4 className="pt-2 text-white">{this.props.text}{this.props.children}</h4>;
	}
}

interface ISessionEntryProps
{
	campaignID: string;
	date: string;
	paragraphs: string[];
	sessionNumber: number;
	title: string;
}
class SessionEntry extends React.Component<ISessionEntryProps> {
	render()
	{
		let campaignID = this.props.campaignID.replace(/\s+/g, "-");
		let id = campaignID + "-session-" + this.props.sessionNumber;
		return (
			<div className="accordion-item">
				<h2 className="accordion-header" id={id + "-heading"}>
					<button className="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target={"#" + id} aria-expanded="false" aria-controls={id}>
						<span className="col-sm-1">{this.props.date}</span>
						<span className="col-sm-1">-</span>
						<span>{this.props.title}</span>
					</button>
				</h2>
				<div id={id} className="accordion-collapse collapse" aria-labelledby={id + "-heading"} data-bs-parent={"#" + campaignID + "-accordion"}>
					<div className="accordion-body">
						<SessionPartyList>
							- New Hero #1
							- New Hero #2
							- New Hero #3
							- New Hero #4
							- New Hero #5
						</SessionPartyList>
						{this.props.paragraphs.map(value =>
							<ParagraphFromRawHTML text={value} />
						)}
					</div>
				</div>
			</div>
		);
	}
}

interface ISessionPartyListProps
{
	characters?: string[];
}
class SessionPartyList extends React.Component<ISessionPartyListProps> {
	render()
	{
		return (
			<ul className="party-list">
				{(this.props.children as string).split(/-\s/).map(value =>
					(value.trim().length > 0) &&
					<li>{value.trim()}</li>
				)}
			</ul>
		);
	}
}

ReactDOM.render(
	<SessionNotesViewer />,
	document.getElementById("viewer-panel")
);
interface IReincarnationViewerProps
{
	tableData: IReincarnationTables;
}
class ReincarnationViewer extends React.Component<IReincarnationViewerProps> {
	render()
	{
		return (
			<div className="container bg-light">
				<h1>
					Reincarnation Expanded
				</h1>
				<p className="px-2">
					The version of reincarnate found in the standard
					Player's Handbook may be enough to sate
					some adventurers... well, at least the BORING
					ones that is! This document outlines an
					alternate version of the spell reincarnate. One
					that any DM leading a party of powergamers
					would best avoid using. For all else, enjoy.
				</p>
				<div className="card rounded bg-white mb-2">
					<div className="card-body">
						<h4 className="card-title">The Steps to Reincarnation!</h4>
						<p className="card-text">
							<ol>
								<li>Roll on the Base Table</li>
								<li>Roll on the Sex Table (result has no effect on a character's gender)</li>
								<li>Roll on the Successfulness Table and follow instructions from there</li>
								<li>Roll on any additional applicable tables</li>
								<li>Finish up by rolling on any applicable subrace tables for your race</li>
							</ol>
							<h4>
								Subraces!
							</h4>
							<p>
								An asterisk next to a race indicates that there is a
								matching subrace table to roll on. For instance, the
								Elements table would be used to determine what
								kind of Genasi, elemental, etc. a character ends up
								as. There are also tables for dragon types, tiefling
								types, and many more. Find these tables in the
								Subraces section at the end of the book.
							</p>
							<div className="accordion accordion-flush" id="stepsToReincarnationAccordion">
								<ReincarnationAccordionItem parentID="stepsToReincarnationAccordion" idBase="Species" title="Table 1: Base Table" rows={this.props.tableData.race} />
								<ReincarnationAccordionItem parentID="stepsToReincarnationAccordion" idBase="Gender" title="Table 2: Sex (Optional)" rows={this.props.tableData.gender} />
								<div className="accordion-item">
									<h2 className="accordion-header" id="successfulnessHeading">
										<button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#successfulnessTable" aria-expanded="false" aria-controls="successfulnessTable">
											Table 3: Successfulness
										</button>
									</h2>
									<div id="successfulnessTable" className="accordion-collapse collapse" aria-labelledby="successfulnessHeading" data-bs-parent="#stepsToReincarnationAccordion">
										<div className="accordion-body p-0">
											<p>
												Even the most powerful spellcasters make mistakes! Roll on this table even when the caster is using optimal conditions. If something is VERY wrong, jump ahead to the following tables:
												<ul>
													<li>
														If the caster uses sub-optimal component pieces, roll on the Mutation table 1-3 times depending on how bad the components are as determined by the DM
													</li>
													<li>
														If the caster uses the wrong component pieces, learned the spell wrong, or the spell is interrupted or sabotaged, roll on the Whoops! table
													</li>
													<li>
														If the weave is distorted or damaged in the area, roll on the Wild Magic table
													</li>
													<li>
														If there is some kind of outside magical influence, such as a fiend, fey, powerful undead, or deity affecting the weave of the area, or the spell is being cast in a plane such as Shadowfell or the Feywilds, roll of the table that best matches that kind of influence in the Magical Distortions section.
													</li>
												</ul>
											</p>
											<RollableTable rows={this.props.tableData.successfulness} />
										</div>
									</div>
								</div>
							</div>
						</p>
					</div>
				</div>
				<div className="accordion accordion-flush" id="outerTableAccordion">
					<div className="accordion-item">
						<h2 className="accordion-header" id="mistakesHeading">
							<button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#mistakesCollapse" aria-expanded="false" aria-controls="mistakesCollapse">
								<h2>Mistakes</h2>
							</button>
						</h2>
						<div id="mistakesCollapse" className="accordion-collapse collapse" aria-labelledby="mistakesHeading" data-bs-parent="#outerTableAccordion">
							<div className="accordion-body p-0">
								<div className="accordion accordion-flush" id="mistakesTablesAccordion">
									<div className="accordion-item">
										<h2 className="accordion-header" id="headingMutations">
											<button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseMutations" aria-expanded="false" aria-controls="collapseMutations">
												Mutations
											</button>
										</h2>
										<div id="collapseMutations" className="accordion-collapse collapse" aria-labelledby="headingMutations" data-bs-parent="#mistakesTablesAccordion">
											<div className="accordion-body p-0">
												<p>
													Well... something went a little awry, but it could be worse! Roll
													away! If your base race already has the feature that the
													mutation describes, tough luck, roll again!
												</p>
												<table className="table table-dark table-striped">
													<tbody>
														<tr>
															<th>1d100</th>
															<th>Mutation</th>
														</tr>
														<tr>
															<td>1-2</td>
															<td>You have twice the normal amount of eyes as your race</td>
														</tr>
														<tr>
															<td>3-4</td>
															<td>You have twice the normal amount of arms as your race</td>
														</tr>
														<tr>
															<td>5-6</td>
															<td>You grow wings and a flying speed equal to your land speed</td>
														</tr>
														<tr>
															<td>7-8</td>
															<td>You develop fiendish traits including horns, glowing eyes, and sharp teeth</td>
														</tr>
														<tr>
															<td>9-10</td>
															<td>You are half the size your race normally is and your Strength score decreases by 2</td>
														</tr>
														<tr>
															<td>11-12</td>
															<td>You are twice the size that your race normally is and your Strength score increases by 2</td>
														</tr>
														<tr>
															<td>13-14</td>
															<td>You are covered in horrible scars or deformities and your Charisma score is reduced by 1</td>
														</tr>
														<tr>
															<td>15-16</td>
															<td>Chimera! Roll on the Base race table again. You are now a mixture of those two races. The DM decides how these mix</td>
														</tr>
														<tr>
															<td>17-18</td>
															<td>You are blind, but have blindsight up to a 30 ft radius</td>
														</tr>
														<tr>
															<td>19-20</td>
															<td>You are deaf, but have extraordinary eyesight and gain advantage on perception and investigation checks that rely on sight.</td>
														</tr>
														<tr>
															<td>21-22</td>
															<td>Your Strength score decreases by 4 but your Intelligence score increases by 4</td>
														</tr>
														<tr>
															<td>23-24</td>
															<td>You resemble your base race, but are made completely out of plant matter and are vulnerable to fire damage but you do not need to eat</td>
														</tr>
														<tr>
															<td>25-26</td>
															<td>You are an amphibious version of your race, can breathe underwater, and gain a swimming speed equal to your land speed</td>
														</tr>
														<tr>
															<td>27-28</td>
															<td>You age at half the speed of your base race</td>
														</tr>
														<tr>
															<td>29-30</td>
															<td>You age at twice the speed of your base race</td>
														</tr>
														<tr>
															<td>31-32</td>
															<td>You are mute, but can communicate telepathically to intelligent creatures within 30 ft of you. You can only do this to one creature at a time, but they need not share a language with you to understand you</td>
														</tr>
														<tr>
															<td>33-34</td>
															<td>Bad luck! You have a degenerative disease that will kill you unless it is cured with a greater restoration or wish spell! Your Constitution score is 7 and reduces by 1 every 24 hours until you die! How fun!</td>
														</tr>
														<tr>
															<td>35-36</td>
															<td>You're a natural-born lycanthrope... sort of. Roll on the lycanthropy subrace chart</td>
														</tr>
														<tr>
															<td>37-38</td>
															<td>Your tongue is like a frog's and is as long as you are tall</td>
														</tr>
														<tr>
															<td>39-40</td>
															<td>Your body is translucent</td>
														</tr>
														<tr>
															<td>41-42</td>
															<td>You are an unnaturally beautiful specimen, your Charisma increases by 1</td>
														</tr>
														<tr>
															<td>43-44</td>
															<td>You curse everyone who touches you with mummy rot! Hope you didn't have an SO!</td>
														</tr>
														<tr>
															<td>45-46</td>
															<td>You glow in the dark</td>
														</tr>
														<tr>
															<td>47-48</td>
															<td>Your skin is a strange and unnatural color for your race</td>
														</tr>
														<tr>
															<td>49-50</td>
															<td>You are covered in scales</td>
														</tr>
														<tr>
															<td>51-52</td>
															<td>You are paralyzed from the waist down</td>
														</tr>
														<tr>
															<td>53-54</td>
															<td>You have an exoskeleton which grants you a natural AC of 13</td>
														</tr>
														<tr>
															<td>55-56</td>
															<td>You have an eye in the middle of your forehead and can cast scrying once per long rest without the use of a crystal ball or mirror</td>
														</tr>
														<tr>
															<td>57-58</td>
															<td>You are reincarnated as a skeletal version of your base race</td>
														</tr>
														<tr>
															<td>59-60</td>
															<td>You are reincarnated as a child</td>
														</tr>
														<tr>
															<td>61-62</td>
															<td>You are reincarnated as an elderly person</td>
														</tr>
														<tr>
															<td>63-64</td>
															<td>You have a tail</td>
														</tr>
														<tr>
															<td>65-66</td>
															<td>Your arms are dexterous prehensile tentacles. Your reach increases by 5 ft</td>
														</tr>
														<tr>
															<td>67-68</td>
															<td>Your body is made out of crystal</td>
														</tr>
														<tr>
															<td>69-70</td>
															<td>Your fingers end in long, sharp claws which do 1d6 slashing damage</td>
														</tr>
														<tr>
															<td>71-72</td>
															<td>You are an albino</td>
														</tr>
														<tr>
															<td>73-74</td>
															<td>Shifter! Roll again on the Base race table. You can now shift between your base races whenever you complete a long rest</td>
														</tr>
														<tr>
															<td>75-76</td>
															<td>You do not need to blink and do not have eyelids</td>
														</tr>
														<tr>
															<td>77-78</td>
															<td>You mimic sounds in the same way as a Kenku, but cannot speak normally</td>
														</tr>
														<tr>
															<td>79-80</td>
															<td>You are repulsed by the taste of vegetable matter and can only eat meat</td>
														</tr>
														<tr>
															<td>81-82</td>
															<td>You are repulsed by the taste of meat and can only eat vegetable matter</td>
														</tr>
														<tr>
															<td>83-84</td>
															<td>You gain empathic abilities that lets you intuitively know the surface emotions of those around you</td>
														</tr>
														<tr>
															<td>85-86</td>
															<td>Your legs are replaced by a mass of tentacles. Your land speed stays the same</td>
														</tr>
														<tr>
															<td>87-88</td>
															<td>Centaur-ish! You have the lower half of a random animal from the animal types table</td>
														</tr>
														<tr>
															<td>89-90</td>
															<td>You have a mass of boney spines growing from your back</td>
														</tr>
														<tr>
															<td>91-92</td>
															<td>Your genitalia is... unusual in some way</td>
														</tr>
														<tr>
															<td>93-94</td>
															<td>You have the antlers of a deer</td>
														</tr>
														<tr>
															<td>95-96</td>
															<td>You have mouths on your palms</td>
														</tr>
														<tr>
															<td>97-98</td>
															<td>You can change your hair color and style at will</td>
														</tr>
														<tr>
															<td>99-00</td>
															<td>Congratulations! You're magic! Roll on the Sorcery and Other Powers table!</td>
														</tr>
													</tbody>
												</table>
											</div>
										</div>
									</div>
									<div className="accordion-item">
										<h2 className="accordion-header" id="headingWildMagic">
											<button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseWildMagic" aria-expanded="false" aria-controls="collapseWildMagic">
												Wild Magic
											</button>
										</h2>
										<div id="collapseWildMagic" className="accordion-collapse collapse" aria-labelledby="headingWildMagic" data-bs-parent="#mistakesTablesAccordion">
											<div className="accordion-body p-0">
												<p>
													In the case that The Weave around the area which a
													reincarnation spell is cast is damaged or unusual in some
													way, strange magical events may occur. This may be obvious
													to a caster, or the caster may just have been unlucky and
													tugged at a few of the wrong threads of magic. Either way,
													that's what this table is for!
												</p>
												<table className="table table-dark table-striped">
													<tbody>
														<tr>
															<th>1d20</th>
															<th>Result</th>
														</tr>
														<tr>
															<td>1-4</td>
															<td>The target is brought back as a race from the Exotic Races table</td>
														</tr>
														<tr>
															<td>5-6</td>
															<td>The target is brought back in their previous body, but immediately disintegrates into magically charged dust</td>
														</tr>
														<tr>
															<td>7-8</td>
															<td>Someone who is not the target is brought back from the dead. This person is determined by the DM</td>
														</tr>
														<tr>
															<td>9-10</td>
															<td>The target is successfully reincarnated, but comes back somewhere else within 10 miles</td>
														</tr>
														<tr>
															<td>11-12</td>
															<td>A new body is created by the reincarnate spell, and the proper soul is summoned, but the caster ends up in the new body and the target ends up in the caster's body</td>
														</tr>
														<tr>
															<td>13-14</td>
															<td>The target's new body radiates with magical energy, and constantly illuminates the area within 10 ft of them with bright, arcane light.</td>
														</tr>
														<tr>
															<td>15-16</td>
															<td>The target is successfully brought back... only they're stuck in the ethereal plane</td>
														</tr>
														<tr>
															<td>17-18</td>
															<td>A powerful entity takes an interest in the reincarnated target and offers them a warlock pact within 21 days</td>
														</tr>
														<tr>
															<td>19-20</td>
															<td>Sorcery! Roll on the Sorcery and Other Powers table!</td>
														</tr>
													</tbody>
												</table>
											</div>
										</div>
									</div>
									{this.props.tableData.mistakes.map((slimData, index: number) =>
										<ReincarnationSlimTableAccordionItem parentID="mistakesHeading" slimData={slimData} key={index} />
									)}
									<div className="accordion-item">
										<h2 className="accordion-header" id="headingSorceryAndOtherPowers">
											<button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseSorceryAndOtherPowers" aria-expanded="false" aria-controls="collapseSorceryAndOtherPowers">
												Sorcery and Other Powers
											</button>
										</h2>
										<div id="collapseSorceryAndOtherPowers" className="accordion-collapse collapse" aria-labelledby="headingSorceryAndOtherPowers" data-bs-parent="#otherTablesAccordion">
											<div className="accordion-body p-0">
												<table className="table table-dark table-striped">
													<tbody>
														<tr>
															<th>1d20</th>
															<th>Powers</th>
														</tr>
														<tr>
															<td>1d20</td>
															<td>Powers</td>
														</tr>
														<tr>
															<td>1-2</td>
															<td>Draconic Sorcery*</td>
														</tr>
														<tr>
															<td>3-4</td>
															<td>Wild Sorcery</td>
														</tr>
														<tr>
															<td>5-6</td>
															<td>Divine Soul</td>
														</tr>
														<tr>
															<td>7-8</td>
															<td>Storm Sorcery</td>
														</tr>
														<tr>
															<td>9-10</td>
															<td>Phoenix Sorcery</td>
														</tr>
														<tr>
															<td>11-12</td>
															<td>Stone Sorcery</td>
														</tr>
														<tr>
															<td>13-14</td>
															<td>Sea Sorcery</td>
														</tr>
														<tr>
															<td>15-16</td>
															<td>Shadow Magic</td>
														</tr>
														<tr>
															<td>17-18</td>
															<td>Psionic Powers</td>
														</tr>
														<tr>
															<td>19-20</td>
															<td>Player Choice of Power</td>
														</tr>
													</tbody>
												</table>
												*roll on the dragon types table

												<div id="PowerElaboration" className="aside">
													<h4>
														Power Elaboration
													</h4>
													<p>
														For the most part, the powers in the previous table simply correspond to sorcerer classes, but if the player rolls psionic powers there are a few options. They could gain access to mystic levels, or could gain the ability to speak telepathically, or gain a use of Rary's Telepathic Bond twice per long rest, or the ability to lift objects telekinetically, using their Intelligence to calculate the amount they can lift instead of Strength. It's really up to the player and their DM to collaborate on.
													</p>
												</div>
											</div>
										</div>
									</div>
								</div>
							</div>
						</div>
					</div>
					<div className="accordion-item">
						<h2 className="accordion-header" id="subracesHeading">
							<button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#subracesCollapse" aria-expanded="false" aria-controls="subracesCollapse">
								<h2>Subraces</h2>
							</button>
						</h2>
						<div id="subracesCollapse" className="accordion-collapse collapse" aria-labelledby="subracesHeading" data-bs-parent="#outerTableAccordion">
							<div className="accordion-body p-0">
								<p>
									The following section contains tables for
									randomly generating various subraces such as
									dragon type, tiefling ancestry, goblinoid kind,
									elf race, demon or devil type, etc.
								</p>
								<div className="accordion accordion-flush" id="subracesAccordion">
									<div className="accordion-item">
										<h2 className="accordion-header" id="headingStandardSubraces">
											<button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseStandardSubraces" aria-expanded="false" aria-controls="collapseStandardSubraces">
												Standard Subraces
											</button>
										</h2>
										<div id="collapseStandardSubraces" className="accordion-collapse collapse" aria-labelledby="headingStandardSubraces" data-bs-parent="#subracesAccordion">
											<div className="accordion-body p-0">
												<div className="accordion accordion-flush" id="standardSubracesAccordion">
													{this.props.tableData.subraces.standard.map((slimData, index: number) =>
														<ReincarnationSlimTableAccordionItem parentID="standardSubracesAccordion" slimData={slimData} key={index} />
													)}
												</div>
											</div>
										</div>
									</div>
									<div className="accordion-item">
										<h2 className="accordion-header" id="headingExoticSubraces">
											<button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseExoticSubraces" aria-expanded="false" aria-controls="collapseExoticSubraces">
												Exotic Subraces
											</button>
										</h2>
										<div id="collapseExoticSubraces" className="accordion-collapse collapse" aria-labelledby="headingExoticSubraces" data-bs-parent="#subracesAccordion">
											<div className="accordion-body p-0">
												<div className="accordion accordion-flush" id="exoticSubracesAccordion">
													{this.props.tableData.subraces.exotic.map((slimData, index: number) =>
														<ReincarnationSlimTableAccordionItem parentID="exoticSubracesAccordion" slimData={slimData} key={index} />
													)}
												</div>
											</div>
										</div>
									</div>
								</div>
							</div>
						</div>
					</div>
					<div className="accordion-item">
						<h2 className="accordion-header" id="magicalDistortionsHeading">
							<button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#magicalDistortionsCollapse" aria-expanded="false" aria-controls="magicalDistortionsCollapse">
								<h2> Magical Distortions </h2>
							</button>
						</h2>
						<div id="magicalDistortionsCollapse" className="accordion-collapse collapse" aria-labelledby="magicalDistortionsHeading" data-bs-parent="#outerTableAccordion">
							<div className="accordion-body p-0">
								<p className="px-3">
									This section is meant to be used when a
									character casts reincarnate in an unusual
									place, be it a plane of existence which is not
									the material plane, or in the heart of a
									vampire's lair. Find the table in this section
									that best fits the magics affecting the spell and
									roll on it, applying the results as needed. If the
									description on the table matches a trait your race already has
									(for example, if you've already rolled an Elf and then roll on
									the Fey table to add the fey ancestry and trance traits) roll
									again.
								</p>
								<p className="px-3">
									No matter what is rolled the person being reincarnated still
									remembers their previous life as they would normally, retains
									their mental ability scores, their class levels, their alignment,
									and their personality.
								</p>
								<div className="accordion accordion-flush" id="magicalDistortionsAccordion">
									<ReincarnationAccordionItem parentID="magicalDistortionsAccordion" title="Celestial" rows={this.props.tableData.magicalDistortions.celestial} />
									<ReincarnationAccordionItem parentID="magicalDistortionsAccordion" title="Fey" rows={this.props.tableData.magicalDistortions.fey} />
									<ReincarnationAccordionItem parentID="magicalDistortionsAccordion" title="Fiendish" rows={this.props.tableData.magicalDistortions.fiend} />
									<ReincarnationAccordionItem parentID="magicalDistortionsAccordion" title="Necrotic" rows={this.props.tableData.magicalDistortions.necrotic} />
								</div>
							</div>
						</div>
					</div>
					<div className="accordion-item">
						<h2 className="accordion-header" id="elementalDistortionsHeading">
							<button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#elementalDistortionsCollapse" aria-expanded="false" aria-controls="elementalDistortionsCollapse">
								<h2> Elemental Distortions </h2>
							</button>
						</h2>
						<div id="elementalDistortionsCollapse" className="accordion-collapse collapse" aria-labelledby="elementalDistortionsHeading" data-bs-parent="#outerTableAccordion">
							<div className="accordion-body p-0">
								<div className="accordion accordion-flush" id="elementalDistortionsHeading">
									{this.props.tableData.distortions.elemental.map((slimData, index: number) =>
										<ReincarnationSlimTableAccordionItem parentID="elementalDistortionsHeading" slimData={slimData} key={index} />
									)}
								</div>
							</div>
						</div>
					</div>
					<div className="accordion-item">
						<h2 className="accordion-header" id="otherTablesHeading">
							<button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#otherTablesCollapse" aria-expanded="false" aria-controls="otherTablesCollapse">
								<h2> Other Tables </h2>
							</button>
						</h2>
						<div id="otherTablesCollapse" className="accordion-collapse collapse" aria-labelledby="otherTablesHeading" data-bs-parent="#outerTableAccordion">
							<div className="accordion-body p-0">
								<div className="accordion accordion-flush" id="otherTablesAccordion">
									<ReincarnationAccordionItem parentID="otherTablesAccordion" idBase="Animal" title="Animal Types" rows={this.props.tableData.otherTables.animals} />
									<ReincarnationAccordionItem parentID="otherTablesAccordion" idBase="Lycanthropy" title="Lycanthropy" rows={this.props.tableData.otherTables.lycanthropy} />
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		);
	}
}


interface IReincarnationSlimTableAccordionItemProps
{
	parentID: string;
	slimData: ISlimReincarnationTableData;
	resultColumnLabel: string;
}
class ReincarnationSlimTableAccordionItem extends React.Component<IReincarnationSlimTableAccordionItemProps> {
	public static defaultProps = {
		resultColumnLabel: "Result"
    };
	render()
	{
		let idBase = this.props.slimData.title.replace(/[\s\(\)\[\]\{\}\,\!]/g, '');
		return (
			<ReincarnationAccordionItem
				parentID={this.props.parentID}
				idBase={idBase}
				title={this.props.slimData.title}
				preface={this.props.slimData.preface}
				postface={this.props.slimData.postface}
				rows={this.props.slimData.rows} />
		)
	}
}


interface IReincarnationAccordionItemProps
{
	idBase?: string;
	parentID: string;
	title: string;
	postface: string[];
	preface: string[];
	resultColumnLabel: string;
	rows: IRollableTableRowData[];
}
class ReincarnationAccordionItem extends React.Component<IReincarnationAccordionItemProps> {
	public static defaultProps = {
		postface: [],
		preface: [],
		resultColumnLabel: "Result"
    };
	render()
	{
		let collapseId = "collapse" + (this.props.idBase ? this.props.idBase : this.props.title);
		let headerId = "heading" + (this.props.idBase ? this.props.idBase : this.props.title);
		return (
			<div className="accordion-item">
				<h2 className="accordion-header" id={headerId}>
						<button
							className="accordion-button collapsed"
							type="button"
							data-bs-toggle="collapse"
							data-bs-target={"#" + collapseId}
							aria-expanded="false"
							aria-controls={collapseId}
						>
						{this.props.title}
					</button>
				</h2>
				<div
					id={collapseId}
					className="accordion-collapse collapse"
					aria-labelledby={headerId}
					data-bs-parent={"#" + this.props.parentID}>
					<div className="accordion-body p-0">
						{this.props.preface.map((paragraph, index: number) =>
							<ParagraphFromRawHTML text={paragraph} key={index} />
						)}
						<RollableTable
							resultColumnLabel={this.props.resultColumnLabel}
							rows={this.props.rows}
						/>
						{this.props.postface.map((paragraph, index: number) =>
							<ParagraphFromRawHTML text={paragraph} key={index} />
						)}
					</div>
				</div>
			</div>
		)
	}
}


interface ISlimReincarnationTableData
{
	postface?: string[];
	preface?: string[];
	rows: IRollableTableRowData[];
	title: string;
}
interface IReincarnationTables
{
	distortions: {
		elemental: ISlimReincarnationTableData[];
		magical: ISlimReincarnationTableData[];
	};
	gender: IRollableTableRowData[];
	magicalDistortions: {
		celestial: IRollableTableRowData[];
		fey: IRollableTableRowData[];
		fiend: IRollableTableRowData[];
		necrotic: IRollableTableRowData[];
	};
	mistakes: ISlimReincarnationTableData[];
	otherTables: {
		animals: IRollableTableRowData[];
		lycanthropy: IRollableTableRowData[];
	};
	race: IRollableTableRowData[];
	subraces: {
		exotic: ISlimReincarnationTableData[];
		standard: ISlimReincarnationTableData[];
	}
	successfulness: IRollableTableRowData[];
}
const ReincarnationTables: IReincarnationTables = {
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
	mistakes: [
		{
			title: "Whoops!",
			preface: [
				"Well son, you done fucked up. Something really bad happened. Your spell was sabotaged, those expensive components you bought were actually just made of paper mache, you mumbled the last word of the incantation and now all you can say is \"Whoops!\""
			],
			rows: [
				{
					odds: 10,
					result: "The target is brought back as a race from the Exotic Races table.",
				},
				{
					odds: 3,
					result: "The target is brought back as a race from the Exotic Races table with one mutation from the Mutations table.",
				},
				{
					odds: 1,
					result: "The target is brought back as a zombie of the base race they rolled and retains their personality, mental ability scores, class levels, etc.",
				},
				{
					odds: 1,
					result: "The target is brought back as a skeleton of the base race they rolled and retains their personality, mental ability scores, class levels, etc.",
				},
				{
					odds: 1,
					result: "The target is brought back as a vampiric version of their old self. The DM chooses whether or not they are in control of this vampire, if the player retains their alignment and personality, etc.",
				},
				{
					odds: 1,
					result: "	The target is brought back under the effects of the feeblemind spell.",
				},
				{
					odds: 1,
					result: "The target is brought back as a familiar to the caster as described in the find familiar spell. They retain their personality, mental ability scores, and knowledge but cannot use their class features.",
				},
				{
					odds: 1,
					result: "The target's soul is brought back and instead of going into the new body created by reincarnate, goes into the nearest full suit of plate armor and becomes animated armor. They retain their personality, mental ability scores, class levels, etc.",
				},
				{
					odds: 1,
					result: "The target's soul is brought back and instead of going into the new body created by reincarnate, goes into the nearest tree, shrub, etc. and becomes an awakened plant. They retain their personality, mental ability scores, class levels, etc.",
				},
			]
		},
		{
			title: "Exotic Races",
			preface: [
				"Well, you ended up here one way or another. Someone's life is about to seriously change. Are you ready for that? No matter what is rolled the person being reincarnated still remembers their previous life as they would normally, retains their mental ability scores, their class levels, their alignment, and their personality."
			],
			rows: [
				{
					odds: 1,
					result: "Aetherborn"
				},
				{
					odds: 1,
					result:"Aven"
				},
				{
					odds: 1,
					result:"Awakened Golem*"
				},
				{
					odds: 1,
					result:"Banshee"
				},
				{
					odds: 1,
					result:"Bearfolk"
				},
				{
					odds: 1,
					result:"Beholder"
				},
				{
					odds: 1,
					result:"Blight*"
				},
				{
					odds: 1,
					result:"Bloodfin"
				},
				{
					odds: 1,
					result:"Boggle"
				},
				{
					odds: 1,
					result:"Brokkos"
				},
				{
					odds: 1,
					result:"Bullywug"
				},
				{
					odds: 1,
					result:"Cambion"
				},
				{
					odds: 1,
					result:"Darkling"
				},
				{
					odds: 1,
					result:"Deep Scion"
				},
				{
					odds: 1,
					result:"Demon*"
				},
				{
					odds: 1,
					result:"Devil*"
				},
				{
					odds: 1,
					result:"Doppelganger"
				},
				{
					odds: 1,
					result:"Dragon Wyrmling*"
				},
				{
					odds: 1,
					result:"Drider"
				},
				{
					odds: 1,
					result:"Dryad"
				},
				{
					odds: 1,
					result:"Elemental*"
				},
				{
					odds: 1,
					result:"Firenewt"
				},
				{
					odds: 1,
					result:"Flumph"
				},
				{
					odds: 1,
					result:"Galeb Duhr"
				},
				{
					odds: 1,
					result:"Gargoyle"
				},
				{
					odds: 1,
					result:"Ghoul"
				},
				{
					odds: 1,
					result:"Giant*"
				},
				{
					odds: 1,
					result:"Giff"
				},
				{
					odds: 1,
					result:"Gnoll"
				},
				{
					odds: 1,
					result:"Grung*"
				},
				{
					odds: 1,
					result:"Hag*"
				},
				{
					odds: 1,
					result:"Half- Devil*"
				},
				{
					odds: 1,
					result:"Half-Demon*"
				},
				{
					odds: 1,
					result:"Half-Dragon*"
				},
				{
					odds: 1,
					result:"Half-Dryad"
				},
				{
					odds: 1,
					result:"Half-Giant*"
				},
				{
					odds: 1,
					result:"Harpy"
				},
				{
					odds: 1,
					result:"Icenewt"
				},
				{
					odds: 1,
					result:"Illithid"
				},
				{
					odds: 1,
					result:"Kor"
				},
				{
					odds: 1,
					result:"Kuo-toa"
				},
				{
					odds: 1,
					result:"Lamia"
				},
				{
					odds: 1,
					result:"Loxodon"
				},
				{
					odds: 1,
					result:"Medusa"
				},
				{
					odds: 1,
					result:"Merfolk"
				},
				{
					odds: 1,
					result:"Merperson"
				},
				{
					odds: 1,
					result:"Mimic"
				},
				{
					odds: 1,
					result:"Mind-Flayer"
				},
				{
					odds: 1,
					result:"Myconid"
				},
				{
					odds: 1,
					result:"Naga"
				},
				{
					odds: 1,
					result:"Nereid"
				},
				{
					odds: 1,
					result:"Nsoki"
				},
				{
					odds: 1,
					result:"Nymph"
				},
				{
					odds: 1,
					result:"Odenu"
				},
				{
					odds: 1,
					result:"Oni"
				},
				{
					odds: 1,
					result:"Ooze*"
				},
				{
					odds: 1,
					result:"Pixie"
				},
				{
					odds: 1,
					result:"Quickling"
				},
				{
					odds: 1,
					result:"Rakshasa"
				},
				{
					odds: 1,
					result:"Ratfolk"
				},
				{
					odds: 1,
					result:"Redcap"
				},
				{
					odds: 1,
					result:"Sahuagin"
				},
				{
					odds: 1,
					result:"Satyr"
				},
				{
					odds: 1,
					result:"Selkie"
				},
				{
					odds: 1,
					result:"Shardmind"
				},
				{
					odds: 1,
					result:"Simian"
				},
				{
					odds: 1,
					result:"Siren"
				},
				{
					odds: 1,
					result:"Slaad*"
				},
				{
					odds: 1,
					result:"Spriggan"
				},
				{
					odds: 1,
					result:"Sprite"
				},
				{
					odds: 1,
					result:"Thri-Keen"
				},
				{
					odds: 1,
					result:"Tlincalli"
				},
				{
					odds: 1,
					result:"Troglodyte"
				},
				{
					odds: 1,
					result:"Vampire"
				},
				{
					odds: 1,
					result:"Vedalken"
				},
				{
					odds: 1,
					result:"Vegepygmy"
				},
				{
					odds: 1,
					result:"Wilkoss"
				},
				{
					odds: 1,
					result:"Wood Woad"
				},
				{
					odds: 1,
					result:"Yeti"
				},
				{
					odds: 1,
					result:"Yuan-Ti (non-pureblood of player's choice)"
				},
				{
					odds: 19,
					result:"Reroll"
				},
				{
					odds: 1,
					result:"DM chooses"
				}
			]
		},
	],
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

ReactDOM.render(
	<ReincarnationViewer tableData={ReincarnationTables} />,
	document.getElementById("viewer-panel")
);
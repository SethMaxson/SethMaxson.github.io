interface ICrewMember
{
	name: string;
	/**Example: "/dnd/img/maps/icons/bud_full.png" */
	full: string;
	/**Example: "/dnd/img/maps/icons/bud.png" */
	icon: string;
	/**The index of the square in which this creature is located. */
	left: number;
	/**The index of the square in which this creature is located. */
	top: number;
}
interface ICutout
{
	height: number;
	name: string;
	img: string;
}

interface IDiorama
{
	title: string;
	background: string;
	cutouts: ICutout[];
}

function getCardboardCutout(cutout: ICutout)
{
	return $(`
		<div style="height:${cutout.height}%;">
			<div class="name">${cutout.name}</div>
			<img src="${cutout.img}" alt="">
		</div>
	`);
}

function getDiorama(diorama: IDiorama)
{
	$(document).ready(function(){
		document.title = diorama.title;
		$("body").append($(`
			<div class="background" style="padding:0px; height:100%; background-image: url(${diorama.background});">
				<div class="title">${diorama.title}</div>
				<div class="container">
					<div class="slider">
						<div style="height:100%; width:1px; max-width: 1px; min-width: 1px;"></div>

					</div>
				</div>
			</div>
		`));
		diorama.cutouts.forEach(cutout =>
		{
			$(".slider").append(getCardboardCutout(cutout));
		});
	});
}
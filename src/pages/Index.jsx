import Footer from "../components/Footer.jsx";
import HeaderIndex from "../components/HeaderIndex.jsx";
import {
	Button,
	Divider,
	Card,
	CardHeader,
	Image,
	CardFooter,
} from "@nextui-org/react";

function Index() {
	return (
		<>
			<HeaderIndex />
			<Divider />
			<h1 className="text-center font-semibold text-3xl mt-2">
				Te damos la bienvenida
			</h1>
			<h2 className="text-center text-xl mt-1">
				Encuentra tus películas y series favoritas. ¡Comienza ya!
			</h2>
			<div className="flex justify-center my-4">
				<div className="max-w-[900px] gap-2 grid grid-cols-12 grid-rows-2 px-8">
					<Card className="col-span-12 sm:col-span-4 h-[300px]">
						<CardHeader className="absolute z-10 top-1 flex-col !items-start">
							<p className="text-tiny text-white/60 uppercase font-bold">
								Crea tus listas
							</p>
							<h4 className="text-white font-medium text-large">
								Órganiza tus películas y series
							</h4>
						</CardHeader>
						<Image
							removeWrapper
							alt="Card background"
							className="z-0 w-full h-full object-cover"
							src="https://img.freepik.com/foto-gratis/sonriente-pareja-viendo-pelicula-cama_23-2147771152.jpg"
						/>
					</Card>
					<Card className="col-span-12 sm:col-span-4 h-[300px]">
						<CardHeader className="absolute z-10 top-1 flex-col !items-start">
							<p className="text-tiny text-white/60 uppercase font-bold">
								El tiempo es oro
							</p>
							<h4 className="text-white font-medium text-large">
								Encuentra entre tus plataformas de streaming
							</h4>
						</CardHeader>
						<Image
							removeWrapper
							alt="Card background"
							className="z-0 w-full h-full object-cover"
							src="https://i.blogs.es/b3fa80/netplataformas/450_1000.jpeg"
						/>
					</Card>
					<Card
						isFooterBlurred
						className="w-full h-[300px] col-span-12 sm:col-span-4"
					>
						<CardHeader className="absolute z-10 top-1 flex-col items-start">
							<p className="text-tiny text-white/60 uppercase font-bold">
								Novedad
							</p>
							<h4 className="text-white font-medium text-xl">
								Aplicación para móviles
							</h4>
						</CardHeader>
						<Image
							removeWrapper
							alt="Card example background"
							className="z-0 w-full h-full scale-125 -translate-y-6 object-cover"
							src="https://img.pccomponentes.com/pcblog/3712/android-vs-ios.jpg"
						/>
						<CardFooter className="absolute bg-white/30 bottom-0 border-t-1 border-zinc-100/50 z-10 justify-between">
							<div>
								<p className="text-black text-tiny">
									Próximamente.
								</p>
							</div>
							<Button
								className="text-tiny"
								color="primary"
								radius="full"
								size="sm"
								isDisabled
							>
								Descargar
							</Button>
						</CardFooter>
					</Card>
					<Card className="col-span-12 sm:col-span-12 h-[300px]">
						<CardHeader className="absolute z-10 top-1 flex-col !items-start">
							<p className="text-tiny text-white/60 uppercase font-bold">
								Disfruta
							</p>
							<h4 className="text-white font-medium text-large">
								Busca tu película favorita
							</h4>
						</CardHeader>
						<Image
							removeWrapper
							alt="Card background"
							className="z-0 w-full h-full object-cover"
							src="https://estaticos-cdn.prensaiberica.es/clip/6a0fef89-318b-4e3a-9184-98aaafca9f8f_16-9-aspect-ratio_default_0.jpg"
						/>
					</Card>
				</div>
			</div>
			<Footer />
		</>
	);
}

export default Index;

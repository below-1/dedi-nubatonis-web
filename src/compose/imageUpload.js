import { ImageKit } from "imagekit";

const imagekit = new ImageKit({
    publicKey : "public_c7kph38/cLbkisnogMSMTl8PGyg=",
    privateKey : "private_zNqysJBWA8JVySqGUC6OGH7Enns=",
    urlEndpoint : "https://ik.imagekit.io/grahyc7t8rc"
});

function calculateFullNewName(newName, oldName) {
	const [ _, extension ] = oldName.split('.')
	return newName + '.' + extension
}

export function useImageUpload() {
	async function uploadImage({ file, name }) {
		try {
			const result = await imagekit.upload({
				file,
				fileName: name
			})
			console.log(result)
		} catch (err) {
			console.log(err)
			throw err
		}
	}

	return { uploadImage }
}
const { getClientId, submit, list } = require("@daggle/bacalhau-js");

async function submitJob() {
	let data = {
		APIVersion: "V1beta1",
		ClientID: getClientId(),
		Spec: {
			Deal: {
				Concurrency: 1,
				Confidence: 0,
				MinBids: 0,
			},
			DoNotTrack: false,
			Docker: {
				Entrypoint: ["echo", "Hello World!"],
				Image: "ubuntu",
			},
			Engine: "Docker",
			Language: {},
			PublisherSpec: { Type: "Estuary" },
			Timeout: 1800,
			Verifier: "Noop",
			Outputs: [{ Name: "outputs", StorageSource: "IPFS", path: "/outputs" }],
		},
	};

	const response = await submit(data);
	console.log(response);
}

async function listJobs() {
	const response = await list();
	console.log(response);
}

const { getClientId, submit, list, results, states, events } = require("@daggle/bacalhau-js");

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
	console.log(response.jobs);
}

async function jobResults() {
	const response = await results("3e84b2ad-9c47-430e-87eb-13e2b53cb051");
	console.log(response.results);
}

async function jobStates() {
	const response = await states("3e84b2ad-9c47-430e-87eb-13e2b53cb051");
	console.log(response);
}


async function jobEvents() {
	const response = await events("3e84b2ad-9c47-430e-87eb-13e2b53cb051");
	console.log(response);
}

jobEvents();

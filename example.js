const {
	getClientId,
	submit,
	list,
	results,
	states,
	events,
} = require("@daggle/bacalhau-js");
const {
	Payload,
	Spec,
	PublisherSpec,
	StorageSpec,
	Deal,
	JobSpecDocker,
} = require("@daggle/bacalhau-js/models");

async function submitJob() {
	let data = new Payload({
		ClientID: getClientId(),
		spec: new Spec({
			deal: new Deal(),
			docker: new JobSpecDocker({
				image: "ubuntu",
				entrypoint: ["echo", "Hello World!"],
			}),
			engine: "Docker",
			publisher_spec: new PublisherSpec({ type: "Estuary" }),
			timeout: 1800,
			verifier: "Noop",
			outputs: [
				new StorageSpec({
					path: "/outputs",
					storage_source: "IPFS",
					name: "outputs",
				}),
			],
		}),
	});

	const response = await submit(data);
	console.log(response);
}

async function listJobs() {
	const response = await list();
	console.log(response.jobs);
}

async function jobResults() {
	const response = await results("9dbf4df0-d803-4bb7-845b-2484eca2df1a");
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

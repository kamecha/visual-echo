import { 
	Denops, 
	ensureNumber,
	mapping,
	Mode,
} from "./deps.ts";

export async function main(denops: Denops): Promise<void> {

	// vimのコマンドのマッピング
	const maps = [
		{
			lhs: "<silent> <Plug>(visual_echo)",
			rhs: ":echo<CR>",
			mode: ["n", "v"],
		},
	];

	for (const map of maps) {
		await mapping.map(denops, map.lhs, map.rhs, {
			mode: map.mode as Mode[],
		});
	}

	denops.dispatcher = {
		async echo(
			bang: unknown,
			start: unknown,
			end: unknown,
			arg: unknown,
			): Promise<unkown> {
			ensureNumber(start);
			ensureNumber(end);
			const text = await denops.call("getline", start, end);
			console.log(text);
		}
	}
}

local process = require("@lune/process")
local stdio = require("@lune/stdio")

stdio.write(`{stdio.color("green")}Timing eslint..{stdio.color("reset")}`, "\n")

local start = os.clock()
process.exec("pnpm", { "eslint", "--cache" }, {
	stdio = "inherit",
	shell = "bash",
	env = { ["TIMING"] = "all" },
})
local ended = os.clock()

stdio.write(
	`{stdio.color("green")}Done! Took: {stdio.color("reset") .. stdio.color("purple")}{ended - start}s{stdio.color(
		"reset"
	)}`,
	"\n"
)

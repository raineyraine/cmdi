local process = require("@lune/process")
local task = require("@lune/task")

local build = process.exec("pnpm", { "run", "build" }, {
	shell = true,
	stdio = "inherit",
})

if not build.ok then
	process.exit(1)
end

task.spawn(function()
	process.exec("pnpm", { "run", "watch" }, {
		shell = true,
		stdio = "inherit",
	})
end)

task.spawn(function()
	process.exec("rojo", { "serve" }, {
		shell = true,
		stdio = "inherit",
	})
end)
